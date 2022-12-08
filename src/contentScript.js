const Buffer = require('buffer').Buffer;
const pako = require('pako');
const axios = require('axios');

document.addEventListener('mousedown', function (event) {
  var element = event.target;
  if (event.target instanceof Element) {
    if (element.tagName == 'CANVAS') {
      chrome.runtime.sendMessage({ cmd: 'create_menu', canvas: element });
    } else {
      chrome.runtime.sendMessage({});
    }
  }
});

window.addEventListener('load', function () {
  var anchors = document.getElementsByTagName('a');
  for (const anchor of anchors) {
    const href = anchor.getAttribute('href');
    const regex = new RegExp('^.*.(webf)$');
    if (regex.test(href)) {
      //run code here to hide visibility of anchor + create iframe
      renderFile(anchor);
    }
  }
});

//later check if file is local/not
function renderFile(anchor) {
  href = anchor.getAttribute('href');
  axios
    .get(href, { responseType: 'blob' })
    .then((res) => res.data)
    .then((blob) => {
      read(blob)
        .then((dataURL) => decompressURL(dataURL))
        .then((inflatedData) => {
          //append html stuff here
          anchor.insertAdjacentHTML('afterend', inflatedData);
          //hide anchor element
          anchor.style.visibility = 'hidden';
        });
    });
}

function decompressURL(dataURL) {
  var data = dataURL.replace(/^data:application\/(octet-stream);base64,/, '');
  data = Buffer.from(data, 'base64');
  const inflated = pako.inflate(data, { to: 'string' });
  return inflated;
}

const read = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
