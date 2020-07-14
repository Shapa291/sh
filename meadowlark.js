var express = require('express');

var app = express();

var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});
    app.engine('handlebars', handlebars.engine);
    app.set('view engine','handlebars');

var fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки",
    "Не бойлся неводомого",
    "Тебя ждет приятный сюрприз",
    "Будь проще везде, где только можно",
]

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('home')
});

app.get('/about', function(req,res){
    var RandomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', {fortune: RandomFortune});
});

//Пользовательская страница 404
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//Пользовательская страница 404
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){

    console.log( 'Express запущен на hhtp://localhost:' + app.get('port') + '; Нажмите Ctrl+C для завершения');
});
