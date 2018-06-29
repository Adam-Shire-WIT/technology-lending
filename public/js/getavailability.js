

function getItemStatusFromMfhdIds(mfhdIds) {

	$.post('/mfhd', {mfhdIDs: mfhdIds }) //send array of mfhds to our post route for mfhds
	.done(function(data) { // take the response from the API and update the UI
		  //updateItemStatus(data)
			console.log(data);
			return data;
	})
	.fail(function() {
		alert ("error");
	});
}
