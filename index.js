let express = require('express');
let database = require('./database.js');
let app = express();

app.use(express.json());

const port = 3000;

// CORS stuff
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Visit /api/calendar to see more!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

// -------------------------------------------------------------------
// USER ROUTES
// -------------------------------------------------------------------

// Get all users
app.get('/api/users', (req, res) => {
  const getPeople = `SELECT oid, * FROM tblUsers`;

  database.all(getPeople, (error, results) => {
    if (error) {
      console.log(new Error("Could not get users"), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
})