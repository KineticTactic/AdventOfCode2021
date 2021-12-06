const fs = require("fs");
const LanternFish = require("./LanternFish");

const textData = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8", flag: "r" });

// Split by ,
const data = textData.split(",").map((e) => parseInt(e));

let fishes = data.slice();
let buffer = [];
// let fishes = data.map((e) => new LanternFish(e));

// for (let j = 0; j < data.length; j++) {
//     console.log(`${j}th fish`);

//     let fish = new LanternFish(data[j]);
//     while (fish.day < 80) {
//         // console.log(`Fish 1 day ${fish.day}`);
//         fish.update();
//     }

// for (let i = 0; i < 80; i++) {
//     console.log(`${i}th iter | ${LanternFish.count} fishes`);
//     fish.update();
// }
// process.exit(0);
// }

for (let i = 0; i < 80; i++) {
    //     console.log(`${i}th iteration: ${LanternFish.count} fishes`);
    //     for (let fish of fishes) {
    //         fish.update();
    //         // console.log(fish.timer);
    //     }
    for (let i = 0; i < fishes.length; i++) {
        if (fishes[i] === 0) {
            buffer.push(8);
            fishes[i] = 6;
            continue;
        }

        fishes[i]--;
    }

    fishes = fishes.concat(buffer);
    buffer = [];
}

console.log(fishes.length);
