const fs = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),//из-за того что src в gulp не передаём требуеться для uglify 
    browserify = require('browserify'),//не gulp версия
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    uglifyES = require('gulp-uglify-es').default,
    browserSync = require('browser-sync').create();
      
let reactPathJSX = 'app/React/jsx/**.jsx';
let scssPathFile = 'app/css/scss/**.scss';

/*--------------------------------------------------------------------------*/
const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  fg: {
   Black: "\x1b[30m",
   Red: "\x1b[31m",
   Green: "\x1b[32m",
   Yellow: "\x1b[33m",
   Blue: "\x1b[34m",
   Magenta: "\x1b[35m",
   Cyan: "\x1b[36m",
   White: "\x1b[37m",
   Crimson: "\x1b[38m"
  },
  bg: {
   Black: "\x1b[40m",
   Red: "\x1b[41m",
   Green: "\x1b[42m",
   Yellow: "\x1b[43m",
   Blue: "\x1b[44m",
   Magenta: "\x1b[45m",
   Cyan: "\x1b[46m",
   White: "\x1b[47m",
   Crimson: "\x1b[48m"
  }
 };

/*-------------------------------------------------------------------*/

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
      ]
  )
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
})
/*###-------------------Config---------------------###*/
let files = function(pathFiles){
  let dir = path.parse(pathFiles).dir;
  let arrNameFile = fs.readdirSync(dir);
  let arrFullPath = arrNameFile.map((item) => path.join(dir, item))

  return arrFullPath;
}

let convertPath = (filePath) => filePath.map((item) => item.replace(/\\/g, '/'));//путь с \\ заменится на / для gulp.src
  
/*-------Функции для стежки и отдельного выполнения таском--------------------*/

let reactJSX = async function(file){//для работы import в React

  let arrFullPath = (typeof file == 'string') ? [file] : files(reactPathJSX);
  
  return await (
    arrFullPath.map((items) => {

      return (
        browserify([items]).transform( babelify, {
            presets: ['@babel/preset-react','@babel/preset-env'],//
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ]
        })
        .bundle()
        .on('error', function(err){
            console.error(`ERROR >> ${err}`);
            this.emit('end');
        })//При ошибке в js не разорвёт соединение в browserSync
        .pipe(source(path.parse(items).name))
        .pipe(rename({extname: '.min.js'}))
        .pipe(buffer())
        .pipe(uglify()).on('error', function(err){
            console.error(`ERROR >> ${err}`);
            this.emit('end');
        })
        .pipe(gulp.dest('app/React/src'))
        .pipe(browserSync.reload({stream: true})) )
    })  )     
}

let compress = function(){

  return (
    gulp.src('app/React/src/**.js')
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify()).on('error', function(err){
            console.error(`ERROR >> ${err}`);
            this.emit('end');
        })
      .pipe(gulp.dest('app/React/srcr')) )
}

let scssCSS = async function(file){
  let arrFullPath = (typeof file == 'string') ? [file] : files(scssPathFile);
  
  return await (
    gulp.src(convertPath(arrFullPath))//
        .pipe(sass.sync({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        }))
        
        .pipe(rename({suffix: '.min'}))//переименовывает файл. можно и без rename за ранее писать в файле style.min.scss
        .pipe(gulp.dest('app/css/min'))//куда складывать
        .pipe(browserSync.reload({stream: true})) )
        //this.reload()//можно и так
}

/*###--Для отдельного использования тасков--###*/
gulp.task('reactJSX', reactJSX)
gulp.task('compress', compress)
gulp.task('scssCSS', scssCSS)
/*---------------------------------------------*/
gulp.task('default', () => {
  browserSync.init({
    server: { 
      baseDir: "app",
      directory: false, // показывает список файлов 
      //index: "/React/index.html",//не работает как ожидалось. ниже параметр startPath
      // serveStaticOptions: {
      //   extensions: ["html"]
      // }
    },
    watch: true,
    files: [
      'app/**/**/*.html', 
      'app/Lesson/**/*.php',
      'app/js/**/*.js',
      {
        match: [scssPathFile],
        fn: (event, file) => scssCSS(file) 
      },
      { 
        match: [reactPathJSX],
        fn: (event, file) => reactJSX(file)
      }
    ],
    online: true,//при online транслирует в сеть. с гаждетов можно заходить на сайт 
    open: 'external',//Local, External - что отображать в строке URL. В Консоли есть выбор
    notify: false, //скрывает постоянное всплытие browserSync: Connected
    scrollProportionally: false,//убирает постоянный сброс к верху сайта при обновлении
    port: 8080, 
   
    //browser: ["google chrome", "firefox"]//какие браузеры открывать
    startPath: "React/public/index.html" //можно указать точное местоположение открываемого файла
  
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
//   gulp.watch("app/**/**/*.html",gulp.parallel('html'))//gulp.parallel('html')
//   gulp.watch('app/Lesson/**/*.php',gulp.parallel('php'))//gulp.parallel('php')
//   gulp.watch("app/js/**/*.js",gulp.parallel('js'))//gulp.parallel('js')
// })

// gulp.task('default', gulp.parallel('scss','browser-sync','watch'))

/*### - О BABEL - ###
  Gulp-babel для непосредственно создания таска
  "@babel/core" как я понял это сам процессор транспиляции одного кода в другой
  далее идут библиотеки надстройки для "@babel/core" что требуется прочитать чтоб конвертироваться в js
  '@babel/preset-env' - указывается в опциях. Транспилирует ES2015(ES6) в ES5
  '@babel/preset-react' - транспилирует JSX в ES6
  плагины
  '@babel/plugin-syntax-class-properties' - синтаксический анализ новых классов в ES6. 
  '@babel/plugin-proposal-class-properties' - будет понимать в class префикс static и преобразовывать в ES5
  пресеты
  есть пресеты которые содержат в себе некоторые плагины. установив их нужно указывать пресеты 
  в разделе presets
  Как я понял ниже плагины просто преобразуют в определёного вида код, но браузер не поймёт его без использования 
  дополнительных пакетов RequireJS или CommonJS
  '@babel/plugin-transform-modules-amd' - RequireJS
  '@babel/plugin-transform-modules-commonjs' - CommonJS стиль NodeJS(кажеться что '@babel/preset-env' делает тоже самое,
  но это не так. Не переводит почему-то let в var)

  browserify - делает связь JS файлов разбитых на модули т.к. это не поддерживаеться браузерами. Для этого требуеться главный JS 
  файл который будет подключаться в html
  babelify - это плагин для browserify, который имеет на борту babel. Принимает теже настройки как и babel
  
*/  

