// Runs on siteRoot/index.html

// Handle compatibility QuickLink mode
let firstURLSearchParamKey = new URLSearchParams(document.location.search)
	.keys().next().value

if (firstURLSearchParamKey) {

	document.location = document.location.origin + "/" +
		encodeURIComponent(firstURLSearchParamKey)
}

document.addEventListener("readystatechange", function() {

	// Handle QuickLink search box
	let quickLinkSearchBox = document.getElementById("quickLinkSearchBox")

	quickLinkSearchBox.addEventListener("search", function() {

		document.location = document.location.origin + "/" +
			encodeURIComponent(quickLinkSearchBox.value)
	})
})
