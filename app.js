import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

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
const saltRounds = 10;
const Parser = bodyParser.urlencoded({
    extended: false
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set("view engine", "hbs");
hbs.registerPartials(_dirname + "/views/partials");
app.use(express.static(path.join(_dirname, '/public')));
/*Sing In */
app.get('/', (req, res) => {
    res.redirect('/sing_in');
});
app.get('/sing_in', (req, res) => {
    res.render('sing_in.hbs',{
        isVisible: false
    });
});
app.post('/sing_in', Parser, (req, res) => {
    let resultsQuery;
    connection.query("SELECT ID, log_in, password FROM users WHERE log_in = ?;", [req.body.log_in], function (err, results, fields) {
        resultsQuery = results[0];
        user.ID = resultsQuery.ID;
        if (resultsQuery) {
            bcrypt.compare(req.body.pass, resultsQuery.password, (err, results) => {
                if (results) {
                    user.name = req.body.log_in;
                    res.redirect('/main');
                } else {
                    res.render('sing_in.hbs', {
                        isVisible: true
                    });
                }
            });
        }
    
    });
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
        connection.query("INSERT INTO users VALUES(?,?,?,?)", [count_users += 1, req.body.log_in, bcrypt.hashSync(req.body.pass, saltRounds), req.body.email], function (err, results) {
            if (err) console.error(err);
            else{
                res.redirect('/main');
                console.log("Данные добавлены");
            } 
        });
    });
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
app.get('/ID', (req, res)=>{
    let ID = JSON.stringify(user.ID);
    res.send(ID);
});

app.post('/notebook/:id', (req, res) => {
    let arrDebts = [];
    connection.query("SELECT users.log_in, debts.Sum FROM debts, users WHERE debts.ID_Debtor = ? AND users.ID = debts.ID_Creditor;",[req.params.id], function (err, results, fields) {
        console.log(results);
        arrDebts[0] = results;
        // число пользователей
        connection.query("SELECT users.log_in, debts.Sum FROM debts, users WHERE debts.ID_Creditor = ? AND users.ID = debts.ID_Debtor;", [req.params.id], function (err, results) {
            if (err) console.error(err);
            else{
                console.log(results);
                arrDebts[1] = results;
                let send = JSON.stringify(arrDebts);
                res.send(send);
            } 
        });
    });
});







app.listen(PORT, () => {
    console.log(`Server start in port ${PORT}...`);
});