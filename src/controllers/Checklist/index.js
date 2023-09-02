const TrelloService = require("../../service/TrelloService");

class ChecklistController {
  async createCheckItemInCheckList(request, response) {
    const { id } = request.params;
    const data = request.body;

    const trelloService = new TrelloService();

    const checkItemsOfCheckList = await trelloService
      .Checklist()
      .createCheckItemInCheckList(id, data);

    return response.json(checkItemsOfCheckList);
  }
}

module.exports = ChecklistController;
