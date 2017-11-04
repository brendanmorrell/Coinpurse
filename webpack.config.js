// need to tell it the entry point and the output (app.js in src, and the one big js file in public next to index.html)
// dirname gives the absolute path to the file
// path is a node module that helps take a bunch of data and concatenate it into actual cross-platform/os compatible file paths while also eliminating redundancies (like if you concatenated '../' whatever the previous path piece was would automatically be removed)
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');// this is a module that takes all the css out of thebundle.js file and puts it in a separate file. we define how this i sdone below
const dotenv = require('dotenv');
const webpack = require('webpack');

// preocess.env.NODE_ENV is a process variable that stores the environment you are currently in. Heroku automatically sets this to production. we want to set it to test when testing and undefined when we are developing. This script is in packages.json. Alos need the cross-env module to make the script for that run the same in different operating systems
process.env.NODE_ENV = process.env.NODE_ENV || 'development';// if the variable is undefined (not defined by our test script with cross-env module, nor automatically by heroku, it will be undefined, and we will set it to 'development')
if (process.env.NODE_ENV === 'test') { // want to set all the key value pairs we have set up for the different databases in the .env.test and .env.development files, and there is an npm module that does this for us called 'dotenv(it takes all the key value pairs from .env files and sets them here automatically)'
  dotenv.config({ path: '.env.test' }); // dotenv returns an object with a config method, and we need to pass in our config options to this method, including the special filenames like .env.test, since it usually just looks for .env without the test or development post extenstion
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });// after this we need to use a webpack function to manually pass down our node environment variables into bundle.js (they don't go to client side javascript automatically because it is a huge security risk if anyone could access these private variables that allow the manipulation of your project)
} // this manual passing-down of these NODE_ENV variables and config info to client side js is done below in the plugins (new webpack.DefinePlugin)


module.exports = (env) => { // we configured what value env is in package.json for the different builds
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css'); // this constructor function is going to create this styles file when the project builds

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({// this is where we define how the extraction (CSS out of the bundle into the file we defined above) will actually work
          use: [
            {
              loader: 'css-loader', // css and sass loader tell webpack to still process css, we will just be extracting it after
              options: {
                sourceMap: true, // configures the css loaders to use that inline-source-map devTool that shows where the css is locatied in line in the actual css files, as opposed to lik line 24897 in the bundle.js file
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      }],
    },
    plugins: [// just need to let webpack know it should use the CSSExtract plugin on the webpack build. now the plugin will run and use the code above to extract the css into it's own file
      CSSExtract, // now that the css will be extracted into its own file we just have to add a link to this file in the actual index.html file in the public folder
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', // configuring the production build to not include all this shit. source-map takes a lot longer to build, but is much cmaller (and in production you will only have to build once)
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // set this up so each time the server sends 404 back, it fallsback to index.html which is where the react-router will actually be rendering and serving up content
      publicPath: '/dist/',
    },
  };
};
