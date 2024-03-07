const express = require("express");

const bodyParser = require("body-parser");

const mysql = require("mysql");

const cors = require("cors");

const app = express();

const port = 3000;

/* MySQL Connection */

const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "password",

  database: "users",
});

/* Connect to MySQL */

db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("Connected to MySQL");
});

/* Middleware */

app.use(bodyParser.json());

app.use(cors());

/* Routes */

/* List all users */

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send(err);

      return;
    }

    res.json(results);
  });
});

/* Create a new user */

app.post("/users/create", (req, res) => {
  const { user, email, password, description } = req.body;

  db.query(
    "INSERT INTO users (user, email, password, description) VALUES (?, ?, ?, ?)",
    [user, email, password, description],
    (err, result) => {
      if (err) {
        res.status(500).send(err);

        return;
      }

      const userId = result.insertId;

      db.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
        if (err) {
          res.status(500).send(err);

          return;
        }

        res.status(201).json(result[0]);
      });
    }
  );
});

/* Get a specific user */

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      res.status(500).send(err);

      return;
    }

    if (result.length === 0) {
      res.status(404).send("No hubo respuesta");

      return;
    }

    res.json(result[0]);
  });
});

/* Update a user */

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;

  const { user, password, email, description } = req.body;

  db.query(
    "UPDATE users SET user = ?, password = ?, description = ?, email = ? WHERE id = ?",
    [user, password, email, description, userId],
    (err) => {
      if (err) {
        res.status(500).send(err);

        return;
      }

      db.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
        if (err) {
          res.status(500).send(err);

          return;
        }

        res.json(result[0]);
      });
    }
  );
});

/* Delete a user */

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", userId, (err) => {
    if (err) {
      res.status(500).send(err);

      return;
    }

    res.status(200).json({ msg: "Usuario eliminado." });
  });
});

/* Start server */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
