import Mustache from "mustache";
import puppeteer from "puppeteer";
import fs from "fs";
// import path from "path";

// - object for mustache view data (e.g. containing all the heart emojis for the lives)
var viewData = {
  alive: [
    {
      name: "Alice",
      face: "😈",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Alice",
      face: "😈",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Alice",
      face: "😈",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Alice",
      face: "😈",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Alice",
      face: "😈",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Alice",
      face: "😈",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    }
  ],
  eliminated: [
    {
      name: "Bob",
      face: "😇",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Bob",
      face: "😇",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Bob",
      face: "😇",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    },
    {
      name: "Bob",
      face: "😇",
      cities: [{ name: "Sydney" }, { name: "Melbourne" }, { name: "Brisbane" }]
    }
  ]
};

try {
  // render html string from mustache template
  const templateContents = fs.readFileSync("./templates/people.mustache", "utf8");
  const htmlString = Mustache.render(templateContents, viewData, {
    person: fs.readFileSync("./templates/person.mustache", "utf8"),
    stylesheet: fs.readFileSync("./templates/assets/css/stylesheet.css", "utf8")
  });

  console.log(htmlString);

  (async () => {
    // render image using puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlString);
    await page.setViewport({ width: 1, height: 1 });
    // NOTE: the width of the image is equal to the CSS .html width + all the other .html CSS elements (like border, padding (L,R) etc.)
    await page.screenshot({
      type: "png",
      path: "./output/images/example.png",
      fullPage: true
    });
    await browser.close();
  })();
} catch (error) {
  console.log(error);
}
