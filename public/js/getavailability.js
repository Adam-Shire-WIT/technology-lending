function getItemStatusFromMfhdIds() {
	var mfhdIds = scrapeMfhdIds();
	$.post('/mfhd', {mfhdIDs: mfhdIds }) //send array of mfhds to our post route for mfhds
	.done(function(data) { // take the response from the API and update the UI
		updateItemStatus(data);
	})
	.fail(function() {
		alert ("error");
	});
}

function scrapeMfhdIds() {
	var elementIDs = $("div.availability")
	.map(function() {
		return $(this).attr("mfhd_id")
	})
	.get();
	console.log("element IDs: " + elementIDs);
	return elementIDs;
}

function updateItemStatus(data) { // update the UI with item availability
	$.each(data, function (index, item) {
		console.log(item);
		var status = item.STATUS == 1 ? "Checked Out" : "Available";
		$('[mfhd_id="'+item.MFHD_ID+'"]').append(`<li>itemID: ${index} : status ${status}</li>`);
	});
}
