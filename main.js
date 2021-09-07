const selectCustom = document.querySelectorAll('.selectCustom');

let attr = selectCustom[0].attributes;

let arr = {
	selectLangFirst: {
		selected: 'cn',
		shellList: {
			class: "select__list",
			"data-value": "1"
		},
		shellItem: {
			class: "select__item"
		},
		text: {
			tag: 'span',
			class: 'select__text',
			migration: true
		},
		image: {
			class: 'select__image',
			migration: true
		},
		icon: {
			// class: "icon-ok",
			migration: true
		}
	},

	selectLangSecond: {
		selected: 'ru',
		shellList: {
			class: "select__list"
		},
		text: {
			tag: 'span',
			class: 'select__text',
			migration: true
		},
		image: {
			class: 'select__image',
			migration: true
		},
		icon: {
			class: "icon-ok",
			migration: false
		},
		triggerChevron: {
			class: "icon-down-open"
		}
	}
};

if (selectCustom.length > 0) {

	createShellSelect();

	//Создание оболочки
	function createShellSelect() {
		for (let index = 0; index < selectCustom.length; index++) {
			let base = '';

			base += `<div class="selectShell">`;
			base += createShellTrigger(selectCustom[index]);
			base += createShellList(selectCustom[index]);
			base += `</div>`;

			selectCustom[index].insertAdjacentHTML('beforeEnd', base);
		}

	}

	//Создание открывающего тега и наполнение его атрибутами
	function createTag(selectPattern, shellList, tagName) {
		let tag = '';

		tag += `<${tagName}`;

		if (selectPattern[shellList]) {
			for (let key in selectPattern[shellList]) {
				tag += ` ${key}="${selectPattern.shellList[key]}"`;
			}
		}

		tag += `>`;

		return tag;
	}

	//Создание листа оболочки
	function createShellList(currentSelect) {
		let shellList = '';
		const options = currentSelect.querySelectorAll('option');
		const selectId = currentSelect.getAttribute('id');
		const selectPattern = arr[selectId];
		const ul = "ul";
		const value = 'shellList';

		shellList += createTag(selectPattern, value, ul);

		for (let index = 0; index < options.length; index++) {
			const currentOption = options[index];
			const optionText = currentOption.textContent;
			const optionValue = currentOption.value;
			const optionImg = currentOption.getAttribute('data-img');
			const optionIcon = currentOption.getAttribute('data-icon');

			shellList += `<li data-value="${optionValue}" class="select__item">`;

			for (let key in selectPattern) {
				const patternValue = selectPattern[key];
				if (key === "text") {
					const keyValue = patternValue.tag;

					shellList += `<${keyValue}`;

					if (patternValue.class) {
						shellList += ` class="${patternValue.class}"`;
					}

					shellList += `>`;
					shellList += `${optionText}`;
					shellList += `</${keyValue}>`;
				}

				if (key === "image") {
					shellList += `<img`;

					if (patternValue.class) {
						shellList += ` class="${patternValue.class}"`;
					}

					shellList += ` src="${optionImg}"`;
					shellList += ` alt="shellItemImg">`;
				}

				if (key === "icon") {
					shellList += `<i`;

					if (patternValue.class) {
						shellList += ` class="${patternValue.class}"`;
					} else {
						if (currentOption.hasAttribute('data-icon')) {
							shellList += ` class="${currentOption.getAttribute('data-icon')}"`;
						}
					}

					shellList += `>`;
					shellList += `</i>`;
				}
			}

			shellList += `</li>`;
		}

		shellList += `</ul>`;

		return shellList;
	}

	//Создание триггера оболочки
	function createShellTrigger(currentSelect) {
		let shellTrigger = '';
		const selectId = currentSelect.getAttribute('id');
		const selectPattern = arr[selectId];

		shellTrigger += `<div class="selectShell__trigger">`;

		for (let key in selectPattern) {
			const patternValue = selectPattern[key];

			if (key === "text" && patternValue.migration === true) {
				const keyValue = patternValue.tag;

				shellTrigger += `<${keyValue}`;

				if (patternValue.class) {
					shellTrigger += ` class="${patternValue.class} trigger__text"`;
				} else {
					shellTrigger += ` class="trigger__text"`;
				}

				shellTrigger += `>`;
				shellTrigger += `</${keyValue}>`;
			}

			if (key === "image" && patternValue.migration === true) {
				shellTrigger += `<img`;

				if (patternValue.class) {
					shellTrigger += ` class="${patternValue.class} trigger__image"`;
				} else {
					shellTrigger += ` class="trigger__image"`;
				}

				shellTrigger += ` alt="shellItemImg">`;
			}

			if (key === "icon" && patternValue.migration === true) {
				shellTrigger += `<i`;

				if (patternValue.class) {
					shellTrigger += ` class="${patternValue.class}"`;
				} else {
					const selected = selectPattern.selected;
					const currentOption = currentSelect.querySelector('option[value="' + selected + '"]');
					shellTrigger += ` class="${currentOption.getAttribute('data-icon')}"`;
				}

				shellTrigger += `>`;
				shellTrigger += `</i>`;
			}

			if (key === "triggerChevron") {
				shellTrigger += `<i`;
				shellTrigger += ` class="${patternValue.class}"`;
				shellTrigger += `>`;
				shellTrigger += `</i>`;
			}
		}

		shellTrigger += `</div>`;

		return shellTrigger;
	}

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
				const selectPattern = arr[selectId];
				const selected = selectPattern.selected;

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
		const currentOption = currentSelect.querySelector('option[value="' + selected + '"]');
		const optionSrc = currentOption.getAttribute('data-img');
		const optionText = currentOption.textContent;
		const triggerImage = currentSelect.querySelector('.trigger__image');
		const triggerText = currentSelect.querySelector('.trigger__text');

		triggerImage.src = optionSrc;
		triggerText.innerHTML = optionText;
	}

	//Определение активного элемента списка в оболочке
	function shellActiveItem(currentValue, selectId) {
		const currentSelect = document.getElementById(selectId);
		const shellList = currentSelect.querySelectorAll('.select__item');

		for (let i = 0; i < shellList.length; i++) {
			shellList[i].classList.remove('_active');
			let listItemData = shellList[i].getAttribute('data-value');
			if (currentValue == listItemData) {
				shellList[i].classList.add('_active');
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
			const shellList = parent.querySelectorAll('.select__item');
			const trigger = parent.querySelector('.selectShell__trigger');
			const currentItem = e.target.closest('.select__item');
			const dataItem = currentItem.getAttribute('data-value');

			shellTrigger(dataItem, selectId);

			if (!currentItem.classList.contains('_active')) {
				for (let i = 0; i < shellList.length; i++) {
					shellList[i].classList.remove('_active');
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
