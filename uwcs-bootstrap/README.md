# Custom UWCS Bootstrap

We are using Bootstrap but changing some colours to match UWCS branding. Unfortunately, this means re-compiling the SASS to CSS for Bootstrap every time Zola is run. To avoid this overhead, we moved bootstrap to a separate file, to compile into a CSS source to avoid the compilation.

If you need to change Bootstrap or colours, install SASS from [their releases](https://github.com/sass/dart-sass/releases/) or `npm install -g sass` then run `uwcs.scss ../static/uwcs-bootstrap.css --style compressed`.

Alternatively, on Linux, `build.sh` runs this command and downloads sass if not present (as `sass` in $PATH or at `./dash-sass/sass` (where it downloads to))

