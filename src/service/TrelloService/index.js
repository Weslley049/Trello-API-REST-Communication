const trelloConnection = require("../../utils/trelloConnection");

const Board = require("./Board");
const List = require("./List");
const Card = require("./Card");
const Checklist = require("./Checklist");

class TrelloService {
  constructor() {
    this.connection = trelloConnection;
  }

  Board() {
    return new Board(this.connection);
  }

  List() {
    return new List(this.connection);
  }

  Card() {
    return new Card(this.connection);
  }

  Checklist() {
    return new Checklist(this.connection);
  }
}

module.exports = TrelloService;
