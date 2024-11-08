# A Fullstack React App with a fake API (json-server@0.17.4)

This project provides an SPA created with Vite(React), a fake API that runs simple HTTP requests with JSON server. [See the app in action with Render](https://worldwise-react.onrender.com)

## Initialization

The project contains various amount of npm scripts; but to run both front-end and the back-end (json-server) in the same port number, an npm package called 'concurrently' is being used to start both of them. With the `npm start` script, you can do this. This script firstly calls the `server.cjs` file which serves the built static React scripts and the json-server with a proxy, and then runs the json-server on port 3001. Since we're using a proxy, we can access the json-server on our port 3000 with the url of `/api`.

If you are confused with proxies and server.cjs files, you can run the app in the developer mode as well, the two choises are explained down below :D

### Initialization With Build
```
npm i # install the npm dependencies
npm run react-build # you should build the React app in order to start the project, either you can do it or you can start the app without building
npm start # to run both React app and the json-server, use that command. This method is using so called a 'proxy'. Both json-server and vite is running on port 3000
```

### Initialization Without Build (Dev Mode)

```
npm i
npm run react-dev # this will open the React app on port 3000
npm run fakeapi # this will open the json-server on port 3001
```

## About

The project uses some 3rd party libraries included [React Router](https://reactrouter.com/en/main) and [Leaflet](https://leafletjs.com/index.html) interactive map library. Uses Context API and useReducer hooks to manage the states. Also to reduce the bundle size, uses lazy loadings with the React Suspense API.
