# ブラウザでmozJPEGを使って画像を圧縮するサンプル

## Demo

https://deguchi.github.io/mozjpeg-on-browser/

## 動機

写真を扱うスマホアプリをCordovaで作っていて、写真のアップロードに時間がかかる問題を解決したかった。  
サーバーに送ってから処理するのではなく、ブラウザ側で処理したい。

画像のリサイズはすでにcanvasを使って行っている。  
画像のファイルサイズをmozJPEGで最適化することで、より軽量にして、アップロードの高速化、表示の高速化したい。

## 開発

viteを使っています。  
https://vitejs.dev/


```
npm install
npm start
```


## 使ったライブラリ

@wasm-codecs/mozjpeg  
https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/mozjpeg

このWebAssemblyを使う。  
サンプルはnode。このままではブラウザ上では動かない。

encodeを実行すると

```
Uncaught ReferenceError: buffer is not defined
```

というエラーが出るので、

```
<script src="https://bundle.run/buffer"></script>
```

公開されているbufferライブラリをindex.htmlに追加した。


## ポイント

publicディレクトリに、wasmファイルを置いて、url直下でアクセスできるようにした。
mozjpegのwasmファイルは、node_modulesの@wasm-codecs/mozjpegの中からコピー。

```
/public
    mozjpeg.wasm
```

## 結論

結論的には、

```
ctx.canvas.toDataURL('image/jpeg', 0.8)
```

canvasからJPEG画像に変換するときに圧縮率を指定できるので、小さい画像ならmozJPEGで最適化しても大きな差は出ない。  
数MBの画像をアップロードする場合は効果ありあそう。
