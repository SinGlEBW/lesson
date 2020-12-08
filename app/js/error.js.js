function UserException(message) {
  this.message = message;
  this.name = "Исключение, определенное пользователем";
}
function getMonthName(mo) {
  mo = mo-1; // Нужно скорректировать номер месяца согласно индексам массива (1=Jan, 12=Dec)
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
     "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (months[mo] !== undefined) {
     return months[mo];
  } else {
     throw new UserException("Неверно указан номер месяца");
  }
}

try {
  // statements to try
  var myMonth = 15; // 15 находится вне границ массива, что приведет к исключению
  var monthName = getMonthName(myMonth);
} catch (e) {
  monthName = "неизвестен";
  logMyErrors(e.message, e.name); // передаем исключение в обработчик ошибок
}


/*
  Тело try следит за корректностью файла, если в теле будет найден по каким то причинам throw,
  то всё что в throw будет передано ближайшему обработчику catch в аргумент err
*/