const fs = require('fs');
const cp = require('child_process');

try {
  // Move our custom one out of the way
  if (fs.existsSync('page.tsx')) {
    fs.renameSync('page.tsx', 'page_new.tsx');
  }
  
  // Checkout original from git
  console.log('Restoring from git...');
  cp.execSync('git checkout HEAD page.tsx', {stdio: 'inherit'});
  console.log('Restored original page.tsx');
  
  // Also run npm run build to see what the errors were, if any
  console.log('Running npm run build on the NEW page to see errors...');
  fs.renameSync('page.tsx', 'page_orig.tsx'); // hide the original
  fs.renameSync('page_new.tsx', 'page.tsx');  // put our overdrive one back
  
  try {
     cp.execSync('npm run build', {cwd: '..', stdio: 'inherit'});
     console.log('Build succeeded!');
  } catch (e) {
     console.error('Build failed with the overdrive page.');
  }
  
  // Leave it as:
  // page.tsx = overdrive version
  // page_orig.tsx = original version
  
} catch (e) {
  console.error(e);
}
