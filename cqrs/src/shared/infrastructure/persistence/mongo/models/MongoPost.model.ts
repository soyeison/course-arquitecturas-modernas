import { Schema, model, connect, Types } from 'mongoose';
import { commentSchema } from './MongoComment.model';

import { v4 as uuidv4 } from 'uuid';

interface IMongoPost {
  _id: String;
  content: string;
  lastModifiedDate?: Date;
  comments: [];
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IMongoPost>(
  {
    _id: { type: String, required: true, default: uuidv4() },
    content: { type: String, required: false },
    lastModifiedDate: { type: Date, required: false },
    comments: [commentSchema],
  },
  { collection: 'post' }
);

// 3. Create a Model.
export const MongoPost = model<IMongoPost>('MongoPost', postSchema);
