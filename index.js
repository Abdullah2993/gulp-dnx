var _ = require('lodash'),
  shell = require('gulp-shell'),
  process = require('process'),
  gutil = require('gulp-util');

var isWin = /^win/.test(process.platform);

var PLUGIN_NAME = 'dnx';

function dnxRunner(dnxCommand, options) {
  if (!dnxCommand) {
    throw new gutil.PluginError(PLUGIN_NAME, 'Please specify the dnx command to run.');
  }

  options = _.extend({
    restore: true,
    build: false,
    run: true,
	loop: false,
    cwd: './'
  }, options);

  if (!options.restore && !options.build && !options.run) {
    throw new gutil.PluginError(PLUGIN_NAME, 'No action has been specified');
  }

  var commands = [];

  if (options.restore === true) {
    commands.push('dnu restore');
  }

  if (options.build === true) {
    commands.push('dnu build');
  }

  if(options.loop === true) {
	  if (options.run === true) {
		if(isWin) {
		  commands.push('@powershell -NoProfile -ExecutionPolicy unrestricted -Command "for(;;) { Write-Output \"Starting...\"; dnx --watch ' + dnxCommand + ' }"');
		} else {
		  commands.push("sh -c 'while true; do echo \"Starting...\"; dnx --watch " + dnxCommand + '; done\'')
		}
	}
  }
  else {
	  if (options.run === true) {
		if(isWin) {
		  commands.push('@powershell -NoProfile -ExecutionPolicy unrestricted -Command "Write-Output \"Starting...\"; dnx ' + dnxCommand + '"');
		} else {
		  commands.push("sh -c 'do echo \"Starting...\"; dnx " + dnxCommand + ';')
		}
	}
  }

  return shell.task(commands, {
    env: process.env,
    cwd: options.cwd
  });
}

dnxRunner.build = function(cwd) {
  return dnxRunner({
    build: true,
    restore: false,
    run: false,
	loop: false,
    cwd: cwd
  });
};

dnxRunner.restore = function(cwd) {
  return dnxRunner({
    restore: true,
    build: false,
    run: false,
	loop: false,
    cwd: cwd
  });
};

dnxRunner.restoreBuild = function(cwd) {
  return dnxRunner({
    restore: true,
    build: true,
    run: false,
	loop: false,
    cwd: cwd
  });
};

module.exports = dnxRunner;