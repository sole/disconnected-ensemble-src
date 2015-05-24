# the disconnected ensemble

## How to run it

Install node.js, it will also install npm with it (the package manager).

Clone this repository and cd to it, then run 

```bash
npm install
```

it should install all the dependencies required by the project.

You can now run

```bash
npm run build
```

which will generate the Firefox OS app that you can install in a Firefox OS phone with [install-to-adb](https://github.com/sole/install-to-adb):

```bash
install-to-adb ./build/ --launch
```

