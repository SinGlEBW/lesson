const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
      browserSync = require('browser-sync'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),//ужимает js
      babel = require('gulp-babel');
/*### - О BABEL - ###
  Gulp-babel для непосредственно создания таска
  "@babel/core" как я понял это сам процессор транспиляции одного кода в другой
  далее идут библиотеки надстройки для "@babel/core" что требуется прочитать чтоб конвертироваться в js
  '@babel/preset-env' - указывается в опциях. Транспилирует ES2015(ES6) в ES5
  '@babel/preset-react' - транспилирует JSX в ES6

*/  

gulp.task('nsmpscss', () => {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
  ])
  .pipe(concat('_libs.scss'))
  .pipe(gulp.dest('app/css/scss'))
})

gulp.task('smpminjs', () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
})

gulp.task('br-sync', () => {
  browserSync.init({
    server: { 
      baseDir: "app",
      //index: "/React/index.html",//не работает как ожидалось. ниже параметр startPath
      directory: true, // показывать список файлов. сам выберу
      // serveStaticOptions: {
      //   extensions: ["html"]
      // }
    },
    
    files: [
      'app/**/**/*.html', 
      'app/Lesson/**/*.php',
      'app/js/**/*.js',
      {
        match: ['app/css/scss/**/*.scss'],
        fn: (event, file) => {
        
          gulp.src(file.replace(/\\/g,'/'))//scss файл в котором работаем. Если всегда менять пачку файлов то можно скопировать 'app/css/scss/**/*.scss'
          .pipe(sass.sync({outputStyle: "compressed"}).on('error', sass.logError))
          .pipe(autoprefixer({
                  overrideBrowserslist: ['last 10 versions'],
                  cascade: false
          }))
          .pipe(rename({suffix: '.min'}))//переменовывает файл. можно и без rename за ранее писать в файле style.min.scss
          .pipe(gulp.dest('app/css'))//куда складывать
          .pipe(browserSync.reload({stream: true}))
          //this.reload()//можно и так
        },
      },
      {
        match: ['app/React/*.jsx'],
        fn: (event, file) => {

          gulp.src(file.replace(/\\/g, '/'))
          .pipe(babel({presets: ['@babel/preset-react','@babel/preset-env']}))//@babel/preset-env в ES5
          .pipe(rename({suffix: '.min'}))
          .pipe(uglify())//uglify c ES6 не очень ладит. uglify-es больше не поддерживаеться Лучше всех terser работает с ES6+ тоже 
          .pipe(gulp.dest('app/React/js'))
          .pipe(browserSync.reload({stream: true}))
        }
      }
    ],
    online: false,//при online транслирует в сеть. с гаждетов можно заходить на сайт 
    //open: 'tunnel',//Local, External - что отображать в строке URL. В Консоли есть выбор
    notify: false, //скрывает постоянное всплытие browserSync: Connected
    scrollProportionally: false,//убирает постоянный сброс к верху сайта при обновлении
    port: 8080, 
    // https: {
    //   key: "path-to-custom.key",
    //   cert: "path-to-custom.crt"
    // },
    //browser: ["google chrome", "firefox"]//какие браузеры открывать
    //startPath: "React/index.html" //можно указать точное местоположение открываемого файла
  
  });
});

/* ################---------browser-sync Заменяет это всё----------################ */
// gulp.task('scss', () => {
//   return gulp.src('app/css/scss/**/*.scss')//* это во всех папках/все файлы.scss
//     .pipe(sass.sync({outputStyle: "compressed"}).on('error', sass.logError))//зачем sync непонятно.
//     .pipe(autoprefixer({
//             overrideBrowserslist: ['last 10 versions'],
//             cascade: false
//     }))
//     .pipe(rename({suffix: '.min'}))//переменовывает файл. можно и без rename за ранее писать в файле style.min.scss
//     .pipe(gulp.dest('app/css'))//куда складывать
//     .pipe(browserSync.reload({stream: true}))
    
//   });
 /*
 В sass.sync() или в sass() передаёться объект с настройками вида компиляции
 {outputStyle: "compressed"}// "expanded" - обычный режим с отступами

 */
// gulp.task('html', () => {
//   return gulp.src("app/**/**/*.html")//"app/js/**/*.html"
//     .pipe(browserSync.reload({stream: true}))
// })
 
// gulp.task('php', () => {
//   return gulp.src("app/Lesson/**/*.php")
//     .pipe(browserSync.reload({stream: true}))
// })
    
// gulp.task('js', () => {
//   return gulp.src("app/js/**/*.js")
//     .pipe(browserSync.reload({stream: true}))
// })

// gulp.task('watch', () => {
//   gulp.watch('app/css/scss/**/*.scss',gulp.parallel('scss')) //gulp.parallel('scss')
//   //gulp.watch("app/**/**/*.html",gulp.parallel('html'))//gulp.parallel('html')
//   gulp.watch('app/Lesson/**/*.php',gulp.parallel('php'))//gulp.parallel('php')
//   gulp.watch("app/js/**/*.js",gulp.parallel('js'))//gulp.parallel('js')
// })

// gulp.task('default', gulp.parallel('scss','browser-sync','watch'))



