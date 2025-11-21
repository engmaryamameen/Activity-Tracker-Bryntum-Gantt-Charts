import * as express from 'express';
import Task from '../models/Task.js';
import Dependency from '../models/Dependency.js';
import Resource from '../models/Resource.js';
import Assignment from '../models/Assignment.js';
import type { SyncRequest, SyncResponse, LoadResponse, TableChanges, PhantomIdMapping, MongooseModel, ITask, IDependency, IResource, IAssignment } from '../types/index.js';

const router = express.Router();

router.get('/load', async (_req, res) => {
  try {
    const [tasks, dependencies, resources, assignments] = await Promise.all([
      Task.find().select('-__v').lean(),
      Dependency.find().select('-__v').lean(),
      Resource.find().select('-__v').lean(),
      Assignment.find().select('-__v').lean()
    ]);

    const cleanData = <T extends { _id?: any; __v?: any }>(items: T[]): Omit<T, '_id' | '__v'>[] => 
      items.map(({ _id, __v, ...item }) => item as Omit<T, '_id' | '__v'>);

    res.json({
      success: true,
      tasks: { rows: cleanData(tasks) },
      dependencies: { rows: cleanData(dependencies) },
      resources: { rows: cleanData(resources) },
      assignments: { rows: cleanData(assignments) }
    });
  } catch (error) {
    console.error('Load error:', error);
    res.status(500).json({
      success: false,
      tasks: { rows: [] },
      dependencies: { rows: [] },
      resources: { rows: [] },
      assignments: { rows: [] },
      message: 'Failed to load data'
    });
  }
});

router.post('/sync', async (req, res) => {
  const { requestId, tasks, dependencies, resources, assignments } = req.body;

  try {
    const response: SyncResponse = { requestId, success: true };

    if (tasks) {
      const rows = await applyTableChanges<ITask>('tasks', tasks, Task);
      if (rows) {
        response.tasks = { rows };
      }
    }

    if (dependencies) {
      const rows = await applyTableChanges<IDependency>('dependencies', dependencies, Dependency);
      if (rows) {
        response.dependencies = { rows };
      }
    }

    if (resources) {
      const rows = await applyTableChanges<IResource>('resources', resources, Resource);
      if (rows) {
        response.resources = { rows };
      }
    }

    if (assignments) {
      const rows = await applyTableChanges<IAssignment>('assignments', assignments, Assignment);
      if (rows) {
        response.assignments = { rows };
      }
    }

    res.json(response);
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      requestId,
      success: false,
      message: 'Failed to sync data'
    });
  }
});

async function applyTableChanges<T extends Record<string, any> = any>(
  table: string,
  changes: TableChanges<T>,
  Model: MongooseModel<T>
): Promise<PhantomIdMapping[] | null> {
  let rows: PhantomIdMapping[] | null = null;

  if (changes.added) {
    rows = await createOperation<T>(changes.added, Model);
  }

  if (changes.updated) {
    await updateOperation<T & { id: number }>(
      changes.updated as (T & { id: number })[], 
      Model as unknown as MongooseModel<T & { id: number }>
    );
  }

  if (changes.removed) {
    await deleteOperation<T & { id: number }>(
      changes.removed as (T & { id: number })[], 
      Model as unknown as MongooseModel<T & { id: number }>
    );
  }

  return rows;
}

function convertDates(data: Record<string, any>): Record<string, any> {
  const dateFields = ['startDate', 'endDate', 'constraintDate', 'deadline'];
  const converted = { ...data };
  
  dateFields.forEach(field => {
    if (converted[field] && converted[field] !== null) {
      converted[field] = new Date(converted[field]);
    }
  });
  
  return converted;
}

async function createOperation<T extends Record<string, any> = any>(
  added: (T & { $PhantomId?: string; _id?: any })[],
  Model: MongooseModel<T>
): Promise<PhantomIdMapping[]> {
  const results = await Promise.all(
    added.map(async (record) => {
      const { $PhantomId, _id, ...data } = record;

      let maxId = 0;
      const existing = await Model.find().sort({ id: -1 }).limit(1).lean();
      if (existing.length > 0) {
        const existingRecord = existing[0] as T & { id?: number };
        maxId = existingRecord.id || 0;
      }

      const newId = maxId + 1;
      const dataWithId = { ...data, id: newId };

      const convertedData = convertDates(dataWithId);
      const result = await Model.create(convertedData);
      const { _id: mongoId, __v, ...cleanResult } = result.toObject();
      const resultId = (cleanResult as any).id;
      return { $PhantomId, id: resultId };
    })
  );

  return results;
}

async function updateOperation<T extends { id: number } = any>(
  updated: (T & { _id?: any })[],
  Model: MongooseModel<T>
): Promise<void> {
  await Promise.all(
    updated.map(async (record) => {
      const { id, _id, ...data } = record;
      const convertedData = convertDates(data);
      await Model.updateOne({ id }, { $set: convertedData });
    })
  );
}

async function deleteOperation<T extends { id: number } = any>(
  removed: T[],
  Model: MongooseModel<T>
): Promise<void> {
  const ids = removed.map((record) => record.id);
  await Model.deleteMany({ id: { $in: ids } });
}

export default router;
