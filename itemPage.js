const product = localStorage.getItem('selectedProduct');
const styleNumber = document.getElementById('style_number');
const productName = document.querySelector('.product_name');
const brand = document.getElementById('brand_name');
const productPrice = document.querySelector('.price');
const rating = document.querySelector('.rating');
const color = document.getElementById('color_name');

const dropdowns = document.querySelectorAll('.color_dropdown');
const menuEl = document.querySelector('.menu');
const selectedEl = document.querySelector('.selected');

const addToCart = document.querySelector('.add_to_cart');
const step2 = document.querySelector('.step-2');
const productImages = document.querySelector('.product_images');

getProducts();
//Render Product Details On The Screen
async function getProducts() {
    try {
      const response = await fetch('/productData/products.json');
      const data = await response.json();
      const productData = data;
      console.log(productData);

      for (let i = 0; i < productData.length; i++) {
        if (productData[i].sfnStyleNumber === product) {
            styleNumber.textContent = productData[i].sfnStyleNumber;
            productName.textContent = productData[i].sfnName;
            brand.textContent = productData[i].brand;
            productPrice.innerHTML = `${productData[i].price[0].priceValue}<span class="uom">/sqft</span>`;
            rating.innerHTML = `<h3 class="rating">Rating: ${productData[i].rating}</h3>`;
            color.textContent = productData[i].colors[0].colorName;

            step2.innerHTML = `<div class="step-2">
            <h2>Order a Sample</h2>
            <button class="btn add_to_cart" onclick="addProductToCart()">Add to Cart</button>
        </div>`
          break;
        }
      }
      for (let i = 0; i < productData[product - 1].colors.length; i++) {
        menuEl.innerHTML += `<li>
        <img class="color_image" src="productImages/LVP/VV023-Red-River-Hickory.jpg" alt="">
        <span>${productData[product - 1].colors[i].colorName}</span>
      </li>`
      }
    } catch (error) {
      console.log(error);
    }

    //Dropdown Menu
    selectedEl.innerHTML = `<img class="color_image" 
    src="productImages/LVP/VV023-Red-River-Hickory.jpg" alt="">
    <span>${color.textContent}</span>`

    for (let i = 0; i < 3; i++) {
      productImages.innerHTML += `<img class="product_image" src="productImages/LVP/VV023-Red-River-Hickory.jpg" alt="">`;
    }

    dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.select');
      const caret = dropdown.querySelector('.caret');
      const menu = dropdown.querySelector('.menu');
      const options = dropdown.querySelectorAll('.menu li');
      const selected = dropdown.querySelector('.selected');

      select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret_rotate');
        menu.classList.toggle('menu_open');
      });

      options.forEach(option => {
        option.addEventListener('click', () => {
          selected.innerHTML = option.innerHTML;
          select.classList.remove('select_clicked');
          caret.classList.remove('caret_rotate');
          menu.classList.remove('menu_open');
          option.classList.remove('active');
          color.textContent = option.textContent;
        });
        option.classList.add('active');
      });
    })
  }

  //Add Product To Cart
async function addProductToCart() {
  const response = await fetch('/productData/products.json');
  const data = await response.json();
  const productData = data;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newItem = {
    name: productData[product - 1].sfnName,
    price: productData[product - 1].price[0].priceValue,
    color: color.textContent,
  };

  cart.push(newItem);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}