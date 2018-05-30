var elementIDs = $(".mfhd")         // find DIVs with item class
.map(function() { return this.id; }) // convert to set of IDs
.get(); // convert to instance of Array (optional)

console.log("element IDs: " + elementIDs)

$.post('/mfhd', {mfhdIDs: elementIDs})
.done(function(data) {
  console.log(data)
    $.each(data, function (index, item) {
      console.log(item)

    var status = item.STATUS == 1 ? "Checked Out" : "Available";
    $("#" + item.MFHD_ID).append(`<li>itemID: ${item.ITEM_ID} : status ${status}</li>`)
  });
  }).fail(function() {
    alert ("error")
  });
