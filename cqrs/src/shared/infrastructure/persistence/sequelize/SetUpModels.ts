import { Sequelize } from 'sequelize';
import { Comment, commentSchema } from './models/PostgresCommentCommand.model';
import { Post, postSchema } from './models/PostgresPostCommand.model';
import {
  Reaction,
  reactionSchema,
} from './models/PostgresReactionCommand.model';

export class SetUpModels {
  static setUp(sequelize: Sequelize) {
    Comment.init(commentSchema, Comment.config(sequelize));
    Post.init(postSchema, Post.config(sequelize));
    Reaction.init(reactionSchema, Reaction.config(sequelize));

    // Associations
    Comment.associate(sequelize.models);
    Post.associate(sequelize.models);
    Reaction.associate(sequelize.models);
  }
}
