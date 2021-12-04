const fs = require("fs");

for (let i = 1; ; i++) {
    if (fs.existsSync(`./day${i}/day${i}.js`)) {
        // Cyan coloured text :D
        console.log("\x1b[36m%s\x1b[0m", `\n\n-------------------------------\n/*          Day ${i}:          */`);
        require(`./day${i}/day${i}.js`);
    } else break;
}
