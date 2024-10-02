# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install a dependencies

First, you will need to install a project's dependencies.

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Running a test

```bash
# using npm
npm run test

# OR using Yarn
yarn test
```

## NOTE

- this project is focusing on a functionality first
- delete a task by swiping a list to the left and click delete button
- task list will persistant between application instance using async-storage
- form validation using react-hook-form and yup for a schema validator
