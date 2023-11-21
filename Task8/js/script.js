document.addEventListener("DOMContentLoaded", function () {
  var carouselInterval = 3000;

  var carousel = document.querySelector("#carouselExampleSlidesOnly");
  var carouselInstance = new bootstrap.Carousel(carousel, {
      interval: carouselInterval
  });

  fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((products) => {
          const productList = document.getElementById('product-list');

          products.forEach((product) => {
              const card = document.createElement('div');
              card.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'p-2');

              card.innerHTML = `
              <div class="card p-4">
              <div class="collection-img position-relative" >
                  <img src="${product.image}" class="card-img-top cartImg" alt="${product.title}">
              </div>
              <div class="text-center">
                  <h5 class="text-capitalize my-1 cartTitle">${product.title}</h5>
                  <span class="fw-bold cartPrice" style="display: block;">$${product.price.toFixed(2)}</span>
                  <button class="btn btn-primary addToCartButton">Add to Cart</button>
              </div>
              </div>
          `;

              const imageElement = card.querySelector('.card-img-top');
              imageElement.addEventListener('click', function () {
                  window.location.href = `productCard.html?title=${product.title}&price=${product.price}&image=${product.image}&description=${product.description}&category=${product.category}`;
              });

              productList.appendChild(card);
          });

          productList.addEventListener('click', function (event) {
              const button = event.target.closest('.addToCartButton');
              if (button) {
                  const productTitle = button.closest('.col-md-6').querySelector('.text-center').querySelector('.cartTitle').textContent;
                  const productPrice = button.closest('.col-md-6').querySelector('.text-center').querySelector('.cartPrice').textContent.replace('$', '');
                  const productImage = button.closest('.col-md-6').querySelector('.collection-img').querySelector('.cartImg').src;
                  const product = {
                      title: productTitle,
                      price: parseFloat(productPrice),
                      image: productImage,
                      quantity: 1
                  };

                  addToCart(product);
              }
          });
      });
});

function filterButtonClick(button, category) {
  const buttons = document.querySelectorAll('.filter-button-group button');
  buttons.forEach(btn => btn.classList.remove('active-filter-btn'));

  button.classList.add('active-filter-btn');
  const filterValue = button.getAttribute('data-filter');
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  let apiUrl = 'https://fakestoreapi.com/products';

  if (category !== 'all') {
      apiUrl += `/category/${category}`;
  }

  fetch(apiUrl)
  .then((response) => response.json())
  .then((products) => {
   
      products.forEach((product) => {
          const card = document.createElement('div');
          card.classList.add('col-md-6', 'col-lg-3', 'col-xl-3', 'p-2');

          card.innerHTML = `
              <div class="card p-4">
                  <div class="collection-img position-relative" >
                      <img src="${product.image}" class="card-img-top cartImg" alt="${product.title}">
                  </div>
                  <div class="text-center">
                      <h5 class="text-capitalize my-1 cartTitle">${product.title}</h5>
                      <span class="fw-bold cartPrice" style="display: block;">$${product.price.toFixed(2)}</span>
                      <button class="btn btn-primary addToCartButton">Add to Cart</button>
                  </div>
              </div>
          `;

          const imageElement = card.querySelector('.card-img-top');
          imageElement.addEventListener('click', function () {
              window.location.href = `productCard.html?title=${product.title}&price=${product.price}&image=${product.image}&description=${product.description}&category=${product.category}`;
          });

          productList.appendChild(card);
      });
  });
}

function handleNavItem(clickedItem) {
  $('.nav-item a').removeClass('active1');

  $(clickedItem).addClass('active1');
}

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cartItems.findIndex(item => item.title === product.title);

  if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity = (Number(cartItems[existingProductIndex].quantity) || 0) + 1;
  } else {
      product.quantity = 1;
      cartItems.push({ ...product });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  console.log('Current Cart Items:', cartItems);
  Swal.fire({
      title: "Product added to cart!",
      text: "You can see it in the shopping cart",
      icon: "success"
  });
}
$(document).ready(function () {
  clearErrors(); 
$('#openLoginModal').click(function() {
  $('#loginModal').modal('show');
});
$('#logInCloseButton').click(function () {
  $('#loginModal').modal('hide');
});
$('#signUpCloseButton').click(function () {
  $('#signUpModal').modal('hide');
});
$('#openSignUpModal').click(function() {
  $('#signUpModal').modal('show');
});
  });
function signUp() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (password !== confirmPassword) {
    var errorElement = document.getElementById("passErr");
    errorElement.textContent = "Password and Confirm Password do not match";
      return;
  }
  const user = {
      name: name,
      email: email,
      password: password
  };

  localStorage.setItem('user', JSON.stringify(user));

  Swal.fire({
    title: "Sign Up",
    text: "Sign Up successful!",
    icon: "success"
}).then(() => {
    $('#signUpModal').modal('hide');
});
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
    var errorElement = document.getElementById("Err");
    errorElement.textContent = "Invalid email or password";
      return;
  }

  document.getElementById('loginNavItem').classList.add('d-none');
  document.getElementById('SignUpNavItem').classList.add('d-none');
  document.getElementById('userName').textContent = storedUser.name;
  document.getElementById('userNameNavItem').classList.remove('d-none');
  document.getElementById('logoutNavItem').classList.remove('d-none');

  Swal.fire({
    title: "Login",
    text: "Login successful!",
    icon: "success"
}).then(() => {
  $('#loginModal').modal('hide');
});
}
function logout() {
  localStorage.removeItem('user');

  document.getElementById('userNameNavItem').classList.add('d-none');
  document.getElementById('logoutNavItem').classList.add('d-none');
  document.getElementById('loginNavItem').classList.remove('d-none');
  document.getElementById('SignUpNavItem').classList.remove('d-none');

  alert('Logout successful!');
}
function clearErrors() {
  var errorElements = document.querySelectorAll(".error");
  errorElements.forEach(function (element) {
      element.textContent = "";
  });
}
/*function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cartItems.findIndex(item => item.title === product.title);

  if (existingProductIndex !== -1) {
      // Check if quantity is defined and increment, otherwise set it to 1
      cartItems[existingProductIndex].quantity = (Number(cartItems[existingProductIndex].quantity) || 0) + 1;
  } else {
      product.quantity = 1;
      cartItems.push({ ...product });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Get the position of the cart icon
  const cartIcon = $('.shopping-cart');
  const iconPosition = cartIcon.offset();

  // Create a new element representing the added product
  const imgtodrag = $('.addToCartButton').closest('.card').find('.collection-img img').eq(0);
  if (imgtodrag) {
    const imgclone = imgtodrag.clone()
      .offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left
      })
      .css({
        'opacity': '0.5',
        'position': 'absolute',
        'height': '150px',
        'width': '150px',
        'z-index': '100'
      })
      .appendTo($('body'))
      .animate({
        'top': iconPosition.top + 10,
        'left': iconPosition.left + 10,
        'width': 75,
        'height': 75
      }, {
        duration: 1000,
        easing: 'easeInOutExpo',
        complete: function() {
          // Remove the cloned image
          $(this).detach();
        }
      });

    setTimeout(function () {
      cartIcon.effect("shake", {
        times: 2
      }, 200);
    }, 1500);
  }

}*/