start sass -I ./portfolio/static/scss --watch ^
              ./portfolio/projects/static/scss:./portfolio/projects/static/css ^
              ./portfolio/about/static/scss:./portfolio/about/static/css ^
              ./portfolio/contact/static/scss:./portfolio/contact/static/css ^
              ./portfolio/home/static/scss:./portfolio/home/static/css
start python portfolio/manage.py runserver 10.0.0.6:8080
