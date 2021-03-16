# Hi, Tech

## Description

Hi, Tech is a CMS-style blog site that allows users to add, edit, and interact with posts on everything tech. This application implements a RESTful API in Express to serve HTTP requests, and uses Sequelize to create a MySQL backend database for users and user-generated content. Frontend HTML content is implemented using express-handlebars, and user sessions are implemented with the express-session and connect-session-sequelize packages.

![hi-tech-screenshot](https://user-images.githubusercontent.com/59624292/111282887-b67f1780-85fb-11eb-8bec-92fc3b24229e.png)


## Installation

Use the following steps to install the Hi, Tech server on your local machine. This application requires Node.js and MySQL installed on your machine in order to run.

1. Clone this repository to the desired machine.
2. Navigate to the root directory of this project in terminal.
3. Use ``` npm install ``` to install the dependencies of this project.
4. Create a file called ``` .env ```, then add the desired title of your database and your MySQL credentials to it.
5. Create the database:
    - either use ``` npm run database ``` to construct the database automatically,
    - or start mysql using ``` mysql -u root -p ``` and add the database manually with ``` source schema.sql ```.

An example .env file:
```
DB_NAME="hitech_db"
DB_USER="root"
DB_PW="YourPassword"
```


## Usage

This project is hosted online using Heroku, at:
https://morning-plateau-83327.herokuapp.com/

If you wish to run an installation of Hi, Tech from your local machine, navigate to its root directory and run ``` npm start ``` to start the server.