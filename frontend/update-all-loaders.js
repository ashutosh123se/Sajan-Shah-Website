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

const files = walk('d:/Sajan-Shah-Website-main/frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const divRegex = /<div[^>]*className="[^"]*animate-spin[^"]*"[^>]*>(?:<\/div>)?/g;
    if (divRegex.test(content)) {
        content = content.replace(divRegex, (match) => {
            if (match.includes('w-6') || match.includes('h-6')) {
                return '<img src="/loding.png" alt="Loading" className="animate-spin object-contain h-6 w-6 inline-block" />';
            }
            if (match.includes('w-8') || match.includes('h-8')) {
                return '<img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 mx-auto" />';
            }
            return '<img src="/loding.png" alt="Loading" className="animate-spin object-contain h-12 w-12 mx-auto" />';
        });
        changed = true;
    }

    const refreshRegex = /<RefreshCw[^>]*className="[^"]*animate-spin[^"]*"[^>]*\/>/g;
    if (refreshRegex.test(content)) {
        content = content.replace(refreshRegex, (match) => {
            if (match.includes('size={20}')) {
                return '<img src="/loding.png" alt="Loading" className="animate-spin object-contain h-5 w-5 inline-block mr-2" />';
            }
            return '<img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mx-auto" />';
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
