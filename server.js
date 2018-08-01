const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.set('view engine','hbs');

app.use((req,res,next) => {
    res.render('maintenance.hbs');
//    console.log();
    
})
app.use(express.static(__dirname + '/public'));
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log',log + '\n',(err) => {
       if(err){
           console.log('Unable to append to server.log');
       } 
    });
    next();
})

app.get('/',(req,res) => {
    res.send({
        name:'Andrew',
        likes:[
            'Biking',
            'Cities'
        ]
    });
});

app.get('/about',(req,res) => {
//   res.send('About Page'); 
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    })
});
app.get('/home',(req,res) => {
   res.render('home.hbs',{
        pageTitle:'Home Page',
       welcomeMessage:'Welcome to my Page',
       currentYear: new Date().getFullYear()
   }) 
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Unable to andle request'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
//    console.log(__dirname);
});