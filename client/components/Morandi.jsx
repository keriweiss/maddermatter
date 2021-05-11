import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Morandi = (props) => {
  let mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#e5e5e5');
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    mount.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerWidth);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffcf99 });
    const mesh = new THREE.Mesh(geometry, material);

    // mesh.rotation.set(45, 0, 0);
    mesh.scale.set(1, 2, 1);
    // mesh.position.set(2, 2, -2);
    // mesh.position.y = 2;
    // mesh.position.z = 2;
    scene.add(mesh);

    const geometry2 = new THREE.ConeGeometry();
    const material2 = new THREE.MeshLambertMaterial({ color: 0xffcf99 });
    const cone = new THREE.Mesh(geometry2, material2);

    cone.scale.set(1, 1, 1);
    cone.position.set(5, 1, -2);
    scene.add(cone);

    const light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set(10, 0, 25);
    scene.add(light);

    const animate = function () {
      requestAnimationFrame(animate);

      cone.rotation.x += 0.05;
      cone.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);
  //   return <div id='morandi-wrapper'> MORANDI</div>;
  return <div ref={(ref) => (mount = ref)} />;
};

export default Morandi;
