web performance

- image 
Tipe Gambar	Lossy Plugin	Lossless Plugin
JPEG	imagemin-mozjpeg
imagemin-jpegtran
PNG	imagemin-pngquant
imagemin-optipng
GIF	imagemin-giflossy
imagemin-gifscale
SVG	imagemin-svgo

WebP	imagemin-webp

npm install imagemin-webpack-plugin imagemin-mozjpeg@9.x.x --save-dev

- gif to viideo
npm install fluent-ffmpeg --save-dev
npm install @ffmpeg-installer/ffmpeg

<img src="./images/animation-footage.gif" alt="Road through lake">
Ganti dengan:

<video autoplay loop muted playsinline>
  <source src="./images/animation-footage.webm" type="video/webm">
  <source src="./images/animation-footage.mp4" type="video/mp4">
</video>

- Image Responsive
npm install sharp --save-dev

- webp image
npm install imagemin-webp-webpack-plugin --save-dev

- loading lazy