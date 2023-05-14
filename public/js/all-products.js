document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product-card');
    const rangeInput = document.getElementById('price-range');
    const rangeOutput = document.getElementById('price-range-value');
    const sortOrder = document.getElementById('sort-order');
  
    rangeInput.addEventListener('input', function() {
      rangeOutput.textContent = `$${rangeInput.value}`;
      filterProductsByPrice(Number(rangeInput.value));
    });
  
    sortOrder.addEventListener('change', function() {
      sortProductsByPrice();
    });
  
    function filterProductsByPrice(maxPrice) {
      products.forEach(function(product) {
        const price = Number(product.dataset.price);
        if (price <= maxPrice) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }
  
    function sortProductsByPrice() {
      const sortedProducts = Array.from(products).sort(function(a, b) {
        const priceA = Number(a.dataset.price);
        const priceB = Number(b.dataset.price);
        const sortOrderValue = sortOrder.value;
        if (sortOrderValue === 'asc') {
          return priceA - priceB;
        } else if (sortOrderValue === 'desc') {
          return priceB - priceA;
        }
      });
  
      const productContainer = document.getElementById('product-container');
      sortedProducts.forEach(function(product) {
        productContainer.appendChild(product);
      });
    }
  });