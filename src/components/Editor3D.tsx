// // import React, { useEffect, useRef } from 'react';
// // import * as THREE from 'three';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// // interface Editor3DProps {
// //   canvasData?: any;
// // }

// // export const Editor3D: React.FC<Editor3DProps> = ({ canvasData }) => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const sceneRef = useRef<THREE.Scene | null>(null);
// //   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
// //   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

// //   useEffect(() => {
// //     if (!containerRef.current) return;

// //     // Сцена
// //     const scene = new THREE.Scene();
// //     scene.background = new THREE.Color(0xf0f0f0);
// //     sceneRef.current = scene;

// //     // Камера
// //     const camera = new THREE.PerspectiveCamera(
// //       75,
// //       containerRef.current.clientWidth / containerRef.current.clientHeight,
// //       0.1,
// //       1000
// //     );
// //     camera.position.set(5, 5, 5);
// //     camera.lookAt(0, 0, 0);
// //     cameraRef.current = camera;

// //     // Рендерер
// //     const renderer = new THREE.WebGLRenderer({ antialias: true });
// //     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
// //     containerRef.current.appendChild(renderer.domElement);
// //     rendererRef.current = renderer;

// //     // Контролы
// //     const controls = new OrbitControls(camera, renderer.domElement);
// //     controls.enableDamping = true;

// //     // Освещение
// //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// //     scene.add(ambientLight);

// //     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// //     directionalLight.position.set(10, 10, 5);
// //     scene.add(directionalLight);

// //     // Сетка
// //     const gridHelper = new THREE.GridHelper(20, 20);
// //     scene.add(gridHelper);

// //     // Пример: добавляем простой куб (комнату)
// //     const geometry = new THREE.BoxGeometry(2, 1.5, 1.5);
// //     const material = new THREE.MeshStandardMaterial({
// //       color: 0x3B82F6,
// //       transparent: true,
// //       opacity: 0.7,
// //     });
// //     const cube = new THREE.Mesh(geometry, material);
// //     cube.position.y = 0.75;
// //     scene.add(cube);

// //     // Пол
// //     const floorGeometry = new THREE.PlaneGeometry(20, 20);
// //     const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
// //     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// //     floor.rotation.x = -Math.PI / 2;
// //     floor.position.y = 0;
// //     scene.add(floor);

// //     // Анимация
// //     const animate = () => {
// //       requestAnimationFrame(animate);
// //       controls.update();
// //       renderer.render(scene, camera);
// //     };
// //     animate();

// //     // Resize
// //     const handleResize = () => {
// //       if (!containerRef.current || !camera || !renderer) return;
      
// //       camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
// //       camera.updateProjectionMatrix();
// //       renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
// //     };
// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //       renderer.dispose();
// //       containerRef.current?.removeChild(renderer.domElement);
// //     };
// //   }, []);

// //   const convertTo3D = () => {
// //     if (!sceneRef.current || !canvasData) return;

// //     // Очищаем старые объекты (кроме света и сетки)
// //     const objectsToRemove: THREE.Object3D[] = [];
// //     sceneRef.current.traverse((obj) => {
// //       if (obj instanceof THREE.Mesh && obj.geometry instanceof THREE.BoxGeometry) {
// //         objectsToRemove.push(obj);
// //       }
// //     });
// //     objectsToRemove.forEach(obj => sceneRef.current?.remove(obj));

// //     // Простая конвертация: каждый прямоугольник -> 3D комната
// //     if (canvasData.objects) {
// //       canvasData.objects.forEach((obj: any) => {
// //         if (obj.type === 'rect') {
// //           const width = (obj.width * obj.scaleX || obj.width) / 100;
// //           const depth = (obj.height * obj.scaleY || obj.height) / 100;
// //           const height = 1.5; // Высота стен

// //           const geometry = new THREE.BoxGeometry(width, height, depth);
// //           const material = new THREE.MeshStandardMaterial({
// //             color: obj.stroke ? new THREE.Color(obj.stroke) : 0x3B82F6,
// //             transparent: true,
// //             opacity: 0.7,
// //           });

