let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');

function templateHTML(title, fileList, content) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          ${fileList}      
        </ul>
        <ul>
          <li><a href="/create">create</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${content}</p>
      </body>
    </html>
  `;
}

function getFileList(_fileList) {
  let fileList = '';
  for (let i = 0; i < _fileList.length; i++) {
    fileList += `<li><a href="/?id=${_fileList[i]}">${_fileList[i]}</a></li>`;
  }
  return fileList;
}
let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;
    let title = queryData.id;    
    
    if (pathname === '/') {
      fs.readFile('./data/'+title, 'utf8', (err, content) => {
        title = title !== undefined ? title : 'welcome';
        content = title !== undefined ? content : 'hello, nodeJs';
        
        fs.readdir('./data/', (err, _fileList) => {
          let fileList = getFileList(_fileList );
          let template = templateHTML(title, fileList, content);

          response.writeHead(200);
          response.end(template);
        });        
      });    
    } else if (pathname === '/create') {
      fs.readdir('./data/', (err, _fileList) => {
        let fileList = getFileList(_fileList );
        let template = templateHTML(title = 'create', fileList, `
          <form action="http://localhost:3000/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `);

        response.writeHead(200);
        response.end(template);
      });
    } else if (pathname === '/create_process') {
      let body ='';
      // post방식으로 전송된 데이터를 조금씩 나눠서 받는다. (한꺼번에 많이 들어왔을 때 서버가 다운되는 것을 방지하기 위해서)
      request.on('data', function(data) {
        body += data;
      });
      // 더이상 들어올 정보가 없을 땐, end쪽이 실행된다. 
      request.on('end', function() {
        let post = qs.parse(body);
        let title = post.title;
        let desc = post.description;
        fs.writeFile(`./data/${title}`, 'utf8', (err) => {
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
      
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
    
 
});
app.listen(3000);