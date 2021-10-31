/////////////////////////////////
// Import our Dependencies
/////////////////////////////////
require("dotenv").config() // brings in .env vars
const express = require("express") // web framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override") // to swap request methods
const path = require("path") // helper functions for file paths
const GroceriesRouter = require("./controllers/grocery")

/////////////////////////////////
// Create our app with object, configure liquid
/////////////////////////////////
// import liquid
const liquid = require("liquid-express-views")
// construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")

// // log to see the value of viewsFolder
// console.log(viewsFolder)

// Create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root: viewsFolder})

// // console.log app to confirm it exists
// console.log(app)


/////////////////////////////////
// Register Our Middleware
/////////////////////////////////
// logging
app.use(morgan("tiny"))
// ability to overide request methods
app.use(methodOverride("_method"))
// ability to parse urlencoded from form submission
app.use(express.urlencoded({extended: true}))
// setup our public folder to serve files statically
app.use(express.static("public"))

/////////////////////////////////
// Routes
/////////////////////////////////

app.get("/", (req, res) => {
    res.send("Your server is running.")
})

// Register Groceries Router
app.use("/groceries", GroceriesRouter)


/////////////////////////////////
// Setup Server Listener 
/////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on port ${PORT}`))