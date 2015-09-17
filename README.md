# grunt-trackjs

> Grunt plugin for TrackJS

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-trackjs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-trackjs');
```

## The "trackjs" task
_Run this task with the `grunt trackjs` command._

To prevent build process issues with other libraries & dependancy loaders (ex: RequireJS), this task will create a TrackJS configuration file and prepend it to the TrackJS library file (pulled from npm). This allows TrackJS to be loaded by other libraries as an isolated entity, and ensures that it's loaded and configured at the stage time of that library’s build process.

### Overview
In your project's Gruntfile, add a section named `trackjs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  trackjs: {
    your_target: {
      // Main settings
      options: {
        // TrackJS options
      }
    }
  },
})
```

### Settings

#### output
Type: `String`

The path for the file that the custom TrackJS script will be written to.

#### token
Type: `String`

Unique TrackJS client authorization token.

#### gitversion
Type: `Bool`
Default: false

Enabling this will cause the task to spawn a child process and read the output of the "git describe" command. This output will be saved against the TrackJS version option.

### Options

All TrackJS options are available. Please review the [options here](https://docs.trackjs.com/Configuration). No options are set by default.

### Usage Examples

#### Basic Options
In this example, we create a target for a production environment and set some simple TrackJS options.

```js
grunt.initConfig({
  trackjs: {
    production: {
      output: 'js/tracker.js',
      token: 'f3bdXXXXXXXXXXXXXXXXX',
      options: {
        application: 'myApp',
        serialize: function(data) {
          return JSON.stringify(data);
        }
      }
    }
  },
});
```

#### Enabling Git Version
In this example, we map our git version number to TrackJS options automatically.

```js
grunt.initConfig({
  trackjs: {
    production: {
      output: 'js/tracker.js',
      token: 'f3bdXXXXXXXXXXXXXXXXX',
      gitversion: true
    }
  },
});
```

## Release History
 * 2015-09-16   v0.1.0   Initial release

