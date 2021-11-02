# ブラウザでmozJPEGを使って画像を圧縮するサンプル

Demo
https://deguchi.github.io/mozjpeg-on-browser/

## 動機

写真を扱うスマホアプリをCordovaで作っていて、写真のアップロードに時間がかかる問題を解決したかった。  
サーバーに送ってから処理するのではなく、ブラウザ側で処理したい。

画像のリサイズはすでにcanvasを使って行っている。  
画像のファイルサイズをmozJPEGで最適化することで、より軽量にできる。  
アップロードの高速化、表示の高速化ができる。

## 開発

viteを使っています。
https://vitejs.dev/


```
npm install
npm start
```

http://localhost:3000/


## 使ったライブラリ

@wasm-codecs/mozjpeg
https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/mozjpeg

このWebAssemblyを使う。  
既存のnpmでは動作がうまくいかなかった。  

サンプルはnode。このままでは動かない。

```
image: Buffer
A raw RGB image input buffer.
```

encodeを実行すると

```
Uncaught ReferenceError: buffer is not defined
```

というエラーが出るので、

```
<script src="https://bundle.run/buffer"></script>
```

公開されているbufferをindex.htmlに追加した。


この2つを組み合わせることで、ブラウザ上で、mozJPEGを使って画像のファイルサイズを小さくすることが可能になった。


## ポイント

publicディレクトリに、wasmファイルを置いて、url直下でアクセスできるようにした。
mozjpegのwasmファイルは、node_modulesの@wasm-codecs/mozjpegの中からコピー。

```
/public
    mozjpeg.wasm
```