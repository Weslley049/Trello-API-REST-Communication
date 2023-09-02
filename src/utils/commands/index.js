#!/usr/bin/env node

const path = require("path");

const program = require("commander");
const package = require("../../../package.json");
const {
  createCrudControllerTemplate,
  createServiceTemplate,
} = require("./crud-template");
const {
  createFunctionServiceTemplate,
  createFunctionControllerTemplate,
} = require("./functions-template");
const fs = require("fs");

program.version(package.version);

program
  .command("create-crud [crudname]")
  .description("Criar um arquivo de crud")
  .action((crudname) => {
    const path_controller = path.resolve(
      __dirname,
      "..",
      "..",
      "./controllers"
    );

    const path_service = path.resolve(
      __dirname,
      "..",
      "..",
      "service",
      "TrelloService"
    );

    if (!fs.existsSync(`${path_controller}/${crudname}`)) {
      fs.mkdirSync(`${path_controller}/${crudname}`);
    }

    if (!fs.existsSync(`${path_service}/${crudname}`)) {
      fs.mkdirSync(`${path_service}/${crudname}`);
    }

    const crud = createCrudControllerTemplate(crudname);
    const service = createServiceTemplate(crudname);

    fs.writeFileSync(`${path_controller}/${crudname}/${crudname}.js`, crud, {
      encoding: "utf-8",
    });

    fs.writeFileSync(`${path_service}/${crudname}/${crudname}.js`, service, {
      encoding: "utf-8",
    });
  });

program
  .command("add-function")
  .arguments("<entity> <functionName>")
  .option("--params", "verificar se existe parametros de rota")
  .description("adiciona um novo comando a um arquivo existente")
  .action((entity, functionName, options) => {
    const path_service = path.resolve(
      __dirname,
      "..",
      "..",
      "service",
      "TrelloService"
    );

    const path_controller = path.resolve(
      __dirname,
      "..",
      "..",
      "./controllers"
    );

    const currentServiceFunction = createFunctionServiceTemplate({
      functionName,
      haveParams: options.params,
    });

    const currentControllerFunction = createFunctionControllerTemplate({
      functionName,
    });

    fs.readFile(`${path_service}/${entity}/index.js`, "utf8", (err, data) => {
      if (err) throw err;

      // Procura o índice do module.exports

      const moduleIndex = data.search(/(\})(?=\s*module\.exports)/);

      const novoConteudo =
        data.slice(0, moduleIndex - 1) +
        currentServiceFunction +
        data.slice(moduleIndex);

      fs.writeFile(
        `${path_service}/${entity}/index.js`,
        novoConteudo,
        (err) => {
          if (err) throw err;
          console.log(
            `O novo código foi adicionado com sucesso ao arquivo de service!`
          );
        }
      );
    });

    fs.readFile(
      `${path_controller}/${entity}/index.js`,
      "utf8",
      (err, data) => {
        if (err) throw err;

        // Procura o índice do module.exports

        const moduleIndex = data.search(/(\})(?=\s*module\.exports)/);

        const novoConteudo =
          data.slice(0, moduleIndex - 1) +
          currentControllerFunction +
          data.slice(moduleIndex);

        fs.writeFile(
          `${path_controller}/${entity}/index.js`,
          novoConteudo,
          (err) => {
            if (err) throw err;
            console.log(
              `O novo código foi adicionado com sucesso ao arquivo de controllers!`
            );
          }
        );
      }
    );
  });

program.parse(process.argv);
