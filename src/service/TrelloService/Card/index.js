const ExcelUtil = require("../../../utils/Excel");

const Checklist = require("../Checklist");

class Card {
  constructor(connection) {
    this.connection = connection;
  }

  async getCard(id, params = {}) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return this.connection.FetchTrelloConnection({
      url: `cards/{id}?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}&${query}`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async createCardOnList(listId, params = {}) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return this.connection.FetchTrelloConnection({
      url: `cards?idList=${listId}&key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}&${query}`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async createCardsWithXlsx(xlsxPath) {
    const excelUtil = new ExcelUtil();
    const checkList = new Checklist(this.connection);

    const data = await excelUtil.readXlsx(xlsxPath);

    const result = data.reduce((acc, cur) => {
      const key1 = `${cur.name}:${cur.desc}`;
      const key2 = cur.checklist;
      acc[key1] = acc[key1] || {
        name: cur.name,
        desc: cur.desc,
        ...(key2 ? { checklist: {} } : {}),
      };

      if (key2) {
        acc[key1].checklist[key2] = acc[key1].checklist[key2] || {
          checklist: cur.checklist,
          checklistItems: [],
        };
        acc[key1].checklist[key2].checklistItems.push(cur.checklistItem);
      }

      return acc;
    }, {});

    for (let currentCard of Object.values(result)) {
      const { name, desc, checklist } = currentCard;

      const CardCreated = await this.createCardOnList(
        "64298035f55d5655be926180",
        {
          name,
          desc,
        }
      );

      if (checklist) {
        for (const currentCheckList of Object.values(checklist)) {
          const { checklist: checkListName, checklistItems } = currentCheckList;

          const checklistCreated = await this.createCheckList(CardCreated.id, {
            name: checkListName,
          });

          if (checklistItems.length) {
            for (const currentCheckListItem of checklistItems) {
              await checkList.createCheckItemInCheckList(checklistCreated.id, {
                name: currentCheckListItem,
              });
            }
          }
        }
      }
    }
  }

  async createCheckList(cardId, params = {}) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return this.connection.FetchTrelloConnection({
      url: `cards/${cardId}/checklists?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}&${query}`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async addCardTres(id) {}
}

module.exports = Card;
