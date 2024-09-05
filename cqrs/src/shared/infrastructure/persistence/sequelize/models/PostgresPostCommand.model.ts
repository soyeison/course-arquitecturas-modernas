import {
  Association,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  NonAttribute,
  Optional,
  Sequelize,
} from 'sequelize';
import { Comment } from './PostgresCommentCommand.model';

export const POST_TABLE = 'Post';

export const postSchema: ModelAttributes<
  Post,
  Optional<InferAttributes<Post, {}>, never>
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
  lastModifiedDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'last_modified_date',
  },
};

export class Post extends Model<
  InferAttributes<Post, {}>,
  InferCreationAttributes<Post>
> {
  declare id: number;
  declare content: string;
  declare lastModifiedDate: Date;

  // Associations
  declare comments?: NonAttribute<Comment[]>;

  declare static associations: {
    comments: Association<Post, Comment>;
  };

  static associate(models: any) {
    //Asociacion
    this.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: 'Post',
      timestamps: false,
    };
  }
}
