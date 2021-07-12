import * as THREE from 'three';


window.THREE = THREE; // THREE.NRRDLoader expects THREE to be a global object
require('three/examples/js/loaders/PLYLoader');



export default window.THREE;