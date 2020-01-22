let express = require('express');
let database = require('./database.js');
let app = express();

app.use(express.json());

const port = 9000;

// CORS stuff
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Visit /api/events to see more!');
});

// -------------------------------------------------------------------
// EVENTS ROUTES
// -------------------------------------------------------------------

// Get all events
app.get('/api/events', (req, res) => {
  const getEvents = `SELECT oid, * FROM tblEvents`;

  database.all(getEvents, (error, results) => {
    if (error) {
      console.log(new Error("Could not get events"), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
})

// Get one event
app.get('/api/events/:id', (req, res) => {
  const eventId = req.params.id
  const getEvent = `SELECT oid, * FROM tblEvents WHERE tblEvents.oid = ?`;

  database.get(getEvent, [eventId], (error, results) => {
    if (error) {
      console.log(new Error(`Could not get event`), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Create event
app.post('/api/events', (req, res) => {
  const reqBody = [req.body.eventName, req.body.eventDescription, req.body.location, req.body.time]
  const createNewEvent = `INSERT INTO tblEvents VALUES (?, ?, ?, ?)`
  console.log(req.body)
  database.run(createNewEvent, reqBody, (error, results) => {
    if (error) {
      console.log(`Error adding new event ${req.body.eventName}`, error)
      res.sendStatus(500)
    } else {
      console.log(`Added new event ${req.body.eventName}`)
      res.sendStatus(200)
    }
  })
})

// Update event
app.put('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const queryHelper = Object.keys(req.body).map(element => `${element.toUpperCase() } = ?`);
  const updateOneEvent = `UPDATE tblEvents SET ${queryHelper.join(', ')} WHERE tblEvents.oid = ?`;
  const queryValues = [...Object.values(req.body), eventId];

  database.run(updateOneEvent, queryValues, function (error) {
    if (error) {
      console.log(new Error('Could not update person'), error);
      res.sendStatus(500);
    } else {
      console.log(`Event with ID ${eventId} was successfully updated`);
      res.sendStatus(200);
    }
  })
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  const eventId = req.params.id
  const getEvent = `DELETE FROM tblEvents WHERE tblEvents.oid = ?`;

  database.all(getEvent, [eventId], (error, results) => {
    if (error) {
      console.log(new Error('Could not delete event'), error);
      res.sendStatus(500)
    }
    console.log("Event was successfully deleted")
    res.status(200).json({message: "Delete successful!"});
  })
})

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})