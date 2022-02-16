class ProductManager {
    constructor(currentId = 0) {
        this.products = [
            {
                'id': 1,
                'name': 'T-shirt 1',
                'description': 'Cotton',
                'image': '/images/img5.webp',
                'price': 45
            },
            {
                'id': 2,
                'name': 'T-shirt 2',
                'description': 'Cotton',
                'image': '/images/img6.webp',
                'price': 40
            },
            {
                'id': 3,
                'name': 'T-shirt 3',
                'description': 'Cotton',
                'image': '/images/img7.webp',
                'price': 60
            },
        ];

        this.currentId = currentId;
    };

    createProductHtml(product) {
        let html = `<div class="row mb-4 d-flex justify-content-between align-items-center" data-product-id="${product.id}">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${product.image}" class="img-fluid rounded-3" alt="Cotton T-shirt">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted">${product.name}</h6>
                <h6 class="text-black mb-0">${product.description}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fa fa-minus-square"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="1" type="number"
                    class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fa fa-plus-square"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">$${product.price}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted"><i class="fa fa-cart-plus btn-add-cart"
                        title="Add to cart"></i></a>
            </div>
        </div>
        <hr class="my-4">`;

        return html;
    };

    // get product by id when clicking on the add to cart button
    getProductById(search_id) {
        return this.products.find( ({ id }) => id === search_id );
    };

    // display all products from product array
    render() {
        console.log(this.products);
        let productListHtml = [];

        for(let i = 0; i < this.products.length; i++) {
            // console.log(this.products[i]);
            let productHtml = this.createProductHtml(this.products[i]);
            productListHtml.push(productHtml);
        }

        const productsHtml = productListHtml.join("\n");

        // Set the inner html of the tasksList on the page
        const productsList = document.querySelector("#product-list");
        productsList.innerHTML = productsHtml;
    };
}

