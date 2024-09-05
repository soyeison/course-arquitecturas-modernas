import { Schema, model, connect, Types } from 'mongoose';
import { commentSchema } from './MongoComment.model';

import { v4 as uuidv4 } from 'uuid';

export interface IMongoReaction {
  _id: String;
  emoji: string;
  lastModifiedDate?: Date;
}

// 2. Create a Schema corresponding to the document interface.
export const reactionSchema = new Schema<IMongoReaction>({
  _id: { type: String, required: true, default: uuidv4() },
  emoji: { type: String, required: false },
  lastModifiedDate: { type: Date, required: false },
});

// 3. Create a Model.
const MongoReaction = model<IMongoReaction>('MongoReaction', reactionSchema);
export { MongoReaction };
