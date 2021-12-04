const fs = require("fs");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });

// Split by two newlines
const data = textData.split("\r\n\r\n");

// First line contains the series of random numbers
// Shift() it out from the array and split it by ,
const randSeries = data
    .shift()
    .split(",")
    .map((e) => parseInt(e));

// Split the strings in data by new lines and then split the rows every 3 characters
const originalTables = data.map((e) => {
    let rows = e.split("\r\n");
    rows = rows.map((row) => row.match(/.{1,3}/g).map((e) => parseInt(e)));
    return rows;
});

console.log("\x1b[32m%s\x1b[0m", "- Part 1");

{
    let tables = originalTables.slice();

    // Loop through the numbers
    numLoop: for (let num of randSeries) {
        // iterate ove all tables
        for (let table of tables) {
            // iterate through rows
            for (let i = 0; i < table.length; i++)
                // if any number in the row is equal to the current number then set it to -1
                table[i] = table[i].map((e) => (e === num ? -1 : e));

            if (checkIfWinning(table)) {
                console.log(`First winning table score: ${calculateScore(table, num)}`);
                break numLoop;
            }
        }
    }
}

console.log("\x1b[32m%s\x1b[0m", "\n- Part 2");
{
    let tables = originalTables.slice();

    numLoop: for (let num of randSeries) {
        // iterate ove all tables
        for (let tableIndex = tables.length - 1; tableIndex >= 0; tableIndex--) {
            // iterate through rows
            for (let i = 0; i < tables[tableIndex].length; i++)
                // if any number in the row is equal to the current number then set it to -1
                tables[tableIndex][i] = tables[tableIndex][i].map((e) => (e === num ? -1 : e));

            if (checkIfWinning(tables[tableIndex])) {
                // if it is the last table
                if (tables.length === 1) {
                    console.log(`Last winning table score: ${calculateScore(tables[tableIndex], num)}`);
                    break numLoop;
                }
                tables.splice(tableIndex, 1);
            }
        }
    }
}

// common functions --------------------------
function checkIfWinning(table) {
    for (let row of table) {
        if (row.every((e) => e === -1)) return true;
    }
    // transpose the table (rotate it 90 degrees)
    let transposedTable = table[0].map((_, colIndex) => table.map((row) => row[colIndex]));

    for (let row of transposedTable) {
        return row.every((e) => e === -1);
    }
}

function calculateScore(table, num) {
    const sum = table.reduce((acc, row) => {
        return acc + row.reduce((acc, cur) => (cur !== -1 ? acc + cur : acc), 0);
    }, 0);
    const score = sum * num;
    return score;
}
