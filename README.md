# Hi, Tech

## Description

Hi, Tech is a CMS-style blog site that allows users to add, edit, and interact with posts on everything tech.


## Installation

This application requires Node.js and MySQL installed on your machine in order to run.

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
