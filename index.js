const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
  }
  

//CREATE person 

app.post("/person", async(req, res)=> {
    try {
        const client = await pool.connect();
        const {description} = req.body;
        const newPerson = await client.query("INSERT INTO person (description) VALUES($1) RETURNING *", 
        [description]
        )
        res.json(newPerson.rows[0]);
        res.status(200).send('Person has been inserted in the database');
        client.release();
    } catch (err) {
        console.error(err.message);
        client.release();
        await res.status(500).json({error: err});
    }
});
  
//GET ALL

app.get("/person", async (req, res)=> {
    try {
        const client = await pool.connect();
        const allPeople = await client.query("SELECT * FROM person");
        res.json(allPeople.rows);
        client.release();
    } catch (err) {
        console.error(err.message);
        client.release();
        await res.status(500).json({error: err});
    }
});

//GET ONE

app.get("/person/:id", async (req, res)=> {
    try {   
        const client = await pool.connect();
        const {id} = req.params;
        const person = await client.query("SELECT * FROM person WHERE person_id = $1", [id]);
        res.json(person.rows[0]);
        client.release();
    } catch (err) {
        console.error(err.message);
        client.release();
        await res.status(500).json({error: err});
    }
});

//UPDATE ONE

app.put("/person/:id", async (req, res)=> {
    try {
        const client = await pool.connect();
        const {id} = req.params;
        const {description} = req.body;
        const updatePerson = await client.query("UPDATE person SET description = $1 WHERE person_id = $2",
        [description, id]
        );

        res.json("person updated");
        client.release();
    } catch (err) {
        console.error(err.message);
        client.release();
        await res.status(500).json({error: err});
    }
});

//DELETE ONE

app.delete("/person/:id", async (req,res)=> {
    try {
        const client = await pool.connect();
        const {id} = req.params;
        const deletePerson = await client.query("DELETE FROM person WHERE person_id = $1",
        [id]
    );     
        res.json("person was deleted");
        client.release();
    } catch (err) {
        console.error(err.message);
        client.release();
        await res.status(500).json({error: err});
    }
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
  });