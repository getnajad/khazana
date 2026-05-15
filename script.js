{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Product Data Generator\
const categories = ['earrings', 'bangles', 'bracelets', 'chains', 'rings'];\
const adjectives = ['Royal', 'Vintage', 'Ethereal', 'Celestial', 'Imperial', 'Majestic', 'Divine', 'Lustrous', 'Radiant', 'Opulent'];\
const styles = ['Jhumka', 'Kangan', 'Charm', 'Rope', 'Cocktail', 'Chandelier', 'Cuff', 'Tennis', 'Box', 'Halo', 'Stud', 'Band', 'Pendant', 'Layered', 'Statement'];\
\
let products = [];\
let cart = [];\
\
// Generate 150 products dynamically\
function generateProducts() \{\
    let id = 1;\
    categories.forEach(category => \{\
        for(let i = 0; i < 30; i++) \{ // 30 items per category = 150 total\
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];\
            const style = styles[Math.floor(Math.random() * styles.length)];\
            const price = Math.floor(Math.random() * 15000) + 999; // Price between \uc0\u8377 999 and \u8377 15999\
            \
            // Dynamically assign images based on category for visual consistency\
            let imageUrl = '';\
            switch(category) \{\
                case 'earrings': imageUrl = `https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80`; break;\
                case 'bangles': imageUrl = `https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80`; break;\
                case 'bracelets': imageUrl = `https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80`; break;\
                case 'chains': imageUrl = `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80`; break;\
                case 'rings': imageUrl = `https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80`; break;\
            \}\
\
            products.push(\{\
                id: id++,\
                name: `$\{adj\} $\{style\} $\{category.charAt(0).toUpperCase() + category.slice(1)\}`,\
                category: category,\
                price: price,\
                image: imageUrl\
            \});\
        \}\
    \});\
\}\
\
// Render Products\
function renderProducts(filter = 'all') \{\
    const grid = document.getElementById('product-grid');\
    grid.innerHTML = '';\
    \
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);\
\
    filtered.forEach(product => \{\
        const card = document.createElement('div');\
        card.classList.add('product-card');\
        card.innerHTML = `\
            <img src="$\{product.image\}" alt="$\{product.name\}" class="product-img">\
            <div class="product-info">\
                <div>\
                    <h3 class="product-name">$\{product.name\}</h3>\
                    <p class="product-category">Gold-Plated</p>\
                </div>\
                <p class="product-price">\uc0\u8377 $\{product.price.toLocaleString('en-IN')\}</p>\
            </div>\
            <button class="add-to-cart" onclick="addToCart($\{product.id\})">Add to Bag</button>\
        `;\
        grid.appendChild(card);\
    \});\
\}\
\
// Filter Buttons\
document.querySelectorAll('.filter-btn').forEach(btn => \{\
    btn.addEventListener('click', (e) => \{\
        document.querySelector('.filter-btn.active').classList.remove('active');\
        e.target.classList.add('active');\
        renderProducts(e.target.dataset.category);\
    \});\
\});\
\
// Cart Logic\
function addToCart(productId) \{\
    const product = products.find(p => p.id === productId);\
    const existingItem = cart.find(item => item.id === productId);\
\
    if (existingItem) \{\
        existingItem.quantity++;\
    \} else \{\
        cart.push(\{ ...product, quantity: 1 \});\
    \}\
    updateCart();\
\}\
\
function removeFromCart(productId) \{\
    cart = cart.filter(item => item.id !== productId);\
    updateCart();\
\}\
\
function updateCart() \{\
    const cartItemsContainer = document.getElementById('cart-items');\
    const cartCount = document.getElementById('cart-count');\
    const totalPrice = document.getElementById('total-price');\
\
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);\
    \
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);\
    totalPrice.textContent = `\uc0\u8377 $\{total.toLocaleString('en-IN')\}`;\
\
    cartItemsContainer.innerHTML = '';\
    cart.forEach(item => \{\
        const div = document.createElement('div');\
        div.classList.add('cart-item');\
        div.innerHTML = `\
            <img src="$\{item.image\}" alt="$\{item.name\}">\
            <div class="cart-item-details">\
                <h4>$\{item.name\}</h4>\
                <p>\uc0\u8377 $\{item.price.toLocaleString('en-IN')\} x $\{item.quantity\}</p>\
                <button class="remove-item" onclick="removeFromCart($\{item.id\})">Remove</button>\
            </div>\
        `;\
        cartItemsContainer.appendChild(div);\
    \});\
\}\
\
// UI Interactions\
const cartBtn = document.getElementById('cart-btn');\
const closeCartBtn = document.getElementById('close-cart');\
const cartSidebar = document.getElementById('cart-sidebar');\
const overlay = document.getElementById('overlay');\
const checkoutBtn = document.getElementById('checkout-btn');\
const checkoutModal = document.getElementById('checkout-modal');\
const closeModalBtn = document.getElementById('close-modal');\
\
cartBtn.addEventListener('click', () => \{\
    cartSidebar.classList.add('open');\
    overlay.classList.add('show');\
\});\
\
closeCartBtn.addEventListener('click', () => \{\
    cartSidebar.classList.remove('open');\
    overlay.classList.remove('show');\
\});\
\
overlay.addEventListener('click', () => \{\
    cartSidebar.classList.remove('open');\
    overlay.classList.remove('show');\
\});\
\
checkoutBtn.addEventListener('click', () => \{\
    if(cart.length === 0) \{\
        alert("Your bag is empty!");\
        return;\
    \}\
    cartSidebar.classList.remove('open');\
    overlay.classList.remove('show');\
    checkoutModal.classList.add('show');\
    cart = []; // Clear cart after checkout\
    updateCart();\
\});\
\
closeModalBtn.addEventListener('click', () => \{\
    checkoutModal.classList.remove('show');\
\});\
\
// Initialize\
generateProducts();\
renderProducts();}