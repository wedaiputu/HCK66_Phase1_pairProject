
const express = require('express');
const app = express();
const router = require('./routes');
const port = 3007
// const {Destination, Plane, Pilot, Schedule} = require('./models')
const csvExpress = require('csv-express');



app.set("view engine", "ejs")
app.use(express.static("views"))
app.use(express.urlencoded({extended:true}))

app.use('/', router)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
