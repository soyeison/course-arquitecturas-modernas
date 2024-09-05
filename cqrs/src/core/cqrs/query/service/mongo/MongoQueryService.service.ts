import { MongoPost } from '../../../../../shared/infrastructure/persistence/mongo/models/MongoPost.model';

export class MongoQueryService {
  async getPostById(postId: string) {
    return await MongoPost.findById(postId);
  }
}
