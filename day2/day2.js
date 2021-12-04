const fs = require("fs");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });
const data = textData.split("\r\n").map((e) => {
    const splitted = e.split(" ");
    return { dir: splitted[0], steps: parseInt(splitted[1]) };
});

console.log("\x1b[32m%s\x1b[0m", "- Part 1");
{
    let horizontalPos = 0,
        depth = 0;

    for (let e of data) {
        switch (e.dir) {
            case "forward":
                horizontalPos += e.steps;
                break;
            case "up":
                depth -= e.steps;
                break;
            case "down":
                depth += e.steps;
        }
    }

    console.log(`Final Horizontal Position: ${horizontalPos}`);
    console.log(`Final Depth: ${depth}`);
    console.log(`Final output: ${horizontalPos * depth}`);
}

console.log("\x1b[32m%s\x1b[0m", "\n- Part 2");
{
    let horizontalPos = 0,
        depth = 0,
        aim = 0;

    for (let e of data) {
        switch (e.dir) {
            case "forward":
                horizontalPos += e.steps;
                depth += aim * e.steps;
                break;
            case "up":
                aim -= e.steps;
                break;
            case "down":
                aim += e.steps;
        }
    }

    console.log(`Final Horizontal Position: ${horizontalPos}`);
    console.log(`Final Depth: ${depth}`);
    console.log(`Final output: ${horizontalPos * depth}`);
}
