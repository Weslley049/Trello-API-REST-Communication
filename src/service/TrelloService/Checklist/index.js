class Checklist {
  constructor(connection) {
    this.connection = connection;
  }

  async createCheckItemInCheckList(id, params = {}) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return this.connection.FetchTrelloConnection({
      url: `checklists/${id}/checkItems?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}&${query}`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
  }
}
module.exports = Checklist;
