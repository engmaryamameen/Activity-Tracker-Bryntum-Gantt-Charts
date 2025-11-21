import mongoose, { Schema, Model } from 'mongoose';
import type { IAssignment } from '../types/models';

const assignmentSchema = new Schema<IAssignment>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  eventId: {
    type: Number,
    required: true
  },
  resourceId: {
    type: Number,
    required: true
  },
  units: {
    type: Number,
    default: 100
  }
}, {
  timestamps: false,
  collection: 'assignments'
});

assignmentSchema.index({ id: 1 }, { unique: true });
assignmentSchema.index({ eventId: 1 });
assignmentSchema.index({ resourceId: 1 });

const Assignment: Model<IAssignment> = mongoose.model<IAssignment>('Assignment', assignmentSchema);

export default Assignment;

