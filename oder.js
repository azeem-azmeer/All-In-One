// Order management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm'); // Reference to the order form
    const orderTableBody = document.querySelector('#orderTable tbody'); // Reference to the table body for displaying the order
    const totalPriceElement = document.getElementById('totalPrice'); // Reference to the total price element
  
    let order = []; // Array to store the current order
    let favourites = []; // Array to store favourite orders
  
    // Function to update the order
    function updateOrder() {
        order = []; // Clear current order array
        orderTableBody.innerHTML = ''; // Clear current order table
        let totalPrice = 0; // Initialize total price to 0
  
        // Get all number inputs in the order form
        const inputs = orderForm.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            const amount = parseFloat(input.value) || 0; // Get the input value, default to 0 if invalid
            if (amount > 0) {
                const category = input.getAttribute('data-category'); // Get the category from data attribute
                const price = parseFloat(input.getAttribute('data-price')); // Get the price from data attribute
                const item = input.previousSibling.nodeValue.trim(); // Get the item name from the previous sibling text node
                const itemPrice = amount * price; // Calculate the item price
                order.push({ item, category, amount, price: itemPrice }); // Add item to the order array
  
                // Create a new row for the order table
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item}</td><td>${category}</td><td>${amount}</td><td>$${itemPrice.toFixed(2)}</td>`;
                orderTableBody.appendChild(row); // Add the row to the table body
  
                totalPrice += itemPrice; // Add item price to the total price
            }
        });
  
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`; // Update the total price element
    }
  
    // Function to save the current order as favourites
    function saveFavourites() {
        localStorage.setItem('favourites', JSON.stringify(order)); // Save the order array to local storage
        alert('Order saved as favourites!'); // Notify the user
    }
  
    // Function to apply the saved favourites to the order form
    function applyFavourites() {
        favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Retrieve favourites from local storage
        favourites.forEach(fav => {
            const inputs = orderForm.querySelectorAll('input'); // Get all inputs in the order form
            inputs.forEach(input => {
                if (input.previousSibling.nodeValue.trim() === fav.item) {
                    input.value = fav.amount; // Set input value to the saved amount
                }
            });
        });
        updateOrder(); // Update the order table and total price
    }
  
    // Event listener for updating the order on form input
    orderForm.addEventListener('input', updateOrder);
    // Event listener for saving the order as favourites
    document.getElementById('addToFavourites').addEventListener('click', saveFavourites);
    // Event listener for applying the saved favourites
    document.getElementById('applyFavourites').addEventListener('click', applyFavourites);
    // Event listener for handling the 'Buy Now' button click
    document.getElementById('buyNow').addEventListener('click', function() {
        if (order.length > 0) {
            localStorage.setItem('order', JSON.stringify(order)); // Save the order array to local storage
            window.location.href = 'checkout.html'; // Redirect to the checkout page
        } else {
            alert('Please add items to your order.'); // Notify the user if no items are added
        }
    });
  
    // Clear order data on page load to ensure a fresh start
    localStorage.removeItem('order');
});
