const selectCustom = document.querySelectorAll('.selectCustom');

if (selectCustom.length > 0) {

	shellTrigger();
	focusBlur();

	document.addEventListener('click', mouseNavigationSelect);

	//Определение значения для триггера оболочки
	function shellTrigger(dataItem, selectId) {
		//Выставляет выбранное значение для всех оболочек при загрузке страницы
		if (arguments.length === 0) {

			for (let index = 0; index < selectCustom.length; index++) {
				const currentSelect = selectCustom[index];
				const selectId = currentSelect.getAttribute('id');
				const selected = currentSelect.getAttribute('data-selected');

				intoShellTrigger(currentSelect, selected);
				sendNativeValue(currentSelect, selected);
				shellActiveItem(selected, selectId);
			}
		}
		//Выставляет выбранное значение для конкретной оболочки
		if (arguments.length > 0) {
			const currentSelect = document.getElementById(selectId);
			const selected = dataItem;

			intoShellTrigger(currentSelect, selected)
			sendNativeValue(currentSelect, selected);
		}
	}

	//Вставка контента в триггер оболочки
	function intoShellTrigger(currentSelect, selected) {
		const triggerImage = currentSelect.querySelector('.trigger__image');
		const triggerText = currentSelect.querySelector('.trigger__text');

		triggerImage.src = `img/${selected}.png`;
		triggerText.innerHTML = selected;
	}

	//Определение активного элемента списка в оболочке
	function shellActiveItem(currentValue, selectId) {
		const currentSelect = document.getElementById(selectId);
		const shellListItems = currentSelect.querySelectorAll('.select__item');

		for (let i = 0; i < shellListItems.length; i++) {
			shellListItems[i].classList.remove('_active');
			let listItemData = shellListItems[i].getAttribute('data-value');
			if (currentValue == listItemData) {
				shellListItems[i].classList.add('_active');
			}
		}
	}

	//Передача значения data-selected в дефолтный select 
	function sendNativeValue(currentSelect, selected) {
		const selectDefaultArr = currentSelect.querySelectorAll('option');

		for (let i = 0; i < selectDefaultArr.length; i++) {
			let optionValue = selectDefaultArr[i].getAttribute('value');

			if (optionValue === selected) {
				selectDefaultArr[i].selected = true;
			}
		}
	}

	//Передача значения дефолтного select в оболочку
	function sendShellValue(e) {
		const currentSelect = e.target.closest('.selectCustom');
		const selectId = currentSelect.getAttribute('id');
		const currentValue = e.target.value;

		shellTrigger(currentValue, selectId);
		shellActiveItem(currentValue, selectId);
	}

	//Установка слушателей на оболочку при фокусировке и закрытие списка при потере фокуса
	function focusBlur() {
		for (let index = 0; index < selectCustom.length; index++) {
			let selectDefault = selectCustom[index].querySelector('select');
			let trigger = selectCustom[index].querySelector('.selectShell__trigger');

			selectDefault.onfocus = function () {
				selectDefault.addEventListener('keydown', keyboardNavigationSelect(trigger));
				selectDefault.addEventListener('keyup', sendShellValue);
			};

			selectDefault.onblur = function (e) {
				trigger.classList.remove('_active');
			};
		}
	}

	//Выбор элемента и закрытие списка оболочки
	function changeCustomItem(e) {
		if (e.target.closest('.select__item')) {
			const parent = e.target.closest('.selectCustom');
			const selectId = parent.getAttribute('id');
			const shellListItems = parent.querySelectorAll('.select__item');
			const trigger = parent.querySelector('.selectShell__trigger');
			const currentItem = e.target.closest('.select__item');
			const dataItem = currentItem.getAttribute('data-value');

			shellTrigger(dataItem, selectId);

			if (!currentItem.classList.contains('_active')) {
				for (let i = 0; i < shellListItems.length; i++) {
					shellListItems[i].classList.remove('_active');
				}
				currentItem.classList.add('_active');
				trigger.classList.remove('_active');
			} else {
				trigger.classList.remove('_active');
				return;
			}
		}
	}

	//Использование мыши
	function mouseNavigationSelect(e) {
		if (e.target.closest('.selectCustom')) {
			const currentSelect = e.target.closest('.selectCustom');
			const trigger = currentSelect.querySelector('.selectShell__trigger');

			//открытие и закрытие меню нажатием на trigger
			if (e.target.closest('.selectShell__trigger')) {
				trigger.classList.toggle('_active');
			}
			//закрытие меню при нажатии вне его
			if (!e.target.closest('.selectShell') && trigger.classList.contains('_active')) {
				trigger.classList.remove('_active');
			}

			changeCustomItem(e);
		}
	}

	//Использование клавиатуры
	function keyboardNavigationSelect(trigger) {
		//Конструкция замыкания, чтобы передать параметр и событие одновременно
		return function (e) {
			//press Enter
			if (e.keyCode === 13) {
				e.preventDefault();
				trigger.classList.toggle('_active');
			}
			//press Space
			if (e.keyCode === 32) {
				e.preventDefault();
				trigger.classList.add('_active');
			}
			// press ESC
			if (e.keyCode === 27) {
				e.preventDefault();
				trigger.classList.remove('_active');
			}
		}
	}
}
