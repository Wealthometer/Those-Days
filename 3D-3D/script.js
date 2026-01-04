// // Importing the Three Js Library
// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// // To Allow the camera to move around the scene
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// //to allow hw importing of the .gltf file
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loadders/GLTFLoader.js";

// // Create a three js scene
// const scene  = new THREE.Scene();

// // create a new camera with positions and Angles
// const camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 1000);

// // Keeping the 3D object ona global variable so that 
// // it can be accessed later

// let object;

// // OrbitControls allow the camera to move around the scene

// let controls;

// // set which object to render
// let objToRender = 'scene';

// // instantiate a loader for the gltf file
// const loader= new GLTFLoader();

// // load the file
// loader.load (
//     `models/${objToRender}/scene.gltf`,
//     function (gltf) {
//         // if the file is loaded add it to the scene
//         object = gltf.scene;
//         scene.add(object);
//     },
//     function(xhr) {
//         // while it is loading log the progress
//         console.log((xhr.loaded / xhr.total *100) + '% loaded')
//     },
//     function(error) {
//         // if there is an error log it
//         console.error(error);
//     }
// )

// // instantiate a new renderer and set itz size
// const renderer = new THREE.WebGLRenderer({alpha : true});
// renderer.setSize(window.innerHeight, window.innerHeight);

// // document.getElementById("container3D").appendChild();

const lenis = new Lenis();

Lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf( time * 1000 );
});

gsap.ticker.lagSmoothing(0);

const scene = new Three.Scene();
scene.background = new THREE.Color(0xfefdfd);

// create a new camera with positions and Angles
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha : true
});
renderer.setSize(window.innerHeight, window.innerHeight);

