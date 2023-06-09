document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

    let currentDropdown;
    
    if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("active")
    })
})

const navBar = document.getElementById("nav_bar");
if (navBar) {
navBar.innerHTML = `
<div class="row">
    <figure class="logo"><a href="homepage.html"><img src="../assets/SFS Logo.png" alt="Logo" class="logo_img"></a></figure>
    <div class="nav_links">
        <a href="quiz.html" class="nav_link link_hover-effect quiz_link">Flooring Quiz
        <img class="quiz_notif" src="../assets/circle.svg"></a>
        <div class="dropdown" data-dropdown="">
            <button class="nav_link dropdown_btn" data-dropdown-button>Products</button>
            <div class="dropdown_menu">
                <a href="carpet.html" class="dropdown_link" data-dropdown-link>Carpet</a>
                <a href="LVP.html" class="dropdown_link" data-dropdown-link>Vinyl</a>
                <a href="carpetTile.html" class="dropdown_link" data-dropdown-link>Carpet Tile</a>
                <a href="hardwood.html" class="dropdown_link" data-dropdown-link>Hardwood</a>
                <a href="store.html" class="dropdown_link" data-dropdown-link>All Products</a>
            </div>
        </div>
        <a href="#about" class="nav_link link_hover-effect">About Us</a>
        <a href="#contact" class="nav_link link_hover-effect">Contact</a>
        <a href="homepage.html" class="nav_link link_hover-effect">Home</a>
        <div class="tooltip">
            <img class="cart_img" src="../assets/shopping-cart.svg" alt="Shopping-Cart">
            <img class="cart_contents_img" src="../assets/circle.svg" alt=""><span class="cart_amount_img">1</span>
            <div class="tooltip_container" id="bottom">
            <div class="cart_products"></div>
            <button onclick="clearCart()" class="btn cart_btn cart_btn-1">Clear Cart</button>
            <a class="btn cart_btn cart_btn-2" href="cart.html">Checkout</a>
            </div>
        </div>
    </div>
</div>`;}

const footer = document.getElementById("footer");
if (footer) {
    footer.innerHTML = `
<div class="row">
    <figure class="logo"><img src="../assets/SFS Logo.png" alt="Logo" class="logo_img"><a href="homepage.html"></a></figure>
        <div class="footer_links">
            <a href="quiz.html" class="footer_link link_hover-effect">Flooring Quiz</a>
            <a href="store.html" class="footer_link link_hover-effect">Products</a>
            <a href="#about" class="footer_link link_hover-effect">About Us</a>
            <a href="#contact" class="footer_link link_hover-effect">Contact</a>
            <a href="homepage.html" class="footer_link link_hover-effect">Home</a>
    </div>
<p>Copyright &copy Simple Flooring Solutions. All Rights Reserved.</p>`;
}

const quizNotif = document.querySelector(".quiz_notif");
const quizStorage = JSON.parse(localStorage.getItem("userQuizData")) || [];
if (quizStorage[0].completed === true) {
    quizNotif.style.opacity = "0";
} else if (quizStorage[0].completed === false) {
    quizNotif.style.opacity = "1";
}


updateCart();

function updateCart() {
const cartAmount = document.querySelector(".cart_amount_img");
const cartCircle = document.querySelector(".cart_contents_img");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
cartAmount.textContent = cart.length;
if (cart.length === 0) {
    cartAmount.style.opacity = "0"
    cartCircle.style.opacity = "0"
} else if (cart.length > 0) {
    cartAmount.style.opacity = "1"
    cartCircle.style.opacity = "1"
} 
renderCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
}

function renderCart() {
cartContents = document.querySelector(".cart_products");
cartContainer = document.querySelector(".tooltip_container");
const cartBtn1 = document.querySelector(".cart_btn-1");
const cartBtn2 = document.querySelector(".cart_btn-2");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
cartContents.innerHTML = "";
if (cart.length > 0) {
    cartBtn1.style.display = "flex";
    cartBtn2.style.display = "flex";
        if (navBar) {
            for (let i = 0; i < 3; i++) {
                cartContents.innerHTML += `
                <div class="cart_product">
                    <div class="cart_product_wrapper">
                        <span class="cart_product_name">${cart[i].name}</span>
                        <span class="cart_product_color">${cart[i].color}</span>
                    </div>
                    <a href="itemPage.html" onclick="selectedProduct(${cart[i].styleNumber})">
                        <img src="${cart[i].image}" alt="No Image" class="cart_product_image"> 
                    </a>
                </div>`;
            }
        } 
        if (cart.length > 3) {
            cartContents.innerHTML += `<a href="cart.html" class="cart_overflow" >See (${cart.length - 3}) More Items</a>`;
        }
}

if (cart.length <= 0) {
    cartBtn1.style.display = "none";
    cartBtn2.style.display = "none";
    cartContents.innerHTML = `<span>Your Cart is Empty :(</span>`;
} 
}

function selectedProduct(product) {
    //Get the poduct data from the clicked product
    localStorage.setItem('selectedProduct', product);
  
    let recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    let newItem = {sfnNum: product,};
  
    //Check to make sure the product isn't a duplicate
    for (let i = 0; i < recent.length; i++) {
      if (recent[i].sfnNum === product) {
        recent.splice(i, 1);
      }
    }
    
    if (recent.length > 4) {
      recent.shift();
      recent.push(newItem);
    } else {
      recent.push(newItem);
    }
  
    localStorage.setItem("recentlyViewed", JSON.stringify(recent));
  }
  