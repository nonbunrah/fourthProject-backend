const db = require('./database.js');

const users_list = [
  {
    name: "RJ",
    email: "rj@rj.com",
    password: "1234"
  },
  {
    name: "Felipe",
    email: "felipe@felipe.com",
    password: "2345"
  },
  {
    name: "Dann",
    email: "dann@dann.com",
    password: "0000"
  }
];

const events_list = [
  {
    eventName: "Doctor's Appointment",
    eventDescription: "Pain in lower left abdomen",
    location: "Kaiser - SF",
    time: "13:00"
  },
  {
    eventName: "Warriors Game",
    eventDescription: "Warriors play the Rockets",
    location: "Chase Center",
    time: "19:00"
  },
  {
    eventName: "Movie Date",
    eventDescription: "Going to see 'Knives Out' with the gf",
    location: "Century theaters",
    time: "9:00"
  },
]

const deleteUsers = `DELETE FROM tblUsers`
const deleteEvents = `DELETE FROM tblEvents`
const insertIntoUsers = `INSERT INTO tblUsers (name, email, password) VALUES (?, ?, ?)`
const insertIntoEvents = `INSERT INTO tblEvents (eventName, eventDescription, location, time) VALUES (?, ?, ?, ?)`

db.run(deleteUsers, error => {
  if (error) console.log(new Error('Could not delete Users'), error);
  else {
    users_list.forEach(user => {
      db.run(insertIntoUsers, [user.name, user.email, user.password], error => {
        if (error) console.log(new Error('Could not add user'), error);
        else {
          console.log(`${user.name} successfully added to the database!`);
        }
      });
    });

    db.run(deleteEvents, error => {
      if (error) console.log(new Error('Could not delete event'), error);
      else {
        events_list.forEach(event => {
          db.run(insertIntoEvents, [event.eventName, event.eventDescription, event.location, event.time], error => {
            if (error) console.log(new Error('Could not add event'), error);
            else {
              console.log(`${event.eventName} successfully added to the database!`);
            }
          });
        });
      }
    });
  }
});