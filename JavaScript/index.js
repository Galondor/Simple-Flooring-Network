async function getMonthlyProduct() {
    try {
        const response = await fetch('../products.json');
        const data = await response.json();

        localStorage.setItem("selectedProduct", data[16].sfnStyleNumber);

        let recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        let newItem = {sfnNum: data[16].sfnStyleNumber};
      
        //Check to make sure the product isn't a duplicate
        for (let i = 0; i < recent.length; i++) {
          if (recent[i].sfnNum === data[16].sfnStyleNumber) {
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
    } catch (error) {
        console.log(error);
    }
}

const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul')
const dot = document.querySelector('.dot');
const dot1 = document.querySelector('.dot-1');
const dot2= document.querySelector('.dot-2');
const dot3 = document.querySelector('.dot-3');
const dot4 = document.querySelector('.dot-4');
var sectionIndex = 0;

slide();

function slide() {
    setInterval(function(){
        sectionIndex++;

        if(sectionIndex >= 4) {
            sectionIndex = 0;
        }

        if (sectionIndex === 0) {
            dot1.classList.add('selected');
            dot2.classList.remove('selected');
            dot3.classList.remove('selected');
            dot4.classList.remove('selected');
        } else if (sectionIndex === 1) {
            dot2.classList.add('selected');
            dot1.classList.remove('selected');
            dot3.classList.remove('selected');
            dot4.classList.remove('selected');
        } else if (sectionIndex === 2) {
            dot3.classList.add('selected');
            dot1.classList.remove('selected');
            dot2.classList.remove('selected');
            dot4.classList.remove('selected');
        } else if (sectionIndex === 3) {
            dot4.classList.add('selected');
            dot1.classList.remove('selected');
            dot2.classList.remove('selected');
            dot3.classList.remove('selected');
        }

        slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';

}, 6000)}

/*Carousel*/
document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
    indicator.addEventListener('click', function() {
        sectionIndex = ind;
        document.querySelector('.controls .selected').classList.remove('selected');
        indicator.classList.add('selected');
        slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';
    });
});

leftArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';
});

rightArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 3;
     document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';
});

//Pop-up

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

recentlyViewed();

async function recentlyViewed() {
    try {
        const response = await fetch('../products.json');
        const data = await response.json();

        const recentlyViewedStorage = JSON.parse(localStorage.getItem("recentlyViewed").split(','));
        const header = document.querySelector('.recently_viewed_header');
    recentlyViewed = document.querySelector('.recently_viewed');
    if (recentlyViewedStorage.length > 0) {
        header.style.display = "flex";
        recentlyViewed.style.display = "flex";
        for (let i = 0; i < recentlyViewedStorage.length; i++) {
            recentlyViewed.innerHTML += `
            <a href="itemPage.html" onclick="selectedProduct(${recentlyViewedStorage[i].sfnNum})">
        <div class="recently_viewed_product">
        <img src="../${data[recentlyViewedStorage[i].sfnNum - 1].image}" alt="No Image" Class="recently_viewed_img">
        <div class="recently_viewed_product_wrapper">
            <h3 class="recently_viewed_product_title">${data[recentlyViewedStorage[i].sfnNum - 1].sfnName}</h3>
            <p class="recently_viewed_product_price">${data[recentlyViewedStorage[i].sfnNum - 1].price[0].priceValue}<span class="uom">/sqft</span></p>
        </div>
    </div>
    </a>`
        }
    }
    } catch (error) {
        console.log(error);
    }
}

renderHotProducts();

async function renderHotProducts() {
    const hotProducts = document.querySelector('.hot_products');

    try {
        const response = await fetch('../products.json');
        const tempData = await response.json();
        const data = tempData.filter(product => product.hot === true)

        for (let i = 0; i < 6; i++) {
            hotProducts.innerHTML += `
                <div class="hot_product">
                    <a href="itemPage.html" class="hot_product_wrapper" onclick="selectedProduct(${data[i].sfnStyleNumber})">
                        <img src="../${data[i].image}" alt="" class="hot_product_img">
                        <span class="hot_product_title">${data[i].sfnName}</span>
                        <span class="color_options">${data[i].colors.length} Colors Available</span>
                        <span class="hot_product_price">${data[i].price[1].priceValue}<span class="uom">/sqft</span></span>
                    </a>
                </div>`;
        }
    } catch (error) {
        console.log(error);
    }
}

function selectedProduct(product) {
    localStorage.setItem("selectedProduct", product);
}