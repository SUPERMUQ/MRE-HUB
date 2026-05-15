const products = [
  {
    id: 1,
    name: "Beef Lasagna (Italy)",
    image: "images/mre1.jpg",
    description: "A classic Italian pasta dish featuring layers of tender beef, rich tomato sauce, creamy béchamel, and lasagne sheets, baked to perfection.",
    includes: ["Beef Lasagna", "Energy Bar", "Orange Drink", "Spoon", "Tissue"],
    price: 19.90,
    rating: 5,
    calories: 650,
    weight: "400g",
    expires: "2027-12-31"
  },
  {
    id: 2,
    name: "Rendang Ayam (Malaysia)",
    image: "images/mre2.jpg",
    description: "A flavorful Malaysian chicken rendang, slow-cooked in aromatic coconut milk and spices until tender.",
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
    description: "A spicy-savory Chinese stir-fry with tender chicken, peanuts, vegetables, and chili peppers in a bold sauce.",
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
    description: "A hearty Indian curry made with chickpeas (chana), tomatoes, onions, and fragrant spices.",
    includes: ["Kimchi Fried Rice", "Pickled Radish", "Dried Seaweed", "Barley Tea"],
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
    description: "A hearty British-style stew featuring tender lamb, slow-cooked with root vegetables in a rich gravy.",
    includes: ["Chicken Tikka Masala", "Basmati Rice", "Papadum", "Masala Chai"],
    price: 19.50,
    rating: 5,
    calories: 710,
    weight: "430g",
    expires: "2028-01-31"
  },
  {
    id: 6,
    name: "Cod with tomato sauce (Norway)",
    image: "images/mre6.jpg",
    description: "A Nordic-inspired dish of flaky cod fillet smothered in a mild tomato-based sauce.",
    includes: ["Kung Pao Chicken", "Vegetable Fried Rice", "Green Tea", "Chopsticks"],
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
    description: "A traditional Finnish split pea soup, creamy and packed with smoky ham.",
    includes: ["Couscous", "Lamb Stew", "Mint Tea", "Dates", "Utensils"],
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
    description: "A vibrant Korean rice bowl with seasoned vegetables, rice, and toppings.",
    includes: ["Sausages", "Mashed Potatoes", "Gravy", "Fruit Pudding", "Black Tea"],
    price: 18.00,
    rating: 5,
    calories: 690,
    weight: "420g",
    expires: "2028-02-28"
  }
];

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('products-container');
  
  products.forEach(product => {
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    flipCard.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="flip-card-back">
          <h3>${product.name}</h3>
          <p class="price">RM ${product.price.toFixed(2)}</p>
          <div class="rating">
            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
            ${product.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
          </div>
          <p class="calories"><i class="fas fa-fire"></i> ${product.calories} kcal</p>
          <p class="expires"><i class="fas fa-calendar-alt"></i> Expires: ${new Date(product.expires).toLocaleDateString()}</p>
          <button class="add-to-cart" 
                  data-name="${product.name}" 
                  data-price="${product.price}" 
                  data-image="${product.image}" 
                  data-description="${product.description.replace(/'/g, "\\'")}">
                  
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
          <a href="product-detail.html?id=${product.id}" class="view-details">View Details</a>
        </div>
      </div>
    `;
    
    container.appendChild(flipCard);
  });

// products.js - Update the event listener to pass the ID
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
    const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');
    const description = button.getAttribute('data-description');
    const id = parseInt(button.getAttribute('data-id')); // Add this line
    
    addToCart(name, price, image, description, id); // Update this line
  }
});
});

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



function showNotification(message) {
  const popup = document.getElementById('popup-notification');
  const popupText = document.getElementById('popup-message');

  popupText.textContent = message;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}

