# Common Issues and Troubleshooting Guide

This document provides solutions to common issues you may encounter when setting up or running the Gantt application.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Bryntum Package Issues](#bryntum-package-issues)
- [Database Connection Issues](#database-connection-issues)
- [API and Network Issues](#api-and-network-issues)
- [Build and Compilation Issues](#build-and-compilation-issues)
- [Runtime Errors](#runtime-errors)
- [Performance Issues](#performance-issues)

## Installation Issues

### Node.js Version Compatibility

**Problem:** Errors during `npm install` or runtime errors related to Node.js version.

**Solution:**
```bash
# Check your Node.js version
node --version

# Should be v18 or higher. If not, update Node.js:
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download from https://nodejs.org/
```

### Package Installation Fails

**Problem:** `npm install` fails with errors.

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If using yarn
yarn install
```

### Permission Errors (Linux/macOS)

**Problem:** Permission denied errors during installation.

**Solution:**
```bash
# Fix npm permissions (avoid using sudo with npm)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or use nvm to avoid permission issues
```

## Bryntum Package Issues

### Module Not Found: @bryntum/gantt

**Problem:** `Cannot find module '@bryntum/gantt'` or similar errors.

**Solutions:**

1. **Verify symlink exists:**
   ```bash
   cd frontend
   ls -la node_modules/@bryntum/
   # Should show: gantt -> ../../../bryntum-gantt-trial/gantt-6.3.3-trial/build
   ```

2. **Recreate symlink:**
   ```bash
   cd frontend
   rm -rf node_modules/@bryntum
   mkdir -p node_modules/@bryntum
   ln -s ../../../bryntum-gantt-trial/gantt-6.3.3-trial/build node_modules/@bryntum/gantt
   ```

3. **Verify Bryntum trial folder location:**
   ```bash
   # Should exist at:
   ls -la bryntum-gantt-trial/gantt-6.3.3-trial/build/gantt.module.js
   ```

### Theme Files Not Loading

**Problem:** Gantt chart appears unstyled or CSS errors in console.

**Solution:**
```bash
cd frontend
mkdir -p public/themes

# Copy theme files
cp -r ../../bryntum-gantt-trial/gantt-6.3.3-trial/build/gantt.stockholm*.css public/themes/
cp -r ../../bryntum-gantt-trial/gantt-6.3.3-trial/build/fonts public/themes/

# Verify files exist
ls public/themes/
```

### Bryntum Trial Watermark

**Problem:** Watermark appears on Gantt chart.

**Solution:** This is expected behavior for the trial version. To remove it, you need a valid Bryntum license. See [Bryntum Licensing](https://bryntum.com/products/gantt/license/).

## Database Connection Issues

### MongoDB Connection Failed

**Problem:** `MongoDB connection error` in backend console.

**Solutions:**

1. **Verify MongoDB is running:**
   ```bash
   # Check MongoDB status
   mongosh
   # Or
   mongo
   
   # If connection fails, start MongoDB:
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # Start MongoDB service from Services panel
   ```

2. **Check connection string in `.env`:**
   ```env
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/gantt_db
   
   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gantt_db
   ```

3. **Test connection:**
   ```bash
   # Using mongosh
   mongosh "mongodb://localhost:27017/gantt_db"
   ```

### MongoDB Atlas Connection Issues

**Problem:** Cannot connect to MongoDB Atlas.

**Solutions:**

1. **Whitelist your IP address:**
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` for development (not recommended for production)

2. **Verify credentials:**
   - Check username and password in connection string
   - Ensure database user has proper permissions

3. **Check connection string format:**
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### Database Not Found or Empty

**Problem:** No data appears in Gantt chart.

**Solution:**
```bash
# Seed the database
cd backend
npm run seed

# Verify data exists
mongosh gantt_db
> db.tasks.count()
> db.dependencies.count()
```

## API and Network Issues

### CORS Errors

**Problem:** `Access to fetch at 'http://localhost:3001/api/load' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution:**
- Verify backend CORS configuration in `backend/server.js`
- Ensure frontend URL matches allowed origins
- Check that backend is running on correct port

### 404 Not Found for API Endpoints

**Problem:** API requests return 404.

**Solutions:**

1. **Verify backend is running:**
   ```bash
   curl http://localhost:3001/api/load
   # Should return JSON response
   ```

2. **Check API URL in frontend:**
   ```env
   # frontend/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Verify route configuration:**
   - Check `backend/routes/gantt.js` exists
   - Verify routes are mounted in `backend/server.js`

### 500 Internal Server Error

**Problem:** API returns 500 error.

**Solutions:**

1. **Check backend console for error details**

2. **Verify MongoDB connection:**
   ```bash
   # Test MongoDB connection
   mongosh gantt_db
   ```

3. **Check data format:**
   - Ensure request body matches expected format
   - Verify all required fields are present

4. **Check model validation:**
   - Review Mongoose schema in `backend/models/`
   - Ensure data types match schema

### Network Request Failed

**Problem:** `Failed to fetch` or network errors.

**Solutions:**

1. **Verify backend is running:**
   ```bash
   cd backend
   npm run dev
   # Should see: "Backend server listening on port 3001"
   ```

2. **Check firewall settings**

3. **Verify ports are not in use:**
   ```bash
   # Check if port 3001 is in use
   lsof -i :3001
   # Or
   netstat -an | grep 3001
   ```

## Build and Compilation Issues

### TypeScript Errors

**Problem:** TypeScript compilation errors.

**Solutions:**

1. **Check TypeScript version:**
   ```bash
   npx tsc --version
   # Should be 5.x
   ```

2. **Clear Next.js cache:**
   ```bash
   cd frontend
   rm -rf .next
   npm run build
   ```

3. **Verify tsconfig.json:**
   - Check `tsconfig.json` exists in frontend directory
   - Ensure strict mode settings are appropriate

### Next.js Build Fails

**Problem:** `npm run build` fails.

**Solutions:**

1. **Clear build cache:**
   ```bash
   cd frontend
   rm -rf .next
   npm run build
   ```

2. **Check for syntax errors:**
   ```bash
   npm run lint
   ```

3. **Verify environment variables:**
   ```bash
   # Ensure .env.local exists with:
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

### Module Resolution Errors

**Problem:** `Cannot resolve module` errors.

**Solutions:**

1. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check import paths:**
   - Verify relative paths are correct
   - Check case sensitivity (Linux/macOS)

3. **Verify file extensions:**
   - TypeScript files: `.ts`, `.tsx`
   - JavaScript files: `.js`, `.jsx`

## Runtime Errors

### Gantt Chart Not Rendering

**Problem:** Blank page or Gantt chart doesn't appear.

**Solutions:**

1. **Check browser console for errors**

2. **Verify Bryntum is loaded:**
   ```javascript
   // In browser console
   console.log(window.bryntum);
   ```

3. **Check CSS is loaded:**
   - Verify theme CSS file is in `public/themes/`
   - Check network tab for 404 errors on CSS files

4. **Verify data is loaded:**
   - Check Network tab for `/api/load` request
   - Verify response contains data

### "Cannot read property 'up' of undefined"

**Problem:** Runtime error in GanttConfig handlers.

**Solution:**
- This is a TypeScript type issue. The code uses `(this as any).up('gantt')` which is correct.
- Ensure you're using the latest version of `GanttConfig.ts`

### Task Menu Not Appearing

**Problem:** Right-click context menu doesn't show.

**Solutions:**

1. **Verify taskMenu feature is enabled:**
   ```typescript
   // In GanttConfig.ts
   features: {
     taskMenu: {
       // Configuration
     }
   }
   ```

2. **Check browser console for errors**

3. **Verify you're right-clicking on a task row, not empty space**

### Data Not Saving

**Problem:** Changes to tasks don't persist.

**Solutions:**

1. **Check autoSync is enabled:**
   ```typescript
   project: {
     autoSync: true
   }
   ```

2. **Verify sync endpoint is working:**
   ```bash
   curl -X POST http://localhost:3001/api/sync \
     -H "Content-Type: application/json" \
     -d '{"tasks":{"added":[],"updated":[],"removed":[]},"dependencies":{"added":[],"updated":[],"removed":[]},"resources":{"added":[],"updated":[],"removed":[]},"assignments":{"added":[],"updated":[],"removed":[]}}'
   ```

3. **Check backend console for sync errors**

4. **Verify MongoDB connection**

## Performance Issues

### Slow Loading

**Problem:** Application takes long to load.

**Solutions:**

1. **Check data size:**
   - Large datasets may cause slow loading
   - Consider pagination or virtual scrolling

2. **Optimize database queries:**
   - Add indexes to frequently queried fields
   - Use MongoDB aggregation for complex queries

3. **Enable compression:**
   ```javascript
   // In backend/server.js
   const compression = require('compression');
   app.use(compression());
   ```

### Memory Leaks

**Problem:** Application memory usage increases over time.

**Solutions:**

1. **Check for event listeners:**
   - Ensure event listeners are cleaned up
   - Use React's `useEffect` cleanup functions

2. **Monitor Gantt instance:**
   - Destroy Gantt instance on component unmount
   - Check for multiple Gantt instances

### Large Dataset Performance

**Problem:** Performance degrades with many tasks.

**Solutions:**

1. **Implement pagination:**
   - Load tasks in chunks
   - Use virtual scrolling

2. **Optimize rendering:**
   - Reduce number of visible columns
   - Disable unnecessary features

3. **Database optimization:**
   - Add proper indexes
   - Use MongoDB aggregation pipeline

## Additional Resources

- [Bryntum Gantt Documentation](https://bryntum.com/products/gantt/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)

## Getting Help

If you're still experiencing issues:

1. **Check the error message carefully** - It often contains clues
2. **Review the browser console** - Look for JavaScript errors
3. **Check the backend console** - Look for server-side errors
4. **Review the logs** - Check application logs for details
5. **Search existing issues** - Check GitHub issues or forums
6. **Create a minimal reproduction** - Isolate the problem

For Bryntum-specific issues, visit:
- [Bryntum Support Forum](https://forum.bryntum.com/)
- [Bryntum Documentation](https://bryntum.com/products/gantt/docs/)

