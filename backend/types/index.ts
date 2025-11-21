import { Model } from 'mongoose';
import type { ITask, IDependency, IResource, IAssignment } from './models';

export type { ITask, IDependency, IResource, IAssignment };

export interface SyncRequest {
  requestId: string;
  tasks?: TableChanges<ITask>;
  dependencies?: TableChanges<IDependency>;
  resources?: TableChanges<IResource>;
  assignments?: TableChanges<IAssignment>;
}

export interface TableChanges<T = any> {
  added?: T[];
  updated?: T[];
  removed?: T[];
}

export interface SyncResponse {
  requestId: string;
  success: boolean;
  tasks?: { rows: PhantomIdMapping[] };
  dependencies?: { rows: PhantomIdMapping[] };
  resources?: { rows: PhantomIdMapping[] };
  assignments?: { rows: PhantomIdMapping[] };
  message?: string;
}

export interface LoadResponse {
  success: boolean;
  tasks: { rows: ITask[] };
  dependencies: { rows: IDependency[] };
  resources: { rows: IResource[] };
  assignments: { rows: IAssignment[] };
  message?: string;
}

export interface PhantomIdMapping {
  $PhantomId?: string;
  id: number;
}

export type MongooseModel<T = any> = Model<T>;

