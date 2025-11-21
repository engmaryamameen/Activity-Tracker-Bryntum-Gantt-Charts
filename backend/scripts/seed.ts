import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from '../models/Task.js';
import Dependency from '../models/Dependency.js';
import Resource from '../models/Resource.js';
import Assignment from '../models/Assignment.js';

dotenv.config();

interface SampleTask {
  id: number;
  parentId?: number;
  name: string;
  startDate: Date;
  duration: number;
  durationUnit: string;
  percentDone: number;
  expanded?: boolean;
}

interface SampleDependency {
  id: number;
  fromEvent: number;
  toEvent: number;
  type: number;
}

interface SampleResource {
  id: number;
  name: string;
  email: string;
}

interface SampleAssignment {
  id: number;
  eventId: number;
  resourceId: number;
  units: number;
}

const sampleTasks: SampleTask[] = [
  {
    id: 1,
    name: 'Project Setup',
    startDate: new Date('2024-01-01'),
    duration: 5,
    durationUnit: 'day',
    percentDone: 100,
    expanded: true
  },
  {
    id: 2,
    parentId: 1,
    name: 'Initialize repository',
    startDate: new Date('2024-01-01'),
    duration: 1,
    durationUnit: 'day',
    percentDone: 100
  },
  {
    id: 3,
    parentId: 1,
    name: 'Setup development environment',
    startDate: new Date('2024-01-02'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 100
  },
  {
    id: 4,
    parentId: 1,
    name: 'Configure CI/CD',
    startDate: new Date('2024-01-04'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 50
  },
  {
    id: 5,
    name: 'Frontend Development',
    startDate: new Date('2024-01-08'),
    duration: 10,
    durationUnit: 'day',
    percentDone: 30,
    expanded: true
  },
  {
    id: 6,
    parentId: 5,
    name: 'Design UI components',
    startDate: new Date('2024-01-08'),
    duration: 3,
    durationUnit: 'day',
    percentDone: 100
  },
  {
    id: 7,
    parentId: 5,
    name: 'Implement Gantt chart',
    startDate: new Date('2024-01-11'),
    duration: 5,
    durationUnit: 'day',
    percentDone: 40
  },
  {
    id: 8,
    parentId: 5,
    name: 'Add task editing',
    startDate: new Date('2024-01-16'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 0
  },
  {
    id: 9,
    name: 'Backend Development',
    startDate: new Date('2024-01-08'),
    duration: 8,
    durationUnit: 'day',
    percentDone: 25,
    expanded: true
  },
  {
    id: 10,
    parentId: 9,
    name: 'Setup API endpoints',
    startDate: new Date('2024-01-08'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 100
  },
  {
    id: 11,
    parentId: 9,
    name: 'Implement CRUD operations',
    startDate: new Date('2024-01-10'),
    duration: 4,
    durationUnit: 'day',
    percentDone: 50
  },
  {
    id: 12,
    parentId: 9,
    name: 'Add data validation',
    startDate: new Date('2024-01-14'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 0
  },
  {
    id: 13,
    name: 'Testing',
    startDate: new Date('2024-01-18'),
    duration: 5,
    durationUnit: 'day',
    percentDone: 0,
    expanded: true
  },
  {
    id: 14,
    parentId: 13,
    name: 'Unit tests',
    startDate: new Date('2024-01-18'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 0
  },
  {
    id: 15,
    parentId: 13,
    name: 'Integration tests',
    startDate: new Date('2024-01-20'),
    duration: 2,
    durationUnit: 'day',
    percentDone: 0
  },
  {
    id: 16,
    parentId: 13,
    name: 'E2E tests',
    startDate: new Date('2024-01-22'),
    duration: 1,
    durationUnit: 'day',
    percentDone: 0
  }
];

const sampleDependencies: SampleDependency[] = [
  { id: 1, fromEvent: 2, toEvent: 3, type: 0 },
  { id: 2, fromEvent: 3, toEvent: 4, type: 0 },
  { id: 3, fromEvent: 1, toEvent: 5, type: 0 },
  { id: 4, fromEvent: 1, toEvent: 9, type: 0 },
  { id: 5, fromEvent: 6, toEvent: 7, type: 0 },
  { id: 6, fromEvent: 7, toEvent: 8, type: 0 },
  { id: 7, fromEvent: 10, toEvent: 11, type: 0 },
  { id: 8, fromEvent: 11, toEvent: 12, type: 0 },
  { id: 9, fromEvent: 5, toEvent: 13, type: 0 },
  { id: 10, fromEvent: 9, toEvent: 13, type: 0 },
  { id: 11, fromEvent: 14, toEvent: 15, type: 0 },
  { id: 12, fromEvent: 15, toEvent: 16, type: 0 }
];

const sampleResources: SampleResource[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

const sampleAssignments: SampleAssignment[] = [
  { id: 1, eventId: 2, resourceId: 1, units: 100 },
  { id: 2, eventId: 3, resourceId: 1, units: 100 },
  { id: 3, eventId: 7, resourceId: 2, units: 100 },
  { id: 4, eventId: 11, resourceId: 3, units: 100 }
];

async function seedDatabase(): Promise<void> {
  try {
    const mongoDB: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/gantt_db';
    await mongoose.connect(mongoDB);

    console.log('Connected to MongoDB');

    await Task.deleteMany({});
    await Dependency.deleteMany({});
    await Resource.deleteMany({});
    await Assignment.deleteMany({});

    await Task.insertMany(sampleTasks);
    await Dependency.insertMany(sampleDependencies);
    await Resource.insertMany(sampleResources);
    await Assignment.insertMany(sampleAssignments);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

