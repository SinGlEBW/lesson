<!-- <?php session_start();?> -->


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Document</title>    
<link rel="stylesheet" href="../css/style.css">
</head>
<body>
	<div>
		<div id = "wrap">
			<p id = "idP">Страница1 </p>
			<p><?=$test?></p>
			<p class = "list1">Страница3</p>
			<p></p>
			<p>Страница5</p>
			<div id="item"></div>
			<p><input type="range" id="r1" value="0"></p>
		<div class = 'wrap wrapREG'>
			<p>Форма регистрации</p>
			<form id='formReg'>
				<p><input type="text" name="loginReg" class='Login'><span class="info1"></span></p>
				<p><input type="password" name="passReg" class='Pass'><span class="info2"></span></p>
				<p><input type="text" name="emailReg"><span id="info3"></span></p>
				<p><input type="submit" name="submitReg" value="Регистрация"></input></p>
				<div class="responseServer"></div>
			</form>
		</div>
		<div class = 'wrap'>
			<p>Форма входв</p>
			<form id='formEnter'>
				<p><input type="text" name="loginEnter" class='Login'><span class="info1"></span></p>
				<p><input type="password" name="passEnter" class='Pass'><span class="info2"></span></p>
				<p><input type="submit" name="submitEnter" value="Вход"></input></p>
				<div class="responseServer"><?php print_r($_SESSION);?></div>
			</form>	
	
		</div>
	  </div>
	</div>
	<p><input type="button" id="button" value="Нажмите на кнопку"></p>

	<div id="box" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
	<img id="image" src="../img/youtube.png" alt="" draggable="true" ondragstart="drag(event)">

   <script src="../js/Date.js" defer></script><!--defer нужен для того что бы заставить загрузиться js после того как загрузились вся HTML страница.
											Это что бы не было ошибок в исполнении js кода-->
   

   <!-- <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script> -->

</body>
</html>