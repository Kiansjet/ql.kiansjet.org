// Runs on the siteRoot/404.html standin page and handles all redirection.

const strings = {
	redirecting								: "Redirecting...",
	redirectFailed							: "Redirect failed.",
	pageLoadedLocally						: "Page loaded locally. Function disabled.",
	directNavigation						: "You directly navigated to this page. Nothing will happen.",

	invalidQuickLinkFormattable				: "%s is not a valid QuickLink. QuickLinks are case-sensetive.",
	quickLinkLoadFailPrintoutFormattable	: "QuickLink JSON file failed to load:\n%s"
}

main()
document.addEventListener("readystatechange", main)

function main() {
	if (!document.readyState) {
        return
	}
	
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
					redirectText.innerHTML = strings.invalidQuickLinkFormattable.replace("%s", quickLinkKey)
					document.title = strings.redirectFailed
				}
			}).catch(function(error) {
				redirectText.innerHTML = formstrings.quickLinkLoadFailPrintoutFormattable.replace("%s", error)
				document.title = strings.redirectFailed
			})
		}).catch(function(error) {
			redirectText.innerHTML = formstrings.quickLinkLoadFailPrintoutFormattable.replace("%s", error)
			document.title = strings.redirectFailed
		})
	}
}
