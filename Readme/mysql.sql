-- Добавление таблицы
-- Показать таблицу
SHOW DATABASES;
SHOW COLUMNS FROM full_name;

-- выбрать таблицу
SELECT * FROM table_name;
SELECT colum FROM table_name;
SELECT column1, column2, ... FROM table_name;
-- #####--фильтрация колонок
-- DISTINCT убирает повторяющиеся значени и показывает колонку без них. Работает с SELECT
SELECT DISTINCT column1, column2 FROM table_name;
--LIMIT - показывает определёный кусок данных. Есть несколько способов захватить кусок.
SELECT column1 FROM table_name LIMIT 5;--показать 5 элементов. показывает с 0 позиции массива
SELECT column1 FROM table_name LIMIT 5, 2;--показать с 6 позиции массива, 2 элемента.
SELECT column1 FROM table_name LIMIT 5 OFFSET 2;--показать 5 элементов с 3й позиции массива. так удобней
-- ORDER BY column1 DESC - "сортировать" column1 от большего к меньшему
SELECT column1 FROM table_name ORDER BY column1 DESC --ASC сортирует от меньщего к большему
--###----Поиск-----------------------
SELECT * FROM table_name WHERE column1 > 5;--принимает логические выражения 
SELECT * FROM table_name WHERE id BETWEEN 10 AND 15;-- диапазаон BETWEEN
SELECT * FROM table_name WHERE City = 'New York' OR  City = 'Chicago';-- диапазаон OR = или
SELECT * FROM table_name WHERE City = 'New York' OR  (age=30 OR age=40);
SELECT * FROM table_name WHERE City IN ('New York', 'Chicago');--IN принимает перечисления. Как замена OR (ИЛИ)

--###----Функции-----------------------
SELECT CONCAT(column1, column2) FROM table_name;--CONCAT выведет соединёные стообцы. Имя будет CONCAT
SELECT CONCAT(column1, column2) AS myNameColumn FROM table_name;--Назвал колонку

INSERT INTO table_name SET id=300, name='Mayla';
INSERT INTO table_name id=300, name='Mayla';
