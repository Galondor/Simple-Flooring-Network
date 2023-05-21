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
    <figure class="logo"><a href="../index.html"><img src="../assets/SFS Logo.png" alt="Logo" class="logo_img"></a></figure>
    <div class="nav_links">
        <a href="quiz.html" class="nav_link link_hover-effect">Flooring Quiz</a>
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
        <a href="../index.html" class="nav_link link_hover-effect">Home</a>
        <a href="" class="tooltip">
            <img class="cart_img" src="../assets/shopping-cart.svg" alt="Shopping-Cart">
            <img class="cart_contents_img" src="../assets/circle.svg" alt=""><span class="cart_amount_img">1</span>
            <div class="tooltip_container" id="bottom">
            </div>
        </a>
    </div>
</div>`;}

const footer = document.getElementById("footer");
if (footer) {
    footer.innerHTML = `
<div class="row">
    <figure class="logo"><img src="../assets/SFS Logo.png" alt="Logo" class="logo_img"><a href="../index.html"></a></figure>
        <div class="footer_links">
            <a href="quiz.html" class="footer_link link_hover-effect">Flooring Quiz</a>
            <a href="store.html" class="footer_link link_hover-effect">Products</a>
            <a href="#about" class="footer_link link_hover-effect">About Us</a>
            <a href="#contact" class="footer_link link_hover-effect">Contact</a>
            <a href="../index.html" class="footer_link link_hover-effect">Home</a>
    </div>
<p>Copyright &copy Simple Flooring Solutions. All Rights Reserved.</p>`;
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
cartContents = document.querySelector(".tooltip_container");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
cartContents.innerHTML = "";
if (cart.length > 0) {
    for (let i = 0; i < 3; i++) {
        if (navBar) {
            cartContents.innerHTML += `
        <div class="cart_products">
            <div class="cart_product">
                <div class="cart_product_wrapper">
                    <span class="cart_product_name">${cart[i].name}</span>
                    <span class="cart_product_color">${cart[i].color}</span>
                </div>
                <img src="${cart[i].image}" alt="No Image" class="cart_product_image"> 
            </div>
        </div>`;
        } 
        if (navBar === null) {
            cartContents.innerHTML += `
        <div class="cart_products">
            <div class="cart_product">
                <div class="cart_product_wrapper">
                    <span class="cart_product_name">${cart[i].name}</span>
                    <span class="cart_product_color">${cart[i].color}</span>
                </div>
                <img src="${cart[i].image}" alt="No Image" class="cart_product_image"> 
            </div>
        </div>
    `;
        }
    }
    cartContents.innerHTML += `
    <button onclick="clearCart()" class="btn cart_btn">Clear Cart</button>
    <button onclick="" class="btn cart_btn">Checkout</button>
    `;
    if (cart.length > 3) {
        cartContents.innerHTML += `<a href="#" class="cart_overflow" >See (${cart.length - 3}) More Items</a>`;
    }
}

if (cart.length <= 0) {
    cartContents.innerHTML = `<span>Your Cart is Empty :(</span>`;
}
}