let cart = [];

function addToCart(item, price) {
    let existingItem = cart.find(p => p.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById('cart-items');
    let totalPrice = 0;
    cartList.innerHTML = '';

    cart.forEach((product, index) => {
        let li = document.createElement('li');
        li.innerHTML = \`\${product.item} - ₹\${product.price} x \${product.quantity} 
                        <button onclick="removeItem(\${index})">❌</button>\`;
        cartList.appendChild(li);
        totalPrice += product.price * product.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalAmount === 0) {
        alert("Your cart is empty!");
        return;
    }

    let options = {
        "key": "your_razorpay_key_here",  // Replace this with your Razorpay Key
        "amount": totalAmount * 100, // Convert to paise
        "currency": "INR",
        "name": "Bale Idli Dosa",
        "description": "Food Order Payment",
        "image": "https://your-logo-url.com/logo.png", // Optional Logo
        "handler": function (response) {
            alert("Payment Successful! Order placed.");
            cart = [];
            updateCart();
        },
        "prefill": {
            "name": "Customer Name",
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#ff9800"
        }
    };

    let payment = new Razorpay(options);
    payment.open();
}
