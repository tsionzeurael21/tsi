// ==========================
// LARGO SHOP
// ==========================

let cart = [];


// ==========================
// ADD TO CART
// ==========================

function addToCart(name, price) {

    // Check if product already exists
    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " ወደ Cart ተጨምሯል! 🛒");
}


// ==========================
// UPDATE CART
// ==========================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const orderTotal =
        document.getElementById("orderTotal");


    // Total quantity
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    cartCount.textContent = totalQuantity;


    // Clear cart
    cartItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;">
                🛒 Cart ባዶ ነው
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            cartItems.innerHTML += `

                <div class="cart-item">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        ${item.price} Birr ×
                        ${item.quantity}

                        <br>

                        <strong>
                            ${item.price * item.quantity} Birr
                        </strong>

                    </div>


                    <div
                        style="
                            display:flex;
                            align-items:center;
                            gap:6px;
                        "
                    >

                        <button
                            onclick="decreaseQuantity(${index})"
                            style="
                                width:32px;
                                height:32px;
                                border:none;
                                border-radius:5px;
                                cursor:pointer;
                            "
                        >
                            −
                        </button>


                        <strong>
                            ${item.quantity}
                        </strong>


                        <button
                            onclick="increaseQuantity(${index})"
                            style="
                                width:32px;
                                height:32px;
                                border:none;
                                border-radius:5px;
                                cursor:pointer;
                            "
                        >
                            +
                        </button>


                        <button
                            onclick="removeFromCart(${index})"
                            style="
                                background:#e74c3c;
                                color:white;
                                border:none;
                                padding:7px;
                                border-radius:5px;
                                cursor:pointer;
                            "
                        >
                            🗑️
                        </button>

                    </div>

                </div>
            `;

        });
    }


    // Calculate total price
    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    cartTotal.textContent = total;

    orderTotal.textContent = total;
}


// ==========================
// INCREASE QUANTITY
// ==========================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    updateCart();
}


// ==========================
// DECREASE QUANTITY
// ==========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


// ==========================
// DELETE PRODUCT
// ==========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ==========================
// OPEN CART
// ==========================

function openCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "flex";

    updateCart();
}


// ==========================
// CLOSE CART
// ==========================

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";
}


// ==========================
// SEARCH PRODUCTS
// ==========================

function searchProducts() {

    const searchInput =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();


        const description =
            product
            .querySelector("p")
            .textContent
            .toLowerCase();


        if (
            name.includes(searchInput) ||
            description.includes(searchInput)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ==========================
// ORDER
// ==========================

document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Check cart
            if (cart.length === 0) {

                alert(
                    "እባክዎ መጀመሪያ ምርት ይምረጡ። 🛒"
                );

                return;
            }


            // Customer information
            const customerName =
                document
                .getElementById("customerName")
                .value;


            const phone =
                document
                .getElementById("phone")
                .value;


            const city =
                document
                .getElementById("city")
                .value;


            const area =
                document
                .getElementById("area")
                .value;


            const address =
                document
                .getElementById("address")
                .value;
                const paymentMethod =
    document
    .getElementById("paymentMethod")
    .value;


            // Products
            let productsText = "";

            let total = 0;


            cart.forEach(item => {

                const itemTotal =
                    item.price *
                    item.quantity;


                total += itemTotal;


                productsText +=
                    "• " +
                    item.name +
                    " × " +
                    item.quantity +
                    " = " +
                    itemTotal +
                    " Birr\n";

            });


            // WhatsApp message
            const message ="Address: " +
address +
"\n\n" +

"💳 Payment: " +
paymentMethod +
"\n\n" +

                "🧴 LARGO SHOP ORDER\n\n" +

                "👤 Name: " +
                customerName +
                "\n" +

                "📞 Phone: " +
                phone +
                "\n\n" +

                "📍 DELIVERY ADDRESS\n" +

                "City: " +
                city +
                "\n" +

                "Area: " +
                area +
                "\n" +

    "Address: " +
address +
"\n\n" +

"💳 Payment: " +
paymentMethod +
"\n\n" +
<select id="paymentMethod" required>

    <option value="">
        💳 የክፍያ መንገድ ይምረጡ
    </option>

    <option value="Cash on Delivery">
        💵 Cash on Delivery
    </option>

    <option value="Telebirr">
        📱 Telebirr
    </option>

    <option value="Bank Transfer">
        🏦 Bank Transfer
    </option>

</select>
                "🛒 PRODUCTS\n" +

                productsText +

                "\n🚚 Delivery: FREE\n" +

                "💰 TOTAL: " +
                total +
                " Birr";


            // WhatsApp number
            // Change this later
            const whatsappNumber =
                "2519xxxxxxxx";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );


            alert(
                "Orderዎ ተዘጋጅቷል! 🎉"
            );

        }
    );


// ==========================
// START WEBSITE
// ==========================

updateCart();