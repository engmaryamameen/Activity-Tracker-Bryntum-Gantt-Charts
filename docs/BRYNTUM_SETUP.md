# Bryntum Gantt Package Setup

Since this project uses the Bryntum Gantt trial version from a local folder, you need to set up the packages before running the frontend.

## Option 1: Install from Bryntum npm Registry (Recommended)

1. **Access Bryntum npm registry:**
   - Follow the guide: https://bryntum.com/products/gantt/docs/guide/Gantt/quick-start/javascript-npm#access-to-npm-registry
   - You'll need to authenticate with your Bryntum account

2. **Install packages:**
   ```bash
   cd frontend
   npm install @bryntum/gantt@npm:@bryntum/gantt-trial@6.3.3
   npm install @bryntum/gantt-react@6.3.3
   ```

## Option 2: Use npm link (For Development)

1. **Link the local Bryntum build:**
   ```bash
   cd bryntum-gantt-trial/gantt-6.3.3-trial/build
   npm link
   ```

2. **Link in frontend:**
   ```bash
   cd ../../projx-gantt/frontend
   npm link @bryntum/gantt
   ```

3. **Install gantt-react separately:**
   You'll still need to install `@bryntum/gantt-react` from the npm registry or use Option 1.

## Option 3: Manual Symlink (Quick Setup)

```bash
cd frontend
mkdir -p node_modules/@bryntum
ln -s ../../../bryntum-gantt-trial/gantt-6.3.3-trial/build node_modules/@bryntum/gantt
```

Then install `@bryntum/gantt-react` from npm registry.

## Option 4: Copy Packages (Not Recommended)

Copy the entire build folder to `frontend/node_modules/@bryntum/gantt`, but this won't work well with npm and may cause issues.

## Verification

After setup, verify the packages are available:

```bash
cd frontend
ls node_modules/@bryntum/
```

You should see:
- `gantt/` - The main Gantt package
- `gantt-react/` - The React wrapper (if installed)

## Troubleshooting

### "Cannot find module '@bryntum/gantt'"

- Make sure you've completed one of the setup options above
- Check that `node_modules/@bryntum/gantt` exists
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### "Cannot find module '@bryntum/gantt-react'"

- Install it from the Bryntum npm registry (Option 1)
- Or use npm link if you have it locally

### CSS not loading

- Make sure the CSS files are in `frontend/public/themes/`
- Check that `gantt.stockholm.css` exists in `public/themes/`
- Verify the fonts are in `public/themes/fonts/`

