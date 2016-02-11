var defaultOptions;

var travelSites = [
	"http://wikipedia.org/wiki/{%location}"
];

const tokenLocation = "{%location}";

document.addEventListener("DOMContentLoaded", function() {

	// chrome.runtime.getBackgroundPage(function(eventPage){

		//initialize the browser action page
		initializeForm();

		//hook up the search button
	    document.getElementById("buttonSearch").addEventListener("click", onSearch);
	// });
});

// Ensure that the browser action page is loaded with the last saved values (or defaults)
function initializeForm(){

}

// Search all through a list of websites with the user submitted location
// Open them in new tabs
function onSearch() {
	
	var location = document.getElementById("textboxLocation").value;
	// If the parameters are all valid, proceed with the search
	if (validateLocation(location)) {
		searchTravelSites(location);
	}
}

// Search the travel sites used by this extension
// and open a tab for each
function searchTravelSites(location) {
	
	// Iterate travel sites from array
	var ctr;
	for (ctr = 0; ctr < travelSites.length; ++ctr) {
    	openTravelSiteWithLocation(travelSites[ctr],location);
	}
}

// Opens the travel site with the location provided. Each site
// has a different query strin defined by the travelSites array
function openTravelSiteWithLocation(travelSite,location) {
	var webLink = travelSite.replace(tokenLocation,location);
	console.log(webLink);
}

function validateLocation(location) {
	
	var status = true;

	// Fail if the location is empty
	if (!location){
		writeStatusMessage("Please enter a location", true);
		status = false;
	} 

	if (status) {
		writeStatusMessage("", true);
	}
	return status;
}

// Writes a status message to the screen. Informational or error, which get styled with CSS file
function writeStatusMessage(message, isError) {
	var status = document.getElementById("status");
	var statusError = document.getElementById("statusError");
	var timeout = 5000;

	if (isError) {
	    status.textContent = "";
	    statusError.textContent = message;
	} else {
	    statusError.textContent = "";
		status.textContent = message;
	}

	// Eventually blank the informational status message
    setTimeout(function() {
      status.textContent = ""; statusError.textContent = "";
    }, timeout);

}