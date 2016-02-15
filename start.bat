start sass --watch --style compressed ^
    -I ./portfolio/projects/static/scss ^
    -I ./portfolio/about/static/scss ^
    -I ./portfolio/contact/static/scss ^
    -I ./portfolio/home/static/scss ^
    ./portfolio/static/scss:./portfolio/static/css
start python portfolio/manage.py runserver 10.0.0.6:8080
