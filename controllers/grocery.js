/////////////////////////////////
// Import our Dependencies
/////////////////////////////////
const express = require("express") // express for Router function
const Grocery = require("../models/grocery.js") // grocery model

/////////////////////////////////
// create router
/////////////////////////////////
const router = express.Router()


/////////////
// Grocery List Routes
/////////////

// seed route - seed our starter data
router.get("/seed", (req, res) => {
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
router.get("/", (req, res) => {
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
router.get("/new", (req, res) => {
    res.render("groceries/new.liquid")
})

// create - post request - /groceries
router.post("/", (req, res) => {
    // convert the checkbox property to true or false
    req.body.addedToCart = req.body.addedToCart === "on" ? true : false

    // create the new grocery
    Grocery.create(req.body)
    .then((grocery) => {
        // redirect the user back to index route
        //res.redirect("/groceries")
        setTimeout(function() {
            res.redirect("/groceries")
        }, 5000)
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// edit route - get request - /groceries/:id/edit
router.get("/:id/edit", (req, res) => {
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
router.put("/:id",(req, res) => {
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
router.delete("/:id", (req, res) =>{
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
router.get("/:id", (req, res) => {
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
// export the router
/////////////////////////////////
module.exports = router