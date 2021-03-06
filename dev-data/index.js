const fs = require('fs');
const http = require('http');
const url = require('url'); //permit to analyse the request or the query url
const replaceTemplate = require('../modules/replaceTemplate');
const slugify = require('slugify') //module that return the last part of an url search string
//example 127.0.0.1:8000/product/fresh-avocados -> the fresh-avocados string is the slugify part of the url

////---- FILE ---- ////

// // Blocking Sync Away
// const textIn = fs.readFileSync('../txt/input.txt', 'utf-8');
// //console.log(textIn);

// const textOut = `This what i like with JS: ${textIn}.\nCreated on ${Date.now}`

// fs.writeFileSync('../txt/output.txt', textOut);

// //Non-Blocking, async way
// fs.readFile('../txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
//     fs.readFile(`../txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`../txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('../txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("your file has been written")
//             })
//         })

//     //fs.writeFile('./txt/final.txt', `${}`)
//     })
// })
// console.log('Will read file!');

////---- SERVER ---- ////

const tempOverview = fs.readFileSync(`../templates/template_overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`../templates/template_card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`../templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`../dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//Using slugs test
const slugs = dataObj.map(el => slugify(el.productName, { lower: true}))
console.log(slugs);


//Create the server Object
const server = http.createServer((req, res) => {
    // console.log(req.url)
    // res.end('Hello from the server!');
    
    const { query, pathname } = url.parse(req.url, true);
    
    //const pathName = req.url;


    // Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        //console.log(cardHtml);

        res.end(output);

    // Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

    // API
    } else if (pathname === '/api'){
 
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);

    // Not Found
    }else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');

    }
});

//Create Listen Loop Port 
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});
