//Este es el punto de enlace con la BD aquí se definen las rutas de
//comunicacion con la BD. Si lo comentamos ya no funciona pos man
//la ruta que se toma en el url es let url =`http://127.0.0.1:1000${slash}${input.value}`;
//esto lo podemos ver en Pos-Frontend/controllers/home.controllers.js

//This is the link point with the DB here are defined the routesof
//communication with the DB. If we comment it no longer works pos man
//the route that is taken in the url is let url =`http://127.0.0.1:1000${slash}${input.value}`;
//this we can see it in Pos-Frontend/controllers/home.controllers.js

const express = require("express");
const router = express.Router(); //Crea un objeto para poder definir rutas
const connection = require("../database");

router.get("/inventory", (req, res) => {
  //Inventario es la tabla
  const { param } = req.body;
  connection.query("CALL BUSCAR(?)", [param], (err, rows, fields) => {
    //ROWS son los datos
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
router.get("/findme", (req, res) => {
  //Inventario es la tabla
  console.log("you found me");
  res.send("hi i am here");
});

router.get("/inventory/all", (req, res) => {
  const query2 = "SELECT * FROM inventory";
  connection.query(query2, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log("no funciona");
    }
  });
});

router.post("/", function (req, res) {
  const { date, hour, name } = req.body;
  connection.query(
    "INSERT INTO transactions (date, hour, employee) VALUES (?,?,?)",
    [date, hour, name]
  );
  res.status(200).send("Mensaje enviado");
});

router.get("/employees", (req, res) => {
  const query2 = "SELECT * FROM transactions";
  connection.query(query2, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/employees/:name", (req, res) => {
  const { name } = req.params;
  // const query2 ='SELECT * FROM transactions WHERE employee = (?)'
  connection.query(
    "CALL searchByTicketOrCashier(?)",
    [name],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
        // connection.end()
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/inventory/:param", (req, res) => {
  //Inventario es la tabla
  const { param } = req.params;
  connection.query("CALL BUSCAR(?)", [param], (err, rows, fields) => {
    //ROWS son los datos
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put("/inventory/:name", (req, res) => {
  const { name } = req.params;
  const { stock } = req.body;

  const query = "CALL mangasUpdate(?,?);";
  connection.query(query, [name, stock], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Stock Updated" });
    } else {
      console.log(err);
    }
  });
});

// router.put('/inventory/:code', (req,res) =>{
//     const {code} = req.params;
//     const {stock} = req.body;
//     const {price} = req.body;

//     const query = 'CALL mangasUpdate2(?,?,?);'
//     const code2 = parseInt(code)
//     connection.query(query, [code2, stock, price], (err, rows, fields) => {
//         if(!err){
//             res.json({status: "Stock Updated mangasUpdate2"});
//         }else{
//             console.log(err);
//         }
//     });
// });

router.delete("/:titulo", (req, res) => {
  const { autor, precio, stock } = req.body;
  const { titulo } = req.params;
  connection.query(
    "DELETE FROM `inventario` WHERE titulo = ?",
    [titulo, autor, precio, stock],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Manga Deleted" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
