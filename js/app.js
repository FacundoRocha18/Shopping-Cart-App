const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const shoppingCartItemsContainer = document.querySelector('.item-rows-container');

const successAlert = document.querySelector('.success-alert');
const errorAlert = document.querySelector('.error-alert');


function addToCartClicked(event) {

    const button = event.target;
    const item = button.closest('#item');

    const itemTitle = item.querySelector('#item-title').textContent;
    const itemPrice = item.querySelector('#item-price').textContent;
    const itemImage = item.querySelector('#item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    const shoppingCartRowElement = shoppingCartItemsContainer.querySelector('.shopping-cart-item');
    console.log(shoppingCartRowElement);
    const elementTitle = shoppingCartRowElement.getElementsByClassName('.shopping-cart-item-title');
    console.log(elementTitle);

    for ( let i = 0; i < elementTitle.length; i++ ) {

        alert('hola');
        if ( elementTitle[i] === itemTitle ) {
            let elementsQuantity = elementTitle[i].closest('.shopping-cart-item').querySelector('.shoppingCartItemQuantity');

            console.log(elementsQuantity);
            elementsQuantity.value++;
            successAlert.classList.add('active');
            updateShoppingCartTotal();
            return;
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
                                        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                        value="1">
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

    shoppingCartRow.querySelector('.remove-item-btn').addEventListener('click', deleteShoppingCartItem);

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

    shoppingCartRow.querySelector('.quantity-down-btn').addEventListener('click', changeQuantityDown);

    shoppingCartRow.querySelector('.quantity-up-btn').addEventListener('click', changeQuantityUp);


    updateShoppingCartTotal();
}

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

function deleteShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shopping-cart-item').remove();
    updateShoppingCartTotal();
}

function changeQuantityUp(event) {
    const buttonUpClicked = event.target;
    const inputWrapper = buttonUpClicked.closest('.shopping-cart-quantity');
    const input = inputWrapper.querySelector('.shoppingCartItemQuantity');
    
    if ( input.value == 99 ) {
        input.value = 99;
    } else {
        return quantityChanged(input.value++);
    }

}

function changeQuantityDown(event) {
    const buttonUpClicked = event.target;
    const inputWrapper = buttonUpClicked.closest('.shopping-cart-quantity');
    const input = inputWrapper.querySelector('.shoppingCartItemQuantity');
    
    if ( input.value == 1 ) {
        input.value = 1;
    } else {
        return quantityChanged(input.value--);
    }

}

function quantityChanged(input) {
    
  
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}