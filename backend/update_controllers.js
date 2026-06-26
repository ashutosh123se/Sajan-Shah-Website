const fs = require('fs');

const files = [
  'src/controllers/homePageController.ts',
  'src/controllers/eventsPageController.ts',
  'src/controllers/contributionsPageController.ts',
  'src/controllers/speakingPageController.ts',
  'src/controllers/aboutPageController.ts'
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

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
