const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    mongoose = require('mongoose'),
    { createProxyMiddleware } = require('http-proxy-middleware'),
    mainRoutes = require ('./routes/main'),
    session = require('express-session'),
    debtRoutes = require ('./routes/debt'),
    notebookRoutes = require ('./routes/notebook'),
    singInRoutes = require ('./routes/sing_in'),
    singUpRoutes = require ('./routes/sing_up');
    veriableMiddleWare = require('./middleware/variablse');
let user = {};
const app = express();
const PORT = 3020;
const _dirname = path.resolve();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(_dirname, '/public')));

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}))
app.use(veriableMiddleWare);
app.use('/main', mainRoutes);
app.use('/debt', debtRoutes);
app.use('/notebook', notebookRoutes);
app.use('/sing_in', singInRoutes);
app.use('/sing_up', singUpRoutes);

app.use(bodyParser.json());

app.set("view engine", "hbs");
hbs.registerPartials(_dirname + "/views/partials");

app.get('/', (req, res) => {
    res.redirect('/sing_in');
});



// const app2 = express();

// app2.get('/', (req, res) => {
//     res.send('This second server');
// });
// app2.get("/count", Parser, (req, res) => {
//     connection.query("SELECT COUNT(*) as count FROM person", function (err, results, fields) {
//         let count_person = JSON.stringify(results[0].count);
//         res.send(count_person);
//         // число записей
//     });
// });
// app2.get('/notebook', (req, res) => {
//     res.render('notebook.hbs', {
//         name: user.name
//     });
// });
// app2.get('/ID', (req, res) => {
//     let ID = JSON.stringify(user.ID);
//     res.send(ID);
// });
// const jsonPlaceholderProxy = createProxyMiddleware({
//     target: ' http://localhost:8001',
//     changeOrigin: true,
//     logLevel: 'debug',
// });
// app.use('/notebook', jsonPlaceholderProxy);
// app.use('/ID', jsonPlaceholderProxy);
// app2.listen(8001, () => {
//     console.log(`Server start! PORT : 8001...`);
// });

async function start() {
    try {
        const url = 'mongodb+srv://user123:3vO5giuoQBlX8dqA@cluster0.sobr9.mongodb.net/DEBTProject'
        await mongoose.connect(url, { useNewUrlParser: true });


        app.listen(PORT, () => {
            console.log(`Server start in port ${PORT}...`);
        });
    } catch (e) {
        console.log(e);
    }

}
start();
