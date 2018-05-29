var elementIDs = $("div.item")         // find DIVs with item class
.map(function() { return this.id; }) // convert to set of IDs
.get(); // convert to instance of Array (optional)

console.log(elementIDs)

$.post('https://stormy-sands-31661.herokuapp.com/available', {itemIDs: elementIDs})
.done(function(data) {
    $.each(data, function (index, item) {
    var status = item.STATUS = 1 ? "Checked Out" : "Available";
    $("#" + item.ITEMID).append(`itemID: ${item.ITEMID} : status ${status}`)
  });
  }).fail(function() {
    alert ("error")
  });
