const product = localStorage.getItem('selectedProduct');
const styleNumber = document.getElementById('style_number');
const productName = document.querySelector('.product_name');
const brand = document.getElementById('brand_name');
const productPrice = document.querySelector('.price');
const rating = document.querySelector('.rating');
const color = document.getElementById('color_name');
const description = document.getElementById("product_description");

const dropdowns = document.querySelectorAll('.color_dropdown');
const menuEl = document.querySelector('.menu');
const selectedEl = document.querySelector('.selected');

const sizeDropdowns = document.querySelectorAll('.size_dropdown');
const sizeMenuEl = document.querySelector('.size_menu');
const sizeSelectedEl = document.querySelector('.size_selected');

const addToCart = document.querySelector('.add_to_cart');
const step3 = document.querySelector('.step-3');
const productImageWrapper = document.querySelectorAll('.product_image_wrapper');
const productImages = document.querySelector('.product_images');
const productImg = document.querySelectorAll('.product_image');
const productWrapper = document.querySelector('.product_wrapper');
const colorImage = document.querySelector('.color_image');

getProducts();
//Render Product Details On The Screen
async function getProducts() {
    try {
      const response = await fetch('../products.json');
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
            description.textContent = productData[i].description + ` For ${productData[i].sfnName}`;
            color.textContent = productData[i].colors[0].colorName;
            //Initial Color
            currentColor = productData[i].colors[0].colorImage;
            productWrapper.innerHTML = `<img src="../${currentColor}" alt="Product Image" class="product_img">`;

            step3.innerHTML = `<div class="step-3">
            <h2>Order The Sample</h2>
            <button class="btn add_to_cart" onclick="addProductToCart()">Add to Cart</button>
        </div>`
          break;
        }
      }
      for (let i = 0; i < productData[product - 1].colors.length; i++) {
        menuEl.innerHTML += `<li>
        <img class="color_image" src="../${productData[product - 1].colors[i].colorImage}" alt="No Image" value="${productData[product - 1].colors[i].colorNumber}">
        <span>${productData[product - 1].colors[i].colorName}</span>
      </li>`
      //Dropdown Menu
    selectedEl.innerHTML = `<img class="color_image" 
    src="../${productData[product - 1].colors[0].colorImage}" alt="Color Image">
    <span>${color.textContent}</span>
    `
      }

      const testData = [{size: 'Small'},{size: 'Medium'},{size: 'Large'}];

      for (let i = 0; i < testData.length; i++) {
        sizeMenuEl.innerHTML += `
        <li><span>${testData[i].size}</span></li>`;
        sizeSelectedEl.innerHTML = `
        <span>Sample Size</span>`;
      }
    } catch (error) {
      console.log(error);
    }

    const roomScenes = [{
      image: "../productImages/Room-Scene/Ancestry-ROOM.jpg",
    },
    {
      image: "../productImages/Room-Scene/SERENADE-ZZ057-PASHIMA-00754-RUG-DTL-V.jpg",
    },
    {
      image: "../productImages/Room-Scene/Carpet-Panel.jpg",
    }];

    for (let i = 0; i < 3; i++) {
      productImages.innerHTML += `<figure class = "product_image_wrapper" onclick="changeImage(${i})">
      <img class="product_image image${i}" src="../${roomScenes[i].image}" alt="Product Image">
      </figure>`;
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
          currentColor = selectedEl.getElementsByTagName('img')[0].src = option.getElementsByTagName('img')[0].src;
          console.log(currentColor);
          productWrapper.innerHTML = `<img src="${currentColor}" alt="Product Image" class="product_img">`;
          renderSpecs();
        });
        option.classList.add('active');
      });
    })
    
    sizeDropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.size_select');
      const caret = dropdown.querySelector('.size_caret');
      const menu = dropdown.querySelector('.size_menu');
      const options = dropdown.querySelectorAll('.size_menu li');
      const selected = dropdown.querySelector('.size_selected');

      select.addEventListener('click', () => {
        select.classList.toggle('size_select_clicked');
        caret.classList.toggle('size_caret_rotate');
        menu.classList.toggle('size_menu_open');
      });

      options.forEach(option => {
        option.addEventListener('click', () => {
          selected.innerHTML = option.innerHTML;
          select.classList.remove('size_select_clicked');
          caret.classList.remove('size_caret_rotate');
          menu.classList.remove('size_menu_open');
          option.classList.remove('active');
        });
        option.classList.add('active');
      });
    })
    renderSpecs();
  }

  function changeImage(image) {
    const mainImage = document.querySelector('.product_img');
    let prevImage = mainImage.src;

    mainImage.src = document.querySelector(`.image${image}`).src;
    document.querySelector(`.image${image}`).src = prevImage;
  }

  //Add Product To Cart
async function addProductToCart() {
  const response = await fetch('../products.json');
  const data = await response.json();
  const productData = data;
  const btn = document.querySelector('.add_to_cart');

  if (sizeSelectedEl.textContent === '\n        Sample Size') {
    alert('Please Select A Size');
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newItem = {
    name: productData[product - 1].sfnName,
    price: productData[product - 1].price[0].priceValue,
    color: color.textContent,
    image: currentColor,
    type: productData[product - 1].productType,
    styleNumber: productData[product - 1].sfnStyleNumber,
    size: sizeSelectedEl.textContent
  };
  console.log(currentColor)
  cart.push(newItem);

  localStorage.setItem("cart", JSON.stringify(cart));
  btn.textContent = "Added To Cart!";
  setTimeout(() => {
    btn.textContent = "Add To Cart";
  }, 800);

  updateCart();
}

async function renderSpecs() {
  const tableContainer = document.querySelector('.table_container');
  
  try {
    const response = await fetch('../products.json');
    const data = await response.json();
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      if (data[i].sfnStyleNumber === product && data[product].productType === "Carpet") {
        tableContainer.innerHTML = `
        <table class="spec_table">
          <tbody>
            <tr>
              <th>Brand</th>
              <td data-th="Brand">${data[product - 1].brand}</td>
            </tr>
            <tr>
              <th>Style Name</th>
              <td data-th="StyleName">${data[product - 1].sfnName}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td data-th="Color">${color.textContent}</td>
              </tr>
              <tr>
                <th>Roll Width</th>
                <td data-th="RollWidth">${data[product - 1].productSpecs[0].rollWidth}</td>
              </tr>
              <tr>
                <th>Face Weight</th>
                <td data-th="FaceWeight">${data[product - 1].productSpecs[0].faceWeight}</td>
              </tr>
              <tr>
                <th>Carpet Fiber</th>
                <td data-th="CarpetFiber">${data[product - 1].productSpecs[0].fiber}</td>
              </tr>
              <tr>
                <th>Backing</th>
                <td data-th="Backing">${data[product - 1].productSpecs[0].backing}</td>
              </tr>
              <tr>
                <th>Thickness</th>
                <td data-th="Thickness">${data[product - 1].productSpecs[0].thickness}</td>
              </tr>
            </tbody>
          </table>`;
      } else if (data[i].sfnStyleNumber === product && data[product].productType === "LVP") {
        tableContainer.innerHTML = `
        <table class="spec_table">
          <tbody>
            <tr>
              <th>Brand</th>
              <td data-th="Brand">${data[product - 1].brand}</td>
            </tr>
            <tr>
              <th>Style Name</th>
              <td data-th="StyleName">${data[product - 1].sfnName}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td data-th="Color">${color.textContent}</td>
              </tr>
              <tr>
                <th>Dimensions</th>
                <td data-th="Dimensions">${data[product - 1].productSpecs[0].dimensions}</td>
              </tr>
              <tr>
                <th>Underlayment</th>
                <td data-th="Underlayment">${data[product - 1].productSpecs[0].underlayment}</td>
              </tr>
              <tr>
                <th>Installation Method</th>
                <td data-th="InstallationMethod">${data[product - 1].productSpecs[0].installation}</td>
              </tr>
              <tr>
                <th>Wear Layer</th>
                <td data-th="WearLayer">${data[product - 1].productSpecs[0].wearLayer}</td>
              </tr>
              <tr>
                <th>Thickness</th>
                <td data-th="Thickness">${data[product - 1].productSpecs[0].thickness}</td>
              </tr>
            </tbody>
          </table>`;
      } else if (data[i].sfnStyleNumber === product && data[product].productType === "Hardwood") {
        tableContainer.innerHTML = `
        <table class="spec_table">
          <tbody>
            <tr>
              <th>Brand</th>
              <td data-th="Brand">${data[product - 1].brand}</td>
            </tr>
            <tr>
              <th>Style Name</th>
              <td data-th="StyleName">${data[product - 1].sfnName}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td data-th="Color">${color.textContent}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td data-th="Species">${data[product - 1].productSpecs[0].species}</td>
              </tr>
              <tr>
                <th>Finish</th>
                <td data-th="Finish">${data[product - 1].productSpecs[0].finish}</td>
              </tr>
              <tr>
                <th>Installation Method</th>
                <td data-th="InstallationMethod">${data[product - 1].productSpecs[0].installation}</td>
              </tr>
              <tr>
                <th>Thickness</th>
                <td data-th="Thickness">${data[product - 1].productSpecs[0].thickness}</td>
              </tr>
            </tbody>
          </table>`;
      } else if (data[i].sfnStyleNumber === product && data[product].productType === "Carpet Tile") {
        tableContainer.innerHTML = `
        <table class="spec_table">
          <tbody>
            <tr>
              <th>Brand</th>
              <td data-th="Brand">${data[product - 1].brand}</td>
            </tr>
            <tr>
              <th>Style Name</th>
              <td data-th="StyleName">${data[product - 1].sfnName}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td data-th="Color">${color.textContent}</td>
              </tr>
              <tr>
                <th>Dimensions</th>
                <td data-th="Dimensions">${data[product - 1].productSpecs[0].dimensions}</td>
              </tr>
            </tbody>
          </table>`;
      }
    }

 

  } catch (error) {
    console.log(error);
  }
}