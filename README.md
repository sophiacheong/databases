# Databases #
> This pair-programming sprint was assigned to me when I was a student attending Hack Reactor.

## Bare Minimum Requirements ##
You'll be working with SQL (Structured Query Language) to interact with a MySQL database. MySQL is a RDBMS (Relational Database Management System) that is incredibly popular and utilizes SQL.

You've already learned to store data for your server-side applications "in-memory" using JavaScript variables and by writing text files to disk. In this sprint, after learning to use SQL to define table schemas and write queries you're going to create a MySQL database to persist data for your chatterbox-server. Persistence you'll recall is the ability to remember data even after the server is restarted, and most applications require it.

### SQL Basics  ### 
Learn basic SQL by completing __Exercise: An Introduction to SQL.__

### Install and Set Up a Local MySQL Server ###
For this sprint you'll use MySQL as a RDBMS. If you are using a Hack Reactor pairing station, MySQL is installed and running already, and you should skip this section.
   - [ ] Ensure you have __`mysql`__ installed by running the command __`which mysql`__ from inside the terminal.
    * __If it is installed,__ verify you have version 8.0.x: use __`mysql -V`__, and if you are running the correct version it will be printed out. Examples below:
        * __`Ver 8.0.22-0ubuntu0.20.04.2`__
        * __`Ver 8.0.22 for osx10.15 on x86_64 (Homebrew)`__
        * __`mysql Ver 14.14 Distrib 8.0.22`__
    * __If you have a different verison installed such as 5.x.x:__
        * Make a helpdesk ticket to get support in uninstalling and installing the correct version.
    * __If mysql is not installed,__
      - [ ] Mac users can install it using __`brew install mysql@8.0`__.
       - [ ] Confirm you have a MySQL server running with the command __`brew services list`__. You should see __`mysql started`__ in the list of services.
       - [ ] If the server is not running, start one up by issuing the __`brew services start mysql`__. You should see __`Successfully started 'mysql'`__.
       - [ ] Windows/wsl users: This guide is available [here](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mysql). Concise steps below:
         - [ ] Open your WSL terminal (ie. Ubuntu 20.04).
         - [ ] Update your Ubuntu packages: __`sudo apt update`__
         - [ ] Once the packages have updated, install MySQL with: __`sudo apt install mysql-server`__
         - [ ] Confirm installation and get the version number: __`mysql --version`___
         - [ ] Start the mysql server by issuing the `sudo service mysql start`.
         - [ ] Confirm you have a MySQL server running with the command __`sudo service mysql status`__. It's running if you get msql info returned.
       - [ ] Be aware that anytime you want to interact with your MySQL databases during development, you will need to have the MySQL server running. Don't be surprised if a bug you come across later is a result of your not running this server when needed.

### Running the MySQL Command-Line Tool to interact with the running MySQL Server ###
When you interact with MySQL databases you are always interacting as a specific user. MySQL comes out of the box with a single user called 'root'. At install, mySQL creates the 'root' with no password by default but users can specify a password during that process. On Hack Reactor pairing stations, we have set up a user named __`student`__ for you to use so you'll be using that user rather than __`root`__.
   - [ ] Start the interactive mysql shell for the running server.
            * __On a campus pairing station:__
                * log in as the __`student`__ user, by running the command __`mysql -u student -p`__. The password is __`student`__.
            * On your own computer:
               * Login using the root user created at installation. __`mysql -u root -p`__ and specify the password you setup at install. Or, if you have no password use: __`mysql -u root`__
               * If you cannot login successfully, alter the root user to use mysql_native_password for compatability. Run the command: __`echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';" | sudo mysql`__, either leaving the password blank as given or specifying your own password at __`BY 'yourpreferredpasswordhere'`__. Then attempt to login again using the password you identified.

You should see a welcome message indicating you have successfully connected to the MySQL server and a __`mysql>`__ prompt awaiting your very first SQL query.

### Create a MySQL Database From the Interactive Prompt ###
  - [ ] From the interactive prompt, __`CREATE`__ and __`USE`__ a new database
  - [ ] Create a new table with at least 3 columns, one of them set as a primary key
  - [ ] Use the __`DESCRIBE <table-name>`__ command to verify the setup of your new table
  - [ ] __`INSERT`__ some new rows into your new table
  - [ ] Execute several queries
  - [ ] Use __`UPDATE`__ key word in at least 2 different ways
  - [ ] Exit the interactive prompt
  
### Learn to Use a Schema Visualizer ###
It's incredibly common to visually design schemas. Doing so allows you to architect your schemas without writing actual code, and to communicate your intentions to team members. Many SQL engineers use very robust IDE-like applications like [MySQL Workbench - robust MySQL design tool](https://dev.mysql.com/downloads/workbench/) that come with visual schema designers. Learning to use such a tool is a large undertaking and not at scope to the challenges at hand, therefore we will use a much more lightweight, standalone schema visualizer called [WWW SQL Designer](https://ondras.zarovi.cz/sql/demo/). Using it:
  - [ ] Create a schema with 2 new tables. Each table needs a primary key defined on one of its columns. One of the tables should have a foreign key defined on one if its columns that will relate it to the other table
  - [ ] Take a screenshot of the schema you designed and be prepared to talk about it with another engineer

### In this repo ###
Now you'll begin actual work on the codebase in this repo. Start by familiarizing yourself with the directories contained in this repo.

__`server`__
  * __`schema.sql`__ is a skeleton schema file intended to create and use a database, and create new tables within it. Aside from writing SQL at the command line, you can also [write it in a file](https://dev.mysql.com/doc/refman/8.0/en/batch-mode.html) and load it into a running MySQL server. Follow the link and read enough to learn how. In the __`schema.sql file`__ you will be writing one or more __`CREATE TABLE`__ statements that will define the structure of your database tables and loading them into your running MySQL server
    * __NOTE:__ if when running your SQL code from this file, and you find a bug in the schema or how it was generated, you'll want to "drop" all the new tables before running it again. This will reset your database by throwing away all data and schema information, to give you a blank slate before re-running your improved version of the SQL code. Look up how to do this if and when the need arises
  * __`app.js`__ will be the entrypoint for your Node.js web server code and utilizes __`express`__, the ubiquitous JavaScript web application framework. Express is an MVC framework but has a little bit of a different take on MVC than Backbone. In Express, the view is considered to be the Express server's response. Code for the models and code for the controllers exist within their own directory, mentioned below. For more information on how Express utilizes MVC, check out the the [Getting started](http://expressjs.com/en/starter/installing.html) section of the Express docs, but remember you're under extreme time pressure for this sprint, and, you'll be getting more Express content in upcoming sprints
  * __`server/db/index.js`__ uses the __`mysql`__ npm module to connect to the database server running on your computer
  * __`server/models/index.js`__ defines the __`messages`__ and __`users`__ models that your application will use. Skeletons of the models have already been created but you'll have to write out the details for their methods
  * __`server/controllers/index.js`__ defines the __`messages`__ and __`users`__ controllers that your application will use. Skeletons of the controllers have already been created but you'll have to write out the details for their methods
  * __`spec/server-spec.js`__ contains a mocha spec for testing your Node server's ability to read and write the database. This spec is not complete! It contains several lines commented with "TODO". You'll be customizing those lines to match the details of the database tables you create

__`client`__
  * An empty directory for you to put your client side code in. Either use your own chatterbox-client implementation, or, if there is something irreparably wrong with your code, use the Hack Reactor-provided solution code

__`orm-resources`__
  * __`orm-example.js`__ contains __EXAMPLE CODE__ for you to reference later in the sprint when you start refactoring your Node server to use the ___Sequelize ORM___ to read and write data to the MySQL. You'll be learning how ORMs allow you to read and write to the database in more JavaScript-like syntax instead of in raw SQL strings
__`server-pure-sql`__
  * When you begin the part of this sprint where you refactor to use an ORM, you will copy all of the code you have in the __`server`__ directory into the __`server-pure-sql`__ directory. This way you will be able to easily present your work on both versions without navigating your repo's commit history

### Create MySQL Persistent Storage for Chatterbox App ###
   - [ ] Design a multi-table schema to hold data for your chatterbox-server
      - [ ] Start by using [WWW SQL Designer] to visually design your multi-table schema
      - [ ] Edit the file __`server/schema.sql`__ to define, in SQL, the tables you have visually designed. Load the schema into your MySQL server with __`mysql -u root < path/to/schema.sql`__.
      - [ ] Open the __`mysql`__ interactive prompt and use the __`SHOW TABLES`__ and __`DESCRIBE <table-name>`__ to verify that your tables were created correctly
   - [ ] Use npm to install (and save) the __`mysql`__ npm module using __`npm install mysql --save`__. This module will allow your chatterbox-server to interact with your running MySQL server
   - [ ] Take a look at the tests in __`server/spec/server-spec.js`__. Before you start hacking on your persistent server, read the tests and try to understand what they're trying to do
      - [ ] __NOTE:__ The tests depend on the details of the schema you created, so you will need to customize the spec file with some of these details before it will run. Look for 'TODO' statements in the spec and make sure to address them all
   - [ ] Put all the pieces together to create a persistent SQL-backed chatterbox-server! Use __`server/app.js`__ as the entrypoint into your application. You will have to build out the methods in __`server/models/index.js`__ and __`server/controllers/index.js`__. Feel free to use or get inspiration from any of your previously written chatterbox-server code, though be aware that you may not be able to swap, without modification, your bare node code into this Express application. Sometimes code reuse across applications works like a charm and sometimes it is quite messy. Observe what works and what doesn't throughout the process of building out this app, using what you can from existing code, and make note afterwords where you were the most efficient
       * Note: Depending on the code you reuse from your earlier work, you may need to remove the in-memory messages array that used to store your data as part of the node process. Every new message must now result in a write to the database, and every request for data should result in a read. You should no longer need to cache any of that data in memory as part of the application
   - [ ] Have your web server connect to the MySQL database, and use the database connection to store data as messages come in
   - [ ] After storing some new messages, open up the mysql command line prompt, use and query your database to look at the new messages
   - [ ] Manually test your server's persistence by sending some chat messages to your server and then stopping the running Node server. Start your Node server up again, connect to it with the client, and see whether the messages you sent last time are still there!
   - [ ] If you haven't already, make all the unit tests pass
   - [ ] Write more unit tests to provide better test coverage of your application. How does it feel, given the time constraints, to be asked to figure out what kinds of tests to write in addition to the ones you already have? Your current predicament represents a very common engineer experience

### Refactor with Sequelize ORM ###
An ORM (Object-Relational Mapping) is usually a library that does the work of converting between objects in your code and rows in a database, so you don't have to fill your code with boilerplate SQL statements or raw SQL strings.

   - [ ] Read the Sequelize docs and the example code in __`orm-resources/orm-example.js`__ to understand how the ORM works
   - [ ] Refactor your existing server code to use Sequelize
   - [ ] Make sure your persistent chatterbox-server still passes all the tests it passed before. Since you haven't modified your server's HTTP interface or the database schema (right?), the old unit tests should still work without modification
      * Note that this is one of the biggest wins earned from writing good tests: they let you refactor and rewrite your code with confidence, since they'll tell you if you broke anything that used to work

### Tests ###
   - [ ] Add at least 2 additional tests inside __`server/spec/server-spec.js`__ that will better assure future users that your application is behaving as expected.
