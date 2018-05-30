
var elementIDs = $("div.availability")
.map(function(){
return $(this).attr("mfhd_id")
})
.get();


//var elementIDs = $("div.availability")         // find DIVs with item class
//.map(function() {
//console.log($(this).attr()}).get();
//  return this.attr("mfhd_id"); }) // convert to set of IDs
//.get(); // convert to instance of Array (optional)

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
