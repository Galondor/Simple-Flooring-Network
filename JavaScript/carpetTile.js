const products = document.getElementById('products');
const product = document.getElementById('product');
const productName = document.querySelector('.product_name');
const productPrice = document.querySelector('.product_price');
const productImg = document.getElementById('product_img');
const filters = document.getElementsByName('vgbbnpr');
let productData = [];

getProducts();

async function getProducts() {
  products.innerHTML = "";
  localStorage.removeItem('selectedProduct');

  try {
    const response = await fetch('../products.json');
    const data = await response.json();
    const cptTileData = data.filter(product => product.productType === "Carpet Tile");
    productData = cptTileData;
    filters.forEach((filter) => {
      if (filter.checked) {
        filterByRating(filter.value, productData);
      } 
    });

    if (window.innerWidth > 425) {
      for (let i = 0; i < productData.length; i++) {
        products.innerHTML += `<a href="itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
        <div class="product" id="product" value="${productData[i].rating}" style="background-image: url(../${productData[i].image})" loading="lazy" type="jpeg">
        <div class="product_banner">
            <h3 class="product_name">${productData[i].sfnName}</h3>
            <h4 class="product_brand">${productData[i].brand}</h4>
            <div class="desc_wrapper">
                <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
                <p class="rating">${productData[i].rating}</p>
            </div>
            <p class="total_colors">${productData[i].colors.length} Color Options Available</p>
            <div class="colors">
            <figure class="color_wrapper"><img src="../${productData[i].colors[0].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
            <figure class="color_wrapper"><img src="../${productData[i].colors[1].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
            <figure class="color_wrapper"><img src="../${productData[i].colors[2].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
            <figure class="color_wrapper"><img src="../${productData[i].colors[3].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
        </div>
        </div>
    </div></a>`;
    }
    } else if (window.innerWidth <= 425) {
      for (let i = 0; i < productData.length; i++) {
        products.innerHTML += `<a href="itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
        <div class="product" id="product" value="${productData[i].rating}" style="background-image: url(../${productData[i].image})" loading="lazy" type="jpeg">
        <div class="product_banner">
            <h3 class="product_name">${productData[i].sfnName}</h3>
            <h4 class="product_brand">${productData[i].brand}</h4>
            <div class="desc_wrapper">
                <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
                <p class="rating">${productData[i].rating}</p>
            </div>
            <p class="total_colors">${productData[i].colors.length} Color Options Available</p>
            <div class="colors">
            <figure class="color_wrapper"><img src="../${productData[i].colors[0].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
            <figure class="color_wrapper"><img src="../${productData[i].colors[1].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
            <figure class="color_wrapper"><img src="../${productData[i].colors[2].colorImage}" alt="Color Image" loading="lazy" type="jpeg"></figure>
        </div>
        </div>
    </div></a>`;
    }
    }
  } catch (error) {
    console.log(error);
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

function filterByRating(rating, data) {
  productData = data.filter(elem => elem.rating === rating);
}
