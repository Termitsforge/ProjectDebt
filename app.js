import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

let user = {},
    count_users = 0,
    count_like = 0;
const app = express();
const PORT = 8000;
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
        if (resultsQuery) {
            bcrypt.compare(req.body.pass, resultsQuery.password, (err, results) => {
                if (results) {
                    user.name = req.body.log_in;
                    user.ID = req.body.ID;
                    res.redirect('/main');
                } else {
                    res.render('sing_in.hbs', {
                        isVisible: true
                    });
                }
            });
        }else{
            res.render('sing_in.hbs', {
                isVisible: true
            });
        }
    
    });
});
/*Like */
app.post('/like', (req,res) =>{
})
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
        name: user.name,
        count_like: count_like
    });
});
/*Notebook*/
app.get('/notebook', (req, res) => {
    res.render('notebook.hbs', {
        name: user.name,
        count_like: count_like
    });
});
/*Dept*/
app.get('/dept', (req,res) => {
    res.render('dept.hbs', {
        name: user.name,
        count_like: count_like
    });
});
app.post('/dept', (req, res) =>{
    console.log(req.body);
    connection.query("SELECT ID FROM users WHERE log_in = ?;", [req.body.name], function (err, results, fields) {
        let ID_dept = results[0];
        // ID должника
        connection.query("INSERT INTO users VALUES(?,?,?)", [ID_dept, user.ID, req.body.sum], function (err, results) {
            if (err) console.error(err);
            else{
                res.redirect('/main');
                console.log("Данные добавлены");
            } 
        });
        
    });

});
app.listen(PORT, () => {
    console.log(`Server start in port ${PORT}...`);
});