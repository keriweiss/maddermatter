import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Texture } from 'three';
import DragControls from 'three-dragcontrols';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

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
    renderer.setClearColor('#aba39a');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    mount.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerWidth);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    // LIGHTS

    const ambiLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambiLight);

    const light = new THREE.PointLight(0xffffff, 0.5, 500, 2);
    light.castShadow = true;
    light.position.set(10, 10, 25);
    scene.add(light);

    //Ground

    const groundGeo = new THREE.PlaneGeometry(700, 300);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x009095 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -30;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const objects = [];

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    //DRAG

    const dragControls = new DragControls(objects, camera, renderer.domElement);

    animate();
  });
  return <div ref={(ref) => (mount = ref)} />;
};

export default Cezanne;
