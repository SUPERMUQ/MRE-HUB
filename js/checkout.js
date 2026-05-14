// Update the checkout items display
function loadCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsContainer = document.getElementById("checkout-items");
  const totalContainer = document.getElementById("checkout-total");

  itemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    itemsContainer.innerHTML += `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>RM ${item.price.toFixed(2)} each</p>
        </div>
      </div>
    `;
  });

  totalContainer.innerHTML = `Total: RM ${total.toFixed(2)}`;
}

// Process the checkout
function processCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const orderData = {
    items: [...cart], // Create a copy of the cart items
    total: total
  };

  if (processOrder(orderData)) {
    // Clear cart after successful order
    localStorage.removeItem("cart");
    updateCartCount();
    alert("Order placed successfully!");
    window.location.href = "account.html";
  } else {
    alert("Failed to process order. Please try again.");
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  loadCheckoutItems();
  
  // Add event listener to checkout button
  document.getElementById("checkout-button")?.addEventListener("click", function(e) {
    e.preventDefault();
    processCheckout();
  });
});