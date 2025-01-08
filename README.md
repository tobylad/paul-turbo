# paul-turbo

## com.domain.app.paulturbo

### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.


### Additional Docs

>Please note that the above instructions will only get the app running locally on your browser. There's a bit more to do 
if you want to try to run it on webOS. Here are some helpful steps and links if you want to try it out.

- Download the Developer Mode app on your webOS-supported TV.
- Register as a developer at developer.lge.com. Note you need an LG account *and* an LG developer account for this to work. Whew!
- This article runs through the LG/Ares SDK and how to use it to link up your local system to the TV, enabling the app to run.
https://webostv.developer.lge.com/develop/tools/cli-dev-guide#install-the-web-app

Obviously you don't have to do this, but until I get this published this is a way for you to also see it on a TV. Ping me on
LinkedIn with any questions and I'll be happy to help!
