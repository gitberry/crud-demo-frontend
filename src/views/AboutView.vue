<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
</script>

<template>
    <div>        
        <h1>C.R.U.D. & More!</h1>        
        <p>
        Simple demonstration of CRUD (Create Read Update Delete) functionality that goes beyond basic CRUD and dips 
        it's toes into "real life" issues - like authentication, permissions, mobile-first design, delete vs inactivate.
        Frontend done in VueJs 3, Vite, Pinia and a .NET IIS (shared hosting) backend using MS-SQL.  
        </p>
        
        <h2>Front-End</h2>              
        <p>Building on my previous <a target="_blank" href="https://demo.northberry.net/jwt">JwtToken demonstration</a> - this also uses Vue3, Vite and Pinia to 
        build out the front-end functionality of Edit, Create, Delete (and Un-delete) of some data element that a backend provides. Each component was designed 
        with the browser emulating a smaller phone screen - so it was obvious if something didn't work for the small screen.  A version 2.0 may use "cards" - 
        which can look good on both a small, medium and large screens.
        </p><p> 
        Needless to say - the two 'ends' know the structure of the data and this is a simple demonstration of that functionality.  
        Certain users can update - others can only view.
        </p>

        <h2>Backend-End</h2>              
        <p>A standard .NET API app - Entity Framework, JWT token handling etc 
        with the common element being the structure of the data - which in this case started with a POC (Plain Old Class) and evolved to include odd tricks 
        because I designed a general-purpose SQL table that I wanted to use for multiple classes.  Don't do that kids - I did it because I know I'll be 
        building more demo's and just wanted to reduce table proliferation on my SQL servers...         
    </p>

       <h2>Working together</h2>              
        <p>Not only is basic CRUD demonstrated but authentication (JWT) was used to enforce a minimum permission level.   I also 
            attempt to build configurable permissions (via web.config) from ground up on first principles.  After doing it I'm not sure
            I like it, but part of that was trying to keep the scope of a demo project low and resorting to "static" users. 
            (Albiet configurable static users - which may be an oxymoronic phrase.)
            </p><p>
            If you look at the API backend code you'll see that 
            at deployment, users can be configured with access (or not) to editing features.  For this example, try editing with the user "sad"
            and you'll discover that editing doesn't work!  There's a delicate play between the frontend and the backend - for example the user
            holds the permissions to editing, but the frontend never knows that - it just tries to edit and save and if it works - it works.   
            This is inspiring a 2.0
            version to communicate information back to the user - for a better exerience. Nonetheless - this is solved problem in more mature
            systems - this was simply an experiment in moving beyond basic CRUD and into practical problems of mature, fuller featured sites. 
         </p>           
         <p>
         The frontend code: <a target="_blank" href="https://github.com/gitberry/crud-demo-frontend">https://github.com/gitberry/crud-demo-frontend</a>
         </p>
         <p>
         The backend code: <a target="_blank" href="https://github.com/gitberry/crud-demo-api">https://github.com/gitberry/crud-demo-api</a>
         </p>            
    </div>    
</template>
