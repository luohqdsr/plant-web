import * as constants from './constants'
import axios from 'axios'
import { actionCreatores } from '.'
import { Select } from 'antd'




const getDocumentList= (doucumentId)=>({
    type: constants.GET_DOCUMENT_NAME_LIST,
    doucumentId
})

const hangdleSubmitChecked =(checked) =>({
    type :constants.GET_HANGDLE_CHECKED,
    checked
})

const handleChangeShow = (visible) =>({
    type: constants.CHANGE_MODEL_SHOW,
    visible


})

const getComparisonList =(comparsionList)=>({
    type: constants.GET_COMPARSION_LIST,
    comparsionList

    

})
const handleChangeComparsion = (changeData)=>({
    type: constants.CHANGE_COMPARSION_LIST,
    changeComparsionList:changeData


})
const comparisonDocumentContent = (comparsionListCountent)=>({
    type: constants.COMPARISION_DOCUMENT_CONTENT,
    comparsionListCountent

})
const handleChangeSelectSampleIDData = (data)=>({
    type: constants.CHANGE_SELECT_SAMPLE_DATA,
    changeSelectSample :data

})

export const  deletCheckedButton =(checked)=>{

    return (dispatch)=>{
        dispatch(hangdleSubmitChecked(checked))

    }
}
export const  getSelectSampleID =(ID,Select)=>{
    console.log(ID)
    console.log(Select)
    return (dispatch)=>{
        axios.post('/user/selectSampleID',{ID,Select}).then(res=>{
            if(res.status ==200&& res.data.code ===0){
                console.log(res.data)
                dispatch(comparisonDocumentContent(res.data))
            }
        })
      

    }
}

export const changeSelectSampleIDData =(selectSample)=>{
    return (dispatch) =>{
        console.log(selectSample)
 
        dispatch(handleChangeSelectSampleIDData(selectSample))
        }

}

  

export const getHandleChecked= (checked)=>{
    let checkedList =[]

    if(checked){
        checked.forEach(Item=>{
            let arr ={}
            arr.title = Item
            arr.path ='/data/1T001/'+Item+'/image/comparison.png'
            checkedList.push(arr)
            
        })
    
        
    
        return (dispatch) =>{
        dispatch(hangdleSubmitChecked(checkedList))
        }
        
    }
}





export const changeShow = (showState)=>{

    
    return  (dispatch) =>{
        dispatch (handleChangeShow(showState))
    }
}
export const ComparsinList=(fileName)=>{
    return (dispatch) =>{
        axios.post('/user/getComparisonList',{fileName}).then(res=>{
            console.log(fileName)
        })

        //dispatch()
    }
    
}

export const getInComparsionMSG =(sampleIndexArry, buttonList)=>{

    console.log(buttonList)
   
 
    let arrys = []
    for(let i in sampleIndexArry){
        let nem = sampleIndexArry[i].title
        arrys.push(nem)
    }
    console.log(arrys)


    return (dispatch)=>{
        let sampleData =[]
        
        axios.post('/user/getComparisonMsg',{arrys}).then(res=>{
            if(res.status == 200 && res.data.code ===0) {
               
                const sampleList = res.data.comparsionNameList;
                console.log(sampleList)
        
              

                // sampleList.forEach((sampleListitem,index)=>{
                //     console.log(sampleListitem)
                   

                //         const jsonDta = String('/data/1T001/'+sampleListitem.filename+ '/Parameters/'+sampleListitem.path[0] )
                //         axios.get(jsonDta).then((Response)=>{
                //             let Responses =JSON.parse(Response)
           
                //             //buttonList.map(items => Object.assign(sampleListitem,  { sampleListitem[items.key] :Response.data[items.key]}))




                //             buttonList.forEach((items)=>{
                //                 if(Responses.data[items.key] !==undefined){
                                   
                                   
                //                     let itemdata =JSON.parse(Responses.data[items.key])

                //                     sampleListitem[items.key] =itemdata
                                    
                //                     console.log(sampleListitem[items.key])
                //                 }
    
                //             })                       
                //         }).catch(e => (console.log(e)))
                //         sampleData.push(sampleListitem)
                // })
                // console.log(sampleData)
           
               
            
                dispatch(getComparisonList(sampleList))     
                //dispatch(getComparisonList(sampleList))     
               
            }else{
                console.log(res.data.msg)
            }


        })
        
    }
}

export const changeComarsionMSG = (propsState,changeIndex,buttonList)=>{
  
    return  (dispatch) =>{
        let newData = [...propsState]; 
        console.log(newData)
        const arr=changeIndex.split('__');
        const jsonPath = ('/data/1T001/'+arr[0]+ '/Parameters/'+changeIndex )
       
     
        axios.get(jsonPath).then((Response)=>{
            buttonList.forEach((item)=>{
                newData.forEach((propsStateitem)=>{
                    if(propsStateitem.filename==arr[0]){
                        propsStateitem.contener[item.key] = Response.data[item.key]

                    }
                })
            })
           
            dispatch(handleChangeComparsion(newData))



        })
        



    }
    


}
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
export const setComprationList =(documentName)=>{
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
