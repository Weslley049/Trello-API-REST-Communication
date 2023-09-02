const TrelloService = require("../../service/TrelloService");

class BoardController {
  async getBoard(request, response) {
    const { id } = request.params;

    const trelloService = new TrelloService();

    const board = await trelloService.Board().getBoard(id);

    return response.json(board);
  }

  // async updateBoard(request, response) {
  //   const { id } = request.params;
  //   const params = request.body;

  //   const trelloService = new TrelloService();

  //   const board = await trelloService.Board().updateBoard(id, params);

  //   return response.json(board);
  // }

  // async deleteBoard(request, response) {
  //   const { id } = request.params;

  //   const trelloService = new TrelloService();

  //   const board = await trelloService.Board().updateBoard(id, params);

  //   return response.json(board);
  // }

  async getListsOfBoard(request, response) {
    const { id } = request.params;

    const trelloService = new TrelloService();

    const ListsofBoard = await trelloService.Board().getListsOnBoard(id);

    return response.json(ListsofBoard);
  }

  async createListsOnBoard(request, response) {
    const { id } = request.params;
    const params = request.body;

    const trelloService = new TrelloService();

    const ListsofBoard = await trelloService
      .Board()
      .createListsOnBoard(id, params);

    return response.json(ListsofBoard);
  }
}

module.exports = BoardController;
