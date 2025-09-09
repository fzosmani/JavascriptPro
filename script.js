// Products array
const products = [
    { id: 1, name: "Laptop", price: 25000, image: "img/laptop.jpg" },
    { id: 2, name: "Phone", price: 15000, image: "img/phone.jpg"},
    { id: 3, name: "Headphones", price: 2500, image: "img/headphone.jpg" },
    { id: 4, name: "Keyboard", price: 1800, image: "img/keybord.jpg" },
    { id: 5, name: "Mouse", price: 1200, image: "img/mouse.jpg" },
    { id: 6, name: "Tablet", price: 12000, image: "img/tablet.jpg" },
    { id: 7, name: "Smart Watch", price: 8000, image: "img/smart.jpg" },
    { id: 8, name: "Gaming Chair", price: 22000, image: "img/chir.jpg" }
];

  
  // Cart array (load from localStorage or empty)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // DOM elements
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const searchInput = document.getElementById("search");
  const toast = document.getElementById("toast");
  
  // Render products
  const renderProducts = (list) => {
    productList.innerHTML = list.map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} AFN</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join("");
  };
  
  // Render cart
  const renderCart = () => {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span>${item.name} (${item.price} AFN)</span>
        <div class="quantity-controls">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeFromCart(${item.id})">x</button>
        </div>
        <span>${item.price * item.quantity} AFN</span>
      </div>
    `).join("");
  
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total;
  
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  // Add to cart
  const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
  
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    renderCart();
    showToast(`${product.name} added to cart!`);
  };
  
  // Change quantity
  const changeQty = (id, change) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) removeFromCart(id);
    }
    renderCart();
  };
  
  // Remove from cart
  const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    renderCart();
  };
  
  // Show toast
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.className = "show";
    setTimeout(() => toast.className = toast.className.replace("show", ""), 2500);
  };
  
  // Search filter
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  });
  
  // Initial render
  renderProducts(products);
  renderCart();
  