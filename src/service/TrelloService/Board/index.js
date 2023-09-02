class Board {
  constructor(connection) {
    this.connection = connection;
  }

  async getBoard(id) {
    return this.connection.FetchTrelloConnection({
      url: `boards/${id}?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async updateBoard(id, params = {}) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return this.connection.FetchTrelloConnection({
      url: `boards/${id}?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}&${query}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async deleteBoard(id) {
    return this.connection.FetchTrelloConnection({
      url: `boards/${id}?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getListsOnBoard(id) {
    return this.connection.FetchTrelloConnection({
      url: `boards/${id}/lists?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async createListsOnBoard(id, params = {}) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return this.connection.FetchTrelloConnection({
      url: `boards/${id}/lists?key=${process.env.CHAVE_API}&token=${process.env.TOKEN_DE_ACESSO}&${query}`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
  }
}

module.exports = Board;
