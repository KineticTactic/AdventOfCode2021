const fs = require("fs");

const dirs = fs.readdirSync("./days");

for (const dir of dirs) {
    require(`./days/${dir}/${dir}.js`);
}
