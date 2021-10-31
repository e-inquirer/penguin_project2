/////////////////////////////////////////
// Import our Dependencies
/////////////////////////////////////////
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

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

/////////////////////////////////////////
// Export the Grocery Model
/////////////////////////////////////////
module.exports = Grocery