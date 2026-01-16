import axios from "axios";
import * as SecureStore from "expo-secure-store";


let accessToken: string | null = null;

export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    headers: { "Content-Type": "application/json" },
});


export const setAccessToken = (token: string | null) => {
    accessToken = token;
}

export const getAccessToken = () => accessToken;

export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync("refreshToken");
}

export const deleteRefreshToken = async () => {
    return await SecureStore.deleteItemAsync("refreshToken");
}
export const storeRefreshToken = async (token: string) => {
    return await SecureStore.setItemAsync("refreshToken", token)
}

apiClient.interceptors.request.use((config) => {
    // interceptor to attach accesstoken to authorization on every request
    try {
        // if authorization not set, default to accesstoken
        if(!config.headers.Authorization) {
            const token = getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } 
    catch (e) {
        console.log(e);
    }
    return config;
});


let isRefreshing = false; // this is the lock
let pendingRequests: any[] = [];

apiClient.interceptors.response.use(
    // success
    (res) => res, 
    // fail
    async (error) => {
        console.log("retry");
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) { // push to pendingRequests queue
                return new Promise((resolve, reject) => {
                    pendingRequests.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                });
            }

            isRefreshing = true;
            // try to get refreshToken
            try {
                const refreshToken = await getRefreshToken();
                const { data } = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/refresh`, {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });
                storeRefreshToken(data.refreshToken);
                setAccessToken(data.accessToken);
            }
            catch (e) {
                // reject all
                pendingRequests.forEach((p) => p.reject(e));
                pendingRequests = [];
                
                //log out
                setAccessToken(null);
                await SecureStore.deleteItemAsync('refreshToken');
                return Promise.reject(e);
            } 
            finally {
                // no matter what, turn off lock
                isRefreshing = false;

            }
            return Promise.reject(error);
        }
    }
);





