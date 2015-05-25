gulp-aspnet-dnx
=============

Gulp plugin for ASP.NET 5. You can use this plugin to integrate ASP.NET 5 `dnu build`, `dnu restore` and `dnx` command execution (for the commands available inside you project.json file). Check out the [example](/example/) inside the repository.

## Installation

You can install gulp-aspnet-dnx plugin through npm:

    npm install gulp-aspnet-dnx

Preferably, you can save this as dev dependency:

    npm install gulp-aspnet-dnx --save-dev

## Usage

```javascript
var gulp = require('gulp'),
    dnx = require("gulp-aspnet-dnx");
gulp.task('default', function(cb) {
    return gulp.start('dnx-run');
});
gulp.task('dnx-run', dnx());
```

The default function restores the packages according to your project.json file and runs the web command inside the project.json file. You can pass a few options to this to choose what's actually going to run:

```javascript
// the default options
var options = {
    restore: true,
    build: false,
    run: true,
    dnxCommand: 'kestrel',
    cwd: './'
};
gulp.task('dnx-run', dnx(options));
```

There are also shorthand methods for specific tasks:

```javascript
gulp.task('dnx-run', dnx(options));
// only restores the packages
gulp.task('dnu-restore', dnx.restore());
// only builds the project
gulp.task('dnu-build', dnx.build());
// restores the packages and builds the project
gulp.task('dnu-restore-build', dnx.restoreBuild());
```

gulp-aspnet-dnx also integrates with `dnx --watch` to run your commands. So, it will restart your server when you change a code file.

###cwd
You can change the working directory for the specific command to run passing `cwd` as an option to the main method or as parameter to the shorthand methods.

```javascript
//assuming project.json is inside the 'server' directory
var options = {
    dnxCommand: 'kestrel',
    cwd: './server/'
};
gulp.task('dnx-run', dnx(options));

//using the shorthand methods
gulp.task('dnx-restore', dnx.restore('./server/'));
gulp.task('dnu-build', dnx.build('./server/'));
gulp.task('dnu-restore-build', dnx.restoreBuild('./server/'));
```
