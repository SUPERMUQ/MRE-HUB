document.addEventListener("DOMContentLoaded", function () {
  const summaryContainer = document.getElementById("order-summary");
  const orderData = JSON.parse(localStorage.getItem("currentOrder")) || 
                    JSON.parse(localStorage.getItem("orderData"));

  if (!orderData) {
    summaryContainer.innerHTML = `
      <div class="alert alert-warning">
        <p>No order data found. Please check your account page for order history.</p>
        <a href="account.html" class="button">View Account</a>
      </div>
    `;
    return;
  }

  // Format the products array
  const products = orderData.products || orderData.items || [];
  const customer = orderData.customer || {};
  const address = customer.address || {};
  const shipping = orderData.shipping || { method: 'standard', fee: 0 };
  const payment = orderData.payment || { method: 'Not specified' };

  let html = `
    <div class="order-section">
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${customer.name || 'Not specified'}</p>
      <p><strong>Email:</strong> ${customer.email || 'Not specified'}</p>
      <p><strong>Phone:</strong> ${customer.phone || 'Not specified'}</p>
      <p><strong>Address:</strong> ${address.street || ''}, ${address.postcode || ''} ${address.city || ''}, ${address.state || ''}</p>
    </div>

    <div class="order-section">
      <h3>Order Details</h3>
      <p><strong>Order Date:</strong> ${new Date(orderData.date || Date.now()).toLocaleString()}</p>
      <p><strong>Shipping Method:</strong> ${shipping.method === 'express' ? 'Express Shipping' : 'Standard Shipping'}</p>
      <p><strong>Payment Method:</strong> ${payment.method}</p>
      <p><strong>Status:</strong> ${(orderData.status || 'Processing').charAt(0).toUpperCase() + (orderData.status || 'Processing').slice(1)}</p>
      ${orderData.id ? `<p><strong>Order ID:</strong> ${orderData.id}</p>` : ''}
    </div>

    <h3 class="products-header">Products Ordered</h3>
    <div class="checkout-list">
  `;

  products.forEach(product => {
    html += `
      <div class="checkout-item">
        <img src="${product.image}" alt="${product.name}" width="80">
        <div class="item-details">
          <h4>${product.name}</h4>
          <p>Quantity: ${product.quantity}</p>
          <p>Price: RM ${product.price.toFixed(2)} each</p>
        </div>
        <div class="item-total">RM ${(product.price * product.quantity).toFixed(2)}</div>
      </div>
    `;
  });

  html += `
    </div>
    <div class="order-totals">
      <p><strong>Subtotal:</strong> RM ${orderData.subtotal?.toFixed(2) || orderData.total?.toFixed(2)}</p>
      ${shipping.fee ? `<p><strong>Shipping:</strong> RM ${shipping.fee.toFixed(2)}</p>` : ''}
      <p class="total"><strong>Total:</strong> RM ${orderData.total.toFixed(2)}</p>
    </div>
  `;

  summaryContainer.innerHTML = html;

  // Clear temporary order data
  localStorage.removeItem("cart");
  localStorage.removeItem("currentOrder");
  localStorage.removeItem("orderData");
});