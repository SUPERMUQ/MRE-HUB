const products = [
  {
    id: 1,
    name: "Beef Lasagna (Italy)",
    image: "images/mre1.jpg",
    description: "A classic Italian pasta dish featuring layers of tender beef, rich tomato sauce, creamy béchamel, and lasagne sheets, baked to perfection. This MRE includes new apples (likely dried or preserved), mock apples (a simulated fruit product), and raw apples (possibly freeze-dried). Served with a side of crackers or",
    includes: ["Beef Lasagna", "Energy Bar", "Orange Drink", "Spoon", "Tissue"],
    price: 19.90,
    rating: 5.0,
    calories: 650,
    weight: "400g",
    expires: "2027-12-31"
  },
  {
    id: 2,
    name: "Rendang Ayam (Malaysia)",
    image: "images/mre2.jpg",
    description: "A flavorful Malaysian chicken rendang, slow-cooked in aromatic coconut milk and spices until tender. Accompanied by material potatoes (likely dehydrated or mashed), a brownie for dessert, and a sports drink to replenish energy.",
    includes: ["Rendang Ayam", "White Rice", "Keropok", "Sambal", "Teh Tarik"],
    price: 17.90,
    rating: 4.7,
    calories: 720,
    weight: "450g",
    expires: "2028-06-30"
  },
  {
    id: 3,
    name: "Kung Pao (China)",
    image: "images/mre3.jpg",
    description: "A spicy-savory Chinese stir-fry with tender chicken, peanuts, vegetables, and chili peppers in a bold sauce. This MRE includes pasta (possibly as a side), a fruit bar, chocolate, and fruit juice for a balanced meal.",
    includes: ["Kung Pao Chicken", "Vegetable Fried Rice", "Green Tea", "Chopsticks"],
    price: 18.90,
    rating: 4.3,
    calories: 680,
    weight: "420g",
    expires: "2028-03-15"
  },
  {
    id: 4,
    name: "Chana Masala (India)",
    image: "images/mre4.jpg",
    description: "A hearty Indian curry made with chickpeas (chana), tomatoes, onions, and fragrant spices. Served with rice, garnish ragg (likely pickles/chutney), premura (possibly papadum or crackers), and left tinkle (possibly a sweet/drink).",
    includes: ["Spiced chickpeas", "Plain basmati rice", "Masala peanuts", "Masala chai powder"],
    price: 16.90,
    rating: 4.6,
    calories: 590,
    weight: "380g",
    expires: "2027-11-30"
  },
  {
    id: 5,
    name: "Lamb Stew (United Kingdom)",
    image: "images/mre5.jpg",
    description: "A hearty British-style stew featuring tender lamb, slow-cooked with root vegetables in a rich gravy. This MRE includes rice with mixed vegetables, kimchi for a tangy kick, and a soothing cup of tea to complete the meal.",
    includes: ["Lamb chunks", "Potatoes", "Oatcakes", "Instant coffee"],
    price: 19.50,
    rating: 5.0,
    calories: 710,
    weight: "430g",
    expires: "2028-01-31"
  },
  {
    id: 6,
    name: "Cod with tomato sauce (Norway)",
    image: "images/mre6.jpg",
    description: "A Nordic-inspired dish of flaky cod fillet smothered in a mild tomato-based sauce. Served with rice, mild curry for extra flavor, pickle for acidity, and a refreshing green tea.",
    includes: ["Cod fillet in tomato-based sauce", "Mashed potatoes", "Berry compote with crackers", "Instant berry drink powder"],
    price: 18.50,
    rating: 4.2,
    calories: 630,
    weight: "410g",
    expires: "2027-10-15"
  },
  {
    id: 7,
    name: "Pea soup with ham (Finland)",
    image: "images/mre7.jpg",
    description: "A traditional Finnish split pea soup, creamy and packed with smoky ham. Accompanied by ornelerite (possibly a typo for rösti or a cracker), baked sororai (likely a bread or crisp), toast, and a cup of coffee for warmth.",
    includes: ["Green pea soup", "Crispbread", "Pancake with strawberry jam", "Oat biscuits", "Instant berry juice powder"],
    price: 20.00,
    rating: 4.5,
    calories: 670,
    weight: "440g",
    expires: "2028-05-31"
  },
  {
    id: 8,
    name: "Bibimbap (South Korea)",
    image: "images/mre8.jpg",
    description: "A vibrant Korean rice bowl with lembs (likely namul or seasoned vegetables), rice, a veggie bar (dehydrated or fresh toppings), and juices to balance the flavors. Mix it all together for a delicious, balanced meal!",
    includes: ["Rice with seasoned vegetables, dried beef, and spicy gochujang sauce", "Dried seaweed sheets", "Honey rice crackers", "Sweet rice cake", "Barley tea powder"],
    price: 18.00,
    rating: 5.0,
    calories: 690,
    weight: "420g",
    expires: "2028-02-28"
  }
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

const product = products.find(p => p.id === id);
const container = document.getElementById("product-detail");
const relatedContainer = document.getElementById("related-products");

if (product) {
  // Render product details
  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-badge">${product.rating} <i class="fas fa-star"></i></div>
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <div class="product-meta">
          <span class="price">RM ${product.price.toFixed(2)}</span>
          <span class="calories"><i class="fas fa-fire"></i> ${product.calories} kcal</span>
          <span class="weight"><i class="fas fa-weight-hanging"></i> ${product.weight}</span>
          <span class="expires"><i class="fas fa-calendar-alt"></i> Expires: ${new Date(product.expires).toLocaleDateString()}</span>
        </div>
        
        <p class="description">${product.description}</p>
        
        <div class="includes">
          <h3>What's Included:</h3>
          <ul>${product.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}</ul>
        </div>
        
        <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price}, '${product.image}', '${product.description.replace(/'/g, "\\'")}')">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
        
        <div class="product-features">
          <div class="feature">
            <i class="fas fa-shipping-fast"></i>
            <span>Fast Shipping</span>
          </div>
          <div class="feature">
            <i class="fas fa-undo"></i>
            <span>30-Day Returns</span>
          </div>
          <div class="feature">
            <i class="fas fa-shield-alt"></i>
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Render related products (exclude current product)
  const relatedProducts = products.filter(p => p.id !== id).slice(0, 4);
  relatedContainer.innerHTML = relatedProducts.map(product => `
    <div class="product-card">
      <a href="product-detail.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="product-price">RM ${product.price.toFixed(2)}</p>
        <div class="rating">${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}</div>
        <p class="expires">Expires: ${new Date(product.expires).toLocaleDateString()}</p>
      </a>
      <button class="add-to-cart small" 
              onclick="addToCart('${product.name}', ${product.price}, '${product.image}', '${product.description.replace(/'/g, "\\'")}'); event.stopPropagation()">
        <i class="fas fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  `).join('');
}

function addToCart(name, price, image, description) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.name === name);
  
  const existingProduct = cart.find(item => item.name === name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: name,
      image: image,
      description: description,
      price: price,
      quantity: 1,
      expires: product.expires
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${name} added to cart!`);
  
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.classList.add('animate');
  setTimeout(() => {
    cartIcon.classList.remove('animate');
  }, 1000);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = totalItems;
}

// Replace your existing showNotification function with this:
function showNotification(message, type = 'success') {
  const popup = document.getElementById('popup-notification');
  const popupText = document.getElementById('popup-message');
  const popupIcon = popup.querySelector('i');

  // Set message and type
  popupText.textContent = message;
  
  // Remove any existing type classes
  popup.classList.remove('success', 'error', 'warning');
  
  // Add the appropriate type class
  popup.classList.add(type);
  
  // Update icon based on type
  if (type === 'success') {
    popupIcon.className = 'fas fa-check-circle';
  } else if (type === 'error') {
    popupIcon.className = 'fas fa-exclamation-circle';
  } else if (type === 'warning') {
    popupIcon.className = 'fas fa-exclamation-triangle';
  }
  
  // Show notification
  popup.classList.add('show');

  // Auto hide after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}



