var gulp = require("gulp"),
  browserify = require("gulp-browserify"), //Gulp-browserify handles the importing of libraries we need, as well as bundling or combining separate files with a require command.
  webserver = require("gulp-webserver"); // Gulp-webserver handles the live reloading of our code as we work through it.

var src = "./process", // wszystko przechodzi z src do folder app/ porozdzielane
  app = "./content/app";

gulp.task("js", function() {
  return gulp
    .src(src + "/js/app.js")
    .pipe(
      browserify({
        transform: "reactify", // reactify zmienia moj kod z JSX na JS
        debug: true
      })
    )
    .on("error", function(err) {
      console.error("Error!", err.message);
    })
    .pipe(gulp.dest(app + "/js")); //tutaj wyrzuca moj kod content/js/app
});

gulp.task("html", function() {
  gulp.src(app + "/**/*.html");
});

gulp.task("css", function() {
  gulp.src(app + "/css/*.css");
});

gulp.task("watch", function() {
  gulp.watch(src + "/js/**/*.js", ["js"]);
  gulp.watch(app + "/css/**/*.css", ["css"]);
  gulp.watch([app + "/**/*.html"], ["html"]);
}); // szuka jakichkolwiek zman w css/html/js  folderze

gulp.task("webserver", function() {
  gulp.src(app + "/").pipe(
    webserver({
      livereload: true,
      open: true
    })
  );
}); /// automatycznie updatuje browser po zmianach

gulp.task("default", ["watch", "html", "js", "css", "webserver"]);
