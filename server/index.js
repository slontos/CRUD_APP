const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");
app.use(cors());
app.use(express.json());

//ROUTES//

//CREATE person 

app.post("/person", async(req, res)=> {
    try {
        const {description} = req.body;
        const newPerson = await pool.query("INSERT INTO person (description) VALUES($1) RETURNING *", 
        [description]
        )
        res.json(newPerson.rows[0]);
        res.status(200).send('Person has been updated in the database');
    } catch (err) {
        console.error(err.message);
    }
});
  
//GET ALL

app.get("/person", async (req, res)=> {
    try {
        const allPeople = await pool.query("SELECT * FROM person");
        res.json(allPeople.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//GET ONE

app.get("/person/:id", async (req, res)=> {
    try {   
        const {id} = req.params;
        const person = await pool.query("SELECT * FROM person WHERE person_id = $1", [id]);
        res.json(person.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//UPDATE ONE

app.put("/person/:id", async (req, res)=> {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updatePerson = await pool.query("UPDATE person SET description = $1 WHERE person_id = $2",
        [description, id]
        );

        res.json("person updated");
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE ONE

app.delete("/person/:id", async (req,res)=> {
    try {
        const {id} = req.params;
        const deletePerson = await pool.query("DELETE FROM person WHERE person_id = $1",
        [id]
    );     
        res.json("person was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, ()=> {
    console.log("server started on port 5000");
});