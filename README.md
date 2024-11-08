# A Fullstack React App with a Fake API (json-server@0.17.4)

This project provides a Single Page Application (SPA) created with Vite (React) and a fake API that runs simple HTTP requests with JSON server. [See the app in action with Render](https://worldwise-react.onrender.com).

## Initialization

The project contains various npm scripts. To run both the front-end and the back-end (json-server) on the same port, an npm package called `concurrently` is used. With the `npm start` script, you can start both of them. This script first calls the `server.cjs` file, which serves the built static React scripts and the json-server with a proxy, and then runs the json-server on port 3001. Since we're using a proxy, we can access the json-server on port 3000 with the URL `/api`.

If you are confused with proxies and `server.cjs` files, you can run the app in developer mode as well. The two choices are explained below:

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

The project uses some third-party libraries including [React Router](https://reactrouter.com/en/main) and [Leaflet](https://leafletjs.com/index.html) for interactive maps. It uses Context API and `useReducer` hooks to manage the states. To reduce the bundle size, it uses lazy loading with the React Suspense API.

## Features

- **React Router**: For client-side routing.
- **Leaflet**: For interactive maps.
- **Context API & useReducer**: For state management.
- **Lazy Loading**: To reduce bundle size using React Suspense API.

## License

This project's front-end style is designed by Jonas Schmedtmann who is a teacher in Udemy, yet the code design and the fake API is being done by myself thanks to him.

## Contact

For any inquiries, please contact [wtih my e-mail](hazarnamdarrr@gmail.com).
