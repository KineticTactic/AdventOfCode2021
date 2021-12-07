const fs = require("fs");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });
const data = textData.split(",").map((e) => parseInt(e));

// -------------- Part 1 ---------------------

console.log("\x1b[32m%s\x1b[0m", "- Part 1");

{
    // Calculate the minimum and maximum values in the given range
    const minX = Math.min(...data);
    const maxX = Math.max(...data);

    let minFuel = Infinity;

    // Loop from min to max
    for (let i = minX; i <= maxX; i++) {
        let fuel = 0;

        // Loop over all crabs
        for (let d of data) {
            fuel += Math.abs(i - d);
        }
        if (fuel < minFuel) {
            minFuel = fuel;
        }
    }

    console.log(`Minimum Fuel required: ${minFuel}`);
}

// -------------- Part 2 ---------------------

console.log("\x1b[32m%s\x1b[0m", "\n- Part 2");

{
    const minX = Math.min(...data);
    const maxX = Math.max(...data);

    let minFuel = Infinity;

    for (let i = minX; i <= maxX; i++) {
        let fuel = 0;
        for (let d of data) {
            const dist = Math.abs(i - d);
            fuel += (dist * (dist + 1)) / 2;
        }
        if (fuel < minFuel) {
            minFuel = fuel;
        }
    }

    console.log(`Minimum Fuel required: ${minFuel}`);
}
