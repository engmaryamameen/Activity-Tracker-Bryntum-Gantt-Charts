import type { Document } from 'mongoose';

export interface ITask extends Document {
  id: number;
  parentId?: number | null;
  name: string;
  startDate?: Date | null;
  endDate?: Date | null;
  effort?: number | null;
  effortUnit: string;
  duration?: number | null;
  durationUnit: string;
  percentDone: number;
  schedulingMode: string;
  note?: string | null;
  constraintType?: string | null;
  constraintDate?: Date | null;
  manuallyScheduled: boolean;
  ignoreResourceCalendar: boolean;
  effortDriven: boolean;
  inactive: boolean;
  cls?: string | null;
  iconCls?: string | null;
  color?: string | null;
  parentIndex: number;
  expanded: boolean;
  calendar?: number | null;
  deadline?: Date | null;
  eventColor?: string | null;
}

export interface IDependency extends Document {
  id: number;
  fromEvent: number;
  toEvent: number;
  type: number;
  cls?: string | null;
  lag: number;
  lagUnit: string;
  active: boolean;
  fromSide?: string | null;
  toSide?: string | null;
}

export interface IResource extends Document {
  id: number;
  name: string;
  email?: string | null;
  imageUrl?: string | null;
  calendar?: number | null;
  cls?: string | null;
  iconCls?: string | null;
  eventColor?: string | null;
}

export interface IAssignment extends Document {
  id: number;
  eventId: number;
  resourceId: number;
  units: number;
}

