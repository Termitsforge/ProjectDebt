import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import mysql from 'mysql2';

let user = {},
    count_users = 0;

const app = express();
const PORT = 3000;
const _dirname = path.resolve();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "debts_project",
    password: "root"
});

const Parser = bodyParser.urlencoded({
    extended: false
});
app.set("view engine", "hbs");
hbs.registerPartials(_dirname + "/views/partials");
app.use(express.static(path.join(_dirname, '/public')));
/*Sing In */
app.get('/', (req, res) => {
    res.render('sing_in.hbs');
});
app.post('/sing_in', Parser, (req, res) => {
    user.name = req.body.log_in;
    res.redirect('/main');
});
/*Sing_up*/
app.get('/sing_up', (req, res) => {
    res.render('sing_up.hbs');
});
app.post('/sing_up', Parser, (req, res) => {
    user.name = req.body.log_in;
    connection.query("SELECT COUNT(*) as count FROM users", function (err, results, fields) {
        count_users = results[0].count;
         // число пользователей
    });
    console.log(count_users);
    connection.query("INSERT INTO users VALUES(?,?,?,?)", [count_users+=1, req.body.log_in, req.body.pass, req.body.email], function (err, results) {
        if (err) console.log(err);
        else console.log("Данные добавлены");
    });
    res.redirect('/main');
});
/*Main*/
app.get('/main', Parser, (req, res) => {
    res.render('main_ws.hbs', {
        name: user.name
    });
});

/*Notebook*/
app.get('/notebook', (req, res) => {
    res.render('notebook.hbs', {
        name: user.name
    });
});

app.listen(PORT, () => {
    console.log(`Server start in port ${PORT}...`);
});