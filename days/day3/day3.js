const fs = require("fs");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });
const data = textData.split("\r\n");

console.log("--------------");
console.log("/*  Day 3:  */");

console.log("- Part 1");

{
    let gammaRateBin = "";
    let epsilonRateBin = "";

    for (let i = 0; i < data[0].length; i++) {
        let numOf1s = 0;

        for (let reading of data) {
            if (reading[i] === "1") {
                numOf1s++;
            }
        }

        if (numOf1s > data.length / 2) {
            gammaRateBin += "1";
            epsilonRateBin += "0";
        } else {
            gammaRateBin += "0";
            epsilonRateBin += "1";
        }
    }

    const gammaRate = parseInt(gammaRateBin, 2);
    const epsilonRate = parseInt(epsilonRateBin, 2);
    const powerConsumption = gammaRate * epsilonRate;

    console.log(`Gamma Rate: ${gammaRate}`);
    console.log(`Epsilon Rate: ${epsilonRate}`);
    console.log(`Power Consumption: ${powerConsumption}`);
}

console.log("- Part 2");
{
    const O2genRating = parseInt(reduceArray(data, 0)[0], 2);
    const CO2genRating = parseInt(reduceArray(data, 0, true)[0], 2);

    console.log(`O2gen Rating: ${O2genRating}`);
    console.log(`CO2gen Rating: ${CO2genRating}`);

    console.log(`Life Support Rating: ${O2genRating * CO2genRating}`);

    function reduceArray(arr, index, co2 = false) {
        if (arr.length === 1) {
            return arr;
        }

        let numOf1s = 0;
        let filteredArray = [];

        for (let reading of arr) {
            if (reading[index] === "1") {
                numOf1s++;
            }
        }

        let numOf0s = arr.length - numOf1s;

        if (!co2) {
            if (numOf1s >= numOf0s) filteredArray = arr.filter((e) => e[index] === "1");
            else filteredArray = arr.filter((e) => e[index] === "0");
        } else {
            if (numOf1s < numOf0s) filteredArray = arr.filter((e) => e[index] === "1");
            else filteredArray = arr.filter((e) => e[index] === "0");
        }
        return reduceArray(filteredArray, index + 1, co2);
    }
}
