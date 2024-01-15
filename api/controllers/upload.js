const RecursiveCharacterTextSplitter = require("langchain/text_splitter")
const OpenAIEmbeddings  = require('langchain/embeddings/openai')
const PineconeStore  = require('langchain/vectorstores/pinecone')
const DirectoryLoader = require('langchain/document_loaders/fs/directory')
const upload = require("../../middlewares/upload")
const Index = require('../models/indexesModel')
const FileModel = require("../models/fileModel")
const fs = require('fs');
const pdf = require('pdf-parse');
const Document = require('langchain/document');
const filePath = 'upload';
const path = require("path");
const makeChain = require("../../utils/makechain")
const multipleUpload = async (req, res) => {
  try {
     let id = req.query.id;
    const indexes = await Index.find({googleID:id});
    if(!indexes)
        res.status(400).json({message:"You are missing your Google ID"});
   
    await upload(req, res);
     const filePath = 'upload/'+id;
   

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    let indexFileData = [];  
    var dir =  path.join(__dirname, '..', '..','upload', req.query.id);
   
    var allPromises = [];
    var allSources = [];
    req.files.forEach(element => {
     
      let fileEntry = new FileModel({
        googleID: id,
        fileSavedName: element.filename,
        fileOriginalName: element.originalname,
        mimetype: element.mimetype
      });
      let FileEntrySaved = FileModel.create(fileEntry);
      allSources.push(dir+"/"+element.filename);
      indexFileData.push({originalName:element.originalname,savedName:element.filename});
      let dataBuffer = fs.readFileSync(dir+"/"+element.filename);
      if(element.mimetype=='application/pdf')
      { 
        var requests = pdf(dataBuffer);
        allPromises.push(requests);
      }
      
    });
      let rawDocs =[];
      Promise.all(allPromises).then(async (values) => {
        let counter =0;
        values.forEach(element => {
      
          var doc = new Document.Document({
            pageContent:element.text,
            metadata:{
              source: allSources[counter],
              pdf_numpages: element.numpages
            }
           });
           counter ++;
           rawDocs.push(doc);
        });
        const textSplitter = new RecursiveCharacterTextSplitter.RecursiveCharacterTextSplitter({
          chunkSize: 1000,
          chunkOverlap: 200,
        });
    
        const docs = await textSplitter.splitDocuments(rawDocs);
       
        const embeddings = new OpenAIEmbeddings.OpenAIEmbeddings();
        
        const index = client.Index("docanswers"); //change to your own index name
        
        //embed the PDF documents
        await PineconeStore.PineconeStore.fromDocuments(docs, embeddings, {
          pineconeIndex: index,
          namespace: req.query.id,
          textKey: 'text',
        });
       
      console.log(docs);
         /* create vectorstore*/
    const vectorStore = await PineconeStore.PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings.OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: req.query.id, //namespace comes from your config folder
      },
    );
    
    console.log(vectorStore);
let question = "Summarize all the documents";
    //create chain
    const chain = makeChain.makeChain(vectorStore);
    //Ask a question using chat history
    const response = await chain.call({
      question: "Summarize the text",
      chat_history:  [],
    });

    console.log('Response', response);
        return res.send(`Files has been uploaded.`);
      });

     Index.updateOne(
      { googleID: id }, 
      { $addToSet: { "files": indexFileData } },function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    });
    
    
 
    
    //  const directoryLoader = new DirectoryLoader.DirectoryLoader(filePath, {'.pdf': (path) => new CustomPDFLoader.CustomPDFLoader(path)   });
    // console.log(directoryLoader);
   
    // const rawDocs = await directoryLoader.load();
    
    /* Split text into chunks */
   
  } catch (error) {
    
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};