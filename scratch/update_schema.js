const fs = require('fs');
let content = fs.readFileSync('backend/prisma/schema.prisma', 'utf8');
content = content.replace(/provider = "mysql"/g, 'provider = "sqlite"');
content = content.replace(/@db\.Text/g, '');
fs.writeFileSync('backend/prisma/schema.prisma', content);
console.log('Schema updated to SQLite');
