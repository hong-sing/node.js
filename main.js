var http = require('http');
var fs = require('fs');
var url = require('url');  //url이라는 모듈을 url이라는 변수를 통해 사용할 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
      fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `; //수백, 수천개의 페이지가 있다고 할 때 일부만 수정하고자 할 경우 template에서 그 부분만 수정하면 모든 페이지에 적용됨
        response.writeHead(200); //파일 전송 성공
        response.end(template);
      });
    } else {
      response.writeHead(404); //해당 파일을 찾을 수 없음
      response.end('Not found');
    }
    

 
});
app.listen(3000);