
const OpenAIEmbeddings  = require('langchain/embeddings/openai')
const PineconeStore  = require('langchain/vectorstores/pinecone')
const makeChain = require("../../utils/makechain")
const OrphanIndexes = require("../../api/models/orphanIndexesModel")
exports.create_indexes = async(req, res)=>{
  const arr = [1, 2, 3, 4, 5];
  console.log(client);
  const list =client.createIndex({
    createRequest: {
      name: newIndex.index,
      dimension: 1536,
      metric: 'cosine'
    },
  });
  arr.forEach(async element => {  
  var rnNum= Math.floor(100000000 + Math.random() * 900000000);
  const newIndex ={
    index: rnNum
  } 
  const record = await OrphanIndexes.findOne({index:newIndex.index});
  if(!record){
console.log(newIndex.index);
   
   console.log(list);
    await OrphanIndexes.create(newIndex);
  }
    
});

res.status(200).json({message:"done",data:"None"});
};


exports.answer_question = async(req, res)=>{

    let id = req.query.id;
    let question = req.query.question;
    console.log("QUESTION");
 const index = client.Index("docanswers"); //change to your own index name


const vectorStore = await PineconeStore.PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings.OpenAIEmbeddings({}),
    {
      pineconeIndex: index,
      textKey: 'text',
      namespace: id, //namespace comes from your config folder
    },
  );
  
  //create chain
  const chain = makeChain.makeChain(vectorStore);
  //Ask a question using chat history
  const response = await chain.call({
    question: question,
    chat_history:  [],
  });
  console.log("done");
res.status(200).json({
   success: true,
   data: response

});

}
