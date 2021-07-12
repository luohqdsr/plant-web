
const mongoose =require('mongoose')

mongoose.connect("mongodb://localhost:27017/test",  function(err,db){

    　　if(err){
    　　　　console.log('Connection Error:' + err)
    　　}else{
    　　　　console.log('Connection success!')
    　　}
    
})

const models ={
    paramter:{
       // plantIndex:{type:String, require:true},
       // PLYModel :{type:String},
        '_document_Name':{type:Number},
        '_property':{type:String},
        'title':{type:String},
        'parameters':{type:Array}

    },lang:{
        'title':{type:String}


    },selectSampledID:{
        '_document_Name':{type:Number},
        '_property':{type:String},

    }

}

for(let m in models) {
    console.log(m)
    mongoose.model(m ,new mongoose.Schema(models[m]),m ) //建立模型
}

module.exports ={
    getModel:function(name) {
        return mongoose.model(name)
    }
}
