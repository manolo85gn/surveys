FROM manolo85gn/alpine-node-sass

RUN mkdir /code
COPY package.json /code
WORKDIR /code
RUN npm install
RUN npm install -g mocha
RUN npm install -g quik
COPY . /code
EXPOSE 9000
CMD npm start


