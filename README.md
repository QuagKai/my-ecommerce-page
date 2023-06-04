# E-commerce website
- First group project of full stack application
- This project is about building a functional e-commerce website
- The project emphasized Javascript, NodeJS, EJS, ExpressJS and MongoDB

**Running the project:
You should install the nodemon package for the best experience since some node index.js will result wiht the error that a port already in use
After installing nodemon package using command 'nodemon index.js'. Everytime you save the javascript files in the project, it would be start over the website
In the index.js file, I have included the mongo datbase url with the variable name MONGO_URL_K
We store our data on the 'test'database


**Using the website:
-Many anchor links have not been inserted the link so there are some section you can click:
	All Vendor (Only on Homepage)
	All Products (Only on Homepage)
	Vendor profile, Shipperhub, Contact, Login, Logout, Cart (On the navgation bar)
	The logo and groupname will direct to homepage (On the navigation bar)


**For the users to access my webpage(created for testing server):
	username: helo ; password:123 ; role: customers
	username: Acne ; password:123 ; role: vendors
	username: Bode ; password:123 ; role: vendors
	username: Mihara ; password:123 ; role: vendors
	username: ship ; password:123 ; role: shipper
-The three account with vendors role will display their own product which mean log in with Acne will only display Acne'products
-Shipperhub will be only for the shippers role
-Vendor profile will be only for the vendors role
