import mysql from "mysql2";
import express from "express";
import cors from "cors";

const connection = mysql.createConnection({
    host: "localhost",
    database: "user_login",
    user: "root",
    password: "pass123"
})

const app = express();
app.use(express.json());

const PORT = 8080;

app.use(cors({
    origin: `http://localhost:3000`
}));


app.listen(PORT, () => {
    console.log(`SERVER : http://localhost:${PORT}`)
    // connection.connect((err) => {
    //     if (err) throw err;
    //     console.log("DATABASE CONNECTED");
    // })
})

app.use("/all", (req, res) => {
    const sql_query = `select * from user_table`
    connection.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.post('/login', (req, res) => {
    const { username, password, usertype } = req.body;
    const sql_query = `Select * from user_table where username="${username}" and password="${password}" and usertype="${usertype}"`;
    connection.query(sql_query, (err, result) => {
        if (err) return res.status(500).send({ message: 'something went wrong. Please contact the app administrator.' });
        if (!(result.length > 0)) return res.status(404).send({ message: 'No user found with the given credentials.' });
        if (result.length > 0) {
            return res.status(200).send({ message: 'Success', data: result[0] });
        }
    });
});

app.post("/save", (req, res) => {
    console.log(req.body);
    const {username, password, user_type} = req.body;
    const sql_query = `INSERT INTO user_table (username, password, user_type) VALUES ("${username}", "${password}", "${user_type}")`;
    connection.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

    app.post("/parentForm", (req, res) => {
        console.log(req.body);
        const {droppingGuardian, minorName, fromLocation, toLocation, flightNumber, flightDate, departingGuardianAddress, departingGuardianTelephoneNumber, arrivalGuardianAddress, arrivalGuardianName, arrivalGuardianTelephone} = req.body;
        const sql_query = `INSERT INTO parent_form (droppingGuardian, minorName, fromLocation, toLocation, flightNumber, flightDate, departingGuardianAddress, departingGuardianTelephoneNumber, arrivalGuardianAddress, arrivalGuardianName, arrivalGuardianTelephone) VALUES ("${droppingGuardian}", "${minorName}", "${fromLocation}", "${toLocation}", "${flightNumber}", "${flightDate}", "${departingGuardianAddress}", "${departingGuardianTelephoneNumber}", "${arrivalGuardianAddress}", "${arrivalGuardianName}", "${arrivalGuardianTelephone}")`;
        connection.query(sql_query, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
});
