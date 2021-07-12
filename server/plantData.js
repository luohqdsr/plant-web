
const express =require('express')
const Router =express.Router()
const model = require('./model')

const Plant = model.getModel('paramter')
const Lang = model.getModel('lang')
const selectSampled_ID = model.getModel('selectSampledID')
let moment = require('moment');

Router.use(express.static('public'));
let fs = require('fs');
let image = require("imageinfo"); 
const { Route } = require('react-router-dom');
const { default: userEvent } = require('@testing-library/user-event');


Router.post('/getDocument',function(req,res){
    const {documentName,documentId} = req.body;

//"_document_Name" : "100"

    Plant.find({_property:documentName,_document_Name:documentId},function(err,doc){
		if (doc) {
            let itemsArray ={};
            // for (var i = 0; i < doc.length; i++) {
            //     console.log(doc[i])
            // }
      
            // itemsArray.push(doc);
            return res.json({code:0,data:doc[0]})
		}else{
          //  console.log(err)
        }
	})
});
Router.post('/getComparisonList',function(req,res){
  
    const { fileName } = req.body;
    Plant.find({},'_property',function(err,doc){
        

        if(doc){
            let itemsArray =[...doc];
            //console.log(itemsArray); 
            let itemsArrays=[];

            //var array=["a", 1, 2, 3, 2, 3, "b", "a"]; 
            itemsArray.filter(function(element, index, arr){ 
                if(itemsArrays.indexOf(element._property) == -1){
                    itemsArrays.push(element._property)
                }
              return itemsArrays.indexOf(element._property) != index; });

               return res.json({code:0,data:itemsArrays})

            // ["a", 1, 2, 3, "b"]
            //console.log(itemsArrays)

            //return res.json({code:0,data:doc[0]})
          //  console.log(doc)
        }
    })
    /*
    Plant.find({_document_Name:100},function(err,doc){

        if(doc){
            let itemsArray =[...doc];
            let itemsArrays=[];
            itemsArray.map((item,index)=>{
                itemsArrays.push(item._document_Name)
                console.log("doc._document_Name"+item._document_Name)
            })
           // console.log(itemsArray)
            //console.log("doc._document_Name"+itemsArray._document_Name)
           // return res.json({code:0,data:doc[0]})
          //  console.log(doc)
        }
    })
    */

})

Router.post('/getComparison',function(req,res){
    const { documentName } = req.body;
    Plant.find({_property:documentName},function(err,doc){

        if(doc){
          //  console.log(doc)
            let itemsArray =[...doc];
            let itemsArrays=[];
            itemsArray.map((item,index)=>{
                itemsArrays.push(item._document_Name)
               // console.log("doc._document_Name"+item._document_Name)
            })
            return res.json({code:0,data:itemsArrays})

        }
    })
})


Router.post('/getlang',function(req,res){
    Lang.find({title:'Translation'},function(err,doc){
        if(doc){
           // console.log(doc)
            return res.json({code:0,data:doc[0]})
          //  console.log(doc)
        }
    })
})


