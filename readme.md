# Project 2
#### By NAME

## Project Summary

I will be building a grocery list app. The tools I will be using are JavaScript, express, liquid, liquid-express-views, dotenv, mongoose, morgan, and method-override. 

## Models

Model: Grocery

name: String
type: String
onSale: Boolean

## Route Table

List your routes in a table

| url | method | action |
|-----|--------|--------|
| /groceryList | get | get all grocery list items (index)|
| /groceryList/:id | get | get a particular grocery (show)|
| /groceryList/seed | get | seed grocery list data (seed)|
| /groceryList/new | get | fill out form for new grocery (new)|
| /groceryList | post | create new grocery (create)|
| /groceryList/:id/edit | get | edit grocery item (edit)|
| /groceryList/:id | put | update grocery item (update)|
| /groceryList/:id | delete | delete a grocery item (destroy)|

## User Stories
- user can visit /groceryList and see a list of all groceries
- user can click on a name of a grocery and be taken to a show page
- user can click a delete button on the show page to delete the item
- user can click a new button on the index page and get a new grocery form
- user can click a create button on form page to create new grocery
- user can click an edit button grocery page to get an edit page
- user can click an update button on edit page to update grocery

## Challenges

- detail roadblocks and anything you did to overcome whether you did or didn't

## List of Technologies