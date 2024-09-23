# App

## Intro

Qué hace esta app?

blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah

![](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExczcza2g1aHcxem1lMDZjYmc2bmlzbXNxZTA2MGpscDQ2bzJlYXB3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q8COxfEcyDdwJQIBan/giphy.gif)

## Functional description

## Use cases

-   Add post
-   Modify post
-   Remove post
-   Toggle like post
-   Toggle fav post

## Technical description

### Data model

User

-   id (oid)
-   name (string)
-   email (string)
-   password (string)
-   avatar (string)
-   favs (oid array, refers to Post id)

Post

-   id (string)
-   author (oid, refers to User id)
-   image (string)
-   text (string)
-   likes (oid array, refers to User id)

### Test Coverage

Incluir imagen de resultados testing test coverage

## Planning

### Stories

#### Add post

-   TODO choose an image from disk when you create a post

##### UI

-   DONE add + button in the footer
-   DONE on click open a modal window
-   DONE in modal show a form with post and cancel buttons, and an input field for the text
-   DONE on click post creates a new post in database by means of create-post logic
-   DONE on click cancel closes the modal window

##### Data

-   DONE add post data model with fields: date, author, image, text

#### List posts

-   DONE

#### Update post

-   DONE

## Author name and avatar in post

-   DONE

## Like / unlike in post

-   DONE