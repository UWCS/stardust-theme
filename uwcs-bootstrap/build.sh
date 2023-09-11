if ! which sass
then
    if [ ! -f "dart-sass/sass" ]
    then
        echo 'No SASS present, installing SASS from https://github.com/sass/dart-sass'
        wget 'https://github.com/sass/dart-sass/releases/download/1.66.1/dart-sass-1.66.1-linux-x64.tar.gz'
        tar -xf dart-sass-1.66.1-linux-x64.tar.gz
        rm dart-sass-1.66.1-linux-x64.tar.gz
    fi
    cmd="./dart-sass/sass"
else
    cmd="sass"
fi

"$cmd" uwcs.scss ../static/uwcs-bootstrap.css --style compressed