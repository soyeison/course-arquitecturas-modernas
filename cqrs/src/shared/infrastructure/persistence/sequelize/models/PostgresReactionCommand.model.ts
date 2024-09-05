import {
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
import { Comment } from './PostgresCommentCommand.model';

export const REACTION_TABLE = 'Reaction';

export const reactionSchema: ModelAttributes<
  Reaction,
  Optional<InferAttributes<Reaction, {}>, never>
> = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  emoji: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  commentId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'comment_id',
  },
  lastModifiedDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'last_modified_date',
  },
};

export class Reaction extends Model<
  InferAttributes<Reaction, {}>,
  InferCreationAttributes<Reaction>
> {
  declare id: number;
  declare emoji: string;
  declare commentId: ForeignKey<Comment['id']>;
  declare lastModifiedDate: Date;

  // Associations
  declare comment?: NonAttribute<Comment>;

  static associate(models: any) {
    //Asociacion
    this.belongsTo(models.Comment, { as: 'comment', foreignKey: 'commentId' });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: REACTION_TABLE,
      modelName: 'Reaction',
      timestamps: false,
    };
  }
}
