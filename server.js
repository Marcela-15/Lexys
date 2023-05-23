const http = require('http');
const fs = require('fs');


http.createServer((request, response)=> {
``
    const file = request.url == '/' ? './index.html' : `./${request.url}`;
    if(request.url == '/forms' && request.method == "POST"){
        let data = [];
        request.on('data', value => {
            data.push(value);
        }).on('end', ()=>{
            let params = Buffer.concat(data).toString();


            fs.appendFile('./formsarchivo.txt', params + '\n', (error) => {
                if (error) {
                  response.writeHead(500, { 'Content-Type': 'text/plain' });
                  response.write('Error while saving');
                  response.end();
                } else {
                    response.writeHead(302, { 'Location': './formulario.html' });
                    response.end();
                }
              });

        });
    }
    else{    fs.readFile(file, (err, data)=> {
        if(err){
            response.writeHead(404, {"Content-Type":"text/html"});
            response.write("not found");+
            response.end();
        }else{
            const extension = request.url.split('.').pop();
            switch(extension){
                case 'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                break;
                case 'html':
                    response.writeHead(200, {"Content-Type":"text/html"});
                break;
                case 'csc':
                    response.writeHead(200, {"Content-Type":"text/csc"});
                break;
                case 'ico':
                    response.writeHead(200, {"Content-Type":"image/x-icon"});
                case 'css':
                    response.writeHead(200, {"Content-Type":"text/css"});
                    break;
                case 'js':
                    response.writeHead(200, {"Content-Type":"text/js"});
                case 'jpeg':
                    response.writeHead(200, {"Content-Type":"image/jpeg"});
                case 'png':
                    response.writeHead(200, {"Content-Type":"image/png"});
            default:


            response.writeHead(200, {"Content-Type":"text/html"});
            }
            response.write(data);
            response.end();
        }
    });}

}).listen(8888);