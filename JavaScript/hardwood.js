const products = document.getElementById('products');
const product = document.getElementById('product');
const productName = document.querySelector('.product_name');
const productPrice = document.querySelector('.product_price');
const productImg = document.getElementById('product_img');

getProducts();

async function getProducts() {
  products.innerHTML = "";
  localStorage.removeItem('selectedProduct');

  try {
    const response = await fetch('/productData/products.json');
    const data = await response.json();
    const productData = data.filter(product => product.productType === "Hardwood");
    console.log(productData);

      for (let i = 0; i < productData.length; i++) {
        products.innerHTML += `<a href="/HTML/itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
        <div class="product" id="product" style="background-image: url(${productData[i].image})">
        <div class="product_banner">
            <h3 class="product_name">${productData[i].sfnName}</h3>
            <h4 class="product_brand">${productData[i].brand}</h4>
            <div class="desc_wrapper">
                <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
                <p class="rating">${productData[i].rating}</p>
            </div>
            <p class="total_colors">${productData[i].colors.length} Color Options Available</p>
            <div class="colors">
            <figure class="color_wrapper"><img src="${productData[i].colors[0].colorImage}" alt=""></figure>
            <figure class="color_wrapper"><img src="${productData[i].colors[1].colorImage}" alt=""></figure>
            <figure class="color_wrapper"><img src="${productData[i].colors[2].colorImage}" alt=""></figure>
            <figure class="color_wrapper"><img src="${productData[i].colors[3].colorImage}" alt=""></figure>
        </div>
        </div>
    </div></a>`;
    }
  } catch (error) {
    console.log(error);
  }
}

function selectedProduct(product) {
  //Get the poduct data from the clicked product
  localStorage.setItem('selectedProduct', product);
}