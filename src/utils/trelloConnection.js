const fetch = require('node-fetch')


class TrelloConnection {
    static async FetchTrelloConnection({url, method, headers}) {
        return fetch(`${process.env.BASE_TRELLO_URL}/${url}`, {
            method,
            headers
            })
            .then(response => {
                return response.json()
            
            })
            .catch(err => {
                console.error(err) 
            });
    }
}






module.exports = TrelloConnection;

