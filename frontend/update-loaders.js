const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('d:/Sajan-Shah-Website-main/frontend/src/app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /<div className="animate-spin rounded-full([^"]*)"><\/div>/g;
    if (regex.test(content)) {
        content = content.replace(regex, (match, classes) => {
            let newClasses = classes.replace(/border-[a-z]-[0-9]/g, '').replace(/border-[a-z]+/g, '').replace(/ +/g, ' ').trim();
            return `<img src="/loding.png" alt="Loading" className="animate-spin object-contain ${newClasses}" />`;
        });
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
