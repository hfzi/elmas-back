const PORT = process.env.PORT || 8001;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");

const url = `https://blendermarket.com/creators/elmas?page=`;
const link = `https://blendermarket.com/products/`

app.use(cors());

app.get("/", function (req, res) {
  res.send("sa")
});

// ürün sayası
app.get("/:page", function (req, res) {
  console.log("link", link + req.params.page)
  axios(link + req.params.page).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".product-content.quarantine.js-product-content-show").each(function () {
      const url = $(this).find("p").text()
      const img = $(this).find("img").eq(1).attr("src")
      articles.push({
        img,
        url
      });
    });
    res.json(articles);
  });
});

// sayfa sayfası
app.get("/product/:page", function (req, res) {
  axios(url + req.params.page).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const url = $(this).find("a").attr("href").split("/products");
      const img = $(this).find("img").attr("src").substring(0, 101);
      const name = $(this).find("h5").text().split(" (Rigged Car)");
      articles.push({
        name,
        url,
        img,
      });
    });
    res.json(articles);
  });
});

app.get("/page/:from-:to", async function (req, res) {
  // "https://localhost.com/product/1-5" page 1 to 5
  const articles = [];

  for (let i = req.params.from; i <= req.params.to; i++) {
    await axios(url + i).then((response) => {
      //! response wait warning
      if (response.status === 200) {
        let html = response.data;
        let $ = cheerio.load(html);
        $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
          let title = $(this).find("h5").text().split(" (Rigged Car)").map(x => x);
          let name = title[0] + title[1]
          let link = $(this).find("a").attr("href").split("/products").map(x => x);
          let url = link[0] + link[1]
          let img = $(this).find("img").attr("src").substring(0, 101);
          let data = { name, url, img };
          articles.push(data);
        });
        if (i == req.params.to) {  // am i in the end?
          console.log(articles.length)
          res.json(articles);
        }
      }
    }).catch(function (error) { 
      res.json(articles); 
    });
  }
  
});

app.get("/pages", (req, res) => {
  const app = () => {
    for (let i = 1; i <= 5; i++) {
      axios(url + i).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];
        $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
          const url = $(this).find("a").attr("href").split("/products");
          const img = $(this).find("img").attr("src").substring(0, 101);
          const name = $(this).find("h5").text().split(" (Rigged Car)");
          articles.push({ name, url, img });
          console.log("veri2 :", articles);
        });
      });
    }
  };
  res.json(app());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));