import React, { useEffect } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

const LogoAnimation = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(1150, 1150);

    const container = document.getElementById('animation-container');
    if (container) container.appendChild(renderer.domElement);

    const material = new THREE.MeshStandardMaterial({
      color: "rgb(125, 63, 1)",
      emissive: "rgb(125, 63, 1)",
      emissiveIntensity: 0.5,
      roughness: 0.5,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    const loader = new SVGLoader();
    const fragmentPivots = [];
    const logoGroup = new THREE.Group();
    const specialFragmentDirections = { 0: 1, 1: -1, 2: -1, 3: 1, 4: 1 };
    let animationPhase = 'rotate';

    loader.load('/home.svg', (data) => {
      const allShapes = [];

      data.paths.forEach((path) => {
        try {
          if (!path || !path.userData || !path.subPaths.length) return;
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape) => {
            allShapes.push(shape);
          });
        } catch (err) {
          console.warn('Path ignoré pour cause d’erreur SVG :', err);
        }
      });

      if (allShapes.length === 0) return;

      const shapesPerFragment = Math.ceil(allShapes.length / 5);
      const shapeGroups = [];

      for (let i = 0; i < 5; i++) {
        shapeGroups.push(allShapes.slice(i * shapesPerFragment, (i + 1) * shapesPerFragment));
      }

      const combinedGeometry = mergeGeometries(
        allShapes.map(shape => new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: true })),
        false
      );

      combinedGeometry.computeBoundingBox();
      const center = new THREE.Vector3();
      combinedGeometry.boundingBox.getCenter(center);

      allShapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: true });
        const mesh = new THREE.Mesh(geometry, material.clone());

        mesh.scale.set(0.6, -0.6, 0.6);
        mesh.position.set(-center.x * 0.6, center.y * 0.6, 0);

        mesh.material.color.set("rgb(125, 63, 1)");
        mesh.material.emissive.set("rgb(125, 63, 1)");

        logoGroup.add(mesh);
      });

      logoGroup.position.set(0, 0, 0);
      logoGroup.visible = false;
      scene.add(logoGroup);

      shapeGroups.forEach((group, index) => {
        const geometries = group
          .map(shape => {
            try {
              return new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: true });
            } catch (err) {
              console.warn("❌ Erreur lors de l’extrusion d’un shape dans le groupe :", err);
              return null;
            }
          })
          .filter(geom => geom !== null);
      
        if (geometries.length === 0) return;
      
        const mergedGeometry = mergeGeometries(geometries, false);
        mergedGeometry.computeBoundingBox();
        const groupCenter = new THREE.Vector3();
        mergedGeometry.boundingBox.getCenter(groupCenter);
        mergedGeometry.translate(-groupCenter.x, -groupCenter.y, 0);
      
        const mesh = new THREE.Mesh(mergedGeometry, material.clone());
        mesh.scale.set(0.6, -0.6, 0.6);
      
        mesh.material.color.set("rgb(125, 63, 1)");
        mesh.material.emissive.set("rgb(125, 63, 1)");
      
        const pivot = new THREE.Group();
        pivot.position.set((groupCenter.x - center.x) * 0.6, -(groupCenter.y - center.y) * 0.6, 0);
        pivot.add(mesh);
        pivot.visible = true;
      
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

    const reflectionGeometry = new THREE.PlaneGeometry(500, 500, 100, 100);
    const reflectionMaterial = new THREE.MeshPhongMaterial({
      color: "#600101",
      specular: 0x222222,
      shininess: 150,
      transparent: true,
      opacity: 0.4,
      reflectivity: 0.7,
      side: THREE.DoubleSide,
      emissive: 0x3A2F28,
      emissiveIntensity: 0.3
    });
    const reflectionMesh = new THREE.Mesh(reflectionGeometry, reflectionMaterial);
    reflectionMesh.rotation.x = -Math.PI / 2;
    reflectionMesh.position.y = -100;
    scene.add(reflectionMesh);

    const rotatingLight = new THREE.PointLight(0xffffff, 1, 1000);
    rotatingLight.position.set(200, 200, 200);
    scene.add(rotatingLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(0, 200, 300);
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);

      if (fragmentPivots.length > 0) {
        if (animationPhase === 'rotate') {
          let allFinished = true;
          fragmentPivots.forEach(pivot => {
            if (pivot.userData.currentRotation < pivot.userData.targetRotation) {
              pivot.rotation.y += pivot.userData.rotationSpeed * pivot.userData.direction;
              pivot.userData.currentRotation += pivot.userData.rotationSpeed;
              allFinished = false;
            }
          });

          if (allFinished) {
            animationPhase = 'reform';
          }
        } else if (animationPhase === 'reform') {
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
      }

      const pos = reflectionGeometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const time = Date.now() * 0.001;
        const y = Math.sin(x / 8 + time) * 3.5 + Math.cos(z / 6 - time) * 3.5;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      const time = Date.now() * 0.001;
      rotatingLight.position.x = Math.cos(time) * 300;
      rotatingLight.position.z = Math.sin(time) * 300;
      rotatingLight.position.y = 200 + Math.sin(time * 0.5) * 50;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="logo-wrapper">
      <div
        id="animation-container"
        style={{
          width: '510px',
          height: '490px',
          background: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      />
    </div>
  );
};

export default LogoAnimation;
