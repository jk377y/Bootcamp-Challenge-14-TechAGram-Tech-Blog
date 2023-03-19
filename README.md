# ***techAgram***
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br>

## **Description**
Your challenge this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.
<br>

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Questions](#questions)
- [Contributing](#contributing)
- [License](#license)
<br>

## Installation
You must have node.js installed on your system.<br>
You must install all of the npm packages listed below.<br>
The packages must also be imported into the project.<br>
&emsp;***Dependencies:***
    <br>&emsp;1) BCRYPT
    <br>&emsp;2) CONNECT-SESSION-SEQUELIZE
    <br>&emsp;3) DOTENV
    <br>&emsp;4) EXPRESS
    <br>&emsp;5) EXPRESS-HANDLEBARS
    <br>&emsp;6) EXPRESS-SESSION
    <br>&emsp;7) MYSQL2
    <br>&emsp;8) PATH
    <br>&emsp;9) SEQUELIZE<br>
&emsp;***Dev Dependencies:***
    <br>&emsp;10) JEST
    <br>&emsp;11) NODEMON
<br>

## Usage
Try me out @ https://techagram.herokuapp.com/
<br>
Repository @ https://github.com/jk377y/techAgram
<br>

1) Get started at the live link above. From the homepage you can see any posts which have been previously made.  To add a new post you will be redirected to login.<br>
<img src="./public/images/homepage.JPG" alt="homepage screenshot" width=300px><br>

2) Create an account and/or login.<br>
<img src="./public/images/signup.JPG" alt="signup page screenshot" width=300px height=250px>
<img src="./public/images/login.JPG" alt="login page screenshot" width=300px height=250px><br>

3) Once logged in you can create a new post from the dashboard or the hompage.<br>
<img src="./public/images/dashboard.JPG" alt="dashboard screenshot" width=300px><br>

4) Once you have created a post you can view it on the homepage or the dashboard. From the dashboard you can edit you posts, comments and delete them also.<br>

## Testing
Testing is done using Jest. I have designed tests to run on the helper functions that are being used. The format_plural() formats the plural form of comment(s) as needed when displaying how many comments have been added to a post (see image above of dashboard). The format_date() formats the date object into a string in the format of mm/dd/yyyy. To run the tests, mimic the following command in the console:
<img src="./public/images/helperTests.JPG" alt="dashboard screenshot" width=600px><br>

## Technologies Used
- Bcrypt @ https://www.npmjs.com/package/bcrypt
- Connect-Session-Sequelize @ https://www.npmjs.com/package/connect-session-sequelize
- Dotenv @ https://www.npmjs.com/package/dotenv
- Express.js @ https://www.npmjs.com/package/express
- Express-Handlebars @ https://www.npmjs.com/package/express-handlebars
- Express-Session @ https://www.npmjs.com/package/express-session
- Handlebars.js @ https://handlebarsjs.com/
- Heroku @ https://www.heroku.com/ (for deployment)
- Jest @ https://www.npmjs.com/package/jest
- Mysql2 @ https://www.npmjs.com/package/mysql2
- Node.js @ https://nodejs.org/en/ (for runtime environment)
- Nodemon @ https://www.npmjs.com/package/nodemon
- Path @ https://www.npmjs.com/package/path
- Sequelize @ https://www.npmjs.com/package/sequelize
<br>

## Questions
For Questions, I can be reached at the following:
<br>GitHub:  <a href ="https://github.com/jk377y" target="_blank">@ JK377y</a>
<br>OR
<br>Email:  jk377y@gmail.com
<br>

## Contributing
You also can help support me by donating with 💵Cash App💵 @ 💵$JK377Y💵
<br>

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br>Copyright (c) 2023 James Kelly
<br>Information on this license can be found at: (https://opensource.org/licenses/MIT)