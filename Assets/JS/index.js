// Runs on siteRoot/index.html

main()
document.addEventListener("readystatechange",main)

function main() {
    if (!document.readyState) {
        return
    }

    // Handle compatibility QuickLink mode
    let firstURLSearchParamKey = new URLSearchParams(document.location).keys().next().value
    if (firstURLSearchParamKey) {
        document.location = document.location.origin + "/" + firstURLSearchParamKey
    }

    // Handle QuickLink search box
    let quickLinkSearchBox = document.getElementById("quickLinkSearchBox")

    quickLinkSearchBox.addEventListener("search",function() {
        document.location = document.location.origin + "/" + quickLinkSearchBox.value
    })
}
