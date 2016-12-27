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
    this.detect = function(canvas) {
        var img_u8, ctx, ii_sum, ii_sqsum, ii_tilted, edg, ii_canny;
        var classifier = jsfeat.haar.frontalface;
        ctx = canvas.getContext('2d');
        w = canvas.width;
        h = canvas.height;
        img_u8 = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
        edg = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
        ii_sum = new Int32Array((w + 1) * (h + 1));
        ii_sqsum = new Int32Array((w + 1) * (h + 1));
        ii_tilted = new Int32Array((w + 1) * (h + 1));
        ii_canny = new Int32Array((w + 1) * (h + 1));
        options = {
            min_scale: 2,
            scale_factor: 1.15,
            use_canny: false,
            edges_density: 0.13,
            equalize_histogram: true
        }
        return new Promise(function(resolve, reject) {
            var imageData = ctx.getImageData(0, 0, w, h);
            jsfeat.imgproc.grayscale(imageData.data, w, h, img_u8);

            // possible options
            if (options.equalize_histogram) {
                jsfeat.imgproc.equalize_histogram(img_u8, img_u8);
            }
            //jsfeat.imgproc.gaussian_blur(img_u8, img_u8, 3);

            jsfeat.imgproc.compute_integral_image(img_u8, ii_sum, ii_sqsum,
              classifier.tilted ? ii_tilted : null);

            if (options.use_canny) {
                jsfeat.imgproc.canny(img_u8, edg, 10, 50);
                jsfeat.imgproc.compute_integral_image(edg, ii_canny, null, null);
            }

            jsfeat.haar.edges_density = options.edges_density;
            var rects = jsfeat.haar.detect_multi_scale(ii_sum, ii_sqsum,
              ii_tilted, options.use_canny ? ii_canny : null, img_u8.cols,
              img_u8.rows, classifier, options.scale_factor, options.min_scale);

            rects = jsfeat.haar.group_rectangles(rects, 1).map(function(rect) {
              // remove extraneous confidence data
              return {boundingBox: {width: rect.width, height:
                rect.height, x: rect.x, y: rect.y}}
            })
            resolve(rects);
        })
    }
}


function BarcodeDetector() {
    this.detect = function(image) {
        // do a bunch of fancy analysis, return a promise.

        function stubFunc() {
            prepackagedResp = [{
                rawValue: "",
                boundingBox: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },
                cornerPoints: [{
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: 1
                }, {
                    x: 1,
                    y: 0
                }, {
                    x: 1,
                    y: 1
                }]
            }]
            return null, prepackagedResp;
        }
        return new Promise(function(resolve, reject) {
            var err, data = stubFunc();
            err ? reject(err) : resolve(data);
        })
    }
}
