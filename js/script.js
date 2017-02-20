$(document).ready(function() {
  // Functions

  // adds up reciept and calculates tax
  var calcTotal = function(totalElement, subTotalElement, taxElement, price) {
    'use strict';

    const taxRate = 0.08995;

    let totalValue = parseFloat(totalElement.text());
    let subTotalValue = parseFloat(subTotalElement.text());
    let taxTotal = parseFloat(taxElement.text());
    let priceNumber = parseFloat(price);
    let taxValue = taxRate * priceNumber;
    let tmpTotal = (priceNumber + taxValue);

    totalValue += tmpTotal;
    taxTotal += taxValue;
    subTotalValue += priceNumber;

    totalElement.text(totalValue.toFixed(2));
    subTotalElement.text(subTotalValue.toFixed(2));
    taxElement.text(taxTotal.toFixed(2));
  };

  // validates form data
  var validate = function(formInputs) {
    for (var i = 0; i < formInputs.length; i++) {
      var text = $(formInputs[i]).val();

      if (!text) {
        return false;
      }
    }

    return true;
  };

  // resets all reciept data
  var resetOrder = function(recieptTable, recieptTotal, recieptSubtotal, recieptTax, inputs) {
    recieptTax.text('0.00');
    recieptSubtotal.text('0.00');
    recieptTotal.text('0.00');
    inputs.val('');
    recieptTable.remove();
  };

  // grabbing HTML Element
  const card = $('.card');
  const reciept = $($('tbody')[0]);
  const total = $('#total');
  const subTotal = $('#subtotal');
  const tax = $('#tax');
  const submit = $('button[type="submit"]');

  // adds side nave to the right side of the screen
  $('.button-collapse').sideNav({ edge: 'right' });

  // Event Listeners
  card.on('click', '.food-order', function(e) {
    // prevents default button action
    e.preventDefault();

    const clicked = $(e.target).parent().parent();
    const price = clicked.find('.price');
    const title = clicked.find('.card-title');
    const priceVal = price.text().substring(1);
    const tableRow = $('<tr></tr>');

    // console.log("price: ",price);
    // console.log("priceVal: ",priceVal);
    // console.log(clicked);

    reciept.append(tableRow);
    tableRow.append(`<td>${title.text()}</td>`);
    tableRow.append(`<td class="right reciept-price">${priceVal}</td>`);
    calcTotal(total, subTotal, tax, priceVal);
  });
  submit.click(function(e) {
    e.preventDefault();

    var recieptItems = reciept.children();
    var inputs = $('form').find('input');
    var formValidated = validate(inputs);

    if (!recieptItems.length) {
      Materialize.toast('You have not ordered anything yet...', 6000);
    }
    else if (!formValidated) {
      Materialize.toast('Please fill out all form fields', 6000);
    }
    else {
      Materialize.toast('Thank You for your order!', 8000);
      resetOrder(recieptItems, total, subTotal, tax, inputs);
    }
  });
});
