import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const Morandi = (props) => {
  let mount = useRef(null);

  let x;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 200);

    //renderer

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('#aba39a');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    mount.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerWidth);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    //GROUND

    const floorLoader = new THREE.TextureLoader();
    const floorTexture = floorLoader.load('public/textures/morandifloor.png');

    const floorMat = new THREE.MeshLambertMaterial({
      map: floorTexture,
    });

    const groundGeo = new THREE.PlaneGeometry(700, 300);
    const ground = new THREE.Mesh(groundGeo, floorMat);
    ground.position.y = -30;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    //bottle loader
    let bottle1;
    const bottle1Loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('public/models/morandi3.jpg');
    bottle1Loader.load('public/models/morandibottle.obj', (bottle) => {
      bottle.traverse((child) => {
        if (child.isMesh) child.material.map = texture;
        if (child instanceof THREE.Mesh) {
          bottle1 = child;
          bottle1.rotation.x = Math.PI / 2;
          bottle1.scale.set(0.26, 0.26, 0.26);
          bottle1.position.set(0, 0, 0);
          bottle1.castShadow = true;
        }
      });
      ground.add(bottle1);
      objects.push(bottle1);
    });

    //bowl
    let bowl;
    const bowlLoader = new OBJLoader();
    const bowlTextureLoader = new THREE.TextureLoader();
    const bowlTexture = bowlTextureLoader.load(
      'public/models/moandibowl/morandi2.jpg'
    );
    bowlLoader.load('public/models/moandibowl/moandibowl.obj', (bowl) => {
      bowl.traverse((child) => {
        if (child.isMesh) child.material.map = bowlTexture;
        if (child instanceof THREE.Mesh) {
          bowl = child;
          bowl.rotation.x = Math.PI / 2;
          bowl.scale.set(0.1, 0.1, 0.1);
          bowl.position.set(15, -45, 0);
          bowl.castShadow = true;
        }
      });
      ground.add(bowl);
      objects.push(bowl);
    });

    //vase loader
    const objects = [];

    let mesh2;
    const vaseTextureLoader = new THREE.TextureLoader();
    const vaseTexture = vaseTextureLoader.load(
      'public/models/morandiVase/marandi1.jpg'
    );
    const vaseLoader = new OBJLoader();
    vaseLoader.load('public/models/morandiVase/Project Name.obj', (vase) => {
      vase.traverse((child) => {
        if (child.isMesh) child.material.map = vaseTexture;
        if (child instanceof THREE.Mesh) {
          mesh2 = child;

          mesh2.rotation.x = Math.PI / 2;
          mesh2.scale.set(0.46, 0.46, 0.46);
          // mesh2.position.set(20, -30, -80);
          mesh2.position.set(-35, 0, 0);

          mesh2.castShadow = true;
        }
      });
      ground.add(mesh2);
      objects.push(mesh2);
    });

    //blue cup loader
    let blueCup;
    const blueCupTextureLoader = new THREE.TextureLoader();
    const blueCupTexture = blueCupTextureLoader.load(
      'public/models/morandibluebowl/morandibluebowl.jpg'
    );
    const blueCupLoader = new OBJLoader();
    blueCupLoader.load(
      'public/models/morandibluebowl/morandibluebowl.obj',
      (blueCup) => {
        blueCup.traverse((child) => {
          if (child.isMesh) child.material.map = blueCupTexture;
          if (child instanceof THREE.Mesh) {
            blueCup = child;

            blueCup.rotation.x = Math.PI / 2;
            blueCup.scale.set(0.09, 0.09, 0.09);
            blueCup.position.set(32, -30, 0);
            blueCup.castShadow = true;
          }
        });
        ground.add(blueCup);
        objects.push(blueCup);
      }
    );

    //acorn cup loader
    let acornCup;
    const acornCupTextureLoader = new THREE.TextureLoader();
    const acornCupTexture = acornCupTextureLoader.load(
      'public/models/morandiacornthing/morandilittlecup.jpg'
    );
    const acornCupLoader = new OBJLoader();
    acornCupLoader.load(
      'public/models/morandiacornthing/Project Name.obj',
      (acornCup) => {
        acornCup.traverse((child) => {
          if (child.isMesh) child.material.map = acornCupTexture;
          if (child instanceof THREE.Mesh) {
            acornCup = child;
            acornCup.rotation.x = Math.PI / 2;
            acornCup.scale.set(0.06, 0.06, 0.06);
            acornCup.position.set(-20, -40, 0);
            acornCup.castShadow = true;
          }
        });
        ground.add(acornCup);
        objects.push(acornCup);
      }
    );

    //little bowl loader
    let littleBowl;
    const littleBowlTextureLoader = new THREE.TextureLoader();
    const littleBowlTexture = littleBowlTextureLoader.load(
      'public/models/morandilittlebowl/morandisquarebowl.jpg'
    );
    const littleBowlLoader = new OBJLoader();
    littleBowlLoader.load(
      'public/models/morandilittlebowl/morandibluebowl.obj',
      (littleBowl) => {
        littleBowl.traverse((child) => {
          if (child.isMesh) child.material.map = littleBowlTexture;
          if (child instanceof THREE.Mesh) {
            littleBowl = child;
            littleBowl.rotation.x = Math.PI / 2;
            littleBowl.scale.set(0.1, 0.1, 0.1);
            littleBowl.position.set(-50, -40, 0);
            littleBowl.castShadow = true;
          }
        });
        ground.add(littleBowl);
        objects.push(littleBowl);
      }
    );

    //tall bottle loader
    let tallBottle;
    const tallBottleTextureLoader = new THREE.TextureLoader();
    const tallBottleTexture = tallBottleTextureLoader.load(
      'public/models/moranditallbottle/bottlemorandi.jpg'
    );
    const tallBottleLoader = new OBJLoader();
    tallBottleLoader.load(
      'public/models/moranditallbottle/Project Name.obj',
      (tallBottle) => {
        tallBottle.traverse((child) => {
          if (child.isMesh) child.material.map = tallBottleTexture;
          if (child instanceof THREE.Mesh) {
            tallBottle = child;
            tallBottle.rotation.x = Math.PI / 2;
            tallBottle.scale.set(0.28, 0.28, 0.28);
            tallBottle.position.set(0, 15, 0);
            tallBottle.castShadow = true;
          }
        });
        ground.add(tallBottle);
        objects.push(tallBottle);
      }
    );

    const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    const dragControls = new DragControls(objects, camera, renderer.domElement);

    // dragControls.addEventListener('hoveron', function (event) {
    //   event.object.material.emissive.set(0x00ff00);
    // });

    // dragControls.addEventListener('hoveroff', function (event) {
    //   event.object.material.emissive.set(0x000000);
    // });

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);
  return (
    <>
      <div ref={(ref) => (mount = ref)} />
    </>
  );
};

export default Morandi;
