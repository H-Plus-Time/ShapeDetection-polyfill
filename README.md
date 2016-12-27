# ShapeDetection-polyfill

A simple polyfill for the ShapeDetection API, based on tracking.js.

As per usual, to use it, you need to either:

```bash
  npm install shapedetection-polyfill
  bower install shapedetection-polyfill
```

## Usage
Identical to the spec examples (that's the point, after all).

Face Detection:

```js
  let faceDetector = new FaceDetector({fastMode: true, maxDetectedFaces: 1});
  // Assuming |theImage| is e.g. a <img> content, or a Blob.

  faceDetector.detect(theImage)
  .then(detectedFaces => {
  for (const face of detectedFaces) {
    console.log(' Face @ (${face.boundingBox.x}, ${face.boundingBox.y}),' +
        ' size ${face.boundingBox.width}x${face.boundingBox.height}');
  }
  }).catch(() => {
  console.error("Face Detection failed, boo.");
  })
```

Barcode Detection:

```js
  let barcodeDetector = new BarcodeDetector();
  // Assuming |theImage| is e.g. a <img> content, or a Blob.

  barcodeDetector.detect(theImage)
  .then(detectedCodes => {
  for (const barcode of detectedCodes) {
    console.log(' Barcode ${barcode.rawValue}' +
        ' @ (${barcode.boundingBox.x}, ${barcode.boundingBox.y}) with size' +
        ' ${barcode.boundingBox.width}x${barcode.boundingBox.height}');
  }
  }).catch(() => {
  console.error("Barcode Detection failed, boo.");
  })
```

## Performance Note
As the polyfill is relatively large (380k, thanks to the classifier files), it is strongly recommended to load it conditionally, like so:
```js
  if(!window.FaceDetector || !window.BarcodeDetector) {
    var script = document.createElement('script');
    script.src = '/path/to/shapedetection-min.js';
    script.onload = onload;
    document.head.appendChild(script);
  }
```
