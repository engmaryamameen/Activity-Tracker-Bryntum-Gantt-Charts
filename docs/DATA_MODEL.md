# Bryntum Gantt Data Model

This document explains the four core data models used in Bryntum Gantt and their purpose.

## Overview

Yes, these 4 models (**Task**, **Dependency**, **Resource**, and **Assignment**) are the **official core data models** defined by Bryntum Gantt. They are part of Bryntum's standard data structure and are required for the Gantt chart to function properly.

## The Four Core Models

### 1. **Task Model** (`ITask`)

**Purpose:** Represents individual tasks or activities in your project.

**Key Properties:**
- `id` - Unique identifier
- `name` - Task name/description
- `startDate`, `endDate` - Task timeline
- `duration` - How long the task takes
- `percentDone` - Completion percentage (0-100)
- `parentId` - For hierarchical tasks (parent/child relationships)
- `eventColor` - Visual color of the task bar
- `schedulingMode` - How the task is scheduled (Normal, FixedDuration, etc.)
- `constraintType`, `constraintDate` - Scheduling constraints
- `deadline` - Task deadline
- `effort`, `effortUnit` - Work effort required
- `manuallyScheduled` - Whether task dates are manually set
- `expanded` - Whether parent task is expanded in the tree

**Why it exists:** Tasks are the fundamental building blocks of any project plan. They represent the work items that need to be completed.

**Example:**
```typescript
{
  id: 1,
  name: "Design UI",
  startDate: "2024-01-01",
  duration: 5,
  percentDone: 50,
  parentId: null
}
```

---

### 2. **Dependency Model** (`IDependency`)

**Purpose:** Defines relationships between tasks (predecessor/successor links).

**Key Properties:**
- `id` - Unique identifier
- `fromEvent` - Source task ID (predecessor)
- `toEvent` - Target task ID (successor)
- `type` - Dependency type (0 = Finish-to-Start, 1 = Start-to-Start, etc.)
- `lag` - Lag time between tasks
- `lagUnit` - Unit for lag (day, hour, etc.)
- `active` - Whether the dependency is active

**Why it exists:** Dependencies create the project's critical path and ensure tasks are scheduled in the correct order. For example, "Testing" cannot start until "Development" is finished.

**Example:**
```typescript
{
  id: 1,
  fromEvent: 1,  // Task 1 must finish
  toEvent: 2,    // Before Task 2 can start
  type: 0        // Finish-to-Start dependency
}
```

**Visual Representation:** Dependencies appear as arrows connecting task bars in the Gantt chart timeline.

---

### 3. **Resource Model** (`IResource`)

**Purpose:** Represents people, equipment, or other resources that work on tasks.

**Key Properties:**
- `id` - Unique identifier
- `name` - Resource name (e.g., "John Doe", "Server Cluster")
- `email` - Contact information
- `imageUrl` - Avatar/profile picture
- `calendar` - Working calendar ID
- `eventColor` - Color for resource visualization
- `cls`, `iconCls` - CSS classes for styling

**Why it exists:** Resources allow you to:
- Assign people/equipment to tasks
- Track resource allocation and workload
- Manage resource calendars (working hours, holidays)
- Visualize who is working on what

**Example:**
```typescript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  calendar: 1
}
```

---

### 4. **Assignment Model** (`IAssignment`)

**Purpose:** Links resources to tasks (many-to-many relationship).

**Key Properties:**
- `id` - Unique identifier
- `eventId` - Task ID (which task)
- `resourceId` - Resource ID (which resource)
- `units` - Allocation percentage (0-100, where 100 = full-time)

**Why it exists:** 
- A task can have multiple resources assigned
- A resource can work on multiple tasks
- Assignments track who is working on what and how much time they're allocated

**Example:**
```typescript
{
  id: 1,
  eventId: 5,      // Task 5
  resourceId: 2,    // Resource 2 (Jane Smith)
  units: 100        // 100% allocation (full-time)
}
```

**Real-world scenario:**
- Task "Develop API" might have 2 developers assigned (each at 100% = 200% total)
- Task "Code Review" might have 1 developer at 50% allocation

---

## How They Work Together

```
┌─────────┐
│  Task   │  ← Represents work items
└────┬────┘
     │
     ├───┐
     │   │
┌────▼───▼────┐
│ Dependency  │  ← Links tasks together (Task A → Task B)
└─────────────┘

┌──────────┐
│ Resource │  ← People/equipment
└────┬─────┘
     │
     │
┌────▼──────────┐
│  Assignment   │  ← Connects Resources to Tasks
└───────────────┘
```

## Data Flow

1. **Load Data:** Backend sends all 4 data types to frontend
   ```json
   {
     "tasks": { "rows": [...] },
     "dependencies": { "rows": [...] },
     "resources": { "rows": [...] },
     "assignments": { "rows": [...] }
   }
   ```

2. **Bryntum Processes:**
   - Tasks → Creates task bars on timeline
   - Dependencies → Draws arrows between tasks
   - Resources → Available for assignment
   - Assignments → Links resources to tasks

3. **User Interactions:**
   - Create/edit tasks → Updates `tasks` table
   - Add dependencies → Updates `dependencies` table
   - Assign resources → Updates `assignments` table

4. **Sync Back:** Changes sent back to backend via `/api/sync`

## Why These Specific Models?

These models are **not arbitrary** - they follow Bryntum's official data structure which is:

1. **Industry Standard:** Based on project management best practices (similar to MS Project, Primavera)
2. **Optimized:** Designed for efficient rendering and manipulation
3. **Extensible:** Can add custom fields while maintaining compatibility
4. **Well-Documented:** Used across all Bryntum examples and integrations

## Custom Fields

You can extend these models with additional fields:

```typescript
// In types/models.ts
export interface ITask extends Document {
  // ... standard fields ...
  
  // Custom fields
  priority?: string;
  status?: string;
  customField?: any;
}
```

The backend will automatically save/load these custom fields as long as they're in the schema.

## References

- [Bryntum Gantt Data Guide](https://bryntum.com/products/gantt/docs/guide/Gantt/data/crud_manager_project)
- [TaskModel API](https://bryntum.com/products/gantt/docs/api/Gantt/model/TaskModel)
- [DependencyModel API](https://bryntum.com/products/gantt/docs/api/Gantt/model/DependencyModel)
- [ResourceModel API](https://bryntum.com/products/gantt/docs/api/Gantt/model/ResourceModel)
- [AssignmentModel API](https://bryntum.com/products/gantt/docs/api/Gantt/model/AssignmentModel)

