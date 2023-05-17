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