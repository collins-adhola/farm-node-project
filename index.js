const fs = require("fs");
const http = require("http");
const url = require("url");

// Blocking, Synchronous
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the ovacado:${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written');

// Non- Blocking asynchronous
// fs.readFile('./txt/start.txt','utf-8', (err, data)=> {
//   console.log(data);
// });
// console.log('WHY SHOULD I GO')

// Server
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
  const dataObj = JSON.parse(data);  


const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page

  if (pathName === '/' || pathName === '/overview'){
    res.writeHead(200, { "Content-type": "text/html" });

    res.end(tempOverview);

    // Product page
  } else if (pathName === '/product'){
    res.end("This is the PRODUCT");
      
   // API  

  } else if(pathName === '/api') {
      res.writeHead(200,{'Content-type': 'application/json'})
      res.end(data);

      // NOT FOUND
  }else {
    res.writeHead(404, {
      'Content-type' : 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found</h1>')
  }
});
server.listen(8000, "127.0.0.1", () =>
  console.log("Listening to requests on port 8000")
);
