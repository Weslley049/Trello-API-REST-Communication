const express = require("express");

const routes = express.Router();

//Controllers
const BoardController = require("../controllers/Board");
const CardController = require("../controllers/Card");
const ChecklistController = require("../controllers/Checklist");
const ListController = require("../controllers/List");

const boardController = new BoardController();
const cardController = new CardController();
const listController = new ListController();
const checklistController = new ChecklistController();

const resource = "trello";

//Boards
routes.get(`/${resource}/board/:id`, boardController.getBoard);
routes.get(`/${resource}/board/lists/:id`, boardController.getListsOfBoard);
routes.post(`/${resource}/board/:id/lists`, boardController.createListsOnBoard);

//Lists
routes.get(`/${resource}/lists/:id/cards`, listController.getCardsOfList);

//Cards

routes.get(`/${resource}/card/:id`, cardController.get);

routes.post(`/${resource}/cards/xlsx`, cardController.createCardsOfXlsx);
routes.post(`/${resource}/cards/:listId`, cardController.createCardOnList);
routes.post(
  `/${resource}/cards/:id/checklist`,
  cardController.createCheckListOnCard
);

//Checklist
routes.post(
  `/${resource}/checklist/:id/checkItem`,
  checklistController.createCheckItemInCheckList
);

module.exports = routes;
