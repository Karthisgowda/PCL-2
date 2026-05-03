const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const slideCount = (html.match(/<section class="slide/g) || []).length;
const requiredLinks = [
  "https://www.ijsred.com/volume9-issue2-part9.html",
  "https://www.ijsred.com/mar-apr-2026.html",
  "IJSRED-V9I2P83",
  "10.5281/zenodo.19013856"
];

if (slideCount !== 10) {
  throw new Error(`Expected 10 slides, found ${slideCount}`);
}

for (const value of requiredLinks) {
  if (!html.includes(value)) {
    throw new Error(`Missing required content: ${value}`);
  }
}

console.log("Presentation check passed: 10 slides and publication details present.");
