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
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>NOIR — Clothing Store</title>

    <link
        rel="stylesheet"
        href="style.css"
    >

</head>


<body>


    <!-- NAVIGATION -->

    <header>

        <div class="logo">
            NOIR
        </div>

        <nav>

            <a href="#home">
                Home
            </a>

            <a href="#shop">
                Shop
            </a>

            <a href="#about">
                About
            </a>

            <a href="#contact">
                Contact
            </a>

        </nav>

        <button
            class="cart-button"
            onclick="openCart()"
        >
            🛒 Cart
            <span id="cartCount">0</span>
        </button>

    </header>



    <!-- HERO -->

    <main>

        <section
            id="home"
            class="hero"
        >

            <div class="hero-content">

                <p class="eyebrow">
                    NEW COLLECTION
                </p>

                <h1>
                    WEAR YOUR<br>
                    STORY.
                </h1>

                <p>
                    Discover clothing designed
                    for everyday life.
                </p>

                <a
                    href="#shop"
                    class="shop-button"
                >
                    SHOP NOW
                </a>

            </div>

        </section>



        <!-- SHOP -->

        <section
            id="shop"
            class="shop"
        >

            <div class="section-heading">

                <p class="eyebrow">
                    OUR COLLECTION
                </p>

                <h2>
                    Featured Products
                </h2>

            </div>


            <div
                id="productGrid"
                class="product-grid"
            >

                <p>
                    Loading products...
                </p>

            </div>

        </section>



        <!-- ABOUT -->

        <section
            id="about"
            class="about"
        >

            <div>

                <p class="eyebrow">
                    ABOUT US
                </p>

                <h2>
                    STYLE WITHOUT<br>
                    THE NOISE.
                </h2>

            </div>

            <p>
                We believe clothing should feel
                as good as it looks. Simple,
                comfortable and made for you.
            </p>

        </section>



        <!-- CONTACT -->

        <section
            id="contact"
            class="contact"
        >

            <p class="eyebrow">
                GET IN TOUCH
            </p>

            <h2>
                HAVE A QUESTION?
            </h2>

            <p>
                Contact us through phone,
                Facebook or Instagram.
            </p>

            <button
                onclick="contactUs()"
                class="shop-button"
            >
                CONTACT US
            </button>

        </section>

    </main>



    <!-- CART -->

    <div
        id="cart"
        class="cart"
    >

        <div class="cart-box">

            <button
                class="close"
                onclick="closeCart()"
            >
                ×
            </button>

            <h2>
                YOUR CART
            </h2>

            <div id="cartItems">
                Your cart is empty.
            </div>

            <div class="cart-total">

                Total:

                <strong>
                    ৳<span id="cartTotal">0</span>
                </strong>

            </div>

            <button
                class="checkout-button"
                onclick="checkout()"
            >
                CHECKOUT
            </button>

        </div>

    </div>



    <footer>

        <div class="logo">
            NOIR
        </div>

        <p>
            © 2026 NOIR. All rights reserved.
        </p>

    </footer>


    <script src="app.js"></script>

</body>

</html>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, sans-serif;
    background: #f5f4f0;
    color: #111;
}


/* NAV */

header {
    height: 75px;
    padding: 0 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f4f0;
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    font-size: 25px;
    font-weight: 900;
    letter-spacing: 6px;
}

nav {
    display: flex;
    gap: 30px;
}

nav a {
    text-decoration: none;
    color: #111;
    font-size: 13px;
}

.cart-button {
    background: #111;
    color: white;
    border: none;
    padding: 11px 18px;
    cursor: pointer;
}


/* HERO */

.hero {
    min-height: 650px;
    display: flex;
    align-items: center;
    padding: 7%;
    background:
        linear-gradient(
            90deg,
            rgba(0,0,0,.7),
            rgba(0,0,0,.1)
        ),
        url(
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
        );

    background-size: cover;
    background-position: center;
    color: white;
}

.hero-content {
    max-width: 650px;
}

.eyebrow {
    font-size: 11px;
    letter-spacing: 3px;
    margin-bottom: 18px;
    font-weight: bold;
}

.hero h1 {
    font-size: clamp(
        55px,
        9vw,
        110px
    );

    line-height: .85;
    margin-bottom: 30px;
}

.hero p:not(.eyebrow) {
    max-width: 400px;
    line-height: 1.7;
    margin-bottom: 30px;
}

.shop-button {
    display: inline-block;
    padding: 15px 25px;
    background: white;
    color: #111;
    text-decoration: none;
    border: none;
    cursor: pointer;
}


/* SHOP */

.shop {
    padding: 100px 7%;
}

.section-heading {
    margin-bottom: 45px;
}

.section-heading h2,
.about h2 {
    font-size: 45px;
}


.product-grid {
    display: grid;
    grid-template-columns:
        repeat(3, 1fr);

    gap: 25px;
}

.product {
    background: white;
    padding-bottom: 20px;
}

.product img {
    width: 100%;
    height: 430px;
    object-fit: cover;
}

.product-info {
    padding: 18px;
}

.product-info h3 {
    font-size: 15px;
    margin-bottom: 8px;
}

.product-info p {
    color: #666;
    margin-bottom: 15px;
}

.add-cart {
    width: 100%;
    padding: 12px;
    background: #111;
    color: white;
    border: none;
    cursor: pointer;
}


/* ABOUT */

.about {
    padding: 100px 7%;
    background: #111;
    color: white;

    display: grid;
    grid-template-columns:
        1fr 1fr;

    gap: 60px;
}

.about h2 {
    line-height: 1;
}

.about > p {
    max-width: 450px;
    line-height: 1.8;
    align-self: end;
}


/* CONTACT */

.contact {
    padding: 110px 7%;
    text-align: center;
}

.contact h2 {
    font-size: 50px;
    margin-bottom: 20px;
}

.contact p:not(.eyebrow) {
    color: #666;
    margin-bottom: 25px;
}


/* CART */

.cart {
    display: none;

    position: fixed;
    inset: 0;

    background:
        rgba(0,0,0,.55);

    z-index: 500;

    justify-content: flex-end;
}

.cart.open {
    display: flex;
}

.cart-box {
    width: 430px;
    max-width: 100%;
    background: white;
    height: 100%;
    padding: 35px;
    position: relative;
}

.close {
    position: absolute;
    right: 25px;
    top: 20px;
    border: none;
    background: none;
    font-size: 30px;
    cursor: pointer;
}

.cart-box h2 {
    margin-bottom: 30px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
}

.cart-total {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
}

.checkout-button {
    width: 100%;
    padding: 15px;
    margin-top: 25px;
    background: #111;
    color: white;
    border: none;
    cursor: pointer;
}


/* FOOTER */

footer {
    padding: 40px 7%;
    border-top: 1px solid #ddd;

    display: flex;
    justify-content: space-between;

    color: #777;
}

footer .logo {
    color: #111;
}


/* MOBILE */

@media (max-width: 800px) {

    nav {
        display: none;
    }

    header {
        padding: 0 20px;
    }

    .product-grid {
        grid-template-columns: 1fr;
    }

    .product img {
        height: 500px;
    }

    .about {
        grid-template-columns: 1fr;
    }

    .hero {
        min-height: 600px;
        padding: 30px;
    }

    .shop {
        padding: 70px 20px;
    }

    .contact h2 {
        font-size: 38px;
    }

    footer {
        flex-direction: column;
        gap: 15px;
    }

}
