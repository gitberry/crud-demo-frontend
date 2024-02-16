# CRUD Demo - the Frontend #

This is the frontend of a tandem app demonstrationnpm  - an HTML5 frontend built in VueJs 3, Vite, Pinia paired with an API built .NET 4.7 handling JWT, SQL and so forth.

Working demonstration https://demo.northberry.net/crud/

Simple demonstration of CRUD (Create Read Update Delete) functionality that goes beyond basic CRUD and dips it's toes into "real life" issues - like authentication, permissions, mobile-first design, delete vs inactivate. Frontend done in VueJs 3, Vite, Pinia and a .NET IIS (shared hosting) backend using MS-SQL.

## Front-End ##

Building on my previous JwtToken demonstration - this also uses Vue3, Vite and Pinia to build out the front-end functionality of Edit, Create, Delete (and Un-delete) of some data element that a backend provides. Each component was designed with the browser emulating a smaller phone screen - so it was obvious if something didn't work for the small screen. A version 2.0 may use "cards" - which can look good on both a small, medium and large screens.

Needless to say - the two 'ends' know the structure of the data and this is a simple demonstration of that functionality. Certain users can update - others can only view.

## Backend-End ##

A standard .NET API app - Entity Framework, JWT token handling etc with the common element being the structure of the data - which in this case started with a POC (Plain Old Class) and evolved to include odd tricks because I designed a general-purpose SQL table that I wanted to use for multiple classes. Don't do that kids - I did it because I know I'll be building more demo's and just wanted to reduce table proliferation on my SQL servers...

## Working together ##

Not only is basic CRUD demonstrated but authentication (JWT) was used to enforce a minimum permission level. I also attempt to build configurable permissions (via web.config) from ground up on first principles. After doing it I'm not sure I like it, but part of that was trying to keep the scope of a demo project low and resorting to "static" users. (Albiet configurable static users - which may be an oxymoronic phrase.)

If you look at the API backend code you'll see that at deployment, users can be configured with access (or not) to editing features. For this example, try editing with the user "sad" and you'll discover that editing doesn't work! There's a delicate play between the frontend and the backend - for example the user holds the permissions to editing, but the frontend never knows that - it just tries to edit and save and if it works - it works. This is inspiring a 2.0 version to communicate information back to the user - for a better exerience. Nonetheless - this is solved problem in more mature systems - this was simply an experiment in moving beyond basic CRUD and into practical problems of mature, fuller featured sites.

The frontend code: https://github.com/gitberry/crud-demo-frontend

The backend code: https://github.com/gitberry/crud-demo-api/blob/main/.gitignore
