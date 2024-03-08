const express = require("express");

const bodyParser = require("body-parser");

const mysql = require("mysql");

const cors = require("cors");

const app = express();

const jtw = require("jsonwebtoken");
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
const checkToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.json({ error: "debes incluir token" });
  }

  const token = req.headers["authorization"];

  let payload;
  try {
    payload = jtw.verify(token, "secret");
  } catch (error) {
    return res.json({ error: "token incorrecto" });
  }

  next();
};
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
  const { user, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (user, email, password, role) VALUES (?, ?, ?, ?)",
    [user, email, password, role],
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

  const { user, password, email, role } = req.body;

  db.query(
    "UPDATE users SET user = ?, password = ?, role = ?, email = ? WHERE id = ?",
    [user, password, role, email, userId],
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

/* login */

app.get("/login/:email", (req, res) => {
  const email = req.params.email;

  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      res.status(500).send(err);

      return;
    }

    if (result.length === 0) {
      res.status(404).send("No hubo respuesta");

      return;
    }

    res.json({ user: result[0], token: createToken(result[0].user) });
  });
});

function createToken(user) {
  const payload = {
    user: user,
  };
  return jtw.sign(payload, "secret");
}
/* Start server */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// admin default

adminDefault();
function adminDefault() {
  const { user, email, password, role } = {
    user: "admin_default",
    password: "admin",
    email: "admin@admin",
    role: "ROLE_ADMIN",
  };

  db.query(
    "INSERT INTO users (user, email, password, role) VALUES (?, ?, ?, ?)",
    [user, email, password, role],
    (err, result) => {
      if (err) {
        console.error("Error al insertar el admin default:", err);
        return;
      }
      console.log("admin deafult insertado!");
    }
  );
}
