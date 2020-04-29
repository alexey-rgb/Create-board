'use strict';

// Основной контейнер

const wrapperFutureBoardsList = document.querySelector('.main');

// Кнопка запуска приложения

const appStarter = document.querySelector('.main__button-beginning');

// окно создания новой доски

const boardMaker = document.querySelector('.board-maker');

// кнопки закрытия окна, в котором происходит создание новой доски

const controllersClosingBoardMaker = boardMaker.querySelectorAll('#board-maker__close');

// по клику по кнопке происходит рендер новой доски. Название кнопки 'CREATE'

const newBoardButton = boardMaker.querySelector('#board-maker__starter');

// шаблон новой доски

const newBoardTemplate = document.querySelector('#new-board-template').content;

const eventClick = 'click';

// поле ввода имени новой доски

const inputBoardName = boardMaker.querySelector('#board-name');

// скрывает/показывает элемент в зависимости от наличия указанного класса

let addRemoveElement = (node) => node.classList.toggle('visually-hidden');

// позволяет попеременно показывать один из двух блоков
// по необходимости(кнопка старта приложения и окно)
// создания новой доски

let startAppClickHandler = () => addRemoveElement(appStarter)
  && addRemoveElement(boardMaker);

// прототип, на основе которого можно создавать различные события

let HandlerData = function (node, event, handlerFunction) {
  this.node = node;
  this.event = event;
  this.handlerFunction = handlerFunction;
}

// ф-ция прототип, в зависимости от переданного флага, добавляет или снимает обработчик события

HandlerData.prototype.addRemoveEvent = function (flag) {
  return flag ? this.node.addEventListener(this.event, this.handlerFunction)
    : this.node.removeEventListener(this.event, this.handlerFunction)
};

// Новый объект основанный на прототипе, содержит элемент дом, тип события и обработчик
// Необходим, для старта приложения

let appStarterHandlerData = new HandlerData(appStarter, eventClick, startAppClickHandler);

// возвращает приложение к исходному состоянию

function backToStartCondition(node1, node2) {
  // показывает/скрывает необходимые элементы(кнопка старта и окно создания нровой доски)
  addRemoveElement(node1);
  addRemoveElement(node2);
  // снимает все обработчики
  appStarterHandlerData.addRemoveEvent();
  // очищает поле с названием новой доски, которое было заполнено, но доска так и не создана.
  inputBoardName.value = '';
}

// позволяет закрывать окно создания новой доски, при клике на крестик и CANCEL

function boardMakerClickHandler() {
  controllersClosingBoardMaker.forEach(buttonClose => event.target === buttonClose
    ? backToStartCondition(boardMaker, appStarter) : false
  )
}

// Снимает обработчик события на кнопке старта приложения, за счет события onmouseenter,
// благодаря чему кнопка не получает неактивное состояние.

function mouselog(event) {
  appStarterHandlerData.addRemoveEvent(true);
}

/*  function checkInputValue(value) {
   return value === '' ? inputBoardName.setCustomValidity('Введите название для новой доски')
     : newBoard.querySelector('#current-board-button-preview').textContent = value;
 } */

// обработчик для кнопки 'CREATE' - создания новой доски
// 1. вешает новый обработчик на кнопку старта приложения
// 2. получает значение поля ввода(название новой доски) и заполняет эти данные в шаблон
// 3. рендерит новую доску на основе шаблона в основной контейнер
// 4. делает reset поля ввода названия новой доски
function newBoardButtonClickHandler() {
  // 1
  appStarterHandlerData.addRemoveEvent();
  const inputBoardName = boardMaker.querySelector('#board-name');
  let newBoard = newBoardTemplate.cloneNode(true);
  // 2.
  newBoard.querySelector('#current-board-button-preview').textContent = inputBoardName.value;
  // 3.
  wrapperFutureBoardsList.appendChild(newBoard);
  backToStartCondition(boardMaker, appStarter);
  // 4.
  inputBoardName.value = '';
}

boardMaker.addEventListener('click', boardMakerClickHandler);

newBoardButton.addEventListener('click', newBoardButtonClickHandler);
