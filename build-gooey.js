const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/gooey-menu.tsx'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: 'gooey-bundle.js',
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts'
  }
}).then(() => {
  console.log('Successfully bundled gooey-bundle.js');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
