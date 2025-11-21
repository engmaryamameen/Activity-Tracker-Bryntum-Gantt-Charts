import mongoose, { Schema, Model } from 'mongoose';
import type { ITask } from '../types/models';

const taskSchema = new Schema<ITask>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  parentId: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  effort: {
    type: Number,
    default: null
  },
  effortUnit: {
    type: String,
    default: 'hour'
  },
  duration: {
    type: Number,
    default: null
  },
  durationUnit: {
    type: String,
    default: 'day'
  },
  percentDone: {
    type: Number,
    default: 0
  },
  schedulingMode: {
    type: String,
    default: 'Normal'
  },
  note: {
    type: String,
    default: null
  },
  constraintType: {
    type: String,
    default: null
  },
  constraintDate: {
    type: Date,
    default: null
  },
  manuallyScheduled: {
    type: Boolean,
    default: false
  },
  ignoreResourceCalendar: {
    type: Boolean,
    default: false
  },
  effortDriven: {
    type: Boolean,
    default: false
  },
  inactive: {
    type: Boolean,
    default: false
  },
  cls: {
    type: String,
    default: null
  },
  iconCls: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  parentIndex: {
    type: Number,
    default: 0
  },
  expanded: {
    type: Boolean,
    default: false
  },
  calendar: {
    type: Number,
    default: null
  },
  deadline: {
    type: Date,
    default: null
  },
  eventColor: {
    type: String,
    default: null
  }
}, {
  timestamps: false,
  collection: 'tasks'
});

taskSchema.index({ id: 1 }, { unique: true });
taskSchema.index({ parentId: 1 });
taskSchema.index({ calendar: 1 });

const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default Task;

