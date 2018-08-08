var gulp = require('gulp');
var loader = require('gulp-load-plugins')();
console.log(loader)
gulp.task('server',function() {
    gulp.src('src')
    .pipe(loader.webserver({
        port:9090,
        middleware:function(req,res,next){
            var pathname = require('url').parse(req.url).pathname;
            if(pathname === '/favicon.ico'){
                return false;
            }
            pathname = pathname === '/'?'index.html':pathname;
            res.end(require('fs').readFileSync(require('path').join(__dirname,'src',pathname)));
        }
    }))
});

