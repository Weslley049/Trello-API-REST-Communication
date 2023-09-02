const xlsx = require('xlsx');
const {resolve} = require('path');

const basePath = resolve(__dirname + '..', '..','..','..', '.tmp');

class Excel {
    constructor(){
        this.reader = xlsx
    }

    async readXlsx(path){
    
        const file = this.reader.readFile(`${basePath}/${path}`)
  
        let data = []
     
             
        const sheets = file.SheetNames
        
        for(let i = 0; i < sheets.length; i++)
        {
        const temp = this.reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
        }
        
        // Printing data
        return data;
           
    }


}

module.exports = Excel