import { Comment } from '../../../../../shared/infrastructure/persistence/sequelize/models/PostgresCommentCommand.model';
import { Post } from '../../../../../shared/infrastructure/persistence/sequelize/models/PostgresPostCommand.model';

export class PostgressQueryService {
  async getPost() {
    return await Post.findAll({
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
  }

  async getPostById(postId: number) {
    return await Post.findByPk(postId, {
      include: [
        {
          association: Post.associations.comments,
          include: [
            {
              association: Comment.associations.reactions,
              limit: 1,
            },
          ],
        },
      ],
    });
  }
}
