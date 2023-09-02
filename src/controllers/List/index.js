const TrelloService = require("../../service/TrelloService");

class ListController {
  async getCardsOfList(request, response) {
    const { id } = request.params;

    const trelloService = new TrelloService();

    const cardsOfList = await trelloService.List().getCardsOfList(id);

    return response.json(cardsOfList);
  }
}

module.exports = ListController;
