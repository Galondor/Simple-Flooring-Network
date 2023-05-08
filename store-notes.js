// const products = document.getElementById('products');
// const product = document.getElementById('product');
// const productName = document.querySelector('.product_name');
// const productPrice = document.querySelector('.product_price');
// const productImg = document.getElementById('product_img');
// const pages = document.querySelectorAll('.page');
// const page1 = document.getElementById('1');
// const page2 = document.getElementById('2');
// const page3 = document.getElementById('3');
// const page4 = document.getElementById('4');
// const page5 = document.getElementById('5');

// getProducts();


// async function getProducts() {
//   products.innerHTML = "";

//   try {
//     const response = await fetch('/productData/products.json');
//     const data = await response.json();
//     const productData = data.filter(product => product.productType === "LVP");
//     console.log(productData);

//     if (currentPage == 1) {
//       for (let i = 0; i < 24; i++) {
//         products.innerHTML += `<div class="product" id="product" style="background-image: url(${data[i].image})">
//         <div class="product_banner">
//             <h3 class="product_name">${productData[i].sfnName}</h3>
//             <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
//             <div class="colors">
//             <figure class="color_wrapper"><img src="${data[0].colors[4].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[5].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[6].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[13].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[9].colorImage}" alt=""></figure>
//         </div>
//         </div>
//     </div>`;
//     }
//     } else if (currentPage == 2) {
//       for (let i = 12; i < 24; i++) {
//         products.innerHTML += `<div class="product" id="product" style="background-image: url(${data[i].image})">
//         <div class="product_banner">
//             <h3 class="product_name">${productData[i].sfnName}</h3>
//             <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
//             <div class="colors">
//             <figure class="color_wrapper"><img src="${data[0].colors[4].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[5].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[6].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[13].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[9].colorImage}" alt=""></figure>
//         </div>
//         </div>
//     </div>`;
//     }
//     } else if (currentPage == 3) {
//       for (let i = 24; i < 36; i++) {
//         products.innerHTML += `<div class="product" id="product" style="background-image: url(${data[i].image})">
//         <div class="product_banner">
//             <h3 class="product_name">${productData[i].sfnName}</h3>
//             <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
//             <div class="colors">
//             <figure class="color_wrapper"><img src="${data[0].colors[4].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[5].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[6].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[13].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[9].colorImage}" alt=""></figure>
//         </div>
//         </div>
//     </div>`;
//     }
//     } else if (currentPage == 4) {
//       for (let i = 36; i < 48; i++) {
//         products.innerHTML += `<div class="product" id="product" style="background-image: url(${data[i].image})">
//         <div class="product_banner">
//             <h3 class="product_name">${productData[i].sfnName}</h3>
//             <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
//             <div class="colors">
//             <figure class="color_wrapper"><img src="${data[0].colors[4].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[5].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[6].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[13].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[9].colorImage}" alt=""></figure>
//         </div>
//         </div>
//     </div>`;
//     }
//     } else if (currentPage == 5) {
//       for (let i = 48; i < 60; i++) {
//         products.innerHTML += `<div class="product" id="product" style="background-image: url(${data[i].image})">
//         <div class="product_banner">
//             <h3 class="product_name">${productData[i].sfnName}</h3>
//             <p class="price">${productData[i].price[0].priceValue}<span class="uom">/sqft</span></p>
//             <div class="colors">
//             <figure class="color_wrapper"><img src="${data[0].colors[4].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[5].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[6].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[13].colorImage}" alt=""></figure>
//             <figure class="color_wrapper"><img src="${data[0].colors[9].colorImage}" alt=""></figure>
//         </div>
//         </div>
//     </div>`;
//     }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function nextPage() {
//   currentPage++;
//   getProducts();
// }

// function prevPage() {
//   currentPage--;
//   getProducts();
// }

// function changePage() {
//  let page = event.target.id;
//   currentPage = page;
//   getProducts();
// }

