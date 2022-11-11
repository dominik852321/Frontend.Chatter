const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
 
 // Version 14
 module.exports = withModuleFederationPlugin({

   remotes: {
    "mfeChat": "http://localhost:4201/remoteEntry.js",
    "mfeProfile": "http://localhost:4202/remoteEntry.js",
    "mfeAccount": "http://localhost:4203/remoteEntry.js"
  },
 
   shared: {
     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
   },
 
 });

