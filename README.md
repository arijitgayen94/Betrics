Welcome to the Betrics! This repository contains the source code and assets for our mobile application built using the React Native framework. React Native allows us to develop cross-platform mobile apps using JavaScript and React, while still delivering a native-like user experience.

## Getting Started

To get started with the project, follow these steps:

- Clone the Repository: 
    Start by cloning this repository to your local machine using the following command:

```
git clone < project-url.git >
```

- Install Dependencies: 
    Navigate to the project directory and install the required dependencies using npm or yarn:

```
cd betrics-mobile-app
npm install
or
yarn install
```

- Run the App: 
    Now you can run the app on iOS or Android simulators/emulators. Use the following commands:

- For iOS:
```
npx react-native run-ios
```
- For Android:
```
npx react-native run-android
```

- Start Development: 
    The app should now be up and running. You can start making changes to the code located in the src directory. The app will automatically reload as you save changes.

## Main technologies used

- [React Native](https://github.com/facebook/react-native)

> A framework for building native apps with React.

- [Redux](http://redux.js.org/)

> Redux is a predictable state container for JavaScript apps.

### React Native Setup

Please follow [React native cli](https://reactnative.dev/docs/environment-setup) environment-setup to run the project. 
## Project Structure

* `src`: This is where the majority of your code will reside.
    * `assets`: Images, fonts, and other static assets.
    * `components`: Reusable UI components.
    * `helpers`: Axios global component.
    * `layout`: Baselayout for the app.
    * `redux`: Redux store setup and state management.
    * `routes`: Navigation setup using React Navigation.
    * `screens`: Different screens of the app.
    * `service`: Reusable global functions.
    * `theme`: Global theme for the app.
    

## Development Guidelines

Follow the [React Native documentation](https://reactnative.dev/docs/getting-started) for best practices and guidelines.
Stick to consistent code style. You might consider using ESLint and Prettier for code formatting.
Use meaningful variable and function names.
Comment your code, especially if it's complex or non-intuitive.

## Additional Information

* Our project may have additional documentation stored elsewhere. Check our internal wiki for more details.
* For any issues, bugs, or feature requests, please open an issue in this repository.

Happy coding!