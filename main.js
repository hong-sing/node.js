var http = require('http');
var fs = require('fs');
var url = require('url');  //url이라는 모듈을 url이라는 변수를 통해 사용할 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){  //HOME로 갔을 때
      title = 'Welcome';  // 이 부분이 실행됨
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
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
      response.end(template);
    });

 
});
app.listen(3000);