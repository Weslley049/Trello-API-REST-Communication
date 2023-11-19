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


  async editCard (request, response) {   
    try {
        const { id }  = request.params;
        const data = request.query;
     
        const trelloService = new TrelloService();
  
        const cardUpdate = await trelloService.Card().editCard(id, data);
    
        return response.json(cardUpdate);
    } catch(err){
        return response.status(500).send(err);      
    }

  }
    
  async deleteCard (request, response) {   
     try {
        const { id }  = request.params;
        
        const trelloService = new TrelloService();
  
        const deletedCard = await trelloService.Card().deleteCard(id);
    
        return response.json(deletedCard);

     
    }catch(err){
      return response.status(500).send(err); 
    }
  }
    


  async createAttachment (request, response) {   
   
    try {
      const form = new Multiparty.Form();

      form.parse(request, async (err, fields, files) => {
        if (err) return response.status(500).send();
  
        const id = fields.id[0];
        const name = fields.name[0];
        const odsPath = files.file[0].path;

   
        const trelloService = new TrelloService();

        const img = Buffer.from(odsPath, 'binary')
    
        const attachment = await trelloService.Card().createAttachment(id, {
          name,
          file: img
        });

        return response.status(200).send();
      });
    
    }catch(err){
      return response.status(500).json(err);            
    }

  }
    
 }

module.exports = CardController;
