import {
  Association,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  NonAttribute,
  Optional,
  Sequelize,
} from 'sequelize';
import { Post } from './PostgresPostCommand.model';
import { Reaction } from './PostgresReactionCommand.model';

export const COMMENT_TABLE = 'Comment';

export const commentSchema: ModelAttributes<
  Comment,
  Optional<InferAttributes<Comment, {}>, never>
> = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  content: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  postId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'post_id',
  },
  lastModifiedDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'last_modified_date',
  },
};

export class Comment extends Model<
  InferAttributes<Comment, {}>,
  InferCreationAttributes<Comment>
> {
  declare id: number;
  declare content: string;
  declare postId: ForeignKey<Post['id']>;
  declare lastModifiedDate: Date;

  // Associations
  declare post?: NonAttribute<Post>;
  declare reactions?: NonAttribute<Reaction[]>;

  declare static associations: {
    post: Association<Comment, Post>;
    reactions: Association<Comment, Reaction>;
  };

  static associate(models: any) {
    //Asociacion
    this.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    this.hasMany(models.Reaction, { foreignKey: 'commentId', as: 'reactions' });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false,
    };
  }
}
