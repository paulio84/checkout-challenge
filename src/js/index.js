function minusAction() {
  // get the qty value from the sibling node
  let qtyValue = getQtyValueFromSiblingNode(this.parentElement);

  qtyValue = qtyValue - 1;
  if (qtyValue < 0) qtyValue = 0;
  // update the DOM with the new value
  updateQTYValue(this.parentElement, qtyValue);

  calculateTotalPrice();
}
function plusAction() {
  // get the qty value from the sibling node
  let qtyValue = getQtyValueFromSiblingNode(this.parentElement);

  qtyValue = qtyValue + 1;
  // update the DOM with the new value
  updateQTYValue(this.parentElement, qtyValue);

  calculateTotalPrice();
}

function getQtyValueFromSiblingNode(node) {
  const qtyValue = node.querySelector('.qty-value').textContent.toString();

  return Number(qtyValue);
}

function updateQTYValue(node, value) {
  const qtyValueEl = node.querySelector('.qty-value');

  qtyValueEl.textContent = value;
}

function calculateTotalPrice() {
  let totalPrice = 0;
  for (let qc of quantityControls) {
    const qty = getQtyValueFromSiblingNode(qc);
    const price = Number(qc.dataset.price);

    totalPrice += qty * price;
  }

  totalPrice += totalPrice > 0 ? shipping : 0;
  basketTotalAmountEl.textContent = totalPrice.toFixed(2);
}

const quantityControls = document.querySelectorAll('.u-quantity-control');
quantityControls.forEach(function (qc) {
  // get the minus button and add an event listener to it
  const minusBtn = qc.querySelector('.qty-minus-button');
  minusBtn.addEventListener('click', minusAction);

  // get the plus button and add an event listener to it
  const plusBtn = qc.querySelector('.qty-plus-button');
  plusBtn.addEventListener('click', plusAction);
});

const basketTotalAmountEl = document.querySelector('#basket-total--amount');

const shippingAmountEl = document.querySelector('#shipping-amount');
const shipping = Number(shippingAmountEl.dataset.shipping);
