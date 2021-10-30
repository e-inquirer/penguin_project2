// import what I need
const {Schema, model} = require("./connection")

// create the schema

const GroceryListSchema = new Schema({
    name: String,
    type: String,
    addedToCart: {type: Boolean, required: true, default: false}
})

// create the model

const GroceryList = model("GroceryList", GroceryListSchema)

// export the model
module.exports = GroceryList