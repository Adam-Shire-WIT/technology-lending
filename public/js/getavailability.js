

var elementIDs = $("div.availability")
.map(function(){
return $(this).attr("mfhd_id")
})
.get();



console.log("element IDs: " + elementIDs)

$.post('/mfhd', {mfhdIDs: elementIDs})
.done(function(data) {
  console.log(data)
    $.each(data, function (index, item) {
      console.log(item)

    var status = item.STATUS == 1 ? "Checked Out" : "Available";
    $('[mfhd_id="'+item.MFHD_ID+'"]').append(`<li>itemID: ${index} : status ${status}</li>`)
  });
  }).fail(function() {
    alert ("error")
  });


  var elementIDs = $("div.availability")
  .map(function(){
  return $(this).attr("item_id")
  })
  .get();



  console.log("element IDs: " + elementIDs)

  $.post('/item', {itemIDs: elementIDs})
  .done(function(data) {
    console.log(data)
      $.each(data, function (index, item) {
        console.log(item)

      var status = item.STATUS == 1 ? "Checked Out" : "Available";
      $('[item_id="'+item.ITEM_ID+'"]').append(`<li>itemID: ${index} : status ${status}</li>`)
    });
    }).fail(function() {
      alert ("error")
    });
