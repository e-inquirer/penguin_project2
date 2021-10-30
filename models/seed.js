const mongoose = require("./connection")
const GroceryList = require("./groceryList")

// save the connection in a variable
const db = mongoose.connection

// run seed code when connection opens
db.on("open", () => {

    // Delete all the existing groceries
    GroceryList.deleteMany({})
    .then(() => {

        // seed data
        const seedData = [
            {grocery: "apple"},
            {grocery: "banana"},
            {grocery: "pear"}
        ]

        // create new groceries from seed data
        GroceryList.create(seedData)
        .then((groceryList) => {
            console.log(groceryList)
            db.close()
        })
    })
})