import axios from 'axios'
import * as constants from './constants'
import intl from 'react-intl-universal';


const changePlantButton  =(plantButtonList,category) =>({ 
    type: constants.RENDER_PLANT_BUTTON,
    plantButtonList
})
const changeLeafButton  =(leafButtonList,category) =>({
    type: constants.RENDER_LEAF_BUTTON,
    leafButtonList 
})
const handlePlantButton = (plantTargetKeys)=>({
    type: constants.HANDLE_CHANGE_PLANT_TARGET,
    plantTargetKeys


})
const renderPlantMenu = (buttons)=>({
    type: constants.RENDER_PLANT_BUTTONS,
    renderPlantButton:buttons


})
const renderLeafMenu = (buttons)=>({
    type: constants.RENDER_LEAF_BUTTONS,
    renderLeafButton:buttons
})
export const renderMenu =(category)=>{
    return (dispatch) => {
        axios.get('/lang/zh-TW.json').then((Response)=>{
            console.log(Response.data)
            let arry = []
            if(category == 'Plant'){
                const data = Response.data.Parameters['Plants']

                const renderButton = renderMenus(data)
                console.log(renderButton)
                dispatch(renderPlantMenu(renderButton))
                
            }else{
       
                const data = Response.data.Parameters['Leaf']
                const renderButton = renderLeafMenus(data)
                console.log(data)
                dispatch(renderLeafMenu(renderButton))
            }
          
    }).catch(e => (console.log(e)))


        axios.get('/lang/loacale.json').then((Response)=>{

                const data = Response.data
                const categoryPlant = "Plant"

                const menuTreeNode = selectCategory(data, category)

                if( category== categoryPlant){
                    dispatch(changePlantButton(menuTreeNode,category))

                }else{
                    dispatch( changeLeafButton(menuTreeNode,category))
                }
                
        }).catch(e => (console.log(e)))

    }

}


export const handlePlantButtonChange = (targetKeys) =>{
    return (dispatch) => {
        dispatch(handlePlantButton(targetKeys))

    }

}//  <Button>{intl.get('UI.PlantParameters')}</Button>
const renderMenus = (dataSets,category) =>{

    let Menus = []

        for (let i in dataSets ){
            let obj = {}
            obj.key = i;
            obj.title = intl.get(`Parameters.Plants.${i}.C_Name`);
            obj.description = intl.get(`Parameters.Plants.${i}.info`);
            console.log(obj)
            Menus.push(obj)
    
            //console.log(intl.get(`Parameters.Plants.SolidityCompactness.C_Name`))
    
    
        }
    return Menus

}
const renderLeafMenus = (dataSets,category) =>{

    let Menus = []

        for (let i in dataSets ){
            let obj = {}
            obj.key = i;
            obj.title = intl.get(`Parameters.Leaf.${i}.C_Name`);
            obj.description = intl.get(`Parameters.Leaf.${i}.info`);
            console.log(obj)
            Menus.push(obj)
    
            //console.log(intl.get(`Parameters.Plants.SolidityCompactness.C_Name`))
    
    
        }
    return Menus

}
const selectCategory = (data, category )=>{
    let Menus = []
    data.forEach((item, index, array) => {
        if(item.Parameters ){

            let menuMap =(data)=>{
                return data.map((items)=>{
                    if(items.Plants ||item.Leaf){
                        if(category ="Plants"){
                            return (menuMap(items.Plants))
                        }else{
                            return (menuMap(item.Leaf))
                        }
                    }
                    return (Menus.push({'key':items.idx_Name,'title':items.C_Name, "description":items.info})
                    )
                })
            }
            menuMap(item.Parameters)
        }
        });
      console.log(Menus)
    return Menus;
}




