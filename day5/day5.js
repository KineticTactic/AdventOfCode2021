const fs = require("fs");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });

// Split by newlines
const data = textData.split("\r\n");

const lines = data.map((line) => {
    // Split the line by -->
    const [startPoint, endPoint] = line.split(" -> ");
    // Split the pairs of xy coords by ,
    const [x1, y1] = startPoint.split(",");
    const [x2, y2] = endPoint.split(",");

    return {
        x1: parseInt(x1),
        y1: parseInt(y1),
        x2: parseInt(x2),
        y2: parseInt(y2),
    };
});

// Filter out horizontal and vertical lines only
const horizontalAndVerticalLines = lines.filter((line) => {
    return line.x1 === line.x2 || line.y1 === line.y2;
});

// Filter out diagonal lines only
const diagonalLines = lines.filter((line) => {
    return line.x1 !== line.x2 && line.y1 !== line.y2;
});

// ------------------------------------------------------------------

// Map to store points where lines have passed
let seabed = new Map();

// Plot the horizontal and vertical lines on the seabed
plotHorizontalAndVerticalLines(seabed, horizontalAndVerticalLines);

console.log("\x1b[32m%s\x1b[0m", "- Part 1");
console.log(`Number of overlaps for horizontal and vertical lines only: ${calculateOverlaps(seabed)}`);

// Plot the diagonal lines on the seabed
plotDiagonalLines(seabed, diagonalLines);

console.log("\x1b[32m%s\x1b[0m", "\n- Part 2");
console.log(`Number of overlaps for all lines: ${calculateOverlaps(seabed)}`);

// ---------- COMMON FUNCTIONS --------------

// Note: this functions MUTATE the map passed in
function plotHorizontalAndVerticalLines(seabed, horizontalAndVerticalLines) {
    // Loop through all lines
    for (const line of horizontalAndVerticalLines) {
        // Calculate the min and max x values
        const xMin = Math.min(line.x1, line.x2);
        const xMax = Math.max(line.x1, line.x2);

        // Loop from lower x to higher x
        for (let x = xMin; x <= xMax; x++) {
            // Calculate the min and max y values
            const yMin = Math.min(line.y1, line.y2);
            const yMax = Math.max(line.y1, line.y2);

            // Loop from the lower y to the higher y
            for (let y = yMin; y <= yMax; y++) {
                // Get the current value from the map
                // If it doesn't exist, take it as 0
                const curValue = seabed.get(`${x},${y}`) || 0;

                // Set the value in the map to the current value + 1
                seabed.set(`${x},${y}`, curValue + 1);
            }
        }
    }
}

// Note: this functions MUTATE the map passed in
function plotDiagonalLines(seabed, diagonalLines) {
    // Loop through all diagonal lines
    for (const line of diagonalLines) {
        // Calculate the direction of the end points with respect to the start points
        const xDir = line.x1 < line.x2 ? 1 : -1;
        const yDir = line.y1 < line.y2 ? 1 : -1;

        // Difference between the two x coords
        // (Which is also equal to the difference between the 2 y coords as it is strictly a 45deg line)
        const diff = Math.abs(line.x1 - line.x2);

        // Loop from 0 to the difference value
        for (let i = 0; i <= diff; i++) {
            // Calculate the x and y coords
            const x = line.x1 + i * xDir;
            const y = line.y1 + i * yDir;

            // Get Current value of the coords
            // If it does not exist then take it as 0
            const curValue = seabed.get(`${x},${y}`) || 0;

            // Set the value in the map to the current value + 1
            seabed.set(`${x},${y}`, curValue + 1);
        }
    }
}

function calculateOverlaps(seabed) {
    // Convert values of the map to array
    const valuesArr = [...seabed.values()];

    // Get the amount of values that are greater than 1
    const overlaps = valuesArr.reduce((prev, cur) => (cur > 1 ? prev + 1 : prev), 0);

    return overlaps;
}
