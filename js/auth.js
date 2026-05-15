// Auth System - Single File Solution for MRE HUB

// ========================
// 1. USER MANAGEMENT
// ========================

// Initialize users array if not exists
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return !!getCurrentUser();
}

// ========================
// 2. AUTH UI UPDATES
// ========================

function updateAuthUI() {
  const currentUser = getCurrentUser();
  const authLinks = document.querySelector('.auth-links');
  
  if (!authLinks) return;
  
  if (currentUser) {
    authLinks.innerHTML = `
      <div class="user-dropdown">
        <button class="user-menu">
          <i class="fas fa-user-circle"></i> ${currentUser.username}
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="account.html">Account</a>
          <a href="#" id="logout-btn">Logout</a>
        </div>
      </div>
      <a href="cart.html" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">0</span>
      </a>
    `;
    
    // Add logout functionality
    document.getElementById('logout-btn')?.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      updateAuthUI();
      window.location.href = 'index.html';
    });
  } else {
    authLinks.innerHTML = `
      <a href="signin.html" class="button small">Sign In</a>
      <a href="register.html" class="button small outline">Register</a>
      <a href="cart.html" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">0</span>
      </a>
    `;
  }
  
  updateCartCount();
}

// ========================
// 3. REGISTRATION
// ========================

function setupRegistration() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;
  
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('register-email').value;
    
    // Validate email must be @gmail.com
    if (!email.endsWith('@gmail.com')) {
      alert('Please use a Gmail address (@gmail.com)');
      return;
    }
    
    const user = {
      username: document.getElementById('register-username').value,
      email: email,
      password: document.getElementById('register-password').value,
      orders: []
    };
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if email exists
    if (users.some(u => u.email === user.email)) {
      alert('Email already registered. Please sign in.');
      return;
    }
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    updateAuthUI();
    window.location.href = 'index.html';
  });
}

// ========================
// 4. LOGIN
// ========================

function setupLogin() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      updateAuthUI();
      
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
      window.location.href = redirect || 'index.html';
    } else {
      alert('Invalid email or password');
    }
  });
}

// ========================
// 5. ACCOUNT PAGE
// ========================

function setupAccountPage() {
  const userInfoContainer = document.getElementById("user-info");
  const orderHistoryContainer = document.getElementById("order-history");
  
  if (!userInfoContainer || !orderHistoryContainer) return;
  
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    userInfoContainer.innerHTML = `
      <div class="not-signed-in">
        <p>Please sign in to view your account.</p>
        <div class="auth-actions">
          <a href="signin.html" class="button">Sign In</a>
          <a href="register.html" class="button outline">Register</a>
        </div>
      </div>
    `;
    orderHistoryContainer.innerHTML = '';
    return;
  }
  
  // Ensure orders array exists
  if (!currentUser.orders) {
    currentUser.orders = [];
  }
  
  // User Info Section - Removed buttons
  userInfoContainer.innerHTML = `
    <div class="info-item">
      <label>Username:</label>
      <p>${currentUser.username}</p>
    </div>
    <div class="info-item">
      <label>Email:</label>
      <p>${currentUser.email}</p>
    </div>
  `;
  
  // Order History Section - Added payment method and removed action buttons
  orderHistoryContainer.innerHTML = currentUser.orders.length ? 
    currentUser.orders.map(order => `
      <div class="order-item">
        <div class="order-header">
          <h4>Order #${order.id}</h4>
          <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        </div>
        <div class="order-meta">
          <span><i class="fas fa-calendar-alt"></i> ${new Date(order.date).toLocaleDateString()}</span>
          <span><i class="fas fa-truck"></i> ${order.shipping.method === 'express' ? 'Express' : 'Standard'} Shipping</span>
          <span><i class="fas fa-money-bill-wave"></i> RM ${order.total.toFixed(2)}</span>
          ${order.payment ? `<span><i class="fas fa-credit-card"></i> ${order.payment.method}</span>` : ''}
        </div>
        ${order.items?.length ? `
          <div class="order-items">
            <p>Items (${order.items.length}):</p>
            <ul>
              ${order.items.slice(0, 3).map(item => `
                <li>${item.name} - ${item.quantity}x RM ${item.price.toFixed(2)}</li>
              `).join('')}
              ${order.items.length > 3 ? `<li>+ ${order.items.length - 3} more items...</li>` : ''}
            </ul>
          </div>
        ` : ''}
      </div>
    `).join('') : 
    '<div class="no-orders"><p>No orders yet. <a href="products.html">Start shopping!</a></p></div>';
}

// ========================
// 6. CHECKOUT PROTECTION
// ========================

function protectCheckout() {
  document.getElementById('checkout-btn')?.addEventListener('click', function(e) {
    if (!isLoggedIn()) {
      e.preventDefault();
      if (confirm('You need to sign in to proceed to checkout. Go to login page?')) {
        window.location.href = 'signin.html?redirect=checkout.html';
      }
    }
  });
  
  if (window.location.pathname.includes('checkout.html') && !isLoggedIn()) {
    if (confirm('You need to sign in to checkout. Go to login page?')) {
      window.location.href = 'signin.html?redirect=checkout.html';
    }
  }
}

// ========================
// 7. ORDER PROCESSING
// ========================

function processOrder(orderData) {
  const users = JSON.parse(localStorage.getItem('users'));
  const currentUser = getCurrentUser();
  
  // Generate order ID if not exists
  if (!orderData.id) {
    orderData.id = 'ORD-' + Date.now();
  }
  
  // Set default date if not exists
  if (!orderData.date) {
    orderData.date = new Date().toISOString();
  }
  
  // Set default status if not exists
  if (!orderData.status) {
    orderData.status = 'Processing';
  }
  
  // Save order data for thank you page
  localStorage.setItem('currentOrder', JSON.stringify(orderData));
  
  if (!currentUser) {
    return true; // For guest checkout
  }
  
  const userIndex = users.findIndex(u => u.email === currentUser.email);
  
  if (userIndex !== -1) {
    if (!users[userIndex].orders) {
      users[userIndex].orders = [];
    }
    
    const userOrderRecord = {
      id: orderData.id,
      date: orderData.date,
      items: orderData.items || orderData.products,
      total: orderData.total,
      status: orderData.status,
      shipping: orderData.shipping || { method: 'standard', fee: 0 },
      payment: orderData.payment || { method: 'Not specified' }
    };
    
    users[userIndex].orders.push(userOrderRecord);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    
    return true;
  }
  
  return false;
}

// ========================
// 8. CART FUNCTIONALITY
// ========================

function updateCartCount() {
  const cartCounts = document.querySelectorAll('.cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  
  cartCounts.forEach(element => {
    element.textContent = count;
  });
}

// ========================
// 9. INITIALIZE EVERYTHING
// ========================

document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
  setupRegistration();
  setupLogin();
  setupAccountPage();
  protectCheckout();
  updateCartCount();
});

// ========================
// 10. CSS FOR AUTH ELEMENTS
// ========================

function injectAuthCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* User dropdown styles - unique to auth.js, not in style.css */
    .user-dropdown {
      position: relative;
      display: inline-block;
    }

    .user-menu {
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;
      color: #333;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 12px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .user-menu:hover {
      background: rgba(0,0,0,0.05);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: white;
      min-width: 160px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      z-index: 1;
      border-radius: 6px;
      overflow: hidden;
    }

    .dropdown-content a {
      color: #333;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      transition: background 0.3s;
    }

    .dropdown-content a:hover {
      background-color: #f5f5f5;
      color: #0066cc;
    }

    .user-dropdown:hover .dropdown-content {
      display: block;
    }

    /* Not signed in state */
    .not-signed-in {
      text-align: center;
      padding: 2rem;
    }

    .not-signed-in p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      color: #555;
    }

    .auth-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    /* Account details section */
    .account-details {
      padding: 1rem;
    }

    .account-details h3 {
      margin-bottom: 1.5rem;
      color: #333;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}

// Inject CSS when loaded
injectAuthCSS();