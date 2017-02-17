$(document).ready(function() {

  const calcTotal = function(totalElement, subTotalElement, taxElement, price) {
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
  const card = $('.card');
  const reciept = $($('tbody')[0]);
  const total = $('#total');
  const subTotal = $('#subtotal');
  const tax = $('#tax');

  // console.log(parseFloat(total.text()));
  // console.log(reciept);

  card.on('click', '.food-order', function(e) {
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
});
