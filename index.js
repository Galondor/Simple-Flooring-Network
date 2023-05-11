async function getMonthlyProduct() {
    try {
        const response = await fetch('/productData/products.json');
        const data = await response.json();

        localStorage.setItem("selectedProduct", data[16].sfnStyleNumber);
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