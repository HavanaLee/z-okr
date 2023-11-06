FROM nginx
COPY docs/ /user/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
