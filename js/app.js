/* Getting products add buttons */
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

/* Buy button */
const buyButton = document.querySelector('.comprarButton');
buyButton.addEventListener('click', buyButtonClicked);

/* Modal closing button */
const closeModalButton = document.querySelector('.close-modal-btn');
closeModalButton.addEventListener('click', toggleModalState);

/* Alerts and modal */
const successAlert = document.querySelector('.success-alert');
const errorAlert = document.querySelector('.error-alert');
const modalItemsContainer = document.querySelector('.modal-item-container');

/* Shopping cart items container */
const shoppingCartItemsContainer = document.querySelector('.item-rows-container');


/* checks if add to cart button was pressed and asigns the item title, price and image to constants */
function addToCartClicked(event) {

    const button = event.target;
    const item = button.closest('#item');

    const itemTitle = item.querySelector('#item-title').textContent;
    const itemPrice = item.querySelector('#item-price').textContent;
    const itemImage = item.querySelector('#item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}


/* Builds and adds the selected product item to the cart container */
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    const elementTitle = shoppingCartItemsContainer.getElementsByClassName('shopping-cart-item-title');

    for (let i = 0; i < elementTitle.length; i++) {

        if (elementTitle[i].innerText === itemTitle) {

            let elementsQuantity = elementTitle[i].closest('.shopping-cart-item').querySelector('.shoppingCartItemQuantity');

            try {
                elementsQuantity.value++;
                toggleSuccessAlertState();
                setTimeout(toggleSuccessAlertState, 3000);
                updateShoppingCartTotal();
                return;
            } catch (e) {
                toggleSuccessAlertState();
                setTimeout(toggleSuccessAlertState, 3000);
                console.log(e);
            }
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
                        <div class="row shopping-cart-item">
                            <div class="column">
                                <div class="shopping-cart-info">
                                    <img src='${itemImage}' class="shopping-cart-image">
                                    <h5 class="shopping-cart-item-title shoppingCartItemTitle title-center">${itemTitle}</h5>
                                </div>
                            </div>
                            <div class="column">
                                <div class="shopping-cart-price">
                                    <p class="shoppingCartItemPrice">USD <span class="item-price">${itemPrice}</span></p>
                                </div>
                            </div>
                            <div class="column">
                                <div class="shopping-cart-quantity-container">
                                    <div class='shopping-cart-quantity'>
                                        <div class='quantity-down-btn'><span>-</span></div>
                                        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1" min="1" max="101">
                                        <div class='quantity-up-btn'><span>+</span></div>
                                    </div>
                                    <div class='remove-cart-item-button-container'>
                                        <button class="btn btn-danger remove-item-btn" type="button"><span class="material-icons-outlined">close</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);
    toggleSuccessAlertState();
    setTimeout(toggleSuccessAlertState, 3000);

    shoppingCartRow.querySelector('.remove-item-btn').addEventListener('click', deleteShoppingCartItem);

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

    shoppingCartRow.querySelector('.quantity-down-btn').addEventListener('click', decreaseQuantity);

    shoppingCartRow.querySelector('.quantity-up-btn').addEventListener('click', increaseQuantity);


    updateShoppingCartTotal();
}

/* Toggles the success alert state */
function toggleSuccessAlertState() {

    successAlert.classList.toggle('alert-inactive');

}

/* Toggles the error alert state */
function toggleErrorAlertState() {

    errorAlert.classList.toggle('alert-inactive');

}

/* Toggles the modal alert state */
function toggleModalState() {

    modalItemsContainer.classList.toggle('modal-inactive');

}

/* Updates the shopping cart total */
function updateShoppingCartTotal() {
    let total = 0;

    const shoppingCartTotal = document.querySelector('#cart-total-price');

    const shoppingCartItems = document.querySelectorAll('.shopping-cart-item');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.item-price');

        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent);

        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');

        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);


        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });

    shoppingCartTotal.innerHTML = `${total.toFixed(2)}`;

}

/* Deletes the closest cart item to the pressed button */
function deleteShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shopping-cart-item').remove();
    toggleSuccessAlertState();
    setTimeout(toggleSuccessAlertState, 3000);
    updateShoppingCartTotal();
}

/* Increases the input quantity */
function increaseQuantity(event) {
    const buttonUpClicked = event.target;
    const inputWrapper = buttonUpClicked.closest('.shopping-cart-quantity');
    const input = inputWrapper.querySelector('.shoppingCartItemQuantity');

    if (input.value == 100) {
        input.value = 100;
    } else {
        toggleSuccessAlertState();
        setTimeout(toggleSuccessAlertState, 3000);
        return quantityChanged(input.value++);
    }

}

/* Deecreases the input quantity */
function decreaseQuantity(event) {
    const buttonUpClicked = event.target;
    const inputWrapper = buttonUpClicked.closest('.shopping-cart-quantity');
    const input = inputWrapper.querySelector('.shoppingCartItemQuantity');

    if (input.value == 1) {
        input.value = 1;
    } else {
        toggleSuccessAlertState();
        setTimeout(toggleSuccessAlertState, 3000);
        return quantityChanged(input.value--);
    }

}

/* Checks if quantity has changed */
function quantityChanged(input) {


    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

/* Checks if buy button was pressed */
function buyButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
    toggleModalState(); 
}
