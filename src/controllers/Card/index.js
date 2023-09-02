const TrelloService = require("../../service/TrelloService");
const fs = require("fs");
const Multiparty = require("multiparty");

class CardController {
  async get(request, response) {
    const { id } = request.params;
    const data = request.query;

    const trelloService = new TrelloService();

    const card = await trelloService.Card().getCard(id, data);

    return response.json(card);
  }

  async createCardOnList(request, response) {
    const { listId } = request.params;
    const data = request.body;

    const trelloService = new TrelloService();

    const CardCreated = await trelloService
      .Card()
      .createCardOnList(listId, data);

    return response.json(CardCreated);
  }

  async createCardsOfXlsx(request, response) {
    const form = new Multiparty.Form();

    form.parse(request, async (err, fields, files) => {
      if (err) return response.status(500).send();

      const odsPath = files.template[0].path;

      const odsData = fs.readFileSync(odsPath);

      fs.writeFileSync("./.tmp/arquivo.ods", odsData);

      const trelloService = new TrelloService();

      await trelloService.Card().createCardsWithXlsx("arquivo.ods");

      return response.status(200).send();
    });
  }

  async createCheckListOnCard(request, response) {
    const { id } = request.params;
    const data = request.body;

    const trelloService = new TrelloService();

    const checkListCreated = await trelloService
      .Card()
      .createCheckList(id, data);

    return response.json(checkListCreated);
  }

  async addCardTres(request, response) {
    try {
      return response.json(board);
    } catch (err) {}
  }
}

module.exports = CardController;
