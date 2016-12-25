if (window.FaceDetector == undefined) {
  console.log("polyfilling FaceDetector")
}

if (window.BarcodeDetector == undefined) {
  console.log("polyfilling BarcodeDetector")
}

function FaceDetector(conf) {
  fastMode = false;
  maxDetectedFaces = 1;
  if (conf) {
    fastMode = conf.fastMode || false;
    maxDetectedFaces = conf.maxDetectedFaces || 1;
  }
  // handle the actual image
  this.detect = function(image) {
    // do a bunch of fancy analysis, return a promise.
    function stubFunc() {
      prepackagedResp = [
        {boundingBox: { x: 0, y: 0, width: 100, height: 100}}
      ]
      return null, prepackagedResp;
    }
    return new Promise(function(resolve, reject) {
      let err, data = stubFunc();
      err ? reject(err) : resolve(data);
    })
  }
}


function BarcodeDetector() {
  this.detect = function(image) {
    // do a bunch of fancy analysis, return a promise.

    function stubFunc() {
      prepackagedResp = [
        {
          rawValue: "",
          boundingBox: { x: 0, y: 0, width: 100, height: 100},
          cornerPoints: [{x: 0, y: 0},{x: 0, y: 1},{x: 1, y: 0},{x: 1, y: 1}]
        }
      ]
      return null, prepackagedResp;
    }
    return new Promise(function(resolve, reject) {
      let err, data = stubFunc();
      err ? reject(err) : resolve(data);
    })
  }
}
