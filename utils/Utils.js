import { sequelize } from "../Constants.js";

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

export default  checkConnection ;