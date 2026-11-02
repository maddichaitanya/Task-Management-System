#   Task Management Application 

Create the project:-
        1. make sure you have these installed:
                a. Node.js and npm
                b. VS Code
                c. MongoDB Compass
                d. MongoDB local server or a MongoDB Atlas account
        Open VS Code terminal.

    1.  Create the React frontend
            cmd:- npm create vite@latest client -- --template react

            cmd:-  npm install axios react-router-dom lucide-react
            // Install Tailwind CSS
            cmd:-  npm install tailwindcss @tailwindcss/vite

            step 1:- 
                        import tailwindcss in vite.config.js and index.css

    2.  create the backend 

                cmd :- npm init -y
                
                cmd:- 
                        npm install express mongoose cors dotenv bcryptjs jsonwebtoken
                        npm install -D nodemon

        express() :- Create Express Application 
        corse() :- Allows Frount-BackENd communication
        express.json() :- read JSON request data
        app.get()  :- creates a GET API
        app.listen() :- Start the Backend Server 


        3. MongoDB connection using Mongoose:-
                Mongoose is a library that helps Node.js communicate with MongoDB. It also allows us to define schemas and models for our database.

                database_name:-  taskflow
        


Step by step process of my project 

        1. Project setup                        done
        2. MongoDB connection                   done
        3. User and Task models                 processing    
        4. Registration API
        5. Login API with JWT
        6. Authentication middleware
        7. Task CURD APTs  
        8. React frontend integration         