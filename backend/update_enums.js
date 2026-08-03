const fs = require('fs');
const file = 'prisma/schema.prisma';
let content = fs.readFileSync(file, 'utf8');

// Replace Enum types in models
content = content.replace(/role\s+UserRole\s+@default\(CUSTOMER\)/g, 'role String @default("CUSTOMER")');
content = content.replace(/status\s+OrderStatus\s+@default\(PENDING\)/g, 'status String @default("PENDING")');

// Remove Enum blocks
content = content.replace(/enum UserRole \{[\s\S]*?\}/g, '');
content = content.replace(/enum OrderStatus \{[\s\S]*?\}/g, '');

fs.writeFileSync(file, content);
console.log('Enums removed for SQLite');
