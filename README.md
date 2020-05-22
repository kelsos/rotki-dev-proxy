# Dev proxy

In order to pass the traffic through this dev proxy you need to change the [port](https://github.com/rotki/rotki/blob/adcadc54448f82fdca57d2b76c150723748e40b3/electron-app/src/App.vue#L136) in rotki from 4242 to 4243 temporarily.

Provide mock routes with responses in the `server.js` any mock implementations should precede the proxy creation.
All API calls that are not mocked will be proxied to the actual server.

To start the dev proxy you have to enter the directory, and run the following:

```shell
npm ci
npm run serve
```

Then you can proceed to start the rotki electron app using:

```shell
npm run electron:serve
```

For the statistics renderer to be served through the proxy you have to place dev proxy in the same directory as the component directory.
The proxy will serve the latest version of the components that was built automatically.
