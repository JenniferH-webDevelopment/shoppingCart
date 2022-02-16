class CartManager {
    constructor() {
        this.cart = [];
        this.totalCartItem = 0;
        this.totalCartAmount = 0;
        this.totalAmount = 0;
    }

    // add product with quantity to cart
    addToCart(product, quantity) {
        // check if product already exist in cart, if exists then update cart item with quantity, otherwise insert
        let productId = product.id;
        let isUpdate = false;

        if (this.cart.length > 0) {
            for (let i = 0; i < this.cart.length; i++) {
                // if the product id exists in the cart, then update quantity
                if (this.cart[i].product.id == productId) {
                    this.cart[i].quantity += quantity;
                    isUpdate = true;
                    break;
                }
            }
        }

        if (!isUpdate) {
            this.cart.push({
                product: product,
                quantity: quantity
            });
        }

        // console.log(this.cart);
    };

    // create cart items
    createCartHtml(cart) {
        let html = `<tr data-product-id="${cart.product.id}">
            <th scope="row">${cart.product.name}</th>
            <td class="text-center">
                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown();cartManager.updateCartItem(event);">
                    <i class="fa fa-minus-square"></i>
                </button>

                <input min="1" name="cart-quantity" value="${cart.quantity}" type="number"
                    class="form-control" />

                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp();cartManager.updateCartItem(event);">
                    <i class="fa fa-plus-square"></i>
                </button>
            </td>
            <td class="text-center">$${cart.product.price}</td>
            <td class="text-center">$${cart.quantity*cart.product.price}</td>
            <td class="text-center"><i class="fa fa-trash" aria-hidden="true" id="delete-cart-item" onclick="cartManager.removeCartItem(event);"></i></td>
        </tr>`;

        return html;
    };

    // display cart items
    render() {
        let cartListHtml = [];

        for(let i = 0; i < this.cart.length; i++) {
            // console.log(this.products[i]);
            let cartHtml = this.createCartHtml(this.cart[i]);
            cartListHtml.push(cartHtml);
        }

        const cartsHtml = cartListHtml.join("\n");

        // Set the inner html of the tasksList on the page
        const cartHtml = document.querySelector("#cart-list");
        cartHtml.innerHTML = cartsHtml;

        // update total cart item and amount
        const totalCartItem = document.querySelector("#total-cart-item");
        const totalCartAmount = document.querySelector("#total-cart-amount");
        const totalAmount = document.querySelector("#total-amount")

        totalCartItem.innerHTML = this.totalCartItem;
        totalCartAmount.innerHTML = this.totalCartAmount;
        totalAmount.innerHTML = this.totalAmount;
    };

    calculateTotalCart(discountAmount = 0) {
        this.totalCartItem = 0;
        this.totalCartAmount = 0;
        this.totalAmount = 0;

        // loop through cart items array to calculate
        for (let i = 0; i < this.cart.length; i++) {
            this.totalCartAmount = this.totalCartAmount + this.cart[i].product.price * this.cart[i].quantity;
            this.totalCartItem = this.totalCartItem + this.cart[i].quantity;
        }

        // only include shipping cost if cart is not empty
        if (this.cart.length > 0) {
            let shippingCost = Number(document.querySelector("#delivery-cost").value);
            this.totalAmount = this.totalCartAmount + shippingCost;
        }

        // calculate discount amount if > 0, i.e. promotional code is valid
        if (discountAmount > 0) {
            this.totalAmount = this.totalAmount - discountAmount;

            // reset total amount to 0 if discount is more than total amount, i.e. discount = 50 and total amount = 40
            if (this.totalAmount < 0) {
                this.totalAmount = 0;
            }
        }
    }

    removeCartItem(event) {
        // this.cart.re
        console.log(event);
        let deleteProductId = Number(event.target.parentElement.parentElement.dataset.productId);
        let cartItems = [];
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.id !== deleteProductId) {
                cartItems.push(this.cart[i]);
            }
        }

        // update the cart without deleted item
        this.cart = cartItems;

        // calculate cart total again
        this.calculateTotalCart();

        // render cart again after delete
        this.render();
    };

    updateCartItem(event) {
        console.log(event);
        let currentCartItem = event.target.parentElement.parentElement.parentElement;
        let updateProductId = Number(currentCartItem.dataset.productId);
        let currentCartItemQuantity = Number(currentCartItem.querySelector("input[name='cart-quantity']").value);

        for(let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.id == updateProductId) {
                this.cart[i].quantity = currentCartItemQuantity;
            }
        }

        // calculate cart total again
        this.calculateTotalCart();

        // render cart again after update quantiy and calculate
        this.render();
    }
}