# Кастомный селект

## Последовательность работы скрипта

* Выбирает список обернутый в тег с классом **selectCustom** и извлекает из него id

* Сопоставляет id c ключом объекта **customSelectConfig** и на основе полученных параметров создает оболочку

* Скрывает за оболочкой дефолтный селект, задает ему меньшую ширину и высоту на 10 пикселей, а также запрещает открытие.

* Вешает слушатели событий мыши и клавиатуры. При кликах мыши в области списка, значения кастомного селекта передаются в дефолтный селект, а при нажатии клавиатуры из дефолтного селекта в кастомный

## Начало работы

Для начала необходимо обернуть дефолтный список в тег с классом **selectCustom** и задать для него **id**. Если несколько списков, каждый из них должен находится в своей обертке!

    <div id="selectFirst" class="selectCustom">
        <select>
            <option></option>
            <option></option>
            <option></option>
        </select>
    </div>

Далее создать объект настройки **customSelectConfig**, ключи которого будут соответствовать id списков. Внутри каждого ключа описать параметры для создания оболочки.

    let customSelectConfig = {
        selectFirst: {
            selected: '',
            shellList: {},
            shellItem: {},
            text: {},
            image: {},
            icon: {},
            triggerChevron: {}
        }
    }

При успешной настройки всех параметров, в теге с классом **selectCustom** будет создана дополнительная, дочерняя структура:

    <div id="selectFirst" class="selectCustom">
        <select>
            <option></option>
            <option></option>
            <option></option>
        </select>
        <div class="selectShell">
            <div class="selectShell__trigger"></div>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>

## Коммиты
***
### CustomSelect V1.4

* Позиционирование элементов списка перенесено в js
* Появилась возможность влиять на отображение пустого option в листе списка
* Первичное оформление инструкции в файле **README**
* Слияние ветки mainObj с мастер веткой
***

### CustomSelect V1.3.9

Создана функция **`createEmptyOption()`**
***

### CustomSelect V1.3.8

Исправлена функция **`mouseNavigationSelect()`**
***

### CustomSelect V1.3.7

* Прописана логика функции **`createElem()`**
* Удалена функция **`createStructure()`**
* Облегчена функция **`createShellList()`**
* Облегчена функция **`createShellTrigger()`**
***

### CustomSelect V1.3.6

Создана функция **`createStructure()`**
***

### CustomSelect V1.3.5

Полная привязка к значению `migration` объекта настройки
***

### CustomSelect V1.3.4

Частичная привязка к значению `migration` объекта настройки
***

### CustomSelect V1.3.3

Реализована возможность выбора класса как из объекта настройки, так и проставкой атрибута `data-icon` для каждого option
***

### CustomSelect V1.3.2

Реализована выборка классов и объекта настройки
***

### CustomSelect V1.3.1

* Создан главный объект настройки
* Создана ветка mainObj
***

### CustomSelect V1.3

Реализована генерация структуры оболочки в JavaScript
***

### CustomSelect V1.2.2

* Минимизировано количество классов
* Доработана функция **`shellTrigger`**
***

### CustomSelect V1.2.1

* Группировка кода по функциям
* Стандартизация имен переменных и функций
* Комментирование каждой функции
***

### CustomSelect V1.2

Код адаптирован под использования в нескольких select
***

### CustomSelect V1.1

Сделан основной функционал
***


