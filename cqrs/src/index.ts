import { CreateOptions, InferCreationAttributes, Optional } from 'sequelize';
import { Comment } from './shared/infrastructure/persistence/sequelize/models/PostgresCommentCommand.model';
import { Reaction } from './shared/infrastructure/persistence/sequelize/models/PostgresReactionCommand.model';
import { UUIDGenerator } from './shared/domain/Uuid';
import sequelizeConnection from './shared/infrastructure/persistence/sequelize/SequelizeOrmConfig';
import { MongoPost } from './shared/infrastructure/persistence/mongo/models/MongoPost.model';
import { mongoDBInstance } from './shared/infrastructure/persistence/mongo/MongoDatabase';

(async () => {
  // await sequelizeConnection.sync({ force: true });
  // Agregar un post
  /* const now = Date.now();
  const toSavePost: InferCreationAttributes<Post, { omit: never }> = {
    id: 10000,
    content: 'Primer post',
    lastModifiedDate: new Date(),
  };
  const newPost = await Post.create(toSavePost);

  // Agregar un comentario
  const toSaveComment: InferCreationAttributes<Comment, { omit: never }> = {
    id: 1000000,
    content: 'Primer comentario',
    postId: newPost.dataValues.id,
    lastModifiedDate: new Date(),
  };
  const newComment = await Comment.create(toSaveComment);

  // Agregar una reaccion al comentario
  const toSaveReaction: InferCreationAttributes<Reaction, { omit: never }> = {
    id: 2000000,
    emoji: 'carita feliz',
    commentId: newComment.id,
    lastModifiedDate: new Date(),
  };
  await Reaction.create(toSaveReaction);
  const secondNow = Date.now();
  const diff = (secondNow - now) / (1000 * 60);
  console.log('Dif: ', diff);

  // Consultar el post incluyendo sus comentarios y reacciones
  const thirdNow = Date.now();
  const postQuery = await Post.findAll({
    include: [
      {
        association: Post.associations.comments,
        include: [
          {
            association: Comment.associations.reactions,
          },
        ],
      },
    ],
  });
  console.log('Veo asociaciones de post: ', JSON.stringify(postQuery, null, 4));
  const fourthNow = Date.now();
  const diff2 = (fourthNow - thirdNow) / (1000 * 60);
  console.log('Diff: ', diff2); */
  // Connect Database
  await mongoDBInstance._connect();
  console.log('melo');
  // Using mongoDB
  console.log('Consulto uno');
  const postFounded = await MongoPost.findById(
    '1602ed88-be36-4206-b791-2fd35c8bfa27'
  );
  console.log(postFounded);
})();
