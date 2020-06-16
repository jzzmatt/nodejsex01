const fs = require('fs');
const http = require('http');
const url = require('url'); //permit to analyse the req url

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


const data = fs.readFileSync(`../dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



//Create the server Object
const server = http.createServer((req, res) => {
    // console.log(req.url)
    // res.end('Hello from the server!');
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the Overview Page');
    } else if (pathName === '/product') {
        res.end('This is the Product');
    } else if (pathName === '/api'){
 
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);

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
