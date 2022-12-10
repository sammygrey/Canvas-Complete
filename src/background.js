const Buffer = require('buffer').Buffer;
const pako = require('pako');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.contextMenus.removeAll();
  if (request.cmd == 'create_menu') {
    chrome.contextMenus.create({
      id: 'save',
      title: 'Save canvas',
      type: 'normal',
      contexts: ['all', 'frame'],
    });
    //chrome.contextMenus.create({
    //"id": "copy",
    //"title" : "Copy canvas",
    //"type" : "normal",
    //"contexts" : ["all", "frame"],
    //});
    chrome.contextMenus.onClicked.addListener(function (info) {
      if (info.menuItemId == 'save') {
        saveCanvas(request.canvas);
      }
      //else if (info.menuItemId == "copy"){
      //copyCanvas()
      //}
    });
  }
  sendResponse();
});

chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
  if (item.byExtensionName == "Canvas Complete"){
    suggest({ filename: `${item.filename}.webf` });
  }
});

function saveCanvas(canvas) {
  //change this to be dynamic

  var htmlString = `<iframe id="embed" src="https://sammygrey.github.io/flocking-simulation" scrolling="no" style="border: 0px none; height: 720px; width: 1280px; margin-top: -55px;"></iframe>
    <script>const iframe = window.frames['embed'];iframe.contentWindow.addEventListener('load', function () {this.hash = '#defaultCanvas0'});</script>`;

  var url = createURL(htmlString);
  chrome.downloads.download({
    url: url,
  });
}

function copyCanvas() {
  //figure out how to do this
  //https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
}

function createURL(canvas) {
  const compressed = pako.deflate(canvas, { to: 'string' });
  const data = Buffer.from(compressed, 'binary').toString('base64');
  return `data:application/octet-stream;base64,${data}`;
}
