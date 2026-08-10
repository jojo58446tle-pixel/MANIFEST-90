import {cpSync,existsSync,mkdirSync,rmSync} from 'node:fs';
const out='dist'; if(existsSync(out))rmSync(out,{recursive:true}); mkdirSync(out);
for(const f of ['index.html','styles.css','app.js','manifest.webmanifest','sw.js','_redirects'])cpSync(f,`${out}/${f}`);
console.log('Production build ready: dist/');
