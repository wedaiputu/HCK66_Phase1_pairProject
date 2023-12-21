
const express = require('express');
const app = express();
const router = require('./routes');
const port = 3007
// const {Destination, Plane, Pilot, Schedule} = require('./models')



app.set("view engine", "ejs")
app.use(express.static("views"))
app.use(express.urlencoded({extended:true}))

app.use('/', router)


// app.get('/', async (req, res) =>{
//   let data = await Plane.findAll({
//     include : Schedule
//   })
//   res.send(data)
// })

// app.get('/', async (req, res) =>{
//   let data = await Destination.findAll({
//     include : Schedule
//   })
//   res.send(data)
// })

// app.get('/', async (req, res) =>{
//   let data = await Plane.findAll({
//     include : Destination
//   })
//   res.send(data)
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
