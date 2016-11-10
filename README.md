# Voting/Poll App
## Written in JavaScript using MongoDB, Express.js, and React/Redux
### Author: Seanr707

*Copyright 2016, All rights reserved to author*

### About the project
Project originally written for an assignment on [FreeCodeCamp/Voting-App](https://www.freecodecamp.com/challenges/build-a-voting-app)

On the app a user may:

* Sign in with Twitter Oauth verification
* Vote on polls
* Create polls
* Comment on polls
* Share polls with friends
* Keep a record of shared polls

You may view the site on Heroku: https://voting-app-10a4.herokuapp.com/

App Structuring:

    dist: Files for production; * = generated in build process using Babel and Webpack
    -client
    --img: Resources for img elements
    --*css: .css files
    --*js: .js files
    --views: .ejs templates; main.ejs is almost exclusively used, others are WIP for session
    -*server: See info in "src"
    src: Source files written both client and server in ES6
    -client
    --actions: Redux actions
    --components: React components; all components exported in "index.js"
    --reducers: Redux state reducers
    --routes: React-router routing info; currently WIP for server-side rendering
    --styles: SCSS files; all components gathered in "index.scss"
    --main.js: Sets up our state, routing, and renders our root component to the DOM
    -server
    --*keys*: Personal API keys used for development
    --models: Models for mongoose to use with MongoDB
    --oauth: Uses Passport.js to authenticate users
    --routes: Routing info for the server; all "/page/" routes redirect to "/" for react-router to handle
    --index.js: Connects our DB, starts a session, applies routing, and begins listening

Please report any bugs, enhancements, or feature-requests here.

Current ToDo List:

* Upvote/downvote system for comments and/or polls
* More info recorded for users to see (comments made, polls vote on)
* Add other sites for Oauth
* Add ability to server-side render either separately (no JS) or with React/Redux (universal/isomorphic)
