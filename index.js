import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import { Sequelize } from 'sequelize';
import { sequelize } from "./Constants.js";


// import routes
import User from './routes/user/User.js';
import Property from './routes/property/Property.js';
import Auth from './routes/auth/Auth.js';

const app = express();
// const sequelize = new Sequelize('rental_hub', 'hezekiah', 'qwerty', {
//   host: '127.0.0.1',
//   dialect: 'mysql'
// });
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
app.use('/user', User);
app.use('/property', Property);
app.use('/auth', Auth);

app.get('/', (req, res) => {
  const connected = checkConnection();

  res.status(200).json({
    message: 'Hello World'
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server Running => Port: ${port}`);
});

// checking connection
async function checkConnection () {
  // try {
  //     await sequelize.authenticate();
  //     console.log('Connection has been established successfully.');
  //   } catch (error) {
  //     console.error('Unable to connect to the database:', error);
  //   }
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    return true;
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error.message);
    return false;
  });
}
