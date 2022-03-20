const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const shoppingCartItemsContainer = document.querySelector('.item-rows-container');

function addToCartClicked(event) {

    const button = event.target;
    const item = button.closest('#item');

    const itemTitle = item.querySelector('#item-title').textContent;
    const itemPrice = item.querySelector('#item-price').textContent;
    const itemImage = item.querySelector('#item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
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
                                <div class="shopping-cart-quantity">
                                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                        value="1">
                                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                                </div>
                            </div>
                        </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

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
        console.log(shoppingCartItemPrice);
        console.log(shoppingCartItemQuantity);
    });
    
    console.log(total);
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}`;
    
}