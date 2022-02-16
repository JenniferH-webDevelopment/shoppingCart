const productManager = new ProductManager();
const cartManager = new CartManager();
const promotionManager = new Promotion();

productManager.render();
cartManager.render();

const productList = document.querySelector('#product-list');
productList.addEventListener('click', function(event) {
    // if add to cart button is clicked
    if (event.target.classList.contains("btn-add-cart")) {
        // get the parent element, which has product id
        let parentProduct = event.target.parentElement.parentElement.parentElement;

        // get product id using data set attribute
        let productId = Number(parentProduct.dataset.productId);

        // get the quantity by query selector to the input name quantity
        let quantity = Number(parentProduct.querySelector("input[name='quantity']").value);

        // get product by product id
        let product = productManager.getProductById(productId);

        // add product to cart with the quantity
        cartManager.addToCart(product, quantity);

        // calculate cart
        cartManager.calculateTotalCart();

        // render the cart after add product
        cartManager.render();
    }
});

const deliveryOption = document.querySelector("#delivery-cost");
deliveryOption.addEventListener('change', function(event) {
    cartManager.calculateTotalCart();

    // render the cart after add product
    cartManager.render();
});

const promotionCode = document.querySelector("#promotion-code");
promotionCode.addEventListener('change', function(event) {
    let promotionCode = event.target.value;

    // check if promotion code is valid
    let promoCode = promotionManager.checkValidPromotionCode(promotionCode);
    if (promoCode && promoCode.discount > 0) {
        // if promotion code is valid, then calculate total cart amount again
        cartManager.calculateTotalCart(promoCode.discount);

        // render the cart after calculation
        cartManager.render();
    }
});