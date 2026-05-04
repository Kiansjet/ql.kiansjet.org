// Runs on siteRoot/404.html

const strings = {
	redirecting								: "Redirecting...",
	redirectFailed							: "Redirect failed.",
	pageLoadedLocally						: "Page loaded locally. Function disabled.",
	directNavigation						: "You directly navigated to this page.<br>Nothing will happen.",

	invalidQuickLinkFormattable				: "%s is not a valid QuickLink. QuickLinks are case-sensetive.",
	quickLinkLoadFailPrintoutFormattable	: "QuickLink JSON file failed to load:<br>%s"
}

function setRedirectText(redirectText, message) {
	redirectText.textContent = ""
	String(message).split("<br>").forEach(function(line, index) {
		if (index > 0) {
			redirectText.appendChild(document.createElement("br"))
		}
		redirectText.append(line)
	})
}

document.addEventListener("readystatechange", function() {
	let pathname = document.location.pathname

	let redirectText = document.getElementById("redirectText")
	setRedirectText(redirectText, strings.redirecting)

	if (!document.location.host) {
		// Page is loaded locally. Forget everything else.
		setRedirectText(redirectText, strings.pageLoadedLocally)
		document.title = strings.redirectFailed
	} else if (pathname == "/404.html") {
		// Page was loaded directly, display rejection text.
		setRedirectText(redirectText, strings.directNavigation)
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
					setRedirectText(redirectText, strings.invalidQuickLinkFormattable.replace("%s", quickLinkKey))
					document.title = strings.redirectFailed
				}
			}).catch(function(error) {
				setRedirectText(redirectText, strings.quickLinkLoadFailPrintoutFormattable.replace("%s", error))
				document.title = strings.redirectFailed
			})
		}).catch(function(error) {
			setRedirectText(redirectText, strings.quickLinkLoadFailPrintoutFormattable.replace("%s", error))
			document.title = strings.redirectFailed
		})
	}
})
