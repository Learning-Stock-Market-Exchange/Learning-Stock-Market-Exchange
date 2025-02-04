const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql');
// const multer = require('multer')

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended:true }))
// app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}))

app.get('/', (req, res) => {
  res.send("The Get request is fulfilled")
})

var pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Sandhya@1962',
  database: 'stock_app'
});


require('./routes')(app, pool)

app.listen(5000, () => {
  console.log("Rental App running on 5000 port.")
})