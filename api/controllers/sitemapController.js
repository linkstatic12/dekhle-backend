const sitemap = require("../models/sitemap");
const sanitize = require('mongo-sanitize');
const Crawler = require('crawler');
const puppeteer = require('puppeteer');
exports.create_new_url = async (req, res) => {
const url = req.query;
console.log(url);
let newTask = new sitemap(url);
console.log(newTask);
await newTask.save((err, task) => {
     
    if (err) {
        res.status(400).json({
          success: false,
          message: "Couldn't find user",
          data: err,
        });
      }

      res.status(200).json({
        success: true,
        message: "saved",
        data: err,
      });
});

}


exports.runsinglePageForSanaSafinaz = function (){


  
}


async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: false,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}



exports.runSpiderSanaSafinaz = async (req, res) => {
  const jsdom = require('jsdom');
  const spider= req.query.site;

  startBrowser();
  await sitemap.find({}, function (err, docs) {
if(err) 
res.status(400).json({
  success: false,
  message: "Something went wrong",
  data: err,
});

console.log("TEST");
res.status(200).json({
  success: false,
  message: "Success",
  data: docs,
});


  });
  


}