import mongoose, { Schema, Model } from 'mongoose';
import type { IDependency } from '../types/models';

const dependencySchema = new Schema<IDependency>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  fromEvent: {
    type: Number,
    required: true
  },
  toEvent: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    default: 2
  },
  cls: {
    type: String,
    default: null
  },
  lag: {
    type: Number,
    default: 0
  },
  lagUnit: {
    type: String,
    default: 'day'
  },
  active: {
    type: Boolean,
    default: true
  },
  fromSide: {
    type: String,
    default: null
  },
  toSide: {
    type: String,
    default: null
  }
}, {
  timestamps: false,
  collection: 'dependencies'
});

dependencySchema.index({ id: 1 }, { unique: true });
dependencySchema.index({ fromEvent: 1 });
dependencySchema.index({ toEvent: 1 });

const Dependency: Model<IDependency> = mongoose.model<IDependency>('Dependency', dependencySchema);

export default Dependency;

