const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
 
 // Version 14
 module.exports = withModuleFederationPlugin({
 
  name: "mfeChat",
 
   exposes: {
    './Module': './projects/mfe-chat/src/app/chat/chat.module.ts',
   },
 
   shared: {
     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
   },
 
 });