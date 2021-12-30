# Kekule React Component

Based on create-reac-app, this application is an example of how Kekule.js molecule e ditor can be called inside a React component.

## Try it out!

<a href="https://kekule-react-component.netlify.app/">https://kekule-react-component.netlify.app/</a>

## Fixing webpack issue when making a production build

After clonning this repo you can run "npm install" to download an installl
all needed packages and then run the app with "npm start".
That will work, but when you create a production build you will find that you
only see a black screeen and, on the console, you will find a message that says
"Uncaught TypeError: e is not a function
at initialize (kekule.min.js:1)
at new i (kekule.min.js:1)..."
According to PatrigceJiang, the creator of Kekule.js:

the problem is caused by the js minification process in build. You have to manually set the some mangle configs for webpack. In the node_modules/react-scripts/config/webpack.config.js, please add a line of code in after line 234 (nowadays is actually line 270):

optimization: {
...
minimizer: [
...
new TerserPlugin({
...
mangle: {
safari10: true, // line 234
reserved: ['$super', '$origin'] // add this line of code
}
...
})
...
]
...
}

<a href="https://github.com/partridgejiang/Kekule.js/issues/36">https://github.com/partridgejiang/Kekule.js/issues/36</a>
<a href="https://github.com/partridgejiang/Kekule.js/issues/36#issuecomment-592866158">comment</a>

## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
