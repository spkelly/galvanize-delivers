function addRecieptItem(item,target){

}



$(document).ready(function(){
  var card = $('.card');
  var reciept = $($('tbody')[0]);
  var total = $('#total');

  console.log(parseFloat(total.text()));
  console.log(reciept);

  card.on('click',".food-order",function(e){
    e.preventDefault();



    var clicked= $(e.target).parent().parent()

    var price = clicked.find(".price");
    var title = clicked.find(".card-title")

    priceVal = price.text().substring(1);
    console.log("price: ",price);
    console.log("priceVal: ",priceVal);

    console.log(clicked);
    var tableRow = $('<tr></tr>');
    reciept.append(tableRow);
    tableRow.append('<td>'+title.text()+'</td>');
    tableRow.append('<td class="right reciept-price">'+priceVal+'</td>');
  })
});
