<?php
/*
  1. Сайт это по сути Тема в wordpress, что бы её создать нужно зайти в
  wp_content -> themes создать папку с именем сайта, создать для удобства папку assets перекинуть туда папки css js img.
  В файл css закинуть в блочный комментарий: Theme Name: имя сайта ниже css и выложить его в папку перед assets положить вместе в index.
  в css оставить все остальные файлы: normalize и от библиотек
  2. Клиент по любому будет взаимодействовать через админку с картинками в слайдере, поэтому придёться устанавливать плагин WP Magnific Lightbox
     и подключать jQuery и magnific-popup через CDN и WP не придётся, но пример есть как это сделать.
     
  3. если нужно скачать что-либо с сайта не забываем на ссылку атрибут download и href="<?php the_field('имя_нужного_поля')?>". 
     При на стройке поля выбрать тип: Файл и radio ccылка на файл.
  Перед папкой assets будет index.php и куча частей сайта на том же уровне
  подключать файлы не методами php типа include и require, а у wordpress есть методы get_
*/
// наши файлы должны называться header.php и т.д. и должны 
get_header();

get_footer();

/* Что бы подключить стили и скрипты нужно 
1. убрать линки в head и прописать <?php wp_head(); ?> и в footer прописать <?php wp_footer(); ?> (не путать с get_footer())
создать файл function.php (на том же уровне что и index) и использовать wp_enqueue_style и wp_enqueue_script методы, но через событие*/

add_action('wp_enqueue_script', 'myStyle');
add_action('wp_enqueue_script', 'myScript');

function myStyle(){
  wp_enqueue_style('normalize-style', get_template_directory_url() . '/assets/css/normalize.css');//второстепенные подключаться через get_template_directory_url()
  wp_enqueue_style('normalize-style', get_template_directory_url() . '/assets/css/magnific-popup.css');
  wp_enqueue_style('main-style', get_stylesheet_url());//get_stylesheet_url() метод подключения как главного файла css

  /*
    предлагают тут подключать и script  в head, 
      wp_enqueue_script('script-name', get_template_directory_url() . '/js/bundle.js', array(), "1.0.0", true);
    но script по сути указывают внизу не просто так, а что что бы загрузился когда страница прогрузится.
  
  */
};

function myScript(){
  //это видимо манипуляции для админки. т.к. wp_footer() прописан в footer то wp проймёт что нужно скрипты подключать внизу
  wp_deregister_script('jquery');
  wp_register_script('jquery', 'его CDN');
  wp_enqueue_script('jquery');
  //подключение моих скриптов
  wp_enqueue_script('magnific-popup', get_template_directory_url() . '/assets/js/magnific-popup.min.js', array(jquery), null, true);
  wp_enqueue_script('main-popup', get_template_directory_url() . '/assets/js/мой_скрипт.js', array(jquery), null, true);//array(jquery), null, true хз зачем параметры
 
};

/*подключение картинок делиться на статичные и динамические - те которые заказчик сможет менять. 
Статичным нужно указать url. URL вроде находиться в $_SERvER, но в wp это */


?>
<!-- template_url прописано в док, метода bloginfo.
  Предварительно можно установить имя страницы в "Страница" и поставить её главной в "Настройка -> Чтение" -->
<img src="<?bloginfo('template_url');?>assets /img/picture.jpg" alt=""><!-- так подключаются статичные картинки-->
<!-- в head поменять title. Это нужно что бы привязать к админке управлением title -->
<title><?bloginfo('description');?></title>

<!-- ######------<{ изменение полей через WP }>------########## -->
<!--
  Нужно создать инструмент для изменения данных на сайте. Для этого для начала создают поля и связывают их каждое с тем контентом 
  за которое поле будет отвечать.
  1. Установить в WP расширение Advanced Custom Fields. Появиться поле "Группа полей"
    
  2. В плагине установить Условие (что хотим менять) "Страница" равно (какую страницу)"Главная страница" и начать добавлять поля.
  3. Поля визуально указываются последовательно но указав тип можно разбивать на секции лендинга, а в секциях на блоки 
  3. Каждое такое поле это секция лендинга и нужна настроить что менять можно в каждой секции. 
     Например Ярлык поля: Телефон, имя поля: phone, Тип: text. Имя поля будет указываться в the_field(), так что, чтобы не выдумывать можно использовать те классы
     поля которые меняем
     после чего поля нужно в html привязать. 
  4. Если нужно текст настроить более тонко с пробелами и разной жирностью, то можно выбрать тип не просто текст, а Тип: Редактор Wordpress.
     В панели "Страница" все манипуляции с нашими полями или прямо при просмотре сайта панель админа так же есть и эта панель полей должна быть прибита к низу экрана

     Смотреть канал от 0-1 "Верстка сайта и посадка на wordpress" 2:30:00 
     phone должно быть названием поля в плагине Advanced Custom Fields-->

<a href="tel:<?php the_field('phone')?>"><?php the_field('phone')?></a>
<!-- картинки которые установленые на блоке в css нужно записывать в html, потому что php доступ не имеет в css -->
<div class="box" style="background-image: url(<?php the_field('top__bg')?>?>)">
  <!-- ... -->
</div>

<!--
   5. Для привязки к WP управлением фото в слайдере нужно устанавливать WF Magnific Lightbox, не забыть активировать, перейти в 
    Настройки > «WF Magnific Lightbox посмотреть что можно установить галочками. 
    Далее создаём поле снова Редактор Wordpress через который можно добавлять медиа файлы. там будет "Добавить галерею"
    не забыть вставить галерею в php. Опять же какое имя поля придумали такое вставляем в html 
 -->
 <div class="gallery__wrap">
  <?php the_field('gallery')?>
</div>
<!-- 
  Есть один нюанс, когда в Галереи выставляем сколько колонок будет отображаться, то по сути magnific выставляет свои стили, а часть относящихся к фото
  тупо уходит на 2й план, так примерно копиться мусор. Можно подчистить. А ещё фотографии выравниваются через старую добрую таблицу 
 -->

 <!-- #######-----<{ Вывод данных списком }>-----######## -->
<!-- 
  Предположим что требуется загрузить список названий домой с их картинками. До этого через the_field
  создавали поля через которые можно воздействовать на конкретно 1 область, в зависимости от типа могли создать или текст или картинку и что бы это было
  возможно привязывали одну область в html. Сейчас нужно выложить список данных. Нужна 1 область которая
  может управлять списком. В плагине есть платные инструменты, но есть и бесплатное решение.
  Для этого нужно
  1 создать поле тип: Записи, фильтр по типу Запись и поле Название проекта и тип: текст и жмём Обновить 
 -->
 <?php
  $posts = get_field('project_item');
  if($posts): ?>
  <ul>
  <?php foreach($posts as $item): ?>
    <?php setup_postdata($item); ?>
    <li class="project_item">
    <?php the_field('project_name'); ?>
    </li>
    <?php endforeach; ?>
    </ul>
    <?php wp_reset_postdata(); ?>
  <?php endif; ?>

 ?>