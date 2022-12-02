
document.addEventListener("mousedown", function(event){
    var element = event.target
    if(event.target instanceof Element){
        if(element.tagName == 'CANVAS') {
            chrome.runtime.sendMessage({cmd: "create_menu", canvas: element});
        } else {
            chrome.runtime.sendMessage({cmd: "delete_menu", canvas: element});
        }
    }
})   