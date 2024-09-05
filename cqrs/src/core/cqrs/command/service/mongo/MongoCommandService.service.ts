import { MongoPost } from '../../../../../shared/infrastructure/persistence/mongo/models/MongoPost.model';

export class MongoCommandService {
  async addPost(post: any) {
    return await MongoPost.create(post);
  }
}
