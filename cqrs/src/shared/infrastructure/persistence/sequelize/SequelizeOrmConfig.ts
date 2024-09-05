import { Sequelize } from 'sequelize';
import { SetUpModels } from './SetUpModels';

const sequelizeConnection = new Sequelize(
  'citizix_db',
  'citizix_user',
  'S3cret',
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: console.log,
  }
);

SetUpModels.setUp(sequelizeConnection);

export default sequelizeConnection;
