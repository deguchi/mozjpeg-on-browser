# Sample of compressing an image in a browser using mozJPEG

## for Japanese

https://qiita.com/deguchi/items/d4b59c9c204297915163

## Demo

https://deguchi.github.io/mozjpeg-on-browser/

## Motive

I'm building a smartphone app in Cordova that handles photos, and I wanted to solve the problem of photo uploads taking a long time.  
Instead of sending them to the server and then processing them, I want to process them on the browser side.

Image resizing is already done using canvas.  
I would like to optimize the file size of the images with mozJPEG to make them lighter, faster uploading, and faster display.
I'm building a smartphone app in Cordova that handles photos, and I wanted to solve the problem of photo uploads taking a long time.  


## Develop

I am using vite.  
https://vitejs.dev/


```
npm install
npm start
```


## Library used

@wasm-codecs/mozjpeg  
https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/mozjpeg

Use this WebAssembly.  
The sample is node, which doesn't work in the browser as is.

## Troubleshooting

When you run encode If you get the error message

```
Uncaught ReferenceError: buffer is not defined
```


```
<script src="https://bundle.run/buffer"></script>
```

Added the public buffer library to index.html.


## Point

In the public directory, I put the wasm file so that it can be accessed directly under the url.
The mozjpeg wasm file was copied from @wasm-codecs/mozjpeg in node_modules.

```
/public
    mozjpeg.wasm
```

## Conclusion


```
ctx.canvas.toDataURL('image/jpeg', 0.8)
```

In conclusion, since you can specify the compression ratio when converting canvas to JPEG images, optimizing with mozJPEG won't make a big difference for small images.  
If you are uploading an image of several MB, it may be effective.