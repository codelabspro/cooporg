# cooporg
nvm ls-remote

nvm use 0.12.7

npm install sails -g

sails new cooporg --linker

sails lift

Open localhost:1337

mongod --dbpath ~/mongodb/data/db &

Change default route in config/routes.js from 

view: 'homepage'

to 

view: 'static/index'
