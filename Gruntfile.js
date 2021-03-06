var savesFile = 'saves.zip';

if (!global.RWD) {
    Object.defineProperty(global, 'RWD', {
        get: function() {
            return __dirname;
        }
    });
}

function info(label, value) {
    console.log(label);
    console.log(value);
}

function error(label, value) {
    if (value) {
        console.log(label);
        console.error(value);
    }
}

module.exports = function(grunt) {
    grunt.initConfig({
        compress: {
            main: {
                options: {
                    archive: savesFile
                },
                files: [{
                    expand: true,
                    src: [
                        'save/**/*',
                        'config/auto_pickup.txt',
                        'config/options.txt',
                        'graveyard/#RHdheW5lIFR5c29u.seen.0.0',
                        'memorial/Dwayne_Tyson-2018-05-04-17-38-00.txt'
                    ],
                    dest: './'
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks("grunt-then");

    grunt.registerTask('save', 'Saves the characters to saves.zip.  Ex: grunt save:"commit message"', function(message) {
        if (!message) {
            throw new Error("You need to supply a commit message!");
        }
        grunt.task
            .run("compress")
            .then( generateCMDTask(
                ['git add -A', 'git commit -m "' + message + '"', 'git push']
            ));
    });

    grunt.registerTask('load', generateCMDTask((function() {
        var cmd = ['git pull'];

        switch (process.platform) {
            case 'linux':
                cmd.push('unzip -o ' + savesFile);
                break;
            case 'win32':
                break;
            case 'darwin':
                cmd.push('tar -zxvf ' + savesFile);
                break;
        }
        return cmd;
    })()));

    grunt.registerTask('default', ['save']);

    function generateCMDTask(cmd, callback, args) {
        return function() {
            var done = this.async();

            function finish() {
                if (typeof callback === 'function') {
                    callback.args = args || [];
                    callback(done);
                } else {
                    done();
                }
            }

            var exec = require('child_process').exec,
                child;

            console.log(cmd);

            if (cmd.length) {
                child = exec(cmd.join(' && '), function(error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                    finish();
                });
            } else {
                console.log('cmd is empty');
                finish();
            }
        };
    }
};
