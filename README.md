# PlatePal Frontend

Mobile nutrition tracker that uses LLMs for automatically obtaining
nutritional information.


## Directories

- /api - Collection of classes that provide methods to query the backend.
- /app -  Collection of .tsx files that provide the UI layer of the application
- /app/auth - Authentication pages (/login and /register)
- /app/app/(tabs) - Main pages, consist of dashboard, AI chat, and Gallery (only dashboard implemented)
- /app/app/meals - Pages for adding meal and mealItems
- /assets - Store fonts used for the application
- /components - Store reusable components for the User Interface
- /theme - Dark theme and light theme
- /types - Provide types for objects that are common in multiple pages for reusability


## Current Progress

There is still an issue with uploading images to the cloud with Expo and React Native, however for the main functionality/flow
is mostly done in the backend, just need to connect to the frontend after resolving this issue


## Get started

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

