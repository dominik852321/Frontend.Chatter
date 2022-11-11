const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
 
 // Version 14
 module.exports = withModuleFederationPlugin({
 
  name: "mfeProfile",
 
   exposes: {
    './Module': './projects/mfe-profile/src/app/profile/profile.module.ts',
   },
 
   shared: {
     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
   },
 
 });

