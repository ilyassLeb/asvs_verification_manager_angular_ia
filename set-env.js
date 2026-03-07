const fs = require('fs');
const path = require('path');

const dir = './src/environments';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const envConfigFile = `export const environment = {

  production: true,
  apiKey: '${process.env.GROQ_API_KEY}',
  organizationId: '${process.env.GROQ_ORG_ID}'
};
`;



fs.writeFileSync(path.join(dir, 'environment.ts'), envConfigFile);
fs.writeFileSync(path.join(dir, 'environment.prod.ts'), envConfigFile);

console.log('✅ Fichiers d\'environnement générés dynamiquement.');sss