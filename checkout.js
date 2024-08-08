document.addEventListener('DOMContentLoaded', function() {
  const orderTableBody = document.querySelector('#orderTable tbody');
  const totalPriceElement = document.getElementById('totalPrice');

  let order = [];
  let totalPrice = 0;

  // Retrieve the order from local storage and populate the table
  try {
      order = JSON.parse(localStorage.getItem('order')) || [];
      order.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${item.item}</td><td>${item.category}</td><td>${item.amount}</td><td>$${item.price.toFixed(2)}</td>`;
          orderTableBody.appendChild(row);
          totalPrice += item.price;
      });

      totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  } catch (error) {
      console.error('Error parsing order details:', error);
  }

  // Event listener for the submit button
  document.querySelector('.submit-btn').addEventListener('click', function(event) {
      event.preventDefault();  // Prevent the form from submitting

      // Retrieve the values from the input fields
      const name = document.querySelector('#full-name').value;
      const email = document.querySelector('#email').value;
      const address = document.querySelector('#address').value;
      const city = document.querySelector('#city').value;
      const state = document.querySelector('#state').value;
      const zip = document.querySelector('#zip-code').value;
      const cardName = document.querySelector('#name-on-card').value;
      const cardNumber = document.querySelector('#card-number').value;
      const expMonth = document.querySelector('#exp-month').value;
      const expYear = document.querySelector('#exp-year').value;
      const cvv = document.querySelector('#cvv').value;

      // Check if all the required fields are filled
      if (name && email && address && city && state && zip && cardName && cardNumber && expMonth && expYear && cvv) {
          // Calculate the delivery date, 5 days from now
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + 5);

          // Show a confirmation alert with the delivery date
          alert(`Thank you for your purchase, ! Your order will be delivered by ${deliveryDate.toDateString()}.`);

          // Optionally, clear the form after successful submission
          document.querySelector('form').reset();
      } else {
          // Show an alert if any required fields are missing
          alert('Please fill in all the required fields.');
      }
  });
});
