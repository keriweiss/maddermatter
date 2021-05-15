import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const Cezanne = () => {
  let mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 200);

    //RENDERER

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('#2d4542');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    mount.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerWidth);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    // LIGHTS

    const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
    ambLight.position.set(10, 0, 25);
    scene.add(ambLight);

    const light = new THREE.PointLight(0xffffff, 0.25, 500, 2);
    light.castShadow = true;
    light.position.set(50, 50, 50);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 500, 2);
    pointLight.castShadow = true;
    pointLight.position.copy(camera.position);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    //Ground

    const floorLoader = new THREE.TextureLoader();
    const floorTexture = floorLoader.load(
      'public/textures/coco_bolo_wood_basecolor.jpg'
    );

    const floorMat = new THREE.MeshLambertMaterial({
      map: floorTexture,
    });

    const groundGeo = new THREE.PlaneGeometry(700, 300);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x009095 });
    const ground = new THREE.Mesh(groundGeo, floorMat);
    ground.position.y = -30;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const objects = [];

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    //ADD DRAPE
    const draperyTextureLoader = new THREE.TextureLoader();
    const draperyTexture = draperyTextureLoader.load(
      'public/models/drapery/cezanne-drapery_2.jpg'
    );
    const draperyLoader = new OBJLoader();
    draperyLoader.load('public/models/drapery/drapery.obj', (drapery) => {
      drapery.traverse((child) => {
        if (child.isMesh) child.material.map = draperyTexture;
        if (child instanceof THREE.Mesh) {
          drapery = child;

          drapery.rotation.x = Math.PI / 2;
          // drapery.scale.set(0.09, 0.09, 0.09);
          // drapery.position.set(-80, -22, -30);
          drapery.position.set(-75, 20, -30);
          drapery.castShadow = true;
        }
      });
      scene.add(drapery);
    });

    //ADD PEARS
    const pearTextureLoader = new THREE.TextureLoader();
    const pearTexture = pearTextureLoader.load('public/models/pear1/pear1.jpg');
    const pearLoader = new OBJLoader();
    pearLoader.load('public/models/pear1/pear1.obj', (pear) => {
      pear.traverse((child) => {
        if (child.isMesh) child.material.map = pearTexture;
        if (child instanceof THREE.Mesh) {
          pear = child;

          pear.rotation.x = Math.PI / 2;
          pear.scale.set(0.2, 0.2, 0.2);
          pear.position.set(-75, -48, 0);
          pear.castShadow = true;
        }
      });
      ground.add(pear);
      objects.push(pear);
    });

    const pear4Loader = new OBJLoader();
    pear4Loader.load('public/models/pear1/pear1.obj', (pear4) => {
      pear4.traverse((child) => {
        if (child.isMesh) child.material.map = pearTexture;
        if (child instanceof THREE.Mesh) {
          pear4 = child;

          pear4.rotation.x = Math.PI / 2 + 0.5;
          // pear4.rotation.y = -Math.PI / 2 + 0.5;
          pear4.rotation.z = -Math.PI / 2 + 0.5;
          pear4.scale.set(0.2, 0.2, 0.2);
          pear4.position.set(20, 20, 20);
          pear4.castShadow = true;
        }
      });
      ground.add(pear4);
      objects.push(pear4);
    });

    const pear2TextureLoader = new THREE.TextureLoader();
    const pear2Texture = pear2TextureLoader.load(
      'public/models/pear2/pear2_2.jpg'
    );
    const pear2Loader = new OBJLoader();
    pear2Loader.load('public/models/pear2/pear2.obj', (pear2) => {
      pear2.traverse((child) => {
        if (child.isMesh) child.material.map = pear2Texture;
        if (child instanceof THREE.Mesh) {
          pear2 = child;

          pear2.rotation.x = Math.PI / 2;
          pear2.scale.set(0.2, 0.2, 0.2);
          pear2.position.set(-80, -40, -4);
          pear2.castShadow = true;
        }
      });
      ground.add(pear2);
      objects.push(pear2);
    });

    const pear3Loader = new OBJLoader();
    pear3Loader.load('public/models/pear2/pear2.obj', (pear3) => {
      pear3.traverse((child) => {
        if (child.isMesh) child.material.map = pear2Texture;
        if (child instanceof THREE.Mesh) {
          pear3 = child;

          pear3.rotation.x = Math.PI / 2 - 0.8;
          pear3.scale.set(0.2, 0.2, 0.2);
          pear3.position.set(60, 40, 0);
          pear3.castShadow = true;
        }
      });
      ground.add(pear3);
      objects.push(pear3);
    });

    // ADD VASE
    const vaseTextureLoader = new THREE.TextureLoader();
    const vaseTexture = vaseTextureLoader.load(
      'public/models/cezanne-vase/cezannevase_2.jpg'
    );
    const vaseLoader = new OBJLoader();
    vaseLoader.load('public/models/cezanne-vase/cezanne-vase.obj', (vase) => {
      vase.traverse((child) => {
        if (child.isMesh) child.material.map = vaseTexture;
        if (child instanceof THREE.Mesh) {
          vase = child;

          vase.rotation.x = Math.PI / 2;
          vase.rotation.y = 33;
          vase.scale.set(0.36, 0.5, 0.36);
          vase.position.set(120, 90, 0);
          vase.castShadow = true;
        }
      });
      ground.add(vase);
      objects.push(vase);
    });

    //ADD SKULL
    const skullTextureLoader = new THREE.TextureLoader();
    const skullTexture = vaseTextureLoader.load(
      'public/models/skull/skull.jpg'
    );
    const skullLoader = new OBJLoader();
    skullLoader.load('public/models/skull/skull.obj', (skull) => {
      skull.traverse((child) => {
        if (child.isMesh) child.material.map = skullTexture;
        if (child instanceof THREE.Mesh) {
          skull = child;

          skull.rotation.x = Math.PI / 2;
          skull.rotation.y = 0;
          skull.scale.set(0.3, 0.3, 0.3);
          skull.position.set(90, 75, 0);
          skull.castShadow = true;
        }
      });
      ground.add(skull);
      objects.push(skull);
    });

    //ADD BOTTLE

    const loadBot = new FBXLoader();
    loadBot.load('public/models/BOTTLE HIGH POLY.fbx', (bott) => {
      scene.add(bott.scene);
    });

    // ADD PLATE
    // const plateTextureLoader = new THREE.TextureLoader();
    // const plateTexture = plateTextureLoader.load(
    //   'public/models/skull/skull.jpg'
    // );
    const mtlLoader = new MTLLoader();
    mtlLoader.load('public/models/dish/dish.mtl', (mtl) => {
      mtl.preload();

      const plateLoader = new OBJLoader();
      plateLoader.setMaterials(mtl);
      plateLoader.load('public/models/dish/dish.obj', (plate) => {
        plate.traverse((child) => {
          // if (child.isMesh) child.material.map = plateTexture;
          if (child instanceof THREE.Mesh) {
            plate = child;
            plate.rotation.x = Math.PI / 2;
            plate.rotation.y = 0;
            plate.scale.set(1.8, 1.8, 1.8);
            plate.position.set(90, 75, 0);
            plate.castShadow = true;
            plate.receiveShadow = true;
          }
        });
        ground.add(plate);
        objects.push(plate);
      });
    });

    //DRAG

    const dragControls = new DragControls(objects, camera, renderer.domElement);

    animate();
  });
  return <div ref={(ref) => (mount = ref)} />;
};

export default Cezanne;
