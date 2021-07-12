//调用方法 1. 跟据路径 文件的所有叶片名称
import axios from 'axios'
import * as constants from './constants'


const changeDetail = ( plantID  )=>({
    type : constants.CHANGE_PLANT_CONTENT,
    leafIndex:plantID



})
const setDataParameters =(parameters)=>({
    type: constants.SET_PLANT_PARAMTER_DATA,
    parameters 


})

//axios 发送路径中的参数到express 

export const getDetail = (plantID) =>{
    return (dispatch) => {
        axios.get('')
        axios.get('/plant/serialNumber',{plantID})
            .then(res=>{
            
            // if(res.data.data.code == 0) {
                const result = res.data.data;
                dispatch(changeDetail(result.plantID))
            // }
        }).catch(()=> {
            console.log('PLY数据错误')
        })
    }
}

const setImgIndx = (imgIndex)=>({
    type: constants.SELECT_IMG_INDEX,
    imgIndex

})

const addTrans = (Trans)=>({
    type: constants.CHANGE_LEAF_TRANS,
    Trans

})

const comparisonCount = (sample_ID)=>({
    type: constants.ADD_SAMPLE_ID,
    sample_ID

})

export const searchDocument =(documentName, documentId)=>{
    return (dispatch) =>{
/*
            dispatch(setPlantIndex(documentName, documentId))
            console.log(documentName)//文件路径
            const jsonPath = `https://3d-plantdata.oss-cn-beijing.aliyuncs.com/${documentName}/${documentId}/image/document-name.json`
            console.log(jsonPath)//文件路径

            axios.get(jsonPath).then((Response)=>{

                const data = Response.data.path
                const PLYnum = data.length
                console.log(data)//文件路径
                let leafCount = [];
                let PLYList =[]
                console.log(data.path)//文件路径
                for(let i=0;i<PLYnum;i++ ){
                    PLYList.push(data[i].path.replace('__Parameters',''))//
                    leafCount.push(data[i].LEAF_NUMBER)
                   // PLYList.push(data[i].path)
                    console.log(data[i].path)//文件路径
                } 
                console.log(leafCount)
                console.log(PLYList)
                dispatch(changeLeafCount(leafCount))
                dispatch(ChangePLYList(PLYList))

                console.log(PLYList)
                let IMAGList =[]
                for(let i=0;i<PLYnum;i++ ){
                    IMAGList.push(PLYnum[i].path+'.png')
                    console.log(data[i].path+'.png')
                } 
                console.log(IMAGList)
                dispatch(setDataList(IMAGList))



            }).catch(e => (console.log(e)))
            */

            //获取数据库文件
            axios.post('/user/getlang')
            .then(res=>{
             
                if(res.status ==200&& res.data.code ===0){
                    const data = res.data.data
                    dispatch(addTrans(data.Trans) )
                }
            })
            axios.post('/user/getDocument',{documentName,documentId})
            .then(res=>{
                console.log('/user/getDocument')
                if(res.status ==200&& res.data.code ===0){
                    const data = res.data.data

                    console.log(data.parameters)
                    dispatch(setDataParameters(data.parameters))
                }
            })
            axios.post('/user/getComparisonList',{documentName}).then(res=>{
                if(res.status ==200&& res.data.code ===0){
                    console.log(res.data)
                    dispatch(comparisonCount(res.data))
                   

                 
                }
            })
    }
}

export const setSelectImgIndx =(index,dataList,fileId,fileNam) =>{

    
    axios.post('/user/getDocument',{fileNam,fileId})
    .then(res=>{
        if(res.status ==200&& res.data.code ===0){
            console.log(res.data)
        }
    })
    return (dispatch) =>{
        dispatch(setImgIndx(index));

    }
}



// export const getPlantdPLYData= (document,value,fileId)=>{
//     return (dispatch) =>{
        
//         const jsonPath = ('https://3d-plantdata.oss-cn-beijing.aliyuncs.com/'+document+'/'+value+ '/Parameters/'+fileId)
//         console.log(jsonPath)
//         dispatch(ChangeJSONdata(jsonPath))
//         axios.get(jsonPath).then((Response)=>{
    
//                 const data = Response.data
//                 const PLYnum = data.Leaf.length
//                 let PLYList =[]
//                 for(let i=0;i<PLYnum;i++ ){
//                     PLYList.push(fileId.replace('Parameters.json','Leaf'+i+'.ply'))
//                 } 
//                 dispatch(ChangePLYList(PLYList))
//         }).catch(e => (console.log(e)))





// }


// }

export const comparisionIDList =(documentName)=>{
    console.log(documentName)
    return (dispatch) =>{
        console.log(documentName)
         axios.post('/user/getComparison',{documentName}).then(res=>{
            if(res.status ==200&& res.data.code ===0){
                console.log(res.data)
                //dispatch(comparisonDocument(res.data))
            }
        })
    }


}
