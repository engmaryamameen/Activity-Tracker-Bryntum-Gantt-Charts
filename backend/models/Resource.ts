import mongoose, { Schema, Model } from 'mongoose';
import type { IResource } from '../types/models';

const resourceSchema = new Schema<IResource>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  calendar: {
    type: Number,
    default: null
  },
  cls: {
    type: String,
    default: null
  },
  iconCls: {
    type: String,
    default: null
  },
  eventColor: {
    type: String,
    default: null
  }
}, {
  timestamps: false,
  collection: 'resources'
});

resourceSchema.index({ id: 1 }, { unique: true });

const Resource: Model<IResource> = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;

