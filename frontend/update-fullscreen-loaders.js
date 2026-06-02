const fs = require('fs');
const path = require('path');

const newFullscreenLoader = `
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-32 w-32" />
        <div className="font-mono text-xs uppercase tracking-[0.3em]">Loading....</div>
      </div>
`;

function replaceFullscreenLoader(filePath, regexes) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    regexes.forEach(regex => {
        if (regex.test(content)) {
            content = content.replace(regex, newFullscreenLoader.trim());
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated fullscreen loader in ${filePath}`);
    }
}

// 1. Events Section
replaceFullscreenLoader(
    'd:/Sajan-Shah-Website-main/frontend/src/components/sections/events/EventsSection.tsx',
    [/<div className="min-h-screen bg-brand-dark text-white flex items-center justify-center font-mono text-xs uppercase tracking-\[0\.3em\]">\s*Loading Events Calendar\.\.\.\s*<\/div>/g]
);

// 2. Contributions Page
replaceFullscreenLoader(
    'd:/Sajan-Shah-Website-main/frontend/src/app/contributions/page.tsx',
    [/<div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs uppercase tracking-\[0\.3em\]">\s*Loading Contributions\.\.\.\s*<\/div>/g]
);

// 3. Cart Page
replaceFullscreenLoader(
    'd:/Sajan-Shah-Website-main/frontend/src/app/cart/page.tsx',
    [/<div className="min-h-screen bg-\[#0C0C0C\] text-white flex items-center justify-center font-mono text-\[10px\] uppercase tracking-\[0\.3em\]">\s*Loading Cart\.\.\.\s*<\/div>/g]
);

// 4. Products ID Page
replaceFullscreenLoader(
    'd:/Sajan-Shah-Website-main/frontend/src/app/products/[id]/page.tsx',
    [/<div className="min-h-screen flex items-center justify-center bg-black text-white">\s*Loading\.\.\.\s*<\/div>/g]
);

// 5. Products Order Success Page (Suspense fallback)
replaceFullscreenLoader(
    'd:/Sajan-Shah-Website-main/frontend/src/app/products/order-success/page.tsx',
    [/<div className="min-h-screen flex items-center justify-center bg-\[#0C0C0C\] text-white">\s*Loading order summary\.\.\.\s*<\/div>/g]
);

// 6. Generic min-h-screen loaders (already using the img)
const genericLoaderRegex = /<div className="min-h-screen [^"]*flex items-center justify-center[^"]*">\s*<img src="\/loding\.png" alt="Loading" className="animate-spin object-contain h-12 w-12[^"]*" \/>\s*<\/div>/g;

const genericFiles = [
    'src/app/user/layout.tsx',
    'src/app/speaking/page.tsx',
    'src/app/set-password/page.tsx',
    'src/app/member/layout.tsx',
    'src/app/about/page.tsx',
    'src/app/admin/layout.tsx',
    'src/app/page.tsx'
];

genericFiles.forEach(file => {
    replaceFullscreenLoader(path.join('d:/Sajan-Shah-Website-main/frontend', file), [genericLoaderRegex]);
});

// 7. Update other smaller instances to be slightly larger
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

    // Replace inline small loaders (h-5 w-5 to h-6 w-6)
    const smallRegex = /className="animate-spin object-contain h-5 w-5 inline-block mr-2"/g;
    if (smallRegex.test(content)) {
        content = content.replace(smallRegex, 'className="animate-spin object-contain h-8 w-8 inline-block mr-3"');
        changed = true;
    }

    // Replace medium inline loaders (h-6 w-6 to h-10 w-10)
    const mediumRegex = /className="animate-spin object-contain h-6 w-6 inline-block"/g;
    if (mediumRegex.test(content)) {
        content = content.replace(mediumRegex, 'className="animate-spin object-contain h-10 w-10 inline-block"');
        changed = true;
    }
    
    // Admin table/card loaders (h-8 w-8 to h-12 w-12)
    const adminRegex = /className="animate-spin object-contain h-8 w-8( mx-auto)?"/g;
    if (adminRegex.test(content)) {
        content = content.replace(adminRegex, 'className="animate-spin object-contain h-16 w-16 mx-auto"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated sizes in ${file}`);
    }
});
