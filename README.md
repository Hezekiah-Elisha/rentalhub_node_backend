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

# Usage
To run the application locally, run the following command:
```bash
npm run start
```
To run the application in development mode, run the following command:
```bash
npm run dev
```

## License
This project is licensed under the Apache 2.0 license.

## Contributions
This project was created by:
@Hezekiah-Elisha

## Tests
To run tests, run the following command:
```bash
npm run test
```
For now there are no tests.

## Questions
If you have any questions about the repo, open an issue or contact me directly at [X](twitter.com/Hezekiah-Elisha). You can find more of my work at [Hezekiah-Elisha](https://github.com/Hezekiah-Elisha/)