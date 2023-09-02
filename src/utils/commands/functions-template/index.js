module.exports = {
  createFunctionServiceTemplate(params) {
    const { functionName, haveParams } = params;

    return `\n
        async ${functionName} (id, ${haveParams ? "params = {}" : ""}) {   

        }
        
     `;
  },

  createFunctionControllerTemplate(params) {
    const { functionName } = params;

    return `\n
        async ${functionName} (request, response) {   
            try {

                return response.json(board);
            }catch(err){
                
            }

        }
    
 `;
  },
};
