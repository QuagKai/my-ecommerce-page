// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// Oriol Mole Teiga
// ID: 
// Ngo Quang Khai  (s3975831)              
// Oriol Mole Teiga (s3979344)
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo


const users = [
{
    id: 1,
    name: 'John',
    username: 'JohnCena',
    password: 'youcantseeme',
    email: 'johncena@user.com',
    role: 'user'
},

{
    id: 2,
    name: 'Rump',
    username: 'RumpBach',
    password: 'rumrum123',
    email: 'rumbach@user.com',
    role: 'vendoe'
},

{
    id: 3,
    name: 'Tom',
    username: 'TomSean',
    password: 'tomtom123',
    email: 'tomsean@user.com',
    role: 'shipper'
},

{
    id: 4,
    name: 'Admin',
    username: 'Admin',
    password: 'admin123',
    email: 'Admin@user.com',
    role: 'admin'
}
]

module.exports = users;