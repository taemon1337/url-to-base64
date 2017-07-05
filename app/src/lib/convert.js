function calculateAspectRatioFit (srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
  return { width: srcWidth * ratio, height: srcHeight * ratio }
}

// https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality
// scales the image by (float) scale < 1
// returns a canvas containing the scaled image.
function downScaleImage (img, scale) {
  var imgCV = document.createElement('canvas')
  imgCV.width = img.width
  imgCV.height = img.height
  var imgCtx = imgCV.getContext('2d')
  imgCtx.drawImage(img, 0, 0)
  return downScaleCanvas(imgCV, scale)
}

// scales the canvas by (float) scale < 1
// returns a new canvas containing the scaled image.
function downScaleCanvas (cv, scale) {
  if (!(scale < 1) || !(scale > 0)) throw new Error('scale must be a positive number <1 ')
  var sqScale = scale * scale // square scale = area of source pixel within target
  var sw = cv.width // source image width
  var sh = cv.height // source image height
  var tw = Math.floor(sw * scale) // target image width
  var th = Math.floor(sh * scale) // target image height
  var sx = 0
  var sy = 0
  var sIndex = 0 // source x,y, index within source array
  var tx = 0
  var ty = 0
  var yIndex = 0
  var tIndex = 0 // target x,y, x,y index within target array
  var tX = 0
  var tY = 0 // rounded tx, ty
  var w = 0
  var nw = 0
  var wx = 0
  var nwx = 0
  var wy = 0
  var nwy = 0 // weight / next weight x / y
  // weight is weight of current source point within target.
  // next weight is weight of current source point within next target's point.
  var crossX = false // does scaled px cross its current px right border ?
  var crossY = false // does scaled px cross its current px bottom border ?
  var sBuffer = cv.getContext('2d').getImageData(0, 0, sw, sh).data // source buffer 8 bit rgba
  var tBuffer = new Float32Array(3 * tw * th) // target buffer Float32 rgb
  var sR = 0
  var sG = 0
  var sB = 0 // source's current point r,g,b

  for (sy = 0; sy < sh; sy++) {
    ty = sy * scale // y src position within target
    tY = 0 | ty     // rounded : target pixel's y
    yIndex = 3 * tY * tw  // line index within target array
    crossY = (tY !== (0 | ty + scale))
    if (crossY) { // if pixel is crossing botton target pixel
      wy = (tY + 1 - ty) // weight of point within target pixel
      nwy = (ty + scale - tY - 1) // ... within y+1 target pixel
    }
    for (sx = 0; sx < sw; sx++, sIndex += 4) {
      tx = sx * scale // x src position within target
      tX = 0 | tx // rounded : target pixel's x
      tIndex = yIndex + tX * 3 // target pixel index within target array
      crossX = (tX !== (0 | tx + scale))
      if (crossX) { // if pixel is crossing target pixel's right
        wx = (tX + 1 - tx) // weight of point within target pixel
        nwx = (tx + scale - tX - 1) // ... within x+1 target pixel
      }
      sR = sBuffer[sIndex + 0]   // retrieving r,g,b for curr src px.
      sG = sBuffer[sIndex + 1]
      sB = sBuffer[sIndex + 2]

      if (!crossX && !crossY) { // pixel does not cross
        // just add components weighted by squared scale.
        tBuffer[tIndex + 0] += sR * sqScale
        tBuffer[tIndex + 1] += sG * sqScale
        tBuffer[tIndex + 2] += sB * sqScale
      } else if (crossX && !crossY) { // cross on X only
        w = wx * scale
        // add weighted component for current px
        tBuffer[tIndex + 0] += sR * w
        tBuffer[tIndex + 1] += sG * w
        tBuffer[tIndex + 2] += sB * w
        // add weighted component for next (tX+1) px
        nw = nwx * scale
        tBuffer[tIndex + 3] += sR * nw
        tBuffer[tIndex + 4] += sG * nw
        tBuffer[tIndex + 5] += sB * nw
      } else if (crossY && !crossX) { // cross on Y only
        w = wy * scale
        // add weighted component for current px
        tBuffer[tIndex + 0] += sR * w
        tBuffer[tIndex + 1] += sG * w
        tBuffer[tIndex + 2] += sB * w
        // add weighted component for next (tY+1) px
        nw = nwy * scale
        tBuffer[tIndex + 3 * tw + 0] += sR * nw
        tBuffer[tIndex + 3 * tw + 1] += sG * nw
        tBuffer[tIndex + 3 * tw + 2] += sB * nw
      } else { // crosses both x and y : four target points involved
        // add weighted component for current px
        w = wx * wy
        tBuffer[tIndex + 0] += sR * w
        tBuffer[tIndex + 1] += sG * w
        tBuffer[tIndex + 2] += sB * w
        // for tX + 1 tY px
        nw = nwx * wy
        tBuffer[tIndex + 3] += sR * nw
        tBuffer[tIndex + 4] += sG * nw
        tBuffer[tIndex + 5] += sB * nw
        // for tX  tY + 1 px
        nw = wx * nwy
        tBuffer[tIndex + 3 * tw + 0] += sR * nw
        tBuffer[tIndex + 3 * tw + 1] += sG * nw
        tBuffer[tIndex + 3 * tw + 2] += sB * nw
        // for tX + 1  tY +1 px
        nw = nwx * nwy
        tBuffer[tIndex + 3 * tw + 3] += sR * nw
        tBuffer[tIndex + 3 * tw + 4] += sG * nw
        tBuffer[tIndex + 3 * tw + 5] += sB * nw
      }
    } // end for sx
  } // end for sy

  // create result canvas
  var resCV = document.createElement('canvas')
  resCV.width = tw
  resCV.height = th
  var resCtx = resCV.getContext('2d')
  var imgRes = resCtx.getImageData(0, 0, tw, th)
  var tByteBuffer = imgRes.data
  // convert float32 array into a UInt8Clamped Array
  var pxIndex = 0
  for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
    tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex])
    tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1])
    tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2])
    tByteBuffer[tIndex + 3] = 255
  }
  // writing result to canvas.
  resCtx.putImageData(imgRes, 0, 0)
  return resCV
}

function parseSize (s) {
  let m = s.match(/(\d+)x(\d+)/)
  if (m) {
    return { width: parseInt(m[1]), height: parseInt(m[2]) }
  } else {
    return { width: 128, height: 128 }
  }
}

function convertImgToDataURLviaCanvas (url, callback, opts) {
  let size = parseSize(opts.size || '')
  console.log(size)
  // let img = document.createElement('img')
  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    // callback(downScaleImage(this, 0.5))
    let canvas = document.createElement('CANVAS')
    let ctx = canvas.getContext('2d')
    let dataURL = null
    let csize = calculateAspectRatioFit(this.width, this.height, size.width, size.height)
    console.log('resizing from ', this.width, 'x', this.height, ' to ', csize.width, 'x', csize.height)
    canvas.height = csize.height
    canvas.width = csize.width
    ctx.drawImage(this, 0, 0, csize.width, csize.height)
    dataURL = canvas.toDataURL(opts.format || 'png')
    callback(dataURL)
    canvas = null
  }
  img.src = url
}

function convertFileToDataURLviaFileReader (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

downScaleImage

export default function convert (url, opts, success, failure) {
  try {
    if (opts.FileReader) {
      return convertFileToDataURLviaFileReader(url, success)
    } else {
      return convertImgToDataURLviaCanvas(url, success, opts)
    }
  } catch (err) {
    failure(err)
  }
}
