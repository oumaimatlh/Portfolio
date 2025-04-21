import React, { useEffect } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const LogoAnimation = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById('animation-container');
    if (container) container.appendChild(renderer.domElement);

    const material = new THREE.MeshBasicMaterial({
      color: 0x8B4513,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const loader = new SVGLoader();
    const fragmentPivots = [];
    const logoGroup = new THREE.Group();

    const specialFragmentDirections = {
      0: 1,
      1: -1,
      2: -1,
      3: 1,
      4: 1,
    };

    let animationPhase = 'show-logo';

    loader.load('/logoo.svg', (data) => {
      const allShapes = [];
      data.paths.forEach(path => {
        logoGroup.position.y = 100;

        const shapes = SVGLoader.createShapes(path);
        allShapes.push(...shapes);
      });

      const shapesPerFragment = Math.ceil(allShapes.length / 5);
      const shapeGroups = [];

      for (let i = 0; i < 5; i++) {
        shapeGroups.push(allShapes.slice(i * shapesPerFragment, (i + 1) * shapesPerFragment));
      }

      allShapes.forEach(shape => {
        const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), material);
        mesh.scale.set(0.6, -0.6, 0.6);
        logoGroup.add(mesh);
      });
      scene.add(logoGroup);

      shapeGroups.forEach((group, index) => {
        const geometry = new THREE.ShapeGeometry(group);
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, 0);

        const mesh = new THREE.Mesh(geometry, material.clone());
        mesh.scale.set(0.6, -0.6, 0.6);

        const pivot = new THREE.Group();
        pivot.position.set(center.x * 0.6, -center.y * 0.6 + 100, 0);
        pivot.add(mesh);
        pivot.visible = false;

        pivot.userData = {
          rotationSpeed: 0.02,
          direction: specialFragmentDirections[index] || (Math.random() > 0.5 ? 1 : -1),
          targetRotation: Math.PI * 2,
          currentRotation: 0,
        };

        fragmentPivots.push(pivot);
        scene.add(pivot);
      });
    });

    // Surface réfléchissante avec un effet d'ondulation
    const reflectionGeometry = new THREE.PlaneGeometry(500, 500, 50, 50);
    const reflectionMaterial = new THREE.MeshPhongMaterial({
      color: 0x87cefa, // Couleur de l'eau
      specular: 0xaaaaaa,
      shininess: 100,
      transparent: true,
      opacity: 0.5,
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    });
    const reflectionMesh = new THREE.Mesh(reflectionGeometry, reflectionMaterial);
    reflectionMesh.rotation.x = -Math.PI / 2;
    reflectionMesh.position.y = -100; // Positionner sous le logo
    scene.add(reflectionMesh);

    const waveTime = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      if (animationPhase === 'rotate') {
        let allFinished = true;

        fragmentPivots.forEach(pivot => {
          if (pivot.userData.currentRotation < pivot.userData.targetRotation) {
            pivot.rotation.y += pivot.userData.rotationSpeed * pivot.userData.direction;
            pivot.userData.currentRotation += pivot.userData.rotationSpeed;
            allFinished = false;
          }
        });

        if (allFinished) animationPhase = 'reform';
      }

      else if (animationPhase === 'reform') {
        logoGroup.visible = true;
        fragmentPivots.forEach(pivot => pivot.visible = false);

        setTimeout(() => {
          logoGroup.visible = false;
          fragmentPivots.forEach(pivot => {
            pivot.visible = true;
            pivot.rotation.y = 0;
            pivot.userData.currentRotation = 0;
          });
          animationPhase = 'rotate';
        }, 1000);
      }

      // Ondulations sur la surface réfléchissante
      const pos = reflectionGeometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y = Math.sin(x / 10 + waveTime) * 1.5 + Math.cos(z / 10 + waveTime) * 1.5;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    setTimeout(() => {
      logoGroup.visible = false;
      fragmentPivots.forEach(pivot => {
        pivot.visible = true;
        pivot.rotation.y = 0;
        pivot.userData.currentRotation = 0;
      });
      animationPhase = 'rotate';
    }, 1000);

    animate();

    return () => {
      renderer.dispose();
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="animation-container"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right,rgb(143, 131, 131),rgb(41, 10, 10))',
      }}
    />
  );
};

export default LogoAnimation;
