
const products = [
    { id: 1, name: "Molten Core MTB", price: 1200, emoji: "🚵" },
    { id: 2, name: "Mountain Bike XT", price: 850, emoji: "🚲" },
    { id: 3, name: "Techno Slim Road", price: 1500, emoji: "🚴" },
    { id: 4, name: "Kawasaki Ninja", price: 9500, emoji: "🏍️" }
];


let cart = [];


const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const cartCountBadge = document.getElementById('cart-count');


function renderProducts() {
    productList.innerHTML = '';

    products.forEach(product => {
        
        const isAlreadyInCart = cart.some(item => item.id === product.id);

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="product-img">${product.emoji}</div>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button 
                onclick="addToCart(${product.id})" 
                class="btn-add" 
                ${isAlreadyInCart ? 'disabled' : ''}>
                ${isAlreadyInCart ? 'Already in Cart' : 'Add to Cart'}
            </button>
        `;
        productList.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    cart.push({ ...product, quantity: 1 });
    updateUI();
}

function changeQuantity(productId, amount) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += amount;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateUI();
}


function clearCart() {
    cart = [];
    updateUI();
}


function updateUI() {
    // 1. Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price} x ${item.quantity} = $${item.price * item.quantity}</small>
                </div>
                <div class="qty-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

   
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

   
    cartTotalDisplay.innerText = total;
    cartCountBadge.innerText = count;

    
    renderProducts();
}


document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) alert("Thank you for your purchase!");
});


renderProducts();