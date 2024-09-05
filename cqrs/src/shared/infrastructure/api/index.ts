import express from 'express';
import bodyParser from 'body-parser';
import { PostgressQueryService } from '../../../core/cqrs/query/service/postgres/PostgresQueryService.service';
import sequelizeConnection from '../persistence/sequelize/SequelizeOrmConfig';
import { PostgressCommandService } from '../../../core/cqrs/command/service/postgres/PostgresCommandService.service';
import { InferCreationAttributes } from 'sequelize';
import { Post } from '../persistence/sequelize/models/PostgresPostCommand.model';
import { MongoQueryService } from '../../../core/cqrs/query/service/mongo/MongoQueryService.service';
import { MongoCommandService } from '../../../core/cqrs/command/service/mongo/MongoCommandService.service';
import { MongoPost } from '../persistence/mongo/models/MongoPost.model';
import { mongoDBInstance } from '../persistence/mongo/MongoDatabase';

(async () => {
  const app = express();

  app.use(bodyParser.json());

  await sequelizeConnection.sync();

  app.get('/post/postgres/:id', async (req, res) => {
    const postQueryService = new PostgressQueryService();
    try {
      const resp = await postQueryService.getPostById(Number(req.params.id));
      res.json({
        message: 'Post obtenido con exito',
        data: resp,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error,
      });
    }
  });

  app.post('/post/postgres', async (req, res) => {
    const postCommandService = new PostgressCommandService();
    /* const toSavePost: InferCreationAttributes<Post, { omit: never }> = {
      id: 10003,
      content: 'Ultimo post',
      lastModifiedDate: new Date(),
    }; */
    try {
      const resp = await postCommandService.addPost(req.body);
      res.json({
        message: 'Post creado con exito',
        data: resp,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error,
      });
    }
  });

  // -------------------------------------Mongo-----------------------------

  await mongoDBInstance._connect();

  app.get('/post/mongo/:id', async (req, res) => {
    const postQueryService = new MongoQueryService();
    try {
      const resp = await postQueryService.getPostById(req.params.id);
      res.json({
        message: 'Post obtenido con exito',
        data: resp,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error,
      });
    }
  });

  app.post('/post/mongo', async (req, res) => {
    const postCommandService = new MongoCommandService();
    try {
      const resp = await postCommandService.addPost(req.body);
      res.json({
        message: 'Post creado con exito',
        data: resp,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error,
      });
    }
  });

  app.listen(3000, () => {
    console.log('Server listo');
  });
})();
