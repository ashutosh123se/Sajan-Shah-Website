const fs = require('fs');
const file = 'prisma/schema.prisma';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('provider = "mysql"', 'provider = "sqlite"');
content = content.replace(/@db\.Text/g, '');
content = content.replace(/Json\?/g, 'String?');
content = content.replace(/Json/g, 'String');

fs.writeFileSync(file, content);
console.log('Schema updated successfully');
