//shopingCart.js
document.addEventListener('DOMContentLoaded', function () {
    // جلب العناصر من Local Storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // عرض العناصر في الصفحة
    displayCartItems(cartItems);

    // حساب وعرض المجموع
    updateTotal(cartItems);
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
          // Show SweetAlert for successful payment
          Swal.fire({
            title: "Payment Successful!",
            text: "Your payment information has been submitted successfully.",
            icon: "success"
        }).then(() => {
            // If the user clicks "OK" in the SweetAlert, hide the modal
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
    // Close the modal or perform any other actions after successful payment
    $('#paymentModal').modal('hide');
    alert('Payment submitted successfully!');
}
function displayCartItems(cartItems) {
    // تحديد العنصر الذي سيحتوي على المنتجات في السلة
    const cartContainer = document.getElementById('cart-items');

    // Clear the existing content of the container
    cartContainer.innerHTML = '';

    // التحقق مما إذا كانت السلة فارغة
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // عرض المنتجات في السلة
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
    // جلب العناصر من Local Storage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // استخدام SweetAlert للتحقق من رغبة المستخدم في الحذف
    Swal.fire({
        title: "Do you want to delete this item?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        icon: "warning",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            // حذف المنتج من السلة
            cartItems.splice(index, 1);

            // حفظ السلة المحدثة في Local Storage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // إعادة عرض العناصر المحدثة
            displayCartItems(cartItems);

            // حساب وعرض المجموع بعد حذف المنتج
            updateTotal(cartItems);
        },
        allowOutsideClick: () => !Swal.isLoading(),
    });
}

function changeQuantity(index, action) {
    // جلب العناصر من Local Storage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // البحث عن المنتج في السلة
    const existingProductIndex = cartItems.findIndex(item => item.title === cartItems[index].title);

    // إذا وجد المنتج في السلة
    if (existingProductIndex !== -1) {
        // زيادة أو تنقيص الكمية بناءً على الإجراء
        if (action === 'increase') {
            cartItems[existingProductIndex].quantity += 1;
        } else if (action === 'decrease') {
            if (cartItems[existingProductIndex].quantity > 1) {
                // تنقيص الكمية إذا كانت أكبر من 1
                cartItems[existingProductIndex].quantity -= 1;
            } else {
                // إذا كانت الكمية 1، حذف المنتج من السلة
                cartItems.splice(existingProductIndex, 1);
            }
        }
    }

    // حفظ السلة المحدثة في Local Storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // تحديث الكمية في العرض دون إعادة تحميل الصفحة
    updateQuantityInDOM(existingProductIndex, cartItems[existingProductIndex].quantity);

    // حساب وعرض المجموع بعد تغيير الكمية
    updateTotal(cartItems);
}

function updateQuantityInDOM(index, newQuantity) {
    // تحديث الكمية في العرض بواسطة الجيكويري أو أي طريقة تفضلها
    const quantityInput = document.querySelectorAll('.quantity input')[index];
    quantityInput.value = newQuantity;

    // يمكنك أيضًا تحديث الإجمالي إذا كنت بحاجة إلى ذلك
    const totalPriceElement = document.querySelectorAll('.total-price')[index];
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    totalPriceElement.textContent = `$${(cartItems[index].price * newQuantity).toFixed(2)}`;
}

function updateTotal(cartItems) {
    // حساب وعرض المجموع
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

$(document).ready(function () {
    // افتح المودال عند النقر على زر الشراء
    $('#buyNowButton').click(function () {
        $('#paymentModal').modal('show');
    });

    // أغلق المودال عند النقر على زر الإغلاق
    $('#paymentModalCloseButton').click(function () {
        $('#paymentModal').modal('hide');
    });

    // أغلق المودال عند النقر على الظل
    $('#paymentModal').click(function (event) {
        if (event.target.id === 'paymentModal') {
            $('#paymentModal').modal('hide');
        }
    });

    });

