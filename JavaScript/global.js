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
}
