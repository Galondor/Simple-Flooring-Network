const cart = JSON.parse(localStorage.getItem("cart")) || [];
const main = document.getElementById("main");


function renderPage() {
    if (cart.length == 0) {
        main.style.display = "block";
        main.innerHTML = `
        <div class="empty_cart_container">
        <h1 class="empty_cart">Your Cart is Empty :(</h1>
        <h2 class="empty_cart">Go back to the <a href="store.html" class="store_link">store</a> and add some items!</h2>
        </div>`;
    } else if (cart.length > 0) {
        main.style.display = "flex";
        main.innerHTML = `
        <section id="cart">
            <div class="container">
                <div class="row">
                    <div class="cart_wrapper">
                        <table>
                                <thead>
                                    <tr class="headers">
                                        <th class="header_product">Product</th>
                                        <th class="header_price">Price</th>
                                        <th class="header_qty">Quantity</th>
                                        <th class="header_total">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody class="products"> 
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <section id="summary">
            <div class="container">
                <div class="summary_wrapper">
                    <h1 class="summary_title">Summary</h1>
                    <div class="summary_info">
                        <div class="totals totals_sub">
                            <h4 class="total_title">Sub Total</h4>
                            <h4 class="total_value" id="subtotal"></h4>           
                        </div>
                        <div class="totals totals_tax">
                            <h4 class="total_title">Tax</h4>
                            <h4 class="total_value" id="taxtotal"></h4>
                        </div>
                    </div>
                    <div class="totals order_total">
                        <h1 class="order_total_title">Order Total</h1>
                        <h1 class="total_value" id="ordertotal"></h1>
                    </div>
                </div>
            </div>
        </section>`

        for (let i = 0; i < cart.length; i++) {
            let currentProduct = 0;
            currentProduct = cart[i].styleNumber;
            document.querySelector(".products").innerHTML += 
            `<tr class="product">
            <td class="item">
                <img src="${cart[i].image}" alt="" class="product_image popout">
                <h1>${cart[i].name}</h1>
                <h2>${cart[i].color}</h2>
                <h3>${cart[i].type} / ${cart[i].size}</h3>
                <h4 id="remove_item" onclick="removeItem(${currentProduct})">Remove Item</h4>
            </td>
            <td class="price">
                <h1>${cart[i].price}</h1>
            </td>
            <td class="qty">
                <input type="number" name="quantity" id="quantity${i}" min="1" max="5" value="1" onchange="updateQuantity()">
            </td>
            <td class="total">
                <h1 id="total_price${i}">${cart[i].price}</h1>
            </td>
        </tr>`;
        }
    }
    updateTotals();
}

function updateQuantity() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < cart.length; i++) {
        let quantity = document.getElementById(`quantity${i}`);
        let price = document.getElementById(`total_price${i}`);
        let total = quantity.value * cart[i].price.replace("$", "");
        price.textContent = "$" + total.toFixed(2);
    }
    updateTotals();
}

function updateTotals() {
const quantity = document.getElementById("quantity");
const subTotal = document.getElementById("subtotal");
const taxTotal = document.getElementById("taxtotal");
const orderTotal = document.getElementById("ordertotal");
    let totalCalc = 0;
    let taxAmount = 0;
    let finalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        let price = document.getElementById(`total_price${i}`)
        totalCalc += Number(price.textContent.replace("$", ""));
        taxAmount = totalCalc * 1.06 - totalCalc;
        finalPrice = totalCalc + taxAmount;
    }
    subTotal.textContent = "$" + totalCalc.toFixed(2);
    taxTotal.textContent = "$" + taxAmount.toFixed(2);
    orderTotal.textContent = "$" + finalPrice.toFixed(2);
}

function removeItem(itemNo) {
//Remove Item from Cart
const cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].styleNumber == itemNo) {
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    }
    console.log("Item Removed", cart);
}