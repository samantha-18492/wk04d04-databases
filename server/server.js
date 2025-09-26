import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

const app = express();

app.use(express.json());

dotenv.config();

app.use(cors());

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get("/", (req, res) => {
  res.status(200).json(`You're looking at my root route`);
});

//create get request to your database
app.get("/animals", async (req, res) => {
  const result = await db.query(`SELECT * FROM animals`);

  res.json(result.rows);
});

//create a post request that allows people to make new jokes
app.post("/animals", async (req, res) => {
  const body = req.body;
  //pull out specific fields from the request body
  const animalFromClient = req.body.animal;
  const habitatFromClient = req.body.habitat;

  const data = await db.query(
    //we use parameter placeholders $1 $2 and then put the actual value in an array as a second parameter so that our data is more secure
    `INSERT INTO animals (animal, habitat) VALUES ($1, $2)`,
    [animalFromClient, habitatFromClient]
  );

  res.json({ status: `Animal inserted into database` });
});

app.listen(8080, () => {
  console.log("Server started on http:// localhost:8080");
});
