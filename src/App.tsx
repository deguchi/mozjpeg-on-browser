import React, { useState, useRef, useEffect} from 'react'
import logo from './assets/logo.svg'

import encode from '@wasm-codecs/mozjpeg';
// @ts-ignore
window.Buffer = buffer.Buffer; 

async function loadImage(src: any) {
  // Load image
  const img = document.createElement('img');
  img.src = src;
  await new Promise((resolve) => (img.onload = resolve));
  // Make canvas same size as image
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [img.width, img.height];
  // Draw image onto canvas
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, img.width, img.height);
  }
}

async function loadJpeg(src: any) {
  // Load image
  const img = document.createElement('img');
  img.src = src;
  await new Promise((resolve) => (img.onload = resolve));
  // Make canvas same size as image
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [img.width, img.height];
  // Draw image onto canvas
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0);
    return toBlob(ctx.canvas.toDataURL('image/jpeg', 0.8));
  }
}

function toBlob(base64: string) {
  var bin = atob(base64.replace(/^.*,/, ''));
  var buffer = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
  }
  // Blobを作成
  try{
      var blob = new Blob([buffer.buffer], {
          type: 'image/png'
      });
  }catch (e){
      return false;
  }
  return blob;
}

const calcKB = (byteCount: number) => {
  return Math.round(byteCount / 1024);
}

function App() {

  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  const [encodedImage, setEncodedImage] = useState(null);

  const [originalSize, setOriginalSize] = useState(0);
  const [encodedSize, setEncodedSize] = useState(0);  
  const [optimizeSize, setOptimizeSize] = useState(0);  


  const onChangeImage = async () => {
    const files = inputRef.current?.files || [];
    if (files[0]) {
      setOriginalSize(calcKB(files[0].size));
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target) {
          const image = await loadImage(e.target.result);
          const jpeg = await loadJpeg(e.target.result);
          if (jpeg) setEncodedSize(calcKB(jpeg.size))
          // console.log(image)
          // console.log(image.data.buffer)
          if (image) {
            const encodedImage = await encode(image.data.buffer, {
              width: image.width,
              height: image.height,
              channels: 4
            }, {
              quality: 80,
              colorSpace: 3
            });
            setOptimizeSize(calcKB(new Blob([encodedImage.buffer], {type: 'image/jpeg'})['size']))
            // console.log(encodedImage)
            setEncodedImage(encodedImage)
          }
        }
      }
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    if (encodedImage) {
      console.log(encodedImage)
      // Do something with the compressed file
      if (previewRef.current) {
        previewRef.current.src = URL.createObjectURL(
          new Blob([encodedImage], { type: 'image/jpeg' })
        );
      }
    }
  }, [encodedImage]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Sample of compressing an image in a browser using mozJPEG</p>
        <p>
          <input
            ref={inputRef}
            accept="image/*"
            type="file"
            onChange={onChangeImage}
          />
        </p>
        {originalSize > 0 && (
          <p style={{fontSize: '0.75rem'}}>
            オリジナルサイズ: {originalSize} KB&emsp;
            JPEG 80%: {encodedSize} KB&emsp;
            mozJPEG 80%: {optimizeSize} KB
          </p>
        )}
        <img ref={previewRef} src="" alt="" style={{width: '600px'}} />
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
