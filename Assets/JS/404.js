// Runs on the siteRoot/404.html standin page and handles all redirection.

$(document).ready(function() {
	let pathname = document.location.pathname

	let redirectText = document.getElementById("redirectText")

	if (!document.location.host) {
		// Page is loaded locally. Forget everything else.
		redirectText.innerHTML = "Page loaded locally. Function disabled."
		document.title = "Redirect failed."
	} else if (pathname == "/404.html") {
		// Page was loaded directly, display rejection text.
		redirectText.innerHTML = "You directly navigated to this page. Nothing will happen."
		document.title = "Redirect failed."
	} else {
		// 404 page has been loaded as a standin for a missing page.
	
		// Remove the first character from the pathname as its always a /
		let quickLink = pathname.substring(1)
	
		// Parse QuickLinks
		$.getJSON("Assets/JSON/QuickLinks.json",function(quickLinksArray) {
			let quickLinkResult = quickLinksArray[quickLink]

			if (quickLinkResult) {
				document.location = quickLinkResult
			} else {
				redirectText.innerHTML = `\"${quickLink}\" is not a valid QuickLink. QuickLinks are case-sensetive.`
				document.title = "Redirect failed."
			}
		}).catch(function(err) {
			redirectText.innerHTML = `QuickLink JSON file failed to load:\n${err}`
			document.title = "Redirect failed."
		})
	}
})