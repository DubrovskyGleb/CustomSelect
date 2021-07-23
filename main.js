const selectCustom = document.querySelectorAll('.selectCustom');

if (selectCustom.length > 0) {

	selectTrigger();

	function selectTrigger(dataItem, selectId) {
		//Выставляет выбранное значение для всех select
		if (arguments.length === 0) {

			for (let index = 0; index < selectCustom.length; index++) {
				const currentSelect = selectCustom[index];
				const selected = currentSelect.getAttribute('data-selected');

				changeTriggerContent(currentSelect, selected);
				changeSelectDefaultValue(currentSelect, selected);
			}
		}
		//Выставляет выбранное значение для конкретного select
		if (arguments.length > 0) {
			const currentSelect = document.getElementById(selectId);
			const selected = dataItem;

			changeTriggerContent(currentSelect, selected)
			changeSelectDefaultValue(currentSelect, selected);
		}
	}

	//Передача значения в selectDefault
	function changeSelectDefaultValue(currentSelect, selected) {
		const selectDefaultArr = currentSelect.querySelectorAll('option');

		for (let i = 0; i < selectDefaultArr.length; i++) {
			let optionValue = selectDefaultArr[i].getAttribute('value');

			if (optionValue === selected) {
				selectDefaultArr[i].selected = true;
			}
		}
	}

	//Вставка контента в trigger
	function changeTriggerContent(currentSelect, selected) {
		const triggerImage = currentSelect.querySelector('.trigger__image');
		const triggerText = currentSelect.querySelector('.trigger__text');

		triggerImage.src = `img/${selected}.png`;
		triggerText.innerHTML = selected;
	}

	const selectCustomArr = document.querySelectorAll('.selectCustom');

	for (let index = 0; index < selectCustomArr.length; index++) {
		let selectDefault = selectCustomArr[index].querySelector('.selectDefault');
		let trigger = selectCustomArr[index].querySelector('.select__trigger');

		selectDefault.onfocus = function () {
			selectDefault.addEventListener('keydown', keyboardNavigationSelect(trigger));
			selectDefault.addEventListener('keyup', changeMenuElem);
		};

		selectDefault.onblur = function (e) {
			trigger.classList.remove('_active');
		};
	}

	document.addEventListener('click', customSelect);

	function customSelect(e) {
		if (e.target.closest('.selectCustom')) {
			const currentSelect = e.target.closest('.selectCustom');
			const trigger = currentSelect.querySelector('.select__trigger');

			mouseNavigationSelect(e);

			function mouseNavigationSelect(e) {
				//открытие и закрытие меню нажатием на trigger
				if (e.target.closest('.select__trigger')) {
					trigger.classList.toggle('_active');
				}
				//закрытие меню при нажатии вне его
				if (!e.target.closest('.select') && trigger.classList.contains('_active')) {
					trigger.classList.remove('_active');
				}

				changeCustomItem(e);
			};
		}
	}

	function selectCustomItem(currentValue, selectId) {
		const currentSelect = document.getElementById(selectId);
		const selectCustomItems = currentSelect.querySelectorAll('.select__item');

		for (let i = 0; i < selectCustomItems.length; i++) {
			selectCustomItems[i].classList.remove('_active');
			let listItemData = selectCustomItems[i].getAttribute('data-value');
			if (currentValue == listItemData) {
				selectCustomItems[i].classList.add('_active');
			}
		}

	}

	//передача значения в selectCustom
	function changeMenuElem(e) {
		const currentSelect = e.target.closest('.selectCustom');
		const selectId = currentSelect.getAttribute('id');
		const currentValue = e.target.value;

		selectTrigger(currentValue, selectId);
		selectCustomItem(currentValue, selectId);
	}

	function changeCustomItem(e) {
		if (e.target.closest('.select__item')) {
			const parent = e.target.closest('.selectCustom');
			const selectId = parent.getAttribute('id');
			const selectCustomItems = parent.querySelectorAll('.select__item');
			const trigger = parent.querySelector('.select__trigger');
			const currentItem = e.target.closest('.select__item');
			const dataItem = currentItem.getAttribute('data-value');

			selectTrigger(dataItem, selectId);

			if (!currentItem.classList.contains('_active')) {
				for (let i = 0; i < selectCustomItems.length; i++) {
					selectCustomItems[i].classList.remove('_active');
				}
				currentItem.classList.add('_active');
				trigger.classList.remove('_active');
			} else {
				trigger.classList.remove('_active');
				return;
			}
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
