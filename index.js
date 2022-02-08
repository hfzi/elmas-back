const PORT = process.env.PORT || 8001;
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
  res.json("S.A.");
});

app.get("/results1", function (req, res) {
  // sayfa 1 //
  axios(url1).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const title = $(this).find("h5").text();
      const url1 = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      const isim = title.split(" (Rigged Car)");
      articles.push({
        isim,
        url1,
        img,
      });
    });

    res.json(articles);
  });
});

app.get("/results2", function (req, res) {
  // sayfa 1 //
  axios(url2).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const title = $(this).find("h5").text();
      const url2 = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      const isim = title.split(" (Rigged Car)");
      articles.push({
        isim,
        url2,
        img,
      });
    });

    res.json(articles);
  });
});

app.get("/results3", function (req, res) {
  // sayfa 1 //
  axios(url3).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const title = $(this).find("h5").text();
      const url3 = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      const isim = title.split(" (Rigged Car)");
      articles.push({
        isim,
        url3,
        img,
      });
    });

    res.json(articles);
  });
});

app.get("/results4", function (req, res) {
  // sayfa 1 //
  axios(url4).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const title = $(this).find("h5").text();
      const url4 = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      const isim = title.split(" (Rigged Car)");
      articles.push({
        isim,
        url4,
        img,
      });
    });

    res.json(articles);
  });
});

app.get("/results5", function (req, res) {
  // sayfa 1 //
  axios(url5).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
      const title = $(this).find("h5").text();
      const url5 = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      const isim = title.split(" (Rigged Car)");
      articles.push({
        isim,
        url5,
        img,
      });
    });

    res.json(articles);
  });
});

app.listen(
  PORT
  //, () => console.log(`server çalışıyor ${PORT}`)
);
