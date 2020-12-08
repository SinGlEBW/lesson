<?php
/*
ALTER TABLE `user` ADD `password` INT(32) NOT NULL AFTER `login`;//создать столбец
ALTER TABLE `user` ADD `email` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL AFTER `password`;


UPDATE название таблицы SET к какому столбцу что добавить login='Петя',... WHERE (где -это оператор условия). ID=1. В mySQL знак != пишеьбся так <>
                                        В условии перед типом NULL требуеться ставить IS NULL.

DELETE FROM название таблицы WHERE критерии строки пример ID=1
*/


?>