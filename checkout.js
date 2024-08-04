
////Checkout Java
document.addEventListener('DOMContentLoaded', function() {
    const orderTableBody = document.querySelector('#orderTable tbody');
    const totalPriceElement = document.getElementById('totalPrice');
  
    let order = [];
    let totalPrice = 0;
  
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
  
    document.querySelector('.submit-btn').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the form from submitting
  
        const name = document.querySelector('input[placeholder="azeem azmeer"]').value;
        const email = document.querySelector('input[placeholder="example@example.com"]').value;
        const address = document.querySelector('input[placeholder="street number"]').value;
        const city = document.querySelector('input[placeholder="kandy"]').value;
        const state = document.querySelector('input[placeholder="Sri lanka"]').value;
        const zip = document.querySelector('input[placeholder="123 456"]').value;
        const cardName = document.querySelector('input[placeholder="mr. azeem azmeer"]').value;
        const cardNumber = document.querySelector('input[placeholder="1111-2222-33"]').value;
        const expMonth = document.querySelector('input[placeholder="january"]').value;
        const expYear = document.querySelector('input[placeholder="2024"]').value;
        const cvv = document.querySelector('input[placeholder="1234"]').value;
  
        if (name && email && address && city && state && zip && cardName && cardNumber && expMonth && expYear && cvv) {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5);
            alert(`Thank you for your purchase! Your order will be delivered by ${deliveryDate.toDateString()}.`);
        } else {
            alert('Please fill in all the required fields.');
        }
    });
  });
  
  
  
  