"use strict";
function Blog() {
    return (
        <div className="blog">
            <h1>
                Blog
            </h1>
            <h4>
                My Web Development Experience

            </h4>
            <p>
                    I learn some basic Web Development from Youtube and other source online. I made a web application for my software Design class. I'm also in progress of making my personal website. I know a bit of html, css, and Javascript. I want
                    to rehresh my memory and learn more about Web Development.
            </p>



            <h4>
                    Server Page
            </h4>
                    <p id = "Server_Page">
                        Server Page click <a href="Server" target="_blank">here</a> to see my Server Side Page.
                    </p>

                    <p>
                        If you would like to see my "Hello World" API open up in a new tab,
                        click <a href="hello" target="_blank">here</a>.
            </p>           

            <h4>
                A Proposed Database Table 
            </h4>
            <p>
                    Users are Temple Students. Other database table is Food Rating on Temple Food 
                </p>

                <p>
                    <ul>
                        <li>
                            RaterID(Primary key, Integer)
                        </li>
                        <li>
                           Food Description (Unique,String)
                        </li>
                        <li>
                            Resturant Name (String)
                        </li>
                        <li>
                            Food Item picture(nullable, String)
                        </li>
                        <li>
                           Food Item Name (String)
                        </li>
                        <li>
                            Food Item Price (nullable,decimal)
                        </li>
                        <li>
                            Food WaitTime (nullable,decimal)
                        </li>
                        <li>
                            Food Rating 1-10(Integer)
                        </li>
                        <li>
                            Web Users ID(Foregin Key, Int)
                        </li>
                    </ul>
                </p>

            <h4>            
                My Database Experience

            </h4>
          
            <p>
                    I work with Database in the past before. I work with SQL and learn how to naviagte through a Database. I also work with Django before but I forgot most of it. 
            </p>
               
            Click <a target="_blank" href='docs/Truong_database.pdf'>here</a> to see my database document
                




            <h4>
                Blog Entries
            </h4>
            <h3>
                My HW01 Home Page
            </h3>
            <p>
                    In this module, I found making the index.html and changing the background-color and text to be easy. The part that I found hard and confusing was using bootstrap and connecting 
                    to the server from my local pc. I feel like I learn valuable skills like making an API for my Web Dev. I also learn how to connect my website to a Server. 
            </p>
            
            <h3>
                My HW2 DB
            </h3>
            <p>
                    I found it very easy to make the database and run the commands to naviagte through the database. The hardest part for me was finding image url that work for the database. Another 
                    The thing I found valuable was being able to learn sql commands and practice them. It was my first time using MySQL workbench and it was nice to see the table.
            </p>

            <h3>
                My HW3 SPA
            </h3>
            <p>
                    I found it easy to transfer my home and blog content into the react componets. It was hard understanding how the react works. It also took some
                    time to understand the code and know what each files does. I find it valuable that we are using react router instead of making a mutiple page website.
            
            </p>

            <h3>
                My HW4 JS Object
            </h3>
            <p>
                    I found it easy to make the function that takes a destructured parameter object with default values and calling the fucntion. It was hard to create original events to connect with my componets. 
                    It was also hard to organize the object so that it can show nicely on the page. I find it valuable that we are using function that accept destructured parameter object with default values because we can have empty object pass to the function. 
            
            </p>

            
            <h3>
                My HW5 WebAPI
            </h3>
            <p>
                   Important concepts I learn for this week is how to connect to the MySQL Database and extract data from it. I found it very easy to debug the code because of all the error message I receive. It was very helpful to 
                   have all the trycatch case for debug. I found tunneling to be confusing at first but then I understand it after using it. 
            </p>

            <p> 
                Click <a target="_blank" href='docs/WebApi_error.pdf'>here</a> to see Web API error document
            </p>

            <p> 
                lick <a target="_blank" a href="webUser/getAll">here</a> to see my List User API.
            </p>
            
            <p> 
                Click <a target="_blank" a href="foodrating/getAll">here</a> to see my List Other API. 
            </p>
            
            <h3>
                My HW6 Show Data & Ajax
            </h3>
            <p>
                   For this module, I found it easy to call database with Ajax and display it on to my website. The part that I found hard 
                   was doing the Filterable and sort part for my data. I spend some time learning and understand how the Filterable and sort functions work and how 
                   to debug them. I found it very important to learn Ajax for future project that need to called database. 
            </p>

            <h3>
                My HW7 Logon
            </h3>
            <p>
                   For this module, I found it easy to link the react components to the index pages so that when it's click it will transfer. I found it diffcult and fun to to create my own React content generator function 
                   that call the web api for logon,logoff, and profile. It's important to be challenging and be force to code and think for yourself with less copy 
                   and paste code.
            </p>

            <h3>
                My HW8 Insert
            </h3>
            <p>
                   For this module, I found it easy to insert my other table into the database. I found it diffcult to insert my other data using react into databse. It was very similar to insert with react 
                   but a few more steps. I found it important to know how to insert data into database for future project. 
            </p>

            <h3>
                My HW 9 Update
            </h3>
            <p>
                   For this module, I found it easy to update my other table into the database. I found the lab useful because I was able to reuse the code and logic 
                   from it inside the HW 9 Update. I found it important to make sure that we have the correct inputs for database to upadate or insert.
            </p>

            <h3>
                My HW 10 Delete
            </h3>
            <p>
                   For this module, I found it easy to understand the logic of the Delete API and how it's suppose to be used. I found it important that we need to 
                   use preivous skills to complete this homework. I didn't face any major problem while doing this lab. 
            </p>

        </div>
    );
}