import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from "./Constants.js";


// import routes
import User from './routes/user.route.js';
import Property from './routes/property.route.js';
import Auth from './routes/auth.route.js';
import Upload from './routes/uploads.route.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
app.use('/users', User);
app.use('/properties', Property);
app.use('/auth', Auth);
app.use('/uploads', Upload);

app.get('/', (req, res) => {
  const connected = checkConnection();

  res.status(200).json({
    message: 'Welcome to the Rental Hub API'
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server Running => Port: ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
      success: false,
      statusCode,
      message
  });
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
