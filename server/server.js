const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;// heroku dynamic environment variable for setting the port. it sets it as PORT, so if this variable exists, we want to use it since it means we are on heroku and need to reference the port they chose

// sets up our page so a refresh on non-index.html pages doesn't break it (there is only the one html file path actually). this sets it up so when there is no directory, it falls back on index.html, which is what we want since all out shit is there
app.get('*', (req, res) => { // ^runs every time a get request is made to the server. arg1=path. the * means all unmatched routes, so everything that isn't in the public folder, arg2= function to run when this is accessed
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


// heroku stuff
// heroku --version (gives you your version)
// heroku login (enter username and password to login)
// heroku create coinpurse (create an app with the name 'coinpurse')

// from here, heroku creates the link to the app on heroku as well as a github link for the heroku files (so now, if you run 'git remote' you'll have heroku and origin, as opposed to just origin). when you push to your heroku git, heroku is able to grab the files from there to generate your app

// when heroku starts up the app, it tries to run the start script in package.json, so we need to make one, and tell it to run server.js with node
// next, we need to set up the port. 3000 works on the local machine, but heroku actually provides a dynamic value for this port. Heroku provides an environment variable that will change each time you deploy, and thus, you need to read off that variable
// lastly, need to teach heroku how to run webpack. We don't want the compiled version pushing to heroku, we want heroku to assemble everything using webpack.
// To do this (webpack) we will use one of two scripts that heroku will always look for when starting up your app: heroku-postbuild, and heroku-prebuild(don't need. not as useful)

// HEROKU_POSTBUILD
// this runs after heroku installs all of your dependencies
// we want it to run webpack and build up the map/bundle files after all the dependencies are in place
// just need it ro run "yarn run build:prod"
// then we add all 4 of the files "yarn run build:prod" will create to gitignore, so they aren't pushed up with the git pushes for origin or heroku since they will be created on the flow post build
// public/bundle.js
// public/bundle.js.map
// public/styles.css
// public/styles.css.map
