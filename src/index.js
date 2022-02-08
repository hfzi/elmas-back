const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
const { find } = require("domutils");

app.use(cors());

const url1 = "https://blendermarket.com/creators/elmas?page=1";
const url2 = "https://blendermarket.com/creators/elmas?page=2";
const url3 = "https://blendermarket.com/creators/elmas?page=3";
const url4 = "https://blendermarket.com/creators/elmas?page=4";
const url5 = "https://blendermarket.com/creators/elmas?page=5";

const adres = ["https://blendermarket.com/creators/elmas"];

//app.METHOD(PATH, HANDLER)

app.get("/", function (req, res) {
  axios.all(url1).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const title = $(this).find("h5").text();
      const url1 = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      articles.push({
        title,
        url1,
        img,
      });
    });
    res.json(articles);
  });
  //res.json("S.A.");
});



app.listen(PORT,);
