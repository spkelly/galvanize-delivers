$(document).ready(function() {

  var calcTotal = function(totalElement, subTotalElement, taxElement, price) {
    'use strict';

    const taxRate = 0.08995;

    // console.log("taxRate: ", taxRate);

    let totalValue = parseFloat(totalElement.text());
    let subTotalValue = parseFloat(subTotalElement.text());
    let taxTotal = parseFloat(taxElement.text());

    // console.log("priceNumber: ",priceNumber);

    const priceNumber = parseFloat(price);
    const taxValue = taxRate * priceNumber;

    // console.log("taxValue: ",taxValue);

    const tmpTotal = (priceNumber + taxValue);

    // console.log("current total",tmpTotal)
    // console.log("totalValue: ",totalValue);

    totalValue += tmpTotal;
    taxTotal += taxValue;
    subTotalValue += priceNumber;

    totalElement.text(totalValue.toFixed(2));
    subTotalElement.text(subTotalValue.toFixed(2));
    taxElement.text(taxTotal.toFixed(2));

    // get the current total value
    // get the total value of all reciept
    // add this value to the current total value
    // set the total value element to the total value
  };

  var validate = function(formInputs) {
    for (var i = 0; i < formInputs.length; i++) {
      var text = $(formInputs[i]).val();
      if (!text) {
        return false;
      }
    }
    return true;
  };

  var resetOrder = function(reciept, total, subTotal, tax, inputs) {
    tax.text('0.00');
    subTotal.text('0.00');
    total.text('0.00');
    inputs.val('');
    reciept.remove();
  }

  const card = $('.card');
  const reciept = $($('tbody')[0]);
  const total = $('#total');
  const subTotal = $('#subtotal');
  const tax = $('#tax');
  const submit = $('button[type="submit"]');

  // adds side nave to the right side of the screen
  $(".button-collapse").sideNav({ edge: 'right' });

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
      Materialize.toast('You have not ordered anything yet...' ,2000);
    }
    else if (!formValidated) {
      Materialize.toast('Please fill out all form fields', 2000);
    }
    else {
      Materialize.toast('Thank You for your order!', 8000);
      resetOrder(recieptItems, total, subTotal, tax, inputs);
    }
  });
});
