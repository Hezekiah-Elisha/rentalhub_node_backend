# Rental Hub
## Description
This is a web application that allows users to rent out their items to other users. Users can also rent items from other users. This application is built using the Express framework and uses a MariaDB database. The application is deployed on Heroku and can be accessed [here](https://rental-hub.herokuapp.com/).

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Tests](#tests)

## Installation
To install the necessary dependencies, run the following command:
```bash
npm install
```
or
```bash
npm install --save sequelize
npm install --save mysql2
npm install --save express
npm install --save cors
npm install --save bcrypt
npm install --save-dev sequelize-cli
```

To create Migrations, run the following command:
```bash
npx sequelize-cli init
npx sequelize-cli db:migrate
```
Refer to the following link for more information on [Sequelize Migrations](https://sequelize.org/master/manual/migrations.html). and [Sequelize CLI](https://sequelize.org/master/manual/migrations.html). and [Medium Tutorial](https://medium.com/@jazimabbas/navigating-database-migrations-with-confidence-a-step-by-step-guide-using-sequelize-85bbdb7fc97a)