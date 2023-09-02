class List {
  constructor(connection) {
    this.connection = connection;
  }

  async getCardsOfList(id) {
    return this.connection.FetchTrelloConnection({
      url: `lists/${id}/cards?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }
}

module.exports = List;
