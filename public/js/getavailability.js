
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
    $("[mfhd_id='2965423']").append(`<li>itemID: ${item.ITEM_ID} : status ${status}</li>`)
  });
  }).fail(function() {
    alert ("error")
  });
