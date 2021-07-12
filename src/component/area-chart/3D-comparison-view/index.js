import React , {Component}from 'react';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 注意是examples/jsm
// import {PLYLoader}  from 'three/examples/jsm/loaders/PLYLoader';
import {connect} from 'react-redux'
import Slider from "react-slick";
import {Image } from 'antd';
 
import THREE from "./three";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import Swiper from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { withRouter } from 'react-router-dom'

import './index.less'
import { actionCreatores } from './store/index';
import { useLocation } from 'react-router-dom'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


class ThreeDComparison extends Component {

    constructor(props){
        super(props)
        this.state={
            showThredModelIndex:this.props.propsImgIndx,
            mapListData :this.props.mapListData,
            fileName : this.props.fileName,
            fileId : this.props.fileId,
            xAxisPatameter:  this.props.xAxisPatameter,
            ImgIndx: this.props.ImgIndx,
            PLYList: this.props.PLYList,
            loaction :this.props.location.search,
            leafCountS: this.props.leafCountS ,
        
            
        }
        
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.parameters !== prevState.parameters) {
            return {
                parameters : nextProps.parameters,
            }
        }
        if (nextProps.fileId !== prevState.fileId) {
            return {
                fileId : nextProps.fileId,
            }
        }


        if (nextProps.leafCountS !== prevState.leafCountS) {
            return {
                leafCountS : nextProps.leafCountS,
            }
        }
        if (nextProps.ImgIndx !== prevState.ImgIndx) {
            return {
                ImgIndx : nextProps.ImgIndx,
            }
        }
        if (nextProps.fileName !== prevState.fileName) {
            return {
                fileName : nextProps.fileName,
            }
        }
        if (nextProps.fileName !== prevState.fileName) {
            return {
                fileName : nextProps.fileName,
            }
        }


        if (nextProps.PLYList !== prevState.PLYList) {
            return {
                fileName : nextProps.fileName,
                fileId : nextProps.fileId,
                
                PLYList: nextProps.PLYList,
                ImgIndx: nextProps.ImgIndx,
            }
        }
     
        if (nextProps.location.search !== prevState.loaction) {
            return {
                fileName : nextProps.fileName,
                fileId : nextProps.fileId,
                
                PLYList: nextProps.PLYList,
                ImgIndx: nextProps.ImgIndx,
            }
        }
    }
    componentDidMount(){


        this.getDoumentPath(window.location.href);
    
       // this.instanceSwiper();
    }


    shouldComponentUpdate(nextProps,nextState){

        if(nextProps.parameters !=this.props.parameters){
            this.initThree(nextProps.parameters)
            this.instanceSwiper(nextProps.parameters);
            return true
        }

        if(nextProps.mapListData !=this.props.mapListData){
           
            return true
        }


    }
    componentDidUpdate() {
        this.swiperObj.update();
    }

    componentWillUnmount() {
        if (this.swiperObj.destroy) { 
            this.swiperObj.destroy();
            this.swiperObj = null;
        }
    }




    instanceSwiper(parameters) {
        const _this = this;
        const {fileName,fileId} =this.state
       // const {parameters} =this.props
    
        this.swiperObj = new Swiper('.swiper-container', {
            calculateHeight:true,
            roundLengths:true,
            spaceBetween:30,
            slidesPerView:5,
            slidesPerViewFit:true,
            isDuplicate:false,
            centeredSlides:true,
            observer: true,
            loop:false,
            pagination:{ clickable: true },
            scrollbar:{ draggable: true },
            onSwiper:(swiper) => console.log(swiper),
            slideChange:(e) =>console.log(e)
        })
            this.swiperObj.on('slideChange', function (e) {
            _this.props.selectImgIndx(e.activeIndex,_this.props.PLYList,fileId,fileName);
            _this.getPlantdPLYData(e.activeIndex)
            _this.setState({ImgIndx:e.activeIndex})

            _this.initThree(parameters ,e.activeIndex)
        });

    }



    getPlantdPLYData= (activeIndex)=>{
        
        if(!activeIndex){
            return null
        }      
    }    


    initThree(parameters){
        const {ImgIndx } =this.state


        //const {parameters} =this.props
        const plantIndx = parameters[ImgIndx]
        let leafCount =0;
 
        if(parameters){
            for(let i in plantIndx ){
                if(i == "Leaf"){
                    leafCount = plantIndx[i].length;
                }
            }
        
        }
       // const {fileName,fileId, ImgIndx, leafCountS} =this.state
        var scene, camera, renderer,hemiLight,spotlight ;
        let raycaster  = new THREE.Raycaster();
        let mouse = new THREE.Vector2
        let objects = [];
        var controls

        //加载场景
        let container 

        init(parameters, ImgIndx,leafCount);
        animate();
        




        function init(parameters,ImgIndx,leafCounts){
          
            container = document.getElementById('plantCanvas');
            const _this =this
            let leafCount= leafCounts;
      
            while(container.children.length > 0){ 
                container.removeChild(container.children[0]); 
            }
            if(container.children.length>0){

                addModel( parameters,leafCount)//遍歷葉片
            }else{
           
               // addModel( parameters)
                
               // const {parameters} =_this.props
                
                setNewModel( parameters,ImgIndx, leafCounts)

            }
            //遍歷葉片

            function addModel(parameters,leafCount){
       
                var loader = new THREE.PLYLoader();
                //遍歷葉片PLY
                const plyLoad =(controlNo) =>{

                    const imageName = parameters[ImgIndx].Name
                    const imageDate = parameters[ImgIndx].date
                    let arry =imageDate.split("__",3)
                    
                    const valueDocumentName= arry[0]

                    const plyDataPath=`https://3d-plantdata.oss-cn-beijing.aliyuncs.com/${imageName}/${valueDocumentName}/Reconstruction/${parameters[ImgIndx].date}__Leaf${controlNo}.ply`;
                 
                    loader.load( plyDataPath, function ( geometry ) {
                        
                
                        geometry.computeVertexNormals();

                        var material = new THREE.MeshBasicMaterial({
                            vertexColors: THREE.VertexColors,
                            side: THREE.DoubleSide
                        });
                        var mesh = new THREE.Mesh(geometry, material);
                        mesh.rotation.x = -Math.PI / 2;
                        mesh.castShadow = true;
                        mesh.name =controlNo
                        mesh.receiveShadow = true;
                        scene.add(mesh);
                        objects.push(mesh);
                        

                    } );
        
                }
                for(let i=0;i<leafCount;i++){
                    
                    plyLoad(i)

                }
            }
            


            
            function setNewModel(parameters,ImgIndx, leafCountS){

            
                const imageName = parameters[ImgIndx].Name
                const imageDate = parameters[ImgIndx].date
                let arry =imageDate.split("__",3)
                
                const valueDocumentName= arry[0]

                let leafMumber =leafCountS
        
                camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
                camera.position.set(10, 50, 10);
                scene = new THREE.Scene();
                for (let i = scene.children.length - 1; i >= 0; i--) { 
                    if(scene.children[i].type === "Mesh") 
                    scene.remove(scene.children[i]); 
                } 
    
                scene.background = new THREE.Color(0x000000);
                //地板
                const plane = new THREE.Mesh(
                    new THREE.PlaneBufferGeometry(60, 60),
                    new THREE.MeshPhongMaterial({
                        color: 0xF4A460,
                        specular: 0x101010
                    })
                )
                plane.position.y = -0.5;
                plane.rotation.x = -Math.PI / 2;
                plane.receiveShadow = true;
                scene.add(plane);
           

                var loader = new THREE.PLYLoader();
                const plyLoad =(path) =>{
                    let plyDataPath;
                    if(path == 0){
                         plyDataPath=`https://3d-plantdata.oss-cn-beijing.aliyuncs.com/${imageName}/${valueDocumentName}/Reconstruction/${parameters[ImgIndx].date}__Leaf.ply`;
                    }else{
                         plyDataPath=`https://3d-plantdata.oss-cn-beijing.aliyuncs.com/${imageName}/${valueDocumentName}/Reconstruction/${parameters[ImgIndx].date}__Leaf${path}.ply`;
                    }

                    loader.load( plyDataPath, function ( geometry ) {
                        
                
                        geometry.computeVertexNormals();
    
                        var material = new THREE.MeshBasicMaterial({
                            vertexColors: THREE.VertexColors,
                            side: THREE.DoubleSide
                        });
                        //var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 200, vertexColors: THREE.VertexColors} );
                        var mesh = new THREE.Mesh(geometry, material);
                        mesh.rotation.x = -Math.PI / 2;
                        //mesh.scale.multiplyScalar( 0.001 );
                        mesh.castShadow = true;
                        mesh.name =path
                        mesh.receiveShadow = true;
                        //mesh.doubleSided = true;
    
                        scene.add(mesh);
                        objects.push(mesh);
                        
    
                    } );
    
                }
                for(let i=0;i<leafMumber;i++){
               
                    plyLoad(i)

                }
   /*
                AllPLYList.map(v =>(
                    plyLoad(v)
                ))*/

                hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
                hemiLight.position.set(0, 10, 5);
                scene.add(hemiLight);
    
                spotlight = createSpotlight(0x555555);
                spotlight.position.set(-15, 30, 15);
                spotlight.distance = 80;
                spotlight.angle = 0.8;
                var lightHelper = new THREE.SpotLightHelper(spotlight);
                scene.add(spotlight);
                
    
                
    
    
                renderer = new THREE.WebGLRenderer(  );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( container.clientWidth, container.clientHeight );
                renderer.gammaInput = true;
                renderer.gammaOutput = true;
                renderer.shadowMap.enabled = true;
                container.appendChild( renderer.domElement );
    
                //

                controls = new OrbitControls( camera, renderer.domElement );
                controls.target.set(0, 0, 0);
                controls.enableKeys = false;
                window.addEventListener( 'resize', onWindowResize, false );
            
                container.addEventListener('click',onMouseDblclick, false)
           
        }

            }
            function onMouseDblclick(event) {

                // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
                var intersects = onMouseClick(event);
        
                // 获取选中最近的 Mesh 对象
                if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
                   let  selectObject = intersects[0].object;
                 
                    //alert(selectObject);
                } else {
                    alert("未选中 Mesh!");
                }
            }


        function onMouseClick(e){
          
            e.preventDefault();
            mouse.x = (e.offsetX / container.clientWidth) * 2 - 1;
            mouse.y = -(e.offsetY / container.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(objects, true);//获取名称
            let sintersects = raycaster.intersectObjects(scene.children,true);//获取名称
          
            return sintersects
        }

        function createSpotlight(color) {
            var newObj = new THREE.SpotLight(color, 1.5);
            newObj.castShadow = true;
            newObj.angle = 0.5;
            newObj.penumbra = 0.4;
            newObj.decay = 0.5;
            newObj.distance = 100;
            return newObj;
        }

        function animate() {
            // controls.update();
            requestAnimationFrame( animate );
            renderer.render( scene, camera );

        }
        function onWindowResize() {

            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
        function onMouseMove( event ) {
            mouse.x = ( container.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( container.clientY / window.innerHeight ) * 2 + 1;
          
        }

    }

    getDoumentPath(paths){
        let path= console.log(this.props.location.search)
        let query ;


        if(path){
            query = path;
            

        }else{
            query = this.props.location.search;

        }
        const arr = query.split('&')
        const pathDocumentName =arr[0].slice(9) // '1'
        const pathDataName=arr[1].slice(6)
        this.props.setDocumentIndex(pathDocumentName,pathDataName)

    }


    mouseenterObject = (e)=>{
        e.preventDefault();
            const mouse = new THREE.Vector2();
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    }
    getDocument(doucument){
        let arry =doucument.split("__",3)
        return arry[0]
    }


//show img list
    renderImgList = (parameters)=> {

        if(parameters ){
             return parameters.map((item,index)=>{
                 const valueDocumentName=  this.getDocument(item.date)
                const dataPath =`https://3d-plantdata.oss-cn-beijing.aliyuncs.com/${item.Name}/${valueDocumentName}/image/${item.date}__topview.png`;
                return( <div className="swiper-slide" key={item.date}  virtualIndex={index}>   
                <div className='plant-img'   key={item.date}  virtualIndex={index}>
                    <Image src={dataPath}
                    preview={false}
                    />
                    </div>
                </div>
                )
            })

        }else{
            return null
        }
    }
//show right img
    showSelectImg=(ImgIndx) =>{
        const {parameters} =this.props
        if(parameters){
            const imageName = parameters[ImgIndx].Name
            const imageDate = parameters[ImgIndx].date
            const valueDocumentName=  this.getDocument(imageDate)
            const imagePath = `https://3d-plantdata.oss-cn-beijing.aliyuncs.com/${imageName}/${valueDocumentName}/image/${imageDate}__topview.png`;
            return  imagePath
        }else{
            return null
            
        }
        
    }


    
    render(){



        const {ImgIndx,parameters} =this.state
        return(
            
            <div className='view-content'> 
              
           
        
                <div id='plantCanvas'
               
                > </div>
                <div className="all-plant-image-carousel">

                    <div className="swiper-container">
                        <div className="swiper-wrapper"
                         >
                            {this.renderImgList(parameters)}
                         
                        {/* {
                            this.props.mapListData.map((item,  index)=>{
                                const dataPath ='/data/'+this.props.fileName+'/'+this.props.fileId+'/image/'+item;
                                return(
                                    <div className="swiper-slide">   
                                    <div className='plant-img' key={item}  virtualIndex={index} >
                                        <Image src='https://csdnimg.cn/cdn/content-toolbar/csdn-logo.png?v=20200416.1' />
                                    </div>
                                    </div>
                                )
                            })
                        } */}


                        </div>

                    </div>
                </div>
            <div className='topview-image'>
                    <div className='right-image'>
                        <Image
                            preview={false}
                            src={this.showSelectImg(ImgIndx) }
                            />
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatch =(dispatch) =>({
    setDocumentIndex(name, id){
        dispatch(actionCreatores.searchDocument(name, id))
    },//e.activeIndex,_this.props.PLYList,_this.props.fileId,_this.props.fileName);
    selectImgIndx(index,dataList,fileId,fileName){
        dispatch(actionCreatores.setSelectImgIndx(index,index,dataList,fileId,fileName))
    },
    // getPlantdPLYData(document,value,fileId){
    //     dispatch(actionCreatores.getPlantdPLYData(document,value,fileId))
    // },
    // getPatameterData(patameterPth){
    //     dispatch(actionCreatores.getPatameterData(patameterPth))
    // }
    
})



const mapState =(state) => ({
    mapListData : state.getIn(['model', 'imgList']),
    fileName : state.getIn(['model', 'documentName']),
    fileId : state.getIn(['model', 'documentId']),
    xAxisPatameter: state.getIn(['model','sampleOfXaXis']), 
    ImgIndx: state.getIn(['model','imgIndex']), 
    PLYList: state.getIn(['model','PLYList']),
    leafCountS: state.getIn(['model','leafCountS']),
    parameters: state.getIn(['model','parameters'])
  //  leafCountS: state.getIn(['model', 'leafCountS'])


})

export default withRouter(connect(mapState,mapDispatch)(ThreeDComparison))
