module.exports = {
  createCrudControllerTemplate(templateName) {
    const crud = `const TrelloService = require('../../service/TrelloService');

class ${templateName}Controller {

    

}

module.exports = ${templateName}Controller
`;

    return crud;
  },

  createServiceTemplate(templateName) {
    const crud = `class ${templateName} {
        constructor(connection) {
          this.connection = connection;
        }
      
      }
      module.exports = ${templateName};
    `;

    return crud;
  },
};
