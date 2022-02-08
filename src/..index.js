import axios from "axios";
import { appendTo } from "cheerio/lib/api/manipulation";

let one =
  "https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";
let two =
  "https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt";
let three =
  "https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);

app.get("/data", function(req,res) {
axios
  .all([requestOne, requestTwo, requestThree])
  .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      const responesThree = responses[2];

      // use/access the results
      console.log(responseOne, responseTwo, responesThree);
    })
  )
  .catch((errors) => {
    // react on errors.
    console.error(errors);
  });
})


