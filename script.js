let cart = [];
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}
function updateCart() {
    let cartList = document.getElementById('cart-items');
    let totalPrice = 0;
    cartList.innerHTML = '';
    cart.forEach(product => {
        let li = document.createElement('li');
        li.textContent = `${product.item} - ₹${product.price}`;
        cartList.appendChild(li);
        totalPrice += product.price;
    });
    document.getElementById('total-price').textContent = totalPrice;
}
function checkout() {
    alert('Checkout process will be added soon!');
}
