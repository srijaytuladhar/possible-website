const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
const apiUrl = process.env.API_URL || 'https://possible-website.vercel.app/api';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`[set-env] Configured apiUrl: ${apiUrl}`);

