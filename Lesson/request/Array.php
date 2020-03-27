<?php


/*
#####-----Список функций для массивов-----#####
    end() - принимает массив и возвращает последний элемент массива
    reset() - Принимает массив и возвращает первый элемент массива
    current() - Возвращает текущий элемент массива
    next() - Перемещает указатель массива вперед на один элемент. current() вернёт следующий масив
    prev() - Передвигает внутренний указатель массива на одну позицию назад. current() вернёт предыдущий масив
    each() - Возвращает текущую пару ключ/значение из массива и смещает его указатель
    array_key_last() - Получает последний ключ массива

    array_shift(сюда массив); - извлекает первый элемент массива. после извлечения массив лишён 1го элемента
    array_unshift(); - Добавляет один или несколько элементов в начало массива
    array_push();  - Добавляет один или несколько элементов в конец массива
    array_pop();   - Извлекает последний элемент массива
    array_merge(); - принимает массивы которые нужно объединить

    array_combine() - принимает 1й массив в качестве ключей, 2й массив в качестве значений
    $arr1 = ["Audi","Golf","Volkswagen","Nissan"];
    $arr2 = [3 =>"Mersedess","Peugeot","sdshdgh","Mazda"];

    array_replace($arr1,$arr2); - заменяет элементы 1го массива вторым. коч во втором массиве указывает откуда начать менять 

    array_filter() - 1й аргумент массив, 2й не обязательный callback. Если cb не был передан елементы массива со значением false 
                    вывыдиться не будут $arr1 = ["Audi","Golf","Volkswagen","Nissan" => false];
                    3й аргументе 0 - ARRAY_FILTER_USE_KEY, 1 - ARRAY_FILTER_USE_BOTH. устанавливает кол-во аргументов 
                    по умолчанию один аргумент отвечающий за значение.


*/



?>