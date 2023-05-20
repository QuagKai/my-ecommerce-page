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

document.addEventListener('DOMContentLoaded', function() {
    const itemsinVendor = document.querySelectorAll('.productinVendor');
    const moneyInput = document.getElementById('money-range');
    const moneyOutput = document.getElementById('money-range-value');

    moneyInput.addEventListener('input', function() {
      moneyOutput.textContent = `$${moneyInput.value}`;
      filterProductsinVendor(Number(moneyInput.value));
    });

    function filterProductsinVendor(maxPrice) {
        itemsinVendor.forEach(function(item) {
          const price = Number(item.dataset.price);
          if (price <= maxPrice) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
    }
});