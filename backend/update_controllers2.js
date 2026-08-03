const fs = require('fs');

const files = [
  'src/controllers/speakingController.ts',
  'src/controllers/aboutController.ts',
  'src/controllers/leadsController.ts'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace array responses
  content = content.replace(
    /sendSuccess\(res, \{ sections \}\);/g, 
    "sendSuccess(res, { sections: sections.map((s: any) => ({ ...s, content: s.content && typeof s.content === 'string' ? JSON.parse(s.content) : s.content })) });"
  );

  // Replace single object responses (update and create)
  content = content.replace(
    /sendSuccess\(res, \{ section \}, '(.*?)'\);/g,
    "sendSuccess(res, { section: { ...section, content: section.content && typeof section.content === 'string' ? JSON.parse(section.content) : section.content } }, '');"
  );

  // For leads:
  content = content.replace(
    /sendSuccess\(res, \{ leads \}\);/g, 
    "sendSuccess(res, { leads: leads.map((s: any) => ({ ...s, data: s.data && typeof s.data === 'string' ? JSON.parse(s.data) : s.data })) });"
  );
  content = content.replace(
    /sendSuccess\(res, \{ lead \}, '(.*?)'\);/g,
    "sendSuccess(res, { lead: { ...lead, data: lead.data && typeof lead.data === 'string' ? JSON.parse(lead.data) : lead.data } }, '');"
  );

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
