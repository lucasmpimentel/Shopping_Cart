const actualCartItems = document.querySelector('.cart__items');
const getTotalPrice = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// "ADD AND REMOVE TO CART" LISTENER, AND TOTAL PRICE IMPLEMENTATION
function cartItemClickListener(event) {
  event.target.remove();
  const total = getTotalPrice;
  const productPrice = Number(event.target.innerText
    .substring(event.target.innerText.indexOf('$') + 1, event.target.innerText.length));
  total.innerText = Number(total.innerText) - productPrice;
  saveCartItems(actualCartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const total = getTotalPrice;
  total.innerText = Number(total.innerText) + salePrice;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function getItemsToCart(event) {
  const getIdProduct = getSkuFromProductItem(event.target.parentNode);
  const data = await fetchItem(getIdProduct);
  const renameProduct = { sku: data.id, name: data.title, salePrice: data.price };
  const getCartItems = document.querySelector('.cart__items');
  getCartItems.appendChild(createCartItemElement(renameProduct));
  saveCartItems(actualCartItems.innerHTML);
}

// -------------------------- ^^^^ ----------------------------------------

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.lastChild.addEventListener('click', getItemsToCart);

  return section;
}

// "LOADING" TEXT ON SCREEN WHILE API IS LOADING
const getItemsContainer = document.querySelector('.items');
const loading = () => {
  const div = document.createElement('div');
  div.classList.add('loading');
  div.innerText = 'Carregando...';
  getItemsContainer.appendChild(div);
};
const noLoading = () => {
  document.querySelector('.loading').remove();
};

// INSERT PRODUCTS ON PAGE
async function insert() {
  loading();
  const search = await fetchProducts('computador');
  const products = search.results;
  products.forEach((product) => {
    const renamedProduct = { sku: product.id, name: product.title, image: product.thumbnail };
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(renamedProduct));
  });
  noLoading();
}

// THIS FUNCTION IS NEEDED TO REACTIVATE CART LISTENERS AFTER REFRESH
function reactiveRemoverFromCart() {
  actualCartItems.childNodes.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

// ERASE ALL BUTTON
const getEraseAllButton = document.querySelector('.empty-cart');
getEraseAllButton.addEventListener('click', () => {
  actualCartItems.innerHTML = null;
  getTotalPrice.innerText = 0;
  saveCartItems(actualCartItems.innerHTML);
});

window.onload = () => {
  insert();
  actualCartItems.innerHTML = getSavedCartItems();
  reactiveRemoverFromCart();
};
