const express = require('express'),
      path = require('path'),
      hbs = require('express-handlebars'),
      request = require('request'),//есть отдельный модуль request-promise
      querystring = require('querystring');

const app = express(),
      pathFile = path.join(__dirname + '../../../');

app.listen(3000);
app.use(express.static(pathFile));
app.set('view engine', 'hbs');//слежка за файлами
app.set('views', `${__dirname}\\handlebars`);//корень папки
app.engine('hbs', hbs({
    layoutsDir: 'handlebars/layouts',
    defaultLayout: 'index',
    extname: 'hbs', 
    helpers: { 
  
    },
  }))


// app.route('/news') 
    app.get('/news',(req, res) => {
        request('https://www.cbr-xml-daily.ru/daily_json.js', (err,response,body) => {
            let course = JSON.parse(body);
            if (err) return res.status(500).send({ message: err })
            return res.render('news',{
                data: course.Date
                })
        }) 
    })
   //Это запрос POST с сайта
   app.post('/news', async(req, res) => {
        let data;
        await req.on('data', (chunk) => {
            
            data = querystring.parse(chunk.toString());
                    
        })
        //Это запрост POST куда нибудь с сервера на другой сервер.
        //Ajsx как я понимаю запрос куда нибудь хоть на мой сервер, хоть на чужой с клиенской стороный
        await request.post({
            url: 'http://localhost:80/app/php/new.php',
            // form: {
            //     login: 'login1',
            //     password: 'password1'
            // }
            },

            (err, response, body) => {
            if (err) return res.status(500).send({ message: 'Ошибка 500' })
                
            console.dir(3);
            
            return res.render('news',{
                    postData: JSON.parse(body),
                    post: data//объект hbs выведет значение
                    })

            
        })
    })
app.route('/lk')

    .get((req,res) => {
        res.render('lk',{});
    })
    .post((req, res) => {
    // так работает POST запрос. Не совсем понятно. К примеру получаю запрос с сайта,
    // далее наверно посылаю запрос куда-нибудь, если получу отверт верну на сайт.
    
        request.post({
            url: 'http://localhost:80/app/php/new.php',
            // form: {
            //     login: 'login1',
            //     password: 'password1'
            // }
            },

            (err, response, body) => {
            if (err) return res.status(500).send({ message: err })
                console.dir(body);
            return res.send()

            
        })


    })



