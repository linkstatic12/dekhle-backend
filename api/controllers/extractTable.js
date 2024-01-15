const fs = require('fs');
const pdf = require('pdf-parser');
const path = require("path");


exports.extractData = async (req, res) => {
    var dir =  path.join(__dirname, '..', '..','upload','101909279830560664039', 'test.pdf');
    console.log(dir);
    const pdfData = await pdf.parse(dir);
    console.log(pdfData);
    const tables = pdfData.tables;
    console.log(tables);
    const assets = tables[0].data[0];
    const liabilities = tables[0].data[1];
    const equity = tables[0].data[2];
    const revenue = tables[1].data[0];
    const expenses = tables[1].data[1];
    const profitAfterTax = tables[1].data[2];
  
    console.log(`
      Assets: ${assets}
      Liabilities: ${liabilities}
      Equity: ${equity}
      Revenue: ${revenue}
      Expenses: ${expenses}
      Profit After Tax: ${profitAfterTax}
    `);
res.status(200).json({message:"",success:true});

}
