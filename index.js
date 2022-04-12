const PORT = process.env.PORT || 8001;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
// const getPagesFromTo = require("./utils");

const url = `https://blendermarket.com/creators/elmas?page=`;

app.use(cors());

const adres = ["https://blendermarket.com/creators/elmas"];

/*  app.get('/', (req, res)=>{
  axios.get('http://localhost:8001/product/1')
    .then(response=>{res.send(response.data)})
})  */

app.get("/", (req, res) => {
  function componentDidMount() {
    let endpoints = [
      "http://localhost:8001/product/1",
      "http://localhost:8001/product/2",
      "http://localhost:8001/product/3",
      "http://localhost:8001/product/4",
      "http://localhost:8001/product/5",
    ];
  
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint).then((response) => {
          res.json(response.data);
        })
        )
    );
  }
  res.json(componentDidMount());
  //axios.get('http://localhost:8001/product/1')
  //.then(axios.get('http://localhost:8001/product/2'))
  //.then(response=>{res.send(response.data)})
});

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

function getPagesFromTo(from, to) {
  const articles = [];

  for (let i = from; i <= to; i++) {
    axios(url + i).then((response) => {
      //! response wait warning
      let html = response.data;
      let $ = cheerio.load(html);
      $(".col-12.col-md-6.col-lg-3.mb-4").each(function () {
        let url = $(this).find("a").attr("href").split("/products");
        let img = $(this).find("img").attr("src").substring(0, 101);
        let name = $(this).find("h5").text().split(" (Rigged Car)");
        let data = { name, url, img };
        articles.push(data);
      });
      if (i + 1 == to) {
        return articles;

        //console.log(articles)
      }
    });
  }
  //res.json(articles)
}

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
          let url = $(this).find("a").attr("href").split("/products");
          let img = $(this).find("img").attr("src").substring(0, 101);
          let name = $(this).find("h5").text().split(" (Rigged Car)");
          let data = { name, url, img };
          articles.push(data);
        });
        if (i == req.params.to) {  // am i in the end?
          // res.json(articles);
          console.log(articles.length)
          res.json(articles);
        }
      }
    }).catch(function (error) { 
      // console.warn(error);
      res.json(articles); 
    });
  }
  
});

// function getPagesFromTo(from, to) {
  
// }

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
          //console.log(articles);
        });
      });
      //console.log("veri :", data);
    }
  };
  res.json(app());
  //return await articles;
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));