

function getItemStatusFromMfhdIds(mfhdIds) {

	$.post('/mfhd', {mfhdIDs: mfhdIds }) //send array of mfhds to our post route for mfhds
	.done(function(data) { // take the response from the API and update the UI
		updateItemStatus(data);
	})
	.fail(function() {
		alert ("error");
	});
}

function updateItemStatus(data) { // update the UI with item availability
	$.each(data, function (index, item) {
		console.log(item);
		var status = item.STATUS == 1 ? "Checked Out" : "Available";
		$('[mfhd_id="'+item.MFHD_ID+'"]').append(`<li>itemID: ${index} : status ${status}</li>`);
	});
}
