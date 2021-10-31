# Project 2
#### By NAME

## Project Summary

I will be building a grocery list app. The tools I will be using are JavaScript, express, liquid, liquid-express-views, dotenv, mongoose, morgan, and method-override. 

## Models

Model: Grocery

name: String
type: String
addedToCart: Boolean

## Route Table

List your routes in a table

| url | method | action |
|-----|--------|--------|
| /groceries | get | get all grocery list items (index)|
| /groceries/:id | get | get a particular grocery (show)|
| /groceries/seed | get | seed grocery list data (seed)|
| /groceries/new | get | fill out form for new grocery (new)|
| /groceries | post | create new grocery (create)|
| /groceries/:id/edit | get | edit grocery item (edit)|
| /groceries/:id | put | update grocery item (update)|
| /groceries/:id | delete | delete a grocery item (destroy)|

## User Stories
- user can visit /groceryList and see a list of all groceries
- user can click on a name of a grocery and be taken to a show page
- user can click a delete button on the show page to delete the item
- user can click a new button on the index page and get a new grocery form
- user can click a create button on form page to create new grocery
- user can click an edit button grocery page to get an edit page
- user can click an update button on edit page to update grocery

## Challenges

- Most bugs I encountered were due to typos or extraneous characters. I resolved the issues by correcting what was written.
- When adding the "create new grocery" modal, I had to find a way to delay the page redirect so that the modal could be seen. After some research I found that I could use the setTimeout function to delay the redirect in my grocery.js controller.

## List of Technologies

- JavaScript
- express
- liquid
- liquid-express-views
- dotenv
- mongoose
- morgan
- method-override