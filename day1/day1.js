const fs = require("fs");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });
const data = textData.split("\r\n").map((e) => parseInt(e));

// -------------- Part 1 ---------------------

console.log("\x1b[32m%s\x1b[0m", "- Part 1");

{
    let increasedCount = 0;
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i] < data[i + 1]) {
            increasedCount++;
        }
    }

    console.log(increasedCount);
}

// -------------- Part 2 ---------------------

console.log("\x1b[32m%s\x1b[0m", "\n- Part 2");

{
    let increasedCount = 0;
    for (let i = 0; i < data.length - 3; i++) {
        if (data[i] + data[i + 1] + data[i + 2] < data[i + 1] + data[i + 2] + data[i + 3]) {
            increasedCount++;
        }
    }

    console.log(increasedCount);
}
