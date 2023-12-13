//shopingCart.js
document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cartItems);

    updateTotal(cartItems);
});

function displayCartItems(cartItems) {
    const cartContainer = document.getElementById('cart-items');

    cartContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('item');

        cartItemElement.innerHTML = `
            </div>

            <div class="image">
                <img src="${item.image}" alt="${item.title}" />
            </div>

            <div class="description">
                <span>${item.title}</span>
            </div>

            <div class="quantity">
                <button class="plus-btn" type="button" onclick="changeQuantity(${index}, 'increase')">
                    <img src="Image/plus.svg" alt="Increase Quantity" />
                </button>
                <input type="text" name="name" value="${item.quantity}" readonly>
                <button class="minus-btn" type="button" onclick="changeQuantity(${index}, 'decrease')">
                    <img src="Image/m.png" alt="Decrease Quantity" />
                </button>
            </div>

            <div class="total-price">$${(item.price * item.quantity).toFixed(2)}</div>

            <div class="buttons">
            <div class="delete-btn" onclick="removeFromCart(${index})">
                <img src="Image/delete.png" alt="delete button" />
            </div>
        `;

        cartContainer.appendChild(cartItemElement);
    });
}


function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    Swal.fire({
        title: "Do you want to delete this item?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        icon: "warning",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCartItems(cartItems);
            updateTotal(cartItems);
        },
        allowOutsideClick: () => !Swal.isLoading(),
    });
}

function changeQuantity(index, action) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cartItems.findIndex(item => item.title === cartItems[index].title);
    if (existingProductIndex !== -1) {
        if (action === 'increase') {
            cartItems[existingProductIndex].quantity += 1;
        } else if (action === 'decrease') {
            if (cartItems[existingProductIndex].quantity > 1) {
                cartItems[existingProductIndex].quantity -= 1;
            } else {
                cartItems.splice(existingProductIndex, 1);
            }
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateQuantityInDOM(existingProductIndex, cartItems[existingProductIndex].quantity);
    updateTotal(cartItems);
}

function updateQuantityInDOM(index, newQuantity) {
    const quantityInput = document.querySelectorAll('.quantity input')[index];
    quantityInput.value = newQuantity;
    const totalPriceElement = document.querySelectorAll('.total-price')[index];
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    totalPriceElement.textContent = `$${(cartItems[index].price * newQuantity).toFixed(2)}`;
}

function updateTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

$(document).ready(function () {
    $('#buyNowButton').click(function () {
        $('#paymentModal').modal('show');
    });
    $('#paymentModalCloseButton').click(function () {
        $('#paymentModal').modal('hide');
    });
    $('#paymentModal').click(function (event) {
        if (event.target.id === 'paymentModal') {
            $('#paymentModal').modal('hide');
        }
    });

    });
    document.getElementById("checkoutForm").onsubmit=function() {
        var email=document.getElementById("email").value;
        var shippingAddress=document.getElementById("shippingAddress").value;
        var creditCard=document.getElementById("creditCard").value;
        event.preventDefault();
        
        clearErrors();
        var isValid = true;
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var AddressPattern = /^[a-zA-Z]{1,9}$/;
        const creditCardpattern = /^\d{16}$/;
        if (!emailPattern.test(email)) {
            displayError("emailErr", "Invalid email address.");
            isValid = false;
        }
        if (!AddressPattern.test(shippingAddress)) {
            displayError("AddressErr", "shipping Address is required , and be between 2 to 10 characters. ");
            isValid = false;
        }
        if (!creditCardpattern.test(creditCard)) {
            displayError("creditCardErr", "Credit Card is required , and must be 16 numbers");
            isValid = false;
        }
        if (isValid) {
                  Swal.fire({
                    title: "Payment Successful!",
                    text: "Your payment information has been submitted successfully.",
                    icon: "success"
                }).then(() => {
                    localStorage.removeItem('user');
                    $('#paymentModal').modal('hide');
                });
        }
        else{
            return isValid;
        }
        }
        
        function clearErrors() {
            var errorElements = document.querySelectorAll(".error");
            errorElements.forEach(function (element) {
                element.textContent = "";
            });
        }
        
        function displayError(elementId, errorMessage) {
            var errorElement = document.getElementById(elementId);
            errorElement.textContent = errorMessage;
        }
        
        function submitPayment() {
            $('#paymentModal').modal('hide');
            alert('Payment submitted successfully!');
        }

