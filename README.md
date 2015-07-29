# cooporg
- nvm ls-remote

- nvm use 0.12.7

- npm install sails -g

- sails new cooporg --linker

- sails lift

- Open localhost:1337

- mongod --dbpath ~/mongodb/data/db &

- Change default route in config/routes.js from

view: 'homepage'

to

view: 'static/index'

- layout.ejs is the wrapper of content that's not going to change page-to-page
- whereas the views are going to be the dynamic content which is going to change
- So, static/index is the dynamic view which is inserted in layout.ejs where it says  <%- body %> in layout.ejs
- sails wraps the layout.ejs file around the index.ejs file


- The linker designation when we created the project
- Under assets/linker/

As a convenience, all the javascript you put under js and all the styles you put under styles will be compiled
and minified via this layout.ejs file when sails lifts
This is a way we can use twitter bootstrap and drop our twitter bootstrap javascript and css files and
they are available on every page via layout.ejs

### To generate user model and controller
sails generate api user

Enable module.exports.csrf = true; in config/csrf.js

Turn on the following blueprints in config/blueprints.js : prefix, actions, shortcuts, rest
### Improve error handling

Change UserController.js to have better error handling


### Client-side validation with policies

Policies are middleware functions which run before controllers
Any of these policies can be applied to a given controller or one or more of its actions within the controller
