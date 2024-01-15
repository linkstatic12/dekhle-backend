const fs = require('fs');
const pdf = require('pdf-parser');
const path = require("path");
const sanitize = require('mongo-sanitize');
const MidProcessedVariables = require("../../api/models/midProcessedVariables");
const companies = require("../../api/models/companyModel");
const tablelog = require("../../api/models/tablelog");
const MainDir = "F://lastest_company_PDFs"
exports.getCompanyValues = async (req, res) => {
    
    const { uniqueId } = req.params;
    console.log("UNIQUE",uniqueId)
    //const variables = await MidProcessedVariables.find({symbol: sanitize(req.params.uniqueId),});  
    let years1 = []
    const getUniqueDates = MidProcessedVariables.find({symbol: sanitize(req.params.uniqueId)}).distinct('date', function(error, AllDate) {
        for(yr in AllDate){
            
            years1.push(new Date(AllDate[yr]).getFullYear());
        }
        years1 = new Set(years1);
        years1 = [...years1];
        years1= years1.slice(-10);
        console.log(years1)
    const company = companies.find({Symbol:sanitize(req.params.uniqueId)},function(err,data){
            res.status(200).json({message:"All ok",success:true,company:data,years:years1,});


    });
    
    });
  
   
    

}
exports.getAllSymbols = async (req, res) => {
    
    const symbols = await companies.find().select('Symbol');
    count = 0
    symbolsCleaned = []
    for(sym in symbols){
        symbolsCleaned.push({id:count,name:symbols[sym].Symbol});
        count = count + 1;
    }
    
    res.status(200).json({message:"All ok",success:true,symbols:symbolsCleaned});

}

exports.getAnnualQuarterly = async(req,res)=>{
    const { uniqueId, year } = req.params;
   
    const getUniqueDates = await MidProcessedVariables.find({symbol: sanitize(req.params.uniqueId),
                                                                     date:{ $gte: new Date(year, 1, 1), 
                                                                        $lt: new Date(year, 12, 1)}}, function(error, AllDate) {
                                                                            
                                                                            res.status(200).json({message:"All ok",success:true,symbols:AllDate});
                                                                        });
    
}

exports.getWidthHeight = async(req,res)=>{
const {file_path,page} = req.params;
file_path = MainDir+file_path;
const getWidthHeight = await tablelog.findOne({symbols:file_path,Page:page});
res.status(200).json({message:"All ok",success:true,width:getWidthHeight.width,height:getWidthHeight.height}); 


}
