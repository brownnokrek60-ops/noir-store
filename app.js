console.log("NOIR JS IS WORKING");
let products = [];

let cart = [];


/* =================================
   LOAD PRODUCTS
================================= */

async function loadProducts() {

    try {

        const response =
            await fetch(
                "https://hykgpvhvdflespfwnmua.supabase.co/rest/v1/products",
                {
                    headers: {
                        "apikey":
                            "sb_publishable_CK5HXGhDVHscDawc-Eakow_H5FJcg0Z",
                            "Authorization":
    "Bearer sb_publishable_CK5HXGhDVHscDawc-Eakow_H5FJcg0Z"

                        
                    }
                }
            );


        console.log("Supabase status:", response.status);

const data = await response.json();

console.log("Supabase response:", data);

products = data;

displayProducts();


        displayProducts();

    }

    catch (error) {

        console.error(error);

        document
            .getElementById(
                "productGrid"
            )
            .innerHTML =
            "<p>Unable to load products.</p>";

    }

}


/* =================================
   DISPLAY PRODUCTS
================================= */

function displayProducts() {

    const grid =
        document.getElementById(
            "productGrid"
        );


    if (!products.length) {

        grid.innerHTML =
            "<p>No products available.</p>";

        return;

    }


    grid.innerHTML =
        products.map(
            product => `

                <article class="product">

                    <img
                        src="${product.image_url}"
                        alt="${product.name}"
                    >

                    <div class="product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ৳${product.price}
                        </p>

                        <button
                            class="add-cart"
                            onclick="
                                addToCart(
                                    ${product.id}
                                )
                            "
                        >
                            ADD TO CART
                        </button>

                    </div>

                </article>

            `
        ).join("");

}


/* =================================
   CART
================================= */

function addToCart(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    cart.push(product);


    updateCart();

}


function updateCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const count =
        document.getElementById(
            "cartCount"
        );


    const total =
        document.getElementById(
            "cartTotal"
        );


    count.innerText =
        cart.length;


    if (!cart.length) {

        container.innerHTML =
            "Your cart is empty.";

        total.innerText = "0";

        return;

    }


    container.innerHTML =
        cart.map(
            (item, index) => `

                <div class="cart-item">

                    <span>
                        ${item.name}
                    </span>

                    <strong>
                        ৳${item.price}
                    </strong>

                </div>

            `
        ).join("");


    total.innerText =
        cart.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(item.price),
            0
        );

}


function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");

}


function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");

}


/* =================================
   CHECKOUT
================================= */

async function checkout() {

    if (!cart.length) {
        alert("Your cart is empty.");
        return;
    }

    const name = prompt("Enter your name:");
    if (!name) return;

    const phone = prompt("Enter your phone number:");
    if (!phone) return;

    const address = prompt("Enter your delivery address:");
    if (!address) return;

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );

    const order = {
        customer_name: name,
        phone: phone,
        address: address,

        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        })),

        total: total,

        payment_method: "Cash on Delivery",

        status: "Pending"
    };

    try {

        const response = await fetch(
            "https://hykgpvhvdflespfwnmua.supabase.co/rest/v1/rpc/place_order",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    "apikey":
                        "sb_publishable_CK5HXGhDVHscDawc-Eakow_H5FJcg0Z",
                        "Authorization":
    "Bearer sb_publishable_CK5HXGhDVHscDawc-Eakow_H5FJcg0Z",

                    

                    "Prefer":
                        "return=representation"
                },

                body: JSON.stringify({
    p_customer_name: order.customer_name,
    p_phone: order.phone,
    p_address: order.address,
    p_items: order.items,
    p_total: order.total,
    p_payment_method: order.payment_method,
    p_status: order.status
})
            }
        );

        if (!response.ok) {

            const error =
                await response.text();

            console.error(error);

            alert(
                "Something went wrong placing your order."
            );

            return;
        }

        alert(
            "🎉 Order placed successfully!"
        );

        cart = [];

        updateCart();

        closeCart();

    }

    catch (error) {

        console.error(error);

        alert(
            "Could not connect to the store."
        );

    }

}


/* =================================
   CONTACT
================================= */

function contactUs() {

    alert(
        "Contact details will be added here."
    );

}


/* =================================
   START
================================= */

loadProducts();
