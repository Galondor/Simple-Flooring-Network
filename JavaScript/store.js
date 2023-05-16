const products = document.getElementById('products');
const product = document.getElementById('product');
const productName = document.querySelector('.product_name');
const productPrice = document.querySelector('.product_price');
const productImg = document.getElementById('product_img');
const pages = document.querySelectorAll('.page');
const page1 = document.getElementById('1');
const page2 = document.getElementById('2');
const page3 = document.getElementById('3');
const page4 = document.getElementById('4');
const page5 = document.getElementById('5');
let currentPage = 1;

getProducts();


async function getProducts() {
    products.innerHTML = '';

    if (currentPage == 1) {
        page1.style.color = "red";
        page2.style.color = "black";
        page3.style.color = "black";
        page4.style.color = "black";
        page5.style.color = "black";
        document.querySelector('.prev').style.display = "none";
        document.querySelector('.next').style.display = "flex";
    } else if (currentPage == 2) {
        page2.style.color = "red";
        page1.style.color = "black";
        page3.style.color = "black";
        page4.style.color = "black";
        page5.style.color = "black";
        document.querySelector('.prev').style.display = "flex";
        document.querySelector('.next').style.display = "flex";
    } else if (currentPage == 3) {
        page3.style.color = "red";
        page2.style.color = "black";
        page1.style.color = "black";
        page4.style.color = "black";
        page5.style.color = "black";
        document.querySelector('.prev').style.display = "flex";
        document.querySelector('.next').style.display = "flex";
    } else if (currentPage == 4) {
        page4.style.color = "red";
        page2.style.color = "black";
        page3.style.color = "black";
        page1.style.color = "black";
        page5.style.color = "black";
        document.querySelector('.prev').style.display = "flex";
        document.querySelector('.next').style.display = "none";
    } else if (currentPage == 5) {
        page5.style.color = "red";
        page2.style.color = "black";
        page3.style.color = "black";
        page4.style.color = "black";
        page1.style.color = "black";
    };

  try {
    const response = await fetch('/productData/products.json');
    const data = await response.json();
    const productData = data;
    console.log(productData);

    if (currentPage == 1) {
      for (let i = 0; i < 12; i++) {
        products.innerHTML += `<a href="/itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
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
    } else if (currentPage == 2) {
      for (let i = 12; i < 24; i++) {
        products.innerHTML += `<a href="/itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
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
    } else if (currentPage == 3) {
      for (let i = 24; i < 36; i++) {
        products.innerHTML += `<a href="/itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
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
    } else if (currentPage == 4) {
      for (let i = 36; i < 48; i++) {
        products.innerHTML += `<a href="/itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
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
    } else if (currentPage == 5) {
      for (let i = 48; i < 60; i++) {
        products.innerHTML += `<a href="/itemPage.html" class="product_wrapper" onclick="selectedProduct(${productData[i].sfnStyleNumber})" >
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
    }
  } catch (error) {
    console.log(error);
  }
}

function nextPage() {
  currentPage++;
  getProducts();
}

function prevPage() {
  currentPage--;
  getProducts();
}

function changePage() {
 let page = event.target.id;
  currentPage = page;
  getProducts();
}
