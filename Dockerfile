FROM node:10.13.0-alpine
# Create Directory for the Container
RUN npm install -g yarn

WORKDIR /home/app
# Only copy the package.json file to work directory
COPY package.json yarn.lock ./
# Install all Packages
RUN yarn
# Copy all other source code to work directory
COPY . .
# TypeScript
RUN yarn build
# Start
EXPOSE 3000
CMD ["yarn", "start:prod"]