// //           const mesh = new THREE.Mesh(geometry, material);
// //           mesh.position.set(
// //             (obj.left || 0) / 100,
// //             height / 2,
// //             (obj.top || 0) / 100
// //           );

// //           sceneRef.current?.add(mesh);
// //         }
// //       });
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
// //         <button
// //           onClick={convertTo3D}
// //           className="px-4 py-2 text-white rounded"
// //           style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
// //         >
// //           🔄 Перевести в 3D
// //         </button>
// //       </div>
// //       <div ref={containerRef} className="flex-1" />
// //     </div>
// //   );
// // };











// // import React, { useEffect, useRef } from 'react';
// // import * as THREE from 'three';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// // interface Editor3DProps {
// //   canvasData?: any;
// // }

// // export const Editor3D: React.FC<Editor3DProps> = ({ canvasData }) => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const sceneRef = useRef<THREE.Scene | null>(null);
// //   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
// //   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

// //   useEffect(() => {
// //     if (!containerRef.current) return;

// //     // Инициализация сцены
// //     const scene = new THREE.Scene();
// //     scene.background = new THREE.Color(0xf0f0f0);
// //     sceneRef.current = scene;

// //     // Камера
// //     const camera = new THREE.PerspectiveCamera(
// //       75,
// //       containerRef.current.clientWidth / containerRef.current.clientHeight,
// //       0.1,
// //       1000
// //     );
// //     camera.position.set(5, 5, 5);
// //     camera.lookAt(0, 0, 0);
// //     cameraRef.current = camera;

// //     // Рендерер
// //     const renderer = new THREE.WebGLRenderer({ antialias: true });
// //     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
// //     containerRef.current.appendChild(renderer.domElement);
// //     rendererRef.current = renderer;

// //     // Контролы
// //     const controls = new OrbitControls(camera, renderer.domElement);
// //     controls.enableDamping = true;

// //     // Освещение
// //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// //     scene.add(ambientLight);
// //     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// //     directionalLight.position.set(10, 10, 5);
// //     scene.add(directionalLight);

// //     // Сетка и оси
// //     const gridHelper = new THREE.GridHelper(20, 20);
// //     scene.add(gridHelper);
// //     const axesHelper = new THREE.AxesHelper(5);
// //     scene.add(axesHelper);

// //     // Анимация
// //     const animate = () => {
// //       requestAnimationFrame(animate);
// //       controls.update();
// //       renderer.render(scene, camera);
// //     };
// //     animate();

// //     // Обработка ресайза
// //     const handleResize = () => {
// //       if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
// //       cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
// //       cameraRef.current.updateProjectionMatrix();
// //       rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
// //     };
// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //       renderer.dispose();
// //       if (containerRef.current && renderer.domElement) {
// //         containerRef.current.removeChild(renderer.domElement);
// //       }
// //     };
// //   }, []);

// //   // Функция конвертации в 3D (теперь вызывается только по кнопке или при получении данных)
// //   const convertTo3D = () => {
// //     if (!sceneRef.current || !canvasData || !canvasData.objects) return;

// //     // Очистка существующих meshes (кроме сетки, осей, света)
// //     const objectsToRemove: THREE.Object3D[] = [];
// //     sceneRef.current.traverse((obj) => {
// //       if (
// //         obj instanceof THREE.Mesh &&
// //         !(obj.geometry instanceof THREE.PlaneGeometry) // Сохраняем пол, если есть
// //       ) {
// //         objectsToRemove.push(obj);
// //       }
// //     });
// //     objectsToRemove.forEach((obj) => sceneRef.current?.remove(obj));

// //     // Обработка объектов из 2D
// //     canvasData.objects.forEach((obj: any) => {
// //       const scale = 0.01; // Масштаб

// //       if (obj.type === 'rect') {
// //         // Комната: пол + стены + потолок
// //         const width = (obj.width * (obj.scaleX || 1)) * scale;
// //         const depth = (obj.height * (obj.scaleY || 1)) * scale;
// //         const height = 1.5; // Высота стен
// //         const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x3B82F6);

// //         // Пол
// //         const floorGeometry = new THREE.PlaneGeometry(width, depth);
// //         const floorMaterial = new THREE.MeshStandardMaterial({
// //           color: 0xcccccc,
// //           side: THREE.DoubleSide,
// //         });
// //         const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// //         floor.rotation.x = -Math.PI / 2;
// //         floor.position.set((obj.left || 0) * scale, 0, (obj.top || 0) * scale);
// //         sceneRef.current?.add(floor);

// //         // Стены (4 стены)
// //         const wallMaterial = new THREE.MeshStandardMaterial({
// //           color,
// //           transparent: true,
// //           opacity: 0.7,
// //         });

// //         // Передняя стена
// //         const wall1Geometry = new THREE.PlaneGeometry(width, height);
// //         const wall1 = new THREE.Mesh(wall1Geometry, wallMaterial);
// //         wall1.position.set((obj.left || 0) * scale, height / 2, (obj.top || 0) * scale - depth / 2);
// //         sceneRef.current?.add(wall1);

// //         // Задняя стена
// //         const wall2 = new THREE.Mesh(wall1Geometry, wallMaterial);
// //         wall2.position.set((obj.left || 0) * scale, height / 2, (obj.top || 0) * scale + depth / 2);
// //         wall2.rotation.y = Math.PI;
// //         sceneRef.current?.add(wall2);

// //         // Левая стена
// //         const wall3Geometry = new THREE.PlaneGeometry(depth, height);
// //         const wall3 = new THREE.Mesh(wall3Geometry, wallMaterial);
// //         wall3.position.set((obj.left || 0) * scale - width / 2, height / 2, (obj.top || 0) * scale);
// //         wall3.rotation.y = Math.PI / 2;
// //         sceneRef.current?.add(wall3);

// //         // Правая стена
// //         const wall4 = new THREE.Mesh(wall3Geometry, wallMaterial);
// //         wall4.position.set((obj.left || 0) * scale + width / 2, height / 2, (obj.top || 0) * scale);
// //         wall4.rotation.y = -Math.PI / 2;
// //         sceneRef.current?.add(wall4);

// //         // Потолок
// //         const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
// //         const ceilingMaterial = new THREE.MeshStandardMaterial({
// //           color: 0xcccccc,
// //           side: THREE.DoubleSide,
// //         });
// //         const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
// //         ceiling.rotation.x = Math.PI / 2;
// //         ceiling.position.set((obj.left || 0) * scale, height, (obj.top || 0) * scale);
// //         sceneRef.current?.add(ceiling);
// //       }

// //       if (obj.type === 'line') {
// //         // Стена из линии
// //         const [x1, y1, x2, y2] = obj.points;
// //         const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * scale;
// //         const height = 1.5;
// //         const thickness = 0.1;
// //         const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x000000);

// //         const centerX = ((x1 + x2) / 2) * scale;
// //         const centerZ = ((y1 + y2) / 2) * scale;
// //         const angle = Math.atan2(y2 - y1, x2 - x1);

// //         const wallGeometry = new THREE.BoxGeometry(length, height, thickness);
// //         const wallMaterial = new THREE.MeshStandardMaterial({
// //           color,
// //           transparent: true,
// //           opacity: 0.7,
// //         });
// //         const wall = new THREE.Mesh(wallGeometry, wallMaterial);
// //         wall.position.set(centerX, height / 2, centerZ);
// //         wall.rotation.y = angle;
// //         sceneRef.current?.add(wall);
// //       }
// //     });
// //   };

// //   // Автоматическое обновление только если данные изменились (но теперь по кнопке в 2D)
// //   useEffect(() => {
// //     if (canvasData) {
// //       convertTo3D(); // Вызываем при получении новых данных
// //     }
// //   }, [canvasData]);

// //   return (
// //     <div className="flex flex-col h-full">
// //       <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
// //         <button
// //           onClick={convertTo3D}
// //           className="px-4 py-2 text-white rounded"
// //           style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
// //         >
// //           🔄 Перевести в 3D
// //         </button>
// //       </div>
// //       <div ref={containerRef} className="flex-1" />
// //     </div>
// //   );
// // };














// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// interface Editor3DProps {
//   canvasData?: any;
// }

// export const Editor3D: React.FC<Editor3DProps> = ({ canvasData }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) {
//       console.error('containerRef.current не определён');
//       return;
//     }

//     try {
//       console.log('Инициализация Three.js, версия:', THREE.REVISION);
//       const scene = new THREE.Scene();
//       scene.background = new THREE.Color(0xf0f0f0);
//       sceneRef.current = scene;

//       const camera = new THREE.PerspectiveCamera(
//         75,
//         containerRef.current.clientWidth / containerRef.current.clientHeight,
//         0.1,
//         1000
//       );
//       camera.position.set(10, 10, 10);
//       camera.lookAt(0, 0, 0);
//       cameraRef.current = camera;

//       const renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//       containerRef.current.appendChild(renderer.domElement);
//       rendererRef.current = renderer;

//       const controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;

//       const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
//       directionalLight.position.set(10, 10, 5);
//       scene.add(directionalLight);

//       const gridHelper = new THREE.GridHelper(20, 20);
//       scene.add(gridHelper);
//       const axesHelper = new THREE.AxesHelper(5);
//       scene.add(axesHelper);

//       const animate = () => {
//         requestAnimationFrame(animate);
//         controls.update();
//         renderer.render(scene, camera);
//       };
//       animate();

//       const handleResize = () => {
//         if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
//         cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
//         cameraRef.current.updateProjectionMatrix();
//         rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//       };
//       window.addEventListener('resize', handleResize);

//       return () => {
//         window.removeEventListener('resize', handleResize);
//         renderer.dispose();
//         if (containerRef.current && renderer.domElement) {
//           containerRef.current.removeChild(renderer.domElement);
//         }
//       };
//     } catch (error) {
//       console.error('Ошибка при инициализации Three.js:', error);
//     }
//   }, []);

//   const convertTo3D = () => {
//     if (!sceneRef.current || !canvasData || !canvasData.objects) {
//       console.warn('convertTo3D: Неверные данные', { sceneRef: sceneRef.current, canvasData });
//       return;
//     }

//     console.log('convertTo3D вызван с данными:', JSON.stringify(canvasData, null, 2));

//     // Очистка существующих meshes, кроме сетки и осей
//     const objectsToRemove: THREE.Object3D[] = [];
//     sceneRef.current.traverse((obj) => {
//       if (
//         obj instanceof THREE.Mesh &&
//         !(obj.geometry instanceof THREE.PlaneGeometry) &&
//         !(obj instanceof THREE.AxesHelper)
//       ) {
//         objectsToRemove.push(obj);
//       }
//     });
//     objectsToRemove.forEach((obj) => {
//       if (sceneRef.current) {
//         sceneRef.current.remove(obj);
//       }
//       if (obj instanceof THREE.Mesh) {
//         if (obj.geometry) {
//           obj.geometry.dispose();
//         }
//         if (obj.material) {
//           if (obj.material instanceof THREE.Material) {
//             obj.material.dispose();
//           } else if (Array.isArray(obj.material)) {
//             obj.material.forEach((mat) => mat.dispose());
//           }
//         }
//       }
//     });

//     // Обработка объектов
//     canvasData.objects.forEach((obj: any, index: number) => {
//       console.log(`Обработка объекта ${index}:`, obj);
//       const scale = 0.01;

//       if (obj.type === 'Rect') {
//         const width = (obj.width * (obj.scaleX || 1)) * scale;
//         const depth = (obj.height * (obj.scaleY || 1)) * scale;
//         const height = 1.5;
//         const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x3B82F6);

//         const floorGeometry = new THREE.PlaneGeometry(width, depth);
//         const floorMaterial = new THREE.MeshStandardMaterial({
//           color: 0xcccccc,
//           side: THREE.DoubleSide,
//         });
//         const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//         floor.rotation.x = -Math.PI / 2;
//         floor.position.set((obj.left || 0) * scale, 0, (obj.top || 0) * scale);
//         sceneRef.current?.add(floor);
//         console.log('Добавлен пол для Rect:', { width, depth });

//         const wallMaterial = new THREE.MeshStandardMaterial({
//           color,
//           transparent: true,
//           opacity: 0.7,
//         });

//         const wall1Geometry = new THREE.PlaneGeometry(width, height);
//         const wall1 = new THREE.Mesh(wall1Geometry, wallMaterial);
//         wall1.position.set((obj.left || 0) * scale, height / 2, (obj.top || 0) * scale - depth / 2);
//         sceneRef.current?.add(wall1);

//         const wall2 = new THREE.Mesh(wall1Geometry, wallMaterial);
//         wall2.position.set((obj.left || 0) * scale, height / 2, (obj.top || 0) * scale + depth / 2);
//         wall2.rotation.y = Math.PI;
//         sceneRef.current?.add(wall2);

//         const wall3Geometry = new THREE.PlaneGeometry(depth, height);
//         const wall3 = new THREE.Mesh(wall3Geometry, wallMaterial);
//         wall3.position.set((obj.left || 0) * scale - width / 2, height / 2, (obj.top || 0) * scale);
//         wall3.rotation.y = Math.PI / 2;
//         sceneRef.current?.add(wall3);

//         const wall4 = new THREE.Mesh(wall3Geometry, wallMaterial);
//         wall4.position.set((obj.left || 0) * scale + width / 2, height / 2, (obj.top || 0) * scale);
//         wall4.rotation.y = -Math.PI / 2;
//         sceneRef.current?.add(wall4);

//         const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
//         const ceilingMaterial = new THREE.MeshStandardMaterial({
//           color: 0xcccccc,
//           side: THREE.DoubleSide,
//         });
//         const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
//         ceiling.rotation.x = Math.PI / 2;
//         ceiling.position.set((obj.left || 0) * scale, height, (obj.top || 0) * scale);
//         sceneRef.current?.add(ceiling);
//         console.log('Добавлены стены и потолок для Rect');
//       }

//       if (obj.type === 'Line') {
//         const [x1, y1, x2, y2] = obj.points || [obj.x1 || 0, obj.y1 || 0, obj.x2 || 0, obj.y2 || 0];
//         const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * scale;
//         const height = 1.5;
//         const thickness = 0.1;
//         const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x000000);

//         const centerX = ((x1 + x2) / 2) * scale;
//         const centerZ = ((y1 + y2) / 2) * scale;
//         const angle = Math.atan2(y2 - y1, x2 - x1);

//         const wallGeometry = new THREE.BoxGeometry(length, height, thickness);
//         const wallMaterial = new THREE.MeshStandardMaterial({
//           color,
//           transparent: true,
//           opacity: 0.7,
//         });
//         const wall = new THREE.Mesh(wallGeometry, wallMaterial);
//         wall.position.set(centerX, height / 2, centerZ);
//         wall.rotation.y = angle;
//         sceneRef.current?.add(wall);
//         console.log('Добавлена стена для Line:', { length, angle });
//       }

//       if (obj.type === 'path') {
//         const path = obj.path || [];
//         if (!path.length) {
//           console.warn('Пустой path:', obj);
//           return;
//         }

//         for (let i = 0; i < path.length - 1; i++) {
//           const [cmd1, x1, y1] = path[i];
//           const [cmd2, x2, y2] = path[i + 1];
//           if (cmd1 !== 'M' && cmd2 !== 'L') continue;

//           const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * scale;
//           const height = 1.5;
//           const thickness = 0.1;
//           const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x000000);

//           const centerX = ((x1 + x2) / 2) * scale;
//           const centerZ = ((y1 + y2) / 2) * scale;
//           const angle = Math.atan2(y2 - y1, x2 - x1);

//           const wallGeometry = new THREE.BoxGeometry(length, height, thickness);
//           const wallMaterial = new THREE.MeshStandardMaterial({
//             color,
//             transparent: true,
//             opacity: 0.7,
//           });
//           const wall = new THREE.Mesh(wallGeometry, wallMaterial);
//           wall.position.set(centerX, height / 2, centerZ);
//           wall.rotation.y = angle;
//           sceneRef.current?.add(wall);
//           console.log('Добавлена стена для path:', { length, angle });
//         }
//       }
//     });

//     if (sceneRef.current && rendererRef.current && cameraRef.current) {
//       rendererRef.current.render(sceneRef.current, cameraRef.current);
//       console.log('Сцена отрендерена');
//     }
//   };

//   useEffect(() => {
//     if (canvasData) {
//       console.log('canvasData обновлён:', JSON.stringify(canvasData, null, 2));
//       convertTo3D();
//     } else {
//       console.log('canvasData is null or undefined');
//     }
//   }, [canvasData]);

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <button
//           onClick={convertTo3D}
//           className="px-4 py-2 text-white rounded"
//           style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
//         >
//           🔄 Перевести в 3D
//         </button>
//       </div>
//       <div ref={containerRef} className="flex-1" />
//     </div>
//   );
// };











import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextureLoader } from 'three';

interface Editor3DProps {
  canvasData?: any;
}

export const Editor3D: React.FC<Editor3DProps> = ({ canvasData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [wallHeight, setWallHeight] = useState(1.5); // Adjustable wall height
  const [showHelpers, setShowHelpers] = useState(true); // Toggle grid/axes

  useEffect(() => {
    if (!containerRef.current) {
      console.error('containerRef.current не определён');
      return;
    }

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe0e7ff); // Light sky background
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(10, 10, 10);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.shadowMap.enabled = true; // Enable shadows
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.maxPolarAngle = Math.PI / 2; // Limit camera to avoid going below floor
      controls.minDistance = 5;
      controls.maxDistance = 50;

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(10, 15, 10);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      scene.add(directionalLight);

      // Add a point light for a lamp effect
      const pointLight = new THREE.PointLight(0xffd700, 1, 10);
      pointLight.position.set(0, 2, 0);
      pointLight.castShadow = true;
      scene.add(pointLight);

      // Helpers
      const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0xcccccc);
      scene.add(gridHelper);
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error('Ошибка при инициализации Three.js:', error);
    }
  }, []);

  const convertTo3D = () => {
    if (!sceneRef.current || !canvasData || !canvasData.objects) {
      console.warn('convertTo3D: Неверные данные', { sceneRef: sceneRef.current, canvasData });
      return;
    }

    // Clear existing meshes
    const objectsToRemove: THREE.Object3D[] = [];
    sceneRef.current.traverse((obj) => {
      if (
        obj instanceof THREE.Mesh &&
        !(obj instanceof THREE.GridHelper) &&
        !(obj instanceof THREE.AxesHelper)
      ) {
        objectsToRemove.push(obj);
      }
    });
    objectsToRemove.forEach((obj) => {
      sceneRef.current?.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        } else if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => mat.dispose());
        }
      }
    });

    // Load textures
    const textureLoader = new TextureLoader();
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(2, 2);
    const wallTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 2);

    // Process objects
    canvasData.objects.forEach((obj: any, index: number) => {
      const scale = 0.01;

      if (obj.type === 'Rect') {
        const width = (obj.width * (obj.scaleX || 1)) * scale;
        const depth = (obj.height * (obj.scaleY || 1)) * scale;
        const height = wallHeight;
        const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x3B82F6);

        // Floor
        const floorGeometry = new THREE.PlaneGeometry(width, depth);
        const floorMaterial = new THREE.MeshStandardMaterial({
          map: floorTexture,
          side: THREE.DoubleSide,
          roughness: 0.8,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set((obj.left || 0) * scale, 0, (obj.top || 0) * scale);
        floor.receiveShadow = true;
        sceneRef.current?.add(floor);

        // Walls
        const wallMaterial = new THREE.MeshStandardMaterial({
          map: wallTexture,
          color,
          transparent: true,
          opacity: 0.7,
          roughness: 0.5,
        });

        const wall1Geometry = new THREE.PlaneGeometry(width, height);
        const wall1 = new THREE.Mesh(wall1Geometry, wallMaterial);
        wall1.position.set((obj.left || 0) * scale, height / 2, (obj.top || 0) * scale - depth / 2);
        wall1.castShadow = true;
        wall1.receiveShadow = true;
        sceneRef.current?.add(wall1);

        const wall2 = new THREE.Mesh(wall1Geometry, wallMaterial);
        wall2.position.set((obj.left || 0) * scale, height / 2, (obj.top || 0) * scale + depth / 2);
        wall2.rotation.y = Math.PI;
        wall2.castShadow = true;
        wall2.receiveShadow = true;
        sceneRef.current?.add(wall2);

        const wall3Geometry = new THREE.PlaneGeometry(depth, height);
        const wall3 = new THREE.Mesh(wall3Geometry, wallMaterial);
        wall3.position.set((obj.left || 0) * scale - width / 2, height / 2, (obj.top || 0) * scale);
        wall3.rotation.y = Math.PI / 2;
        wall3.castShadow = true;
        wall3.receiveShadow = true;
        sceneRef.current?.add(wall3);

        const wall4 = new THREE.Mesh(wall3Geometry, wallMaterial);
        wall4.position.set((obj.left || 0) * scale + width / 2, height / 2, (obj.top || 0) * scale);
        wall4.rotation.y = -Math.PI / 2;
        wall4.castShadow = true;
        wall4.receiveShadow = true;
        sceneRef.current?.add(wall4);

        // Ceiling
        const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
        const ceilingMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          roughness: 0.9,
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.set((obj.left || 0) * scale, height, (obj.top || 0) * scale);
        ceiling.receiveShadow = true;
        sceneRef.current?.add(ceiling);

        // Add basic furniture (e.g., a table)
        if (obj.furniture?.type === 'table') {
          const tableGeometry = new THREE.BoxGeometry(1, 0.8, 1);
          const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            roughness: 0.7,
          });
          const table = new THREE.Mesh(tableGeometry, tableMaterial);
          table.position.set((obj.left || 0) * scale, 0.4, (obj.top || 0) * scale);
          table.castShadow = true;
          table.receiveShadow = true;
          sceneRef.current?.add(table);
        }
      }

      if (obj.type === 'Line' || obj.type === 'path') {
        const points = obj.type === 'Line' ? 
          [obj.x1 || 0, obj.y1 || 0, obj.x2 || 0, obj.y2 || 0] : 
          obj.path?.flatMap(([cmd, x, y]: [string, number, number]) => (cmd === 'M' || cmd === 'L') ? [x, y] : []) || [];
        
        for (let i = 0; i < points.length - 2; i += 2) {
          const x1 = points[i];
          const y1 = points[i + 1];
          const x2 = points[i + 2];
          const y2 = points[i + 3];
          const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * scale;
          const height = wallHeight;
          const thickness = 0.1;
          const color = obj.stroke ? new THREE.Color(obj.stroke) : new THREE.Color(0x000000);

          const centerX = ((x1 + x2) / 2) * scale;
          const centerZ = ((y1 + y2) / 2) * scale;
          const angle = Math.atan2(y2 - y1, x2 - x1);

          const wallGeometry = new THREE.BoxGeometry(length, height, thickness);
          const wallMaterial = new THREE.MeshStandardMaterial({
            map: wallTexture,
            color,
            transparent: true,
            opacity: 0.7,
            roughness: 0.5,
          });
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(centerX, height / 2, centerZ);
          wall.rotation.y = angle;
          wall.castShadow = true;
          wall.receiveShadow = true;
          sceneRef.current?.add(wall);
        }
      }
    });

    if (sceneRef.current && rendererRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  useEffect(() => {
    if (canvasData) {
      convertTo3D();
    }
  }, [canvasData, wallHeight]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-2">
        <button
          onClick={convertTo3D}
          className="px-4 py-2 text-white rounded"
          style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
        >
          🔄 Перевести в 3D
        </button>
        <input
          type="number"
          value={wallHeight}
          onChange={(e) => setWallHeight(Number(e.target.value))}
          className="px-2 py-1 border rounded"
          placeholder="Высота стен (м)"
          step="0.1"
          min="1"
          max="5"
        />
        <button
          onClick={() => setShowHelpers(!showHelpers)}
          className="px-4 py-2 text-white rounded"
          style={{ backgroundColor: showHelpers ? '#ef4444' : '#10b981' }}
        >
          {showHelpers ? 'Скрыть сетку' : 'Показать сетку'}
        </button>
      </div>
      <div ref={containerRef} className="flex-1" />
    </div>
  );
};








