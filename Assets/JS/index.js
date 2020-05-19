// Runs on siteRoot/index.html

// Just wait for the enter key on the search box and navigate
document.addEventListener("readystatechange",function() {
    if (!document.readyState) {
        return
    }

    let quickLinkSearchBox = document.getElementById("quickLinkSearchBox")

    quickLinkSearchBox.addEventListener("search",function() {
        document.location = document.location.origin + "/" + quickLinkSearchBox.value
    })

})
