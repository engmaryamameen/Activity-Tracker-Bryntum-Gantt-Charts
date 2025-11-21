# Gantt - Enterprise-Grade Bryntum Gantt Integration

> **A production-ready project management solution** integrating Bryntum Gantt with Next.js frontend, Express.js backend, and MongoDB persistence.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-green)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)
[![Bryntum Gantt](https://img.shields.io/badge/Bryntum%20Gantt-6.3.3-orange)](https://bryntum.com/products/gantt/)

## 🎯 Overview

This project provides a complete, enterprise-grade implementation of Bryntum Gantt chart library integrated with modern web technologies. It demonstrates best practices for:

- **Frontend**: Next.js 14 with App Router, TypeScript, and client-side rendering
- **Backend**: Express.js RESTful API with MongoDB persistence
- **Data Management**: Real-time synchronization using Bryntum's CrudManager
- **User Experience**: Professional Gantt chart with full feature set matching Bryntum's official demos

### Key Highlights

✅ **Full Feature Parity** with Bryntum Gantt professional demo  
✅ **Type-Safe** TypeScript implementation  
✅ **Production-Ready** error handling and validation  
✅ **Scalable** architecture supporting large datasets  
✅ **Real-Time Sync** with automatic conflict resolution  
✅ **Comprehensive** task management (CRUD, dependencies, resources)

![Main Gantt Chart View](screenshots/1.png)
*Full-featured Gantt chart with tasks, dependencies, and timeline visualization*  

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Next.js Frontend (Port 3000)                 │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │     Bryntum Gantt Component                  │   │   │
│  │  │  - Task Management                           │   │   │
│  │  │  - Dependency Visualization                  │   │   │
│  │  │  - Resource Assignment                       │   │   │
│  │  │  - Real-time Updates                         │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  │              ↕ CrudManager API                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│              Express.js Backend (Port 3001)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              REST API Endpoints                      │   │
│  │  - GET  /api/load  (Load all data)                  │   │
│  │  - POST /api/sync  (Sync changes)                    │   │
│  └──────────────────────────────────────────────────────┘   │
│              ↕ Mongoose ODM                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              MongoDB Database                         │   │
│  │  Collections: tasks, dependencies,                   │   │
│  │             resources, assignments                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Features

### Core Functionality

- **Task Management**
  - Create, read, update, delete tasks
  - Hierarchical task structure (parent/child relationships)
  - WBS (Work Breakdown Structure) support
  - Task duration and effort tracking
  - Progress percentage visualization
  - Milestone conversion

- **Dependencies**
  - Visual dependency lines between tasks
  - Predecessor/successor relationships
  - Dependency types (Finish-to-Start, etc.)
  - Lag time configuration
  - Automatic constraint calculation

- **Resource Management**
  - Resource assignment to tasks
  - Resource allocation units
  - Resource calendar support

- **Visual Features**
  - **Task Color Customization**: Right-click any task bar to change its color
  
  ![Task Color Customization](screenshots/8_can_edit_color_of_record_on_bar.png)
  *Customize task bar colors via context menu*
  
  - **Milestone Conversion**: Convert tasks to milestones via context menu
  
  ![Milestone Conversion](screenshots/9_can_convert_activity_to_milestone.png)
  *Convert tasks to milestones with a single click*
  
  - Progress bars with percentage completion
  - Timeline visualization with customizable view presets
  - Zoom controls (in, out, fit, previous/next)
  - Current time indicator

### User Interface

- **Toolbar**
  - Create new tasks
  - Undo/Redo operations
  - Expand/Collapse all tasks
  - Zoom controls
  - Task search/filter

- **Context Menu** (Right-click on tasks)
  - Edit task
  - Add task (above/below/subtask)
  - Convert to milestone
  - Delete task
  - Cut/Copy/Paste
  - Duplicate task
  - Split task
  - Indent/Outdent
  - Add dependencies
  - **Color picker** for task bars
  
  ![Context Menu](screenshots/3.png)
  *Rich context menu with all task management options*
  
  - Scroll to task
  - Expand to fit

- **Task Editor Dialog**
  - General tab (name, dates, duration, progress, effort)
  - Predecessors tab
  - Successors tab
  - Resources tab
  - Advanced tab (scheduling mode, constraints, calendar)
  - **Color field** for task customization
  
  ![Task Editor](screenshots/4.png)
  *Comprehensive task editor with multiple tabs and fields*

### Data Synchronization

- Automatic save on changes (autoSync)
- Optimistic UI updates
- Conflict resolution
- Transaction support (undo/redo)
- Dirty state tracking

## 📊 Data Model

Bryntum Gantt uses **4 core data models** that are part of the official Bryntum data structure:

### Core Models

1. **Task** - Represents project tasks/work items
   - Properties: name, dates, duration, progress, hierarchy (parent/child)
   - Purpose: The fundamental building blocks of your project plan

2. **Dependency** - Defines relationships between tasks
   - Properties: fromEvent, toEvent, type, lag
   - Purpose: Creates the project's critical path and task sequencing

3. **Resource** - Represents people, equipment, or materials
   - Properties: name, email, calendar, imageUrl
   - Purpose: Tracks who/what is available to work on tasks

4. **Assignment** - Links resources to tasks
   - Properties: eventId, resourceId, units (allocation %)
   - Purpose: Manages resource allocation and workload

These models are **official Bryntum data structures** and are required for the Gantt chart to function. They follow industry-standard project management practices.

📖 **For detailed information, see [Data Model Documentation](docs/DATA_MODEL.md)**

## 📦 Prerequisites

### Required Software

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v6.0+ ([Download](https://www.mongodb.com/try/download/community))
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
- **npm** or **yarn** package manager

### Bryntum Gantt Trial

This project uses the Bryntum Gantt trial version. The trial files should be located at:
```
bryntum-gantt-trial/gantt-6.3.3-trial/
```

For production use, you'll need a valid Bryntum license.

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd Activity-Tracker-Bryntum-Gantt-Charts
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/gantt_db
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gantt_db
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**Important**: Set up Bryntum Gantt packages. Since we're using the trial version:

```bash
# Create symlink to Bryntum build directory
mkdir -p node_modules/@bryntum
ln -s ../../../bryntum-gantt-trial/gantt-6.3.3-trial/build node_modules/@bryntum/gantt

# Copy theme assets
mkdir -p public/themes
cp -r ../../bryntum-gantt-trial/gantt-6.3.3-trial/build/gantt.stockholm*.css public/themes/
cp -r ../../bryntum-gantt-trial/gantt-6.3.3-trial/build/fonts public/themes/
```

### 4. Database Setup

Start MongoDB (if local):

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - Start MongoDB service from Services panel
```

Seed the database:

```bash
cd backend
npm run seed
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

![Application Running](screenshots/2.png)
*Application running with full Gantt chart functionality*

## 📁 Project Structure

```
Activity-Tracker-Bryntum-Gantt-Charts/
├── frontend/                    # Next.js application
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main page
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── Gantt.tsx            # Gantt wrapper component
│   │   └── GanttConfig.ts       # Gantt configuration
│   ├── public/                  # Static assets
│   │   └── themes/              # Bryntum theme files
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── backend/                     # Express.js server
│   ├── models/                  # Mongoose models
│   │   ├── Task.js              # Task schema
│   │   ├── Dependency.js        # Dependency schema
│   │   ├── Resource.js          # Resource schema
│   │   └── Assignment.js        # Assignment schema
│   ├── routes/                  # API routes
│   │   └── gantt.js             # Gantt CRUD endpoints
│   ├── scripts/                  # Utility scripts
│   │   └── seed.js              # Database seeding
│   ├── server.js                # Express server entry
│   ├── package.json
│   └── .env                     # Environment variables
│
└── README.md                    # This file
```

## ⚙️ Configuration

### Backend Configuration

**Environment Variables** (`backend/.env`):

```env
PORT=3001                                    # Server port
MONGODB_URI=mongodb://localhost:27017/gantt_db  # MongoDB connection
NODE_ENV=development                        # Environment mode
```

### Frontend Configuration

**Environment Variables** (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Gantt Configuration** (`frontend/components/GanttConfig.ts`):

Key configuration options:

```typescript
{
  project: {
    autoLoad: true,        // Auto-load data on init
    autoSync: true,        // Auto-save changes
    loadUrl: '/api/load',  // Load endpoint
    syncUrl: '/api/sync'   // Sync endpoint
  },
  showTaskColorPickers: true,  // Enable color pickers
}
```

### MongoDB Schema

**Task Model:**
- `id` (Number, unique, indexed) - Bryntum task ID
- `parentId` (Number) - Parent task reference
- `name` (String) - Task name
- `startDate`, `endDate` (Date) - Task dates
- `duration` (Number) - Task duration
- `percentDone` (Number) - Completion percentage
- `eventColor` (String) - Task bar color
- ... and more fields

**Dependency Model:**
- `id` (Number, unique)
- `fromEvent` (Number) - Source task ID
- `toEvent` (Number) - Target task ID
- `type` (Number) - Dependency type
- `lag` (Number) - Lag time

**Resource & Assignment Models:**
- Similar structure following Bryntum's data model

## 📡 API Documentation

### GET `/api/load`

Loads all Gantt data from MongoDB. Returns tasks, dependencies, resources, and assignments in Bryntum's expected format.

### POST `/api/sync`

Synchronizes changes from the Gantt chart to MongoDB. Accepts added, updated, and removed records for all data types (tasks, dependencies, resources, assignments). Returns success status and any newly created record IDs mapped from phantom IDs.

## 💻 Development Guide

### Adding New Features

1. **Frontend (Gantt Features)**
   - Edit `frontend/components/GanttConfig.ts`
   - Add feature configuration to `features` object
   - Update TypeScript types if needed

2. **Backend (API Endpoints)**
   - Edit `backend/routes/gantt.js`
   - Add new endpoints or modify existing ones
   - Update models in `backend/models/` if schema changes

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Auto-formatting (if configured)

### Testing

```bash
# Backend
cd backend
npm test  # (if tests are configured)

# Frontend
cd frontend
npm run lint
npm run build  # Test production build
```

### Debugging

**Backend:**
- Check console logs in terminal
- MongoDB queries: Use `mongosh` or MongoDB Compass
- API testing: Use Postman or curl

**Frontend:**
- Browser DevTools console
- React DevTools extension
- Network tab for API calls


### Environment Variables

Set production environment variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `MONGODB_URI` - Production MongoDB connection
- `NODE_ENV=production`

### Security Considerations

- ✅ CORS configured for specific origins
- ✅ Input validation on backend
- ✅ MongoDB injection prevention (Mongoose)
- ⚠️ Add authentication/authorization
- ⚠️ Add rate limiting
- ⚠️ Use HTTPS in production
- ⚠️ Secure MongoDB connection (SSL/TLS)

## 🐛 Troubleshooting

For detailed troubleshooting guides and solutions to common issues, please refer to:

📖 **[Common Issues and Troubleshooting Guide](docs/COMMON_ISSUES.md)**

This comprehensive guide covers:

- **Installation Issues** - Node.js, package installation, permissions
- **Bryntum Package Issues** - Module not found, theme loading, watermark
- **Database Connection Issues** - MongoDB local and Atlas connections
- **API and Network Issues** - CORS, 404/500 errors, network failures
- **Build and Compilation Issues** - TypeScript errors, Next.js build failures
- **Runtime Errors** - Gantt rendering, task menu, data saving
- **Performance Issues** - Slow loading, memory leaks, large datasets

### Quick Fixes

**Bryntum packages not found:**
```bash
cd frontend
rm -rf node_modules/@bryntum
mkdir -p node_modules/@bryntum
ln -s ../../../bryntum-gantt-trial/gantt-6.3.3-trial/build node_modules/@bryntum/gantt
```

**MongoDB connection errors:**
- Verify MongoDB is running: `mongosh` or `mongo`
- Check connection string in `backend/.env`
- For Atlas: Whitelist your IP address

**Data not loading:**
- Check browser console for errors
- Verify backend is running: `curl http://localhost:3001/api/load`
- Seed database: `cd backend && npm run seed`

For more detailed solutions, see the [Common Issues Guide](docs/COMMON_ISSUES.md).

## 🤝 Contributing

### Development Workflow

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Update documentation
5. Submit pull request

### Code Review Checklist

- [ ] Code follows project style guide
- [ ] TypeScript types are correct
- [ ] No console.logs in production code
- [ ] Error handling is implemented
- [ ] Documentation is updated
- [ ] Tests pass (if applicable)

## 📚 Additional Resources

### Bryntum Gantt

- [Official Documentation](https://bryntum.com/products/gantt/docs/)
- [API Reference](https://bryntum.com/products/gantt/docs/api/)
- [Examples](https://bryntum.com/products/gantt/examples/)
- [Support Forum](https://forum.bryntum.com/)

### Technologies

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)

## 📄 License

This project uses Bryntum Gantt trial version. For production use, you need a valid Bryntum license.

See [Bryntum Licensing](https://bryntum.com/products/gantt/license/) for details.

---

**Built with ❤️ using Bryntum Gantt, Next.js, Express.js, and MongoDB**