Router.post('/selectSampleID',function(req,res){
    const { ID,Select } = req.body;

    // for(let i  in Select){
    //     console.log(Select[i].value);
    // }
    console.log(Select)


    let itemsArrays=[];
    Select.map((item,index)=>{

        itemsArrays.push( item.toFixed(1))
        // console.log("doc._document_Name"+item._document_Name)
    })

    Plant.find({_property:ID,_document_Name:{$in: itemsArrays} },function(err,doc){
        if(doc){
            console.log(doc)
            return res.json({code:0,data:doc})
        }
          

    })

   
})
/*
Router.get('/a',function(req,res){



	
	res.send('<h1>hallo world1 <h1>')
})


Router.get( '/login', function(req, res) {
    data ='<h1>hallo world1 <h1>'
    res.json({code:0,data})
    // res.send('<h1>hallo world1 <h1>')
    // console.log('1')
})


Router.post('/sampleID',function(req,res){
    const {documentID} = req.body
    function readFileList(path, filesList){
        const file = fs.readdirSync(path)
        file.forEach(function(item,index){
            filesList.push(item)
            
        })
    }
    let getFile={
        getFileList: function(path){
            let fileList =[]
            let err ='获取名称错误'
            readFileList(path, fileList)
            if(fileList&&![]){
                return res.json({code:0,fileList})
            }else{
                return res.json({code:0,msg:'请求错误',fileList})
            }
            return fileList
        }

    }
    getFile.getFileList('./public/data/'+documentID)
    console.log('sampleID')
    let doc ='asd'

    
})

Router.post('/getComparisonMsg',function(req, res ,next){

    const {arrys} =req.body
    // 读取文件，返回文件名
    //遍历数组
    function readFileList (path, filesList){
       
        const files = fs.readdirSync(path)//遍历目录下的文件 返回[]
        let arr =[] ;

        files.forEach(function (item, index){
            arr.push(item)
        })
        return arr
        
    }
    function getJsonFules(path,documentName) {
        let comparsionNameList = [];

        

        

        path.forEach(function(item){
            let obj ={} ;
            obj.path =path;
            obj.filename = item;

           



            
            const dataPath  ='./public/data/'+documentName+'/'+item+'/Parameters'
            const pathArry =readFileList(dataPath,item)

            obj.path =pathArry;


            const file ='./public/data/'+documentName+'/'+item+'/Parameters/'+ pathArry[1]
            obj.contener =JSON.parse(fs.readFileSync(file));
            comparsionNameList.push(obj);
           

        })
        console.log(comparsionNameList)
        if(comparsionNameList){
            console.log(comparsionNameList)
            return res.json({code:0,comparsionNameList})
        }else{
            console.log('1')
            return res.json({code:0,msg:'请求错误',comparsionNameList})
        }
      
    
       
    }
    let das ='1T001'

    getJsonFules(arrys,das);




})

Router.post('/chartJsonPath',function(req, res, net){
    function getTime(timestamp) {
        var date = new Date(timestamp * 1000)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D + h + m + s
      }
   
    // function getTime  (time){
    //     let time1 = time*1000;
    //     let time2 = new Date(time1);
    //     var   year=time2.getFullYear();   
    //     var   month=time2.getMonth()+1;  
    //     var   date=time2.getDate();  
    //     var   hour=time2.getHours();   
    //     var   minute=time2.getMinutes();    
    //     var   second=time2.getSeconds();   
    //     return   year+"/"+month+"/"+date+"   "+hour+":"+minute+":"+second;
    // }
    console.log('223122222')
    
    
    const {checked,documentName, documentId} =req.body
    function readFileList (path, filesList){
        const files = fs.readdirSync(path)//遍历目录下的文件 返回[]
        let obj ={}
        checked.map(function(checkedItem,index){
            obj[checkedItem] =[] ;
                files.forEach(function (item, index){
                    const JSONData = JSON.parse(fs.readFileSync(path+'/'+item))
                    let time = getTime(JSONData.Time)
                    obj[checkedItem].push([time,JSONData[checkedItem]])
                })

        })
        filesList.push(obj)
        console.log(obj)
        
    }

    let getFiles ={
        getFileList: function(path) {
            let JsonList= [];
            readFileList(path, JsonList);
            console.log(JsonList)
            return res.json({code:0,JsonList})
        }

    }
    const datapath ='./public/data/'+documentName+'/'+documentId+'/Parameters'
    getFiles.getFileList(datapath);


})
Router.post('/grtPlyImgdata', function(req, res, next) {
   
   
    const {documentName, documentId} =req.body
    
    //res.send(data)
    function readFileList(path, filesList) {
      const files = fs.readdirSync(path);
      files.forEach(function (itm, index) {
        //   console.log('path',path+"/" + itm + "/", filesList)
          const stat = fs.statSync(path+"/"+ itm); //接受path 变量
         // console.log(stat)
          if (stat.isDirectory()) {
          //递归读取文件
        
              readFileList(path+"/" + itm + "/", filesList)
          } else {

              let obj = {};//定义一个对象存放文件的路径和名字
              obj.path = path;//路径
              obj.filename = itm//名字
              filesList.push(obj);
          }

      })

  }
  let getFiles = {
    getFileList: function (path) {
        let filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    getImageFiles: function (path) {
        let imageList = [];

        this.getFileList(path).forEach((item) => {

            let ms = image(fs.readFileSync(item.path +'/'+ item.filename));
            
            ms.mimeType && (imageList.push(item.filename))
        });
        return res.json({code:0,imageList})


        }
    };


    const datapath ='./public/data/'+documentName+'/'+documentId+'/image'
    

    getFiles.getImageFiles(datapath);
    

});
Router.post('/getDocument',function(req,res){
    const {documentName,Id} = req.body;
    plant.findOne({documentName},_filter,function(err,doc){
		if (!doc) {
			return res.json({code:1,msg:'用户名或者密码错误'})
		}
        console.log("++++ad++++")
		res.cookie('userid', doc._id)
		//return res.json({code:0,data:doc})
	})

  
});

Router.post('/getPLYList',function(req,res){
    const {document,value,fileId} = req.body
    function readFileList(path, filesList){
      
        const file = fs.readdirSync(path)
        file.forEach(function(item,index){
            filesList.push(item)
            
        })
    }
    let getFile={
        getFileList: function(path){
            let fileList =[]
            let err ='获取名称错误'
            readFileList(path, fileList)
           
            if(fileList&&![]){
                return res.json({code:0,fileList})
            }else{
                return res.json({code:0,msg:'请求错误',fileList})
            }
            return fileList
        }

    }
    getFile.getFileList('./public/data/'+document/value/Reconstruction)

    
    console.log('sampleID')
   
    let doc ='asd'

    
}) 
*/
module.exports =Router 