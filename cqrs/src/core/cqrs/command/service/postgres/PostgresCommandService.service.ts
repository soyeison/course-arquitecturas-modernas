import { InferCreationAttributes } from 'sequelize';
import { Comment } from '../../../../../shared/infrastructure/persistence/sequelize/models/PostgresCommentCommand.model';
import { Post } from '../../../../../shared/infrastructure/persistence/sequelize/models/PostgresPostCommand.model';
import { Reaction } from '../../../../../shared/infrastructure/persistence/sequelize/models/PostgresReactionCommand.model';

export class PostgressCommandService {
  async addPost(post: InferCreationAttributes<Post, { omit: never }>) {
    return await Post.create(post);
  }

  async addComment(postId: number, comment: Comment) {
    comment.postId = postId;
    return await Comment.create(comment);
  }

  async addReaction(commmentId: number, reaction: Reaction) {
    reaction.commentId = commmentId;
    return await Reaction.create(reaction);
  }
}
