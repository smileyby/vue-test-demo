let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

function read(cb){
  fs.readFile('./book.json', 'utf-8', function (err, data){
    if (err || data.length == 0){
      cb([]); //=> 如果有错误或者数据没长度就是空数组
    } else {
      cb(JSON.parse(data)); //=> 将读出来的内容转化为对象
    }
  })
}

function write(data, cb){
  fs.writeFile('./book.json', JSON.stringify(data),cb);
}


let sliders = require('./sliders');

let pageSize = 5; //=> 每页显示5个
http.createServer((req, res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Reqested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
  res.setHeader("X-Powered-By", "3.2.1");
  if (req.method == "OPTIONS"){return res.end()}
  let {pathname, query} = url.parse(req.url, true); //=> true把query转化成对象

  if (pathname === '/page'){
    let offset = parseInt(query.offset) || 0; //=> 拿到当前前端传递的值
    read(function(books){
      let result = books.reverse().slice(offset,  offset+pageSize);
      let hasMore = true;
      if (books.length <= offset+pageSize){
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify({hasMore,books:result}));

    });
    return;
  }

  if (pathname === '/sliders'){
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    res.end(JSON.stringify(sliders));
  }

  if (pathname === '/hot'){
    read(function(books){
      let hot = books.reverse().slice(0,6);
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      setTimeout(function () {
        res.end(JSON.stringify(hot));
      }, 500);
    });
    return
  }

  //=> 对书的增删改查(resetful)
  if (pathname === '/book'){
    let id = parseInt(query.id); //=> 取出来的是字符串
    switch(req.method){
      case 'GET':
        if(!isNaN(id)){
          read(function (books){
            let book = books.find(item=>item.bookId === id);
            if (!book){ //=> 如果没找到就是undefined
              book = {}
            }
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book));
          })
        }else{ //=> 获取所有图书
          read(function(books){
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books.reverse()));
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', chunk=>{
          str += chunk;
        });
        req.on('end', function(){
          let book = JSON.parse(str);

          read(function(books){
            book.bookId = books.length?books[books.length-1].bookId+1 : 1;
            books.push(book);
            write(books,  function(){
              res.end(JSON.stringify(book));
            })
          });
        });

        break;
      case 'PUT':
        if (id){
          let str = '';
          req.on('data', chunk=>{
            str += chunk;
          });
          req.on('end',()=>{
            let book = JSON.parse(str);
            read(function(books){
              books = books.map(item=>{
                if (item.bookId === id){ //=> 找到id相同的一本书，返回到数组中
                  return book;
                } else {
                  return item; //=> 为修改书正常返回
                }
              })
              write(books, function(){ //=> 将修改后的数据返回
                res.end(JSON.stringify(book));
              })
            });
          })
        }
        break;
      case 'DELETE':
        read(function(books){
          books = books.filter(item=>item.bookId !== id);
          write(books, function(){
            res.end(JSON.stringify({})); //=> 删除返回空对象
          })
        });
        break;
    }
    return
  }

  //=> 读取路径
  fs.stat('.' + pathname,  function(err, stats){
    if (err){
      res.statusCode = 404;
      res.end('NOT FOUND');
    } else {
      if (stats.isDirectory()){
        let p = path.join('.' + pathname, './index.html');
        fs.createReadStream(p).pipe(res);
      } else {
        fs.createReadStream('.' + pathname).pipe(res);
      }
    }
  })

}).listen(3000);
