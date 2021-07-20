const trigger = document.querySelector('.select__trigger');
const selectCustomItems = document.querySelectorAll('.select__item');
const triggerImage = document.querySelector('.trigger__image');
const triggerText = document.querySelector('.trigger__text');
const selectDefault = document.querySelector('.selectDefault');
const selectDefaultItems = document.querySelectorAll('.selectDefault__option');
const selectCustom = document.querySelector('.select');
let selectLang = "ru";

document.addEventListener('click', mouseNavigationSelect);

selectDefault.onfocus = function () {
	selectDefault.addEventListener('keydown', keyboardNavigationSelect);
};

selectTrigger(selectLang);

//Использование мыши
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

function changeCustomItem(e) {
	if (e.target.closest('.select__item')) {
		let parentItem = e.target.closest('.select__item');
		let dataItem = parentItem.getAttribute('data-value');

		selectTrigger(dataItem);

		if (!parentItem.classList.contains('_active')) {
			for (let i = 0; i < selectCustomItems.length; i++) {
				selectCustomItems[i].classList.remove('_active');
			}
			parentItem.classList.add('_active');
			trigger.classList.remove('_active');
		} else {
			trigger.classList.remove('_active');
			return;
		}
	}
}

//в кнопку подставляет нужный язык
function selectTrigger(selectLang) {
	triggerImage.src = `img/${selectLang}.png`;
	triggerText.innerHTML = selectLang;

	//цикл для передачи значения в selectDefault
	for (let i = 0; i < selectDefaultItems.length; i++) {
		let optionValue = selectDefaultItems[i].getAttribute('value');

		if (optionValue === selectLang) {
			selectDefaultItems[i].selected = true;
		}
	}
};

function selectCustomItem(currentValue) {

	for (let i = 0; i < selectCustomItems.length; i++) {
		selectCustomItems[i].classList.remove('_active');
		let listItemData = selectCustomItems[i].getAttribute('data-value');
		if (currentValue == listItemData) {
			selectCustomItems[i].classList.add('_active');
		}
	}

}

function changeMenuElem(e) {

	let currentValue = e.target.value;

	selectTrigger(currentValue);

	selectCustomItem(currentValue);
}

//Использование клавиатуры
function keyboardNavigationSelect(e) {

	selectDefault.addEventListener('keyup', changeMenuElem);

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
