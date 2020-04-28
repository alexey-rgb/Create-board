'use strict';

// кнопка запуска приложения

const wrapperFutureBoardsList = document.querySelector('.main');

const appStarter = document.querySelector('.main__button-beginning');

const boardMaker = document.querySelector('.board-maker');

const controllersClosingBoardMaker = boardMaker.querySelectorAll('#board-maker__close');

const newBoardButton = boardMaker.querySelector('#board-maker__starter');

const newBoardTemplate = document.querySelector('#new-board-template').content;

const eventClick = 'click';

const inputBoardName = boardMaker.querySelector('#board-name');

let addRemoveElement = (node) => node.classList.toggle('visually-hidden');

 let startAppClickHandler = () => addRemoveElement(appStarter)
 && addRemoveElement(boardMaker);

 let HandlerData = function (node, event, handlerFunction) {
    this.node = node;
    this.event = event;
    this.handlerFunction = handlerFunction;
}

HandlerData.prototype.addRemoveEvent = function (flag) {
    return flag ? this.node.addEventListener(this.event, this.handlerFunction)
      : this.node.removeEventListener(this.event, this.handlerFunction)
};

let appStarterHandlerData = new HandlerData(appStarter, eventClick, startAppClickHandler);

function backToStartCondition (node1, node2) {
  addRemoveElement(node1);
  addRemoveElement(node2);
  appStarterHandlerData.addRemoveEvent();
  inputBoardName.value = '';
}

function boardMakerClickHandler () {
  controllersClosingBoardMaker.forEach(buttonClose => event.target === buttonClose
    ? backToStartCondition(boardMaker, appStarter) : false
 )}

function mouselog(event) {
  appStarterHandlerData.addRemoveEvent(true);
}

function newBoardButtonClickHandler () {
  appStarterHandlerData.addRemoveEvent();
  const inputBoardName = boardMaker.querySelector('#board-name');
  let newBoard = newBoardTemplate.cloneNode(true);
  newBoard.querySelector('#current-board-button-preview').textContent = inputBoardName.value;
  wrapperFutureBoardsList.appendChild(newBoard);
  backToStartCondition(boardMaker, appStarter);
  inputBoardName.value = '';
  }

boardMaker.addEventListener('click', boardMakerClickHandler);

newBoardButton.addEventListener('click', newBoardButtonClickHandler);
