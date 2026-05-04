// Runs on siteRoot/404.html

const strings = {
	redirecting								: "Redirecting...",
	redirectFailed							: "Redirect failed.",
	pageLoadedLocally						: "Page loaded locally. Function disabled.",
	directNavigation						: "You directly navigated to this page.<br>Nothing will happen.",

	invalidQuickLinkFormattable				: "%s is not a valid QuickLink. QuickLinks are case-sensetive.",
	quickLinkLoadFailPrintoutFormattable	: "QuickLink JSON file failed to load:<br>%s"
}

const escapeHTML = function(value) {
	return String(value).replace(/[&<>"']/g, function(character) {
		switch (character) {
			case "&":
				return "&amp;"
			case "<":
				return "&lt;"
			case ">":
				return "&gt;"
			case "\"":
				return "&quot;"
			case "'":
				return "&#39;"
			default:
				return character
		}
	})
}

document.addEventListener("readystatechange", function() {
	let pathname = document.location.pathname

	let redirectText = document.getElementById("redirectText")
	redirectText.innerHTML = strings.redirecting

	if (!document.location.host) {
		// Page is loaded locally. Forget everything else.
		redirectText.innerHTML = strings.pageLoadedLocally
		document.title = strings.redirectFailed
	} else if (pathname == "/404.html") {
		// Page was loaded directly, display rejection text.
		redirectText.innerHTML = strings.directNavigation
		document.title = strings.redirectFailed
	} else {
		// 404 page has been loaded as a standin for a missing page.
	
		// Remove the first character from the pathname as its always a /
		let quickLinkKey = pathname.substring(1)
	
		// Parse QuickLinks
		fetch("/Assets/JSON/QuickLinks.json").then(function(response) {
			response.json().then(function(quickLinksObject) {
				quickLinksObject = quickLinksObject.QuickLinks
				let quickLinkObject = quickLinksObject[quickLinkKey]

				if (quickLinkObject) {
					switch (quickLinkObject.type) {
						case (0): {
							document.location = quickLinkObject.data
						}
						case (1): {

						}
				}
			} else {
				redirectText.innerHTML = strings.invalidQuickLinkFormattable.replace("%s", escapeHTML(quickLinkKey))
				document.title = strings.redirectFailed
			}
		}).catch(function(error) {
			redirectText.innerHTML = strings.quickLinkLoadFailPrintoutFormattable.replace("%s", escapeHTML(error))
			document.title = strings.redirectFailed
		})
	}).catch(function(error) {
		redirectText.innerHTML = strings.quickLinkLoadFailPrintoutFormattable.replace("%s", escapeHTML(error))
		document.title = strings.redirectFailed
	})
}
})
