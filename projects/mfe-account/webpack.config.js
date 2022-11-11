const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
 
 // Version 14
 module.exports = withModuleFederationPlugin({
 
  name: 'mfeAccount',
 
   exposes: {
    './Module': './projects/mfe-account/src/app/account/account.module.ts',
   },
 
   shared: {
     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
   },
 
 });