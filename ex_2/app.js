var express = require('express');
var path = require('path');
var http = require('http');
var ejs = require('ejs');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.get('/', function (req, res) {
    res.render('index', function (err, str) {
        res.write(str)
    })
    var Pagelets_list ={
        pagelet1:false,
        pagelet2:false
    }

    function is_end(pagelet) {
        Pagelets_list[pagelet]=true;
        for (x in Pagelets_list) {
            if(!Pagelets_list[x]){
                return;
            }
        }
        res.end();
        return;
    }

    function Pagelets(pagelet) {
        res.write('<script>bigpipe.set("' + pagelet + '",' + JSON.stringify({'pageletName': pagelet}) + ');</script>');
        is_end(pagelet)
    }
    setTimeout(function(){Pagelets("pagelet1");},2000);
    setTimeout(function(){Pagelets("pagelet2");},3000);
});

http.createServer(app).listen(3000);
