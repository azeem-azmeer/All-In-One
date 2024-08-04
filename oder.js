// Order management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const orderTableBody = document.querySelector('#orderTable tbody');
    const totalPriceElement = document.getElementById('totalPrice');
  
    let order = [];
    let favourites = [];
  
    function updateOrder() {
        order = [];
        orderTableBody.innerHTML = '';
        let totalPrice = 0;
  
        const inputs = orderForm.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            const amount = parseFloat(input.value) || 0;
            if (amount > 0) {
                const category = input.getAttribute('data-category');
                const price = parseFloat(input.getAttribute('data-price'));
                const item = input.previousSibling.nodeValue.trim();
                const itemPrice = amount * price;
                order.push({ item, category, amount, price: itemPrice });
  
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item}</td><td>${category}</td><td>${amount}</td><td>$${itemPrice.toFixed(2)}</td>`;
                orderTableBody.appendChild(row);
  
                totalPrice += itemPrice;
            }
        });
  
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
  
    function saveFavourites() {
        localStorage.setItem('favourites', JSON.stringify(order));
        alert('Order saved as favourites!');
    }
  
    function applyFavourites() {
        favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        favourites.forEach(fav => {
            const inputs = orderForm.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.previousSibling.nodeValue.trim() === fav.item) {
                    input.value = fav.amount;
                }
            });
        });
        updateOrder();
    }
  
    orderForm.addEventListener('input', updateOrder);
    document.getElementById('addToFavourites').addEventListener('click', saveFavourites);
    document.getElementById('applyFavourites').addEventListener('click', applyFavourites);
    document.getElementById('buyNow').addEventListener('click', function() {
        if (order.length > 0) {
            localStorage.setItem('order', JSON.stringify(order));
            window.location.href = 'checkout.html';
        } else {
            alert('Please add items to your order.');
        }
    });
  
    // Clear order data on page load
    localStorage.removeItem('order');
    
  });
  