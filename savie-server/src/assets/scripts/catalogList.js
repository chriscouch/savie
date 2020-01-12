// Init page module object.
const catalogList = {};

// Cached catalog items.
catalogList.items = [];

// Data preloader.
catalogList.preloadData = () => {
  // Get catalog items container and clean it up.
  const catalogItemsContainer = document.getElementById('catalogItemsContainer');
  catalogItemsContainer.innerHTML = '';

  // Fetch the catalog data.
  httpClient.request({path: '/api/catalogs', method: 'GET'})
    .then(({statusCode, responsePayload}) => {
      catalogList.items = responsePayload;
      responsePayload.forEach((catalogItem) => {
        const containerId = `catalogItem_${catalogItem.id}`;
        const catalogItemElement = document.createElement('div');
        catalogItemElement.className = 'col s12 m3 l3 xl2';
        catalogItemElement.id = containerId;
        catalogItemElement.innerHTML = `
        <div class="card small">
          <div class="card-image">
            <img class="responsive-image" src="/assets/images/${catalogItem.image}">
          </div>
            <div class="card-title">${catalogItem.name}</div>
           <div class="card-content">
              <p>${catalogItem.description}</p> 
            </div>
          <div class="card-action">
            <a href="#" class="btn orange accent-4 addToCart">Select</a>
          </div>
        </div>
        `;
        catalogItemsContainer.appendChild(catalogItemElement);

        // Add event listeners to "Add to Cart" button.
        document
          .querySelector(`#${containerId} a.addToCart`)
          .addEventListener('click', (event) => {
            event.preventDefault();

            // Detect how many of items with current id are already in the basket.
            // Then increment its value.
            const basketItems = shoppingCart.cart.items || [];
            const existingItem = basketItems.filter(basketItem => basketItem.id === catalogItem.id).pop();
            const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

            shoppingCart.updateCart(httpClient, catalogItem.id, newQuantity)
              .then((shoppingCart) => {
                app.drawShoppingCartCounter(shoppingCart);
              });
          });
      });
    });
};

// Init user current page.
catalogList.init = () => {
  // Preload data for the current page.
  catalogList.preloadData();
};

// Call the init processes after the window loads
window.addEventListener('load', catalogList.init);
