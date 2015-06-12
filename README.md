# the disconnected ensemble

> An app for Firefox OS that lets you share a number of musical toys that can run in your friends' devices, served from your phone, either by typing in the IP address of the phone server, or by bumping NFC devices together.

## System requirements

### Server

* Installation of apps via ADB / Devtools should be enabled: go to *Settings - Developer - Debugging via USB* and make sure the value is 'ADB and DevTools'.
* The phone should have access to 'full DevTools' in order to install certified apps.

**NOTE: Why is this app *certified*?** to be able to access information about the current network connection. This is only made available to certified apps right now.

### Client

* Any modern browser that can run Web Audio code
  * (but Safari Mobile seems to not to work)
* For NFC capabilities, an NFC capable device *with NFC enabled*.

## How to run it

Install node.js, which will also install npm with it (the package manager).

Clone this repository and cd to it, then run 

```bash
npm install
```

to install all the dependencies required by the project.

You can now run

```bash
npm run build
```

which will generate the Firefox OS app in the `build/` folder.

Then you can install it on a Firefox OS phone with [install-to-adb](https://github.com/sole/install-to-adb):

```bash
install-to-adb ./build/ --launch
```

or using the Web IDE, by importing the `build` directory as a *new packaged app*, and then pushing it to a physical device or to a simulator.

While the simulator is convenient for developing, it's way more fun to run this server on a device that you can carry around!

### Rebuilding on file changes

If you run `npm run build`, the app will be built into `build/` and exit.

If you run `npm run gulp`, the app will be built and a file watcher will keep looking for changes. Every time you make a change to a file, the build process will be run.

## Code walkthrough (or: how to modify this)

This app can be divided in two: the Firefox OS app itself, which runs on the *server* device, and the app that we deliver to *client* devices.

The logic for the Firefox OS app is in `src/server.js`. It:

* runs a web server to deliver content (the toys)
* also controls the NFC chip on the device to announce the URL of the server to other NFC enabled devices, if they 'bump' against the server.

If you want to add new features to the server, `src/server.js` is the best place to start, although it's really messy and could benefit from some refactoring!

The layout for the server app is in `src/index.html` and `src/css`.

The sources for the *client app* are in the `src/www`, as they are what the web server will serve.

The toys (or musical instruments) are taken from the [OpenMusic](https://github.com/openmusic) project. Each one consists on a UI and a Web Audio based node. They are installed as dependencies, specified in `package.json` and then required in `www/app.js`. If you want to add new toys, this is the place to do it!

During the build process, the source code for each toy and its UI will be pulled out from its respective `node_modules` folders and put them all together into `build/www/bundle.js`.
