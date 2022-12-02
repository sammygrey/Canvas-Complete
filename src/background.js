chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.cmd == "create_menu") {
        chrome.contextMenus.removeAll();
        chrome.contextMenus.create({
            "id": "save",
            "title" : "Save canvas as...",
            "type" : "normal",
            "contexts" : ["all", "frame"],
            "onclick" : saveCanvas(request.canvas)
        });
        chrome.contextMenus.create({
            "id": "copy",
            "title" : "Copy canvas",
            "type" : "normal",
            "contexts" : ["all", "frame"],
            "onclick" : copyCanvas()
        });
    }
    else if(request.cmd == "delete_menu"){
        chrome.contextMenus.removeAll();
    }
    sendResponse();
});

function saveCanvas(canvas){
    //change this to be dynamic

    var htmlString = `<iframe id="embed" src="https://sammygrey.github.io/flocking-simulation" scrolling="no" style="border: 0px none; height: 720px; width: 1280px; margin-top: -55px;"></iframe>
    <script>
        const iframe = window.frames['embed']

        iframe.contentWindow.addEventListener('load', function () {
            this.hash = '#defaultCanvas0'
        })
    </script>`

    //var blob = createBlob(htmlString)
    //var url = URL.createObjectURL(blob)

    //chrome.downloads.download({
        //url: url,
        //filename: `somethingsomething.webf`
    //})


    //open a new tab with html+js and run code
}

function copyCanvas(){
    //figure out how to do this
    //https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
}

function createBlob(data){
    var utf8Encode = new TextEncoder();
    utf8Encode.encode(data);
    return new Blob([utf8Encode], {type: "application/octet-stream"})
}

function createEmbed(data){
    //create canvas from blob/utf8
    //embed it in current page as injection?
    //maybe this should be done in content script so use messages again
}