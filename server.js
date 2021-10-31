/////////////////////////////////
// Import our Dependencies
/////////////////////////////////
require("dotenv").config() // brings in .env vars
const express = require("express") // web framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override") // to swap request methods
const mongoose = require("mongoose") // our database library
const path = require("path") // helper functions for file paths


/////////////////////////////////
// Establish Database Connection
/////////////////////////////////
// Setup the inputs for mongoose connect
const DATABASE_URL = process.env.DATABASE_URL // url from .env
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to Mongo
mongoose.connect(DATABASE_URL, CONFIG)

// our connection messages
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("disconnected from Mongo"))
.on("error", (error) => console.log(error))

/////////////////////////////////
// Create Grocery List model
/////////////////////////////////
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose

// made a grocery list schema
const grocerySchema = new Schema({
    name: String,
    type: String,
    addedToCart: {type: Boolean, required: true, default: false}
})

// Make the Grocery Model
const Grocery = model("Grocery", grocerySchema)

// // log the model to make sure it exists
// console.log(Grocery)

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

/////////////
// Grocery List Routes
/////////////

// seed route - seed our starter data
app.get("/groceryList/seed", (req, res) => {
    // array of starter groceries
    const startGroceries = [
        { name: "apple", type: "fruit", addedToCart: false },
        { name: "beans", type: "canned", addedToCart: false },
        { name: "chips", type: "snack", addedToCart: false }
      ]
    
    // delete all groceries
    Grocery.deleteMany({})
    .then((data) => {
        // seed the starter groceries
        Grocery.create(startGroceries)
        .then((data) => {
            // send created groceries back as JSON
            res.json(data)
        })
    })
})

// index route - get - /groceries
app.get("/groceries", (req, res) => {
    // find all the groceries
    Grocery.find({})
    .then((groceries) => {
        // render the index template with the groceries
        res.render("groceries/index.liquid", {groceries})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// new route - get - /groceries/new
app.get("/groceries/new", (req, res) => {
    res.render("groceries/new.liquid")
})

// create - post request - /groceries
app.post("/groceries", (req, res) => {
    // convert the checkbox property to true or false
    req.body.addedToCart = req.body.addedToCart === "on" ? true : false

    // create the new grocery
    Grocery.create(req.body)
    .then((grocery) => {
        // redirect the user back to index route
        res.redirect("/groceries")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// edit route - get request - /groceries/:id/edit
app.get("/groceries/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id

    // get the fruit with the matching id
    Grocery.findById(id)
    .then((grocery) => {
        // render the edit page template with the grocery data
        res.render("groceries/edit.liquid", { grocery })
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// update route - put request - "/groceries/:id"
app.put("/groceries/:id",(req, res) => {
    // get the id from params
    const id = req.params.id
    
    // convert the checkbox property to true or false
    req.body.addedToCart = req.body.addedToCart === "on" ? true : false
    
    // update the item with the matching id
    Grocery.findByIdAndUpdate(id, req.body, {new: true})
    .then((grocery) => {
        // redirect user back to index
        res.redirect("/groceries")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// destroy route - delete request - /groceries/:id
app.delete("/groceries/:id", (req, res) =>{
    // grab the id from params
    const id = req.params.id
    // delete the grocery
    Grocery.findByIdAndRemove(id)
    .then((grocery) => {
        // redirect user back to grocery list
        res.redirect("/groceries")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// show route - get - /groceries/:id
app.get("/groceries/:id", (req, res) => {
    const id = req.params.id

    // get that particular grocery from the database
    Grocery.findById(id)
    .then((grocery) => {
        // render the show template with the grocery
        res.render("groceries/show.liquid", {grocery})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})




/////////////////////////////////
// Setup Server Listener 
/////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on port ${PORT}`))