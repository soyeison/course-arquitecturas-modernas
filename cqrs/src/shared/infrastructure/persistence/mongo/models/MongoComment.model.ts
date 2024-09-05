import { Schema, model, connect } from 'mongoose';
import { reactionSchema, MongoReaction } from './MongoReaction.model';

import { v4 as uuidv4 } from 'uuid';

export interface IMongoComment {
  _id: String;
  content: string;
  reactions: typeof MongoReaction;
  lastModifiedDate?: Date;
}

// 2. Create a Schema corresponding to the document interface.
export const commentSchema = new Schema<IMongoComment>({
  _id: { type: String, required: true, default: uuidv4() },
  content: { type: String, required: false },
  reactions: [reactionSchema],
  lastModifiedDate: { type: Date, required: false },
});

// 3. Create a Model.
const MongoComment = model<IMongoComment>('MongoComment', commentSchema);
export { MongoComment };
