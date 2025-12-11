// import React, { useEffect, useRef } from 'react';
// import { Canvas, Rect, Line } from 'fabric';

// interface Editor2DProps {
//   onUpdate?: (canvas: Canvas) => void;
//   initialData?: any;
// }

// export const Editor2D: React.FC<Editor2DProps> = ({ onUpdate, initialData }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const fabricRef = useRef<Canvas | null>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const canvas = new Canvas(canvasRef.current, {
//       width: 800,
//       height: 600,
//       backgroundColor: '#ffffff',
//     });

//     fabricRef.current = canvas;

//     // Загрузка данных если есть
//     if (initialData) {
//       canvas.loadFromJSON(initialData, () => {
//         canvas.renderAll();
//       });
//     } else {
//       // Добавляем пример: простой прямоугольник (комната)
//       const rect = new Rect({
//         left: 100,
//         top: 100,
//         width: 200,
//         height: 150,
//         fill: 'transparent',
//         stroke: '#000',
//         strokeWidth: 2,
//       });
//       canvas.add(rect);
//     }

//     // Обработчик изменений
//     canvas.on('object:modified', () => {
//       if (onUpdate && fabricRef.current) {
//         onUpdate(fabricRef.current);
//       }
//     });

//     return () => {
//       canvas.dispose();
//     };
//   }, []);

//   const addWall = () => {
//     if (!fabricRef.current) return;
    
//     const line = new Line([50, 50, 200, 50], {
//       stroke: '#000',
//       strokeWidth: 3,
//       selectable: true,
//     });
    
//     fabricRef.current.add(line);
//     if (onUpdate) onUpdate(fabricRef.current);
//   };

//   const addRoom = () => {
//     if (!fabricRef.current) return;
    
//     const rect = new Rect({
//       left: Math.random() * 300,
//       top: Math.random() * 300,
//       width: 150,
//       height: 120,
//       fill: 'rgba(59, 130, 246, 0.1)',
//       stroke: '#3B82F6',
//       strokeWidth: 2,
//     });
    
//     fabricRef.current.add(rect);
//     if (onUpdate) onUpdate(fabricRef.current);
//   };

//   const clear = () => {
//     if (!fabricRef.current) return;
//     fabricRef.current.clear();
//     fabricRef.current.backgroundColor = '#ffffff';
//     fabricRef.current.renderAll();
//     if (onUpdate) onUpdate(fabricRef.current);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-2">
//         <button
//           onClick={addRoom}
//           className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600"
//         >
//           + Комната
//         </button>
//         <button
//           onClick={addWall}
//           className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600"
//         >
//           + Стена
//         </button>
//         <button
//           onClick={clear}
//           className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600"
//         >
//           Очистить
//         </button>
//       </div>
//       <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
//         <canvas ref={canvasRef} className="border border-gray-300 dark:border-gray-700" />
//       </div>
//     </div>
//   );
// };












// import React, { useEffect, useRef, useState } from 'react';
// import * as fabric from 'fabric';


// interface Editor2DProps {
//   onUpdate?: (data: any) => void;
//   initialData?: any;
// }

// export const Editor2D: React.FC<Editor2DProps> = ({ onUpdate, initialData }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const fabricRef = useRef<fabric.Canvas | null>(null);
//   const [isDrawingMode, setIsDrawingMode] = useState(false);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Инициализация Fabric.js canvas
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasRef.current.parentElement?.clientWidth || 800,
//       height: canvasRef.current.parentElement?.clientHeight || 600,
//       backgroundColor: '#ffffff',
//     });
//     fabricRef.current = canvas;

//     // Snapping к сетке (10 пикселей) для перемещения объектов
//     canvas.on('object:moving', (e) => {
//       const obj = e.target;
//       if (obj) {
//         obj.left = Math.round(obj.left! / 10) * 10;
//         obj.top = Math.round(obj.top! / 10) * 10;
//       }
//     });

//     // Загрузка начальных данных
//     if (initialData) {
//       canvas.loadFromJSON(initialData, () => {
//         canvas.renderAll();
//       });
//     } else {
//       // Пример: добавляем прямоугольник (комната)
//       const rect = new fabric.Rect({
//         left: 100,
//         top: 100,
//         width: 200,
//         height: 150,
//         fill: 'transparent',
//         stroke: '#000',
//         strokeWidth: 2,
//       });
//       canvas.add(rect);
//       canvas.renderAll();
//     }

//     // Обработка ресайза
//     const handleResize = () => {
//       if (!canvasRef.current || !fabricRef.current) return;
//       fabricRef.current.setWidth(canvasRef.current.parentElement?.clientWidth || 800);
//       fabricRef.current.setHeight(canvasRef.current.parentElement?.clientHeight || 600);
//       fabricRef.current.renderAll();
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       canvas.dispose();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [initialData]);

//   // Функция переключения режима рисования
//   const toggleDrawingMode = () => {
//     if (!fabricRef.current) return;
//     const newMode = !isDrawingMode;
//     setIsDrawingMode(newMode);
//     fabricRef.current.isDrawingMode = newMode;

//     if (newMode) {
//       // Инициализируем PencilBrush для рисования линий
//       fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
//       fabricRef.current.freeDrawingBrush.color = '#000'; // Цвет линии
//       fabricRef.current.freeDrawingBrush.width = 3; // Толщина линии
//     }
//   };

//   // Функция добавления комнаты (прямоугольник)
//   const addRoom = () => {
//     if (!fabricRef.current) return;
//     const rect = new fabric.Rect({
//       left: Math.random() * 300 + 50,
//       top: Math.random() * 300 + 50,
//       width: 150,
//       height: 120,
//       fill: 'rgba(59, 130, 246, 0.1)',
//       stroke: '#3B82F6',
//       strokeWidth: 2,
//       selectable: true,
//     });
//     fabricRef.current.add(rect);
//     fabricRef.current.renderAll();
//   };

//   // Функция добавления стены (линия)
//   const addWall = () => {
//     if (!fabricRef.current) return;
//     const line = new fabric.Line([100, 100, 300, 100], {
//       stroke: '#000',
//       strokeWidth: 3,
//       selectable: true,
//     });
//     fabricRef.current.add(line);
//     fabricRef.current.renderAll();
//   };

//   // Очистка canvas
//   const clear = () => {
//     if (!fabricRef.current) return;
//     fabricRef.current.clear();
//     fabricRef.current.backgroundColor = '#ffffff';
//     fabricRef.current.renderAll();
//     if (onUpdate) onUpdate(null);
//   };

//   // Сохранение проекта
//   const saveProject = () => {
//     if (!fabricRef.current) return;
//     localStorage.setItem('project', JSON.stringify(fabricRef.current.toJSON()));
//     alert('Проект сохранён!');
//   };

//   // Загрузка проекта
//   const loadProject = () => {
//     if (!fabricRef.current) return;
//     const data = localStorage.getItem('project');
//     if (data) {
//       fabricRef.current.loadFromJSON(JSON.parse(data), () => {
//         fabricRef.current?.renderAll();
//       });
//     } else {
//       alert('Нет сохранённого проекта!');
//     }
//   };

//   // Отправка данных в 3D
//   const showIn3D = () => {
//     if (!fabricRef.current || !onUpdate) return;
//     const data = fabricRef.current.toJSON();
//     onUpdate(data);
//     alert('Чертеж передан в 3D!');
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-2 flex-wrap">
//         <button onClick={addRoom} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           + Комната
//         </button>
//         <button onClick={addWall} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           + Стена (фиксированная)
//         </button>
//         <button onClick={toggleDrawingMode} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           {isDrawingMode ? 'Выключить рисование' : 'Рисовать стену (мышью)'}
//         </button>
//         <button onClick={clear} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           Очистить
//         </button>
//         <button onClick={saveProject} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           Сохранить
//         </button>
//         <button onClick={loadProject} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           Загрузить
//         </button>
//         <button onClick={showIn3D} className="px-3 py-1 text-sm text-white rounded" style={{ backgroundColor: '#3B82F6' }}>
//           Показать в 3D
//         </button>
//       </div>
//       <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
//         <canvas ref={canvasRef} className="border border-gray-300 dark:border-gray-700" />
//       </div>
//     </div>
//   );
// };













import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

interface Editor2DProps {
  onUpdate?: (data: any) => void;
  initialData?: any;
}

export const Editor2D: React.FC<Editor2DProps> = ({ onUpdate, initialData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error('canvasRef.current не определён');
      return;
    }

    try {
      console.log('Инициализация Fabric.js, версия:', fabric.version);
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasRef.current.parentElement?.clientWidth || 800,
        height: canvasRef.current.parentElement?.clientHeight || 600,
        backgroundColor: '#ffffff',
      });
      fabricRef.current = canvas;

      // Snapping к сетке (10 пикселей)
      canvas.on('object:moving', (e) => {
        const obj = e.target;
        if (obj) {
          obj.left = Math.round(obj.left! / 10) * 10;
          obj.top = Math.round(obj.top! / 10) * 10;
        }
      });

      // Загрузка начальных данных
      if (initialData) {
        canvas.loadFromJSON(initialData, () => {
          canvas.renderAll();
          console.log('Начальные данные загружены:', initialData);
        });
      } else {
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 150,
          fill: 'transparent',
          stroke: '#000',
          strokeWidth: 2,
        });
        canvas.add(rect);
        canvas.renderAll();
        console.log('Добавлен пример прямоугольника');
      }

      // Обработка ресайза
      const handleResize = () => {
        if (!canvasRef.current || !fabricRef.current) return;
        fabricRef.current.setWidth(canvasRef.current.parentElement?.clientWidth || 800);
        fabricRef.current.setHeight(canvasRef.current.parentElement?.clientHeight || 600);
        fabricRef.current.renderAll();
      };
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        canvas.dispose();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Ошибка при инициализации Fabric.js:', error);
    }
  }, [initialData]);

  const toggleDrawingMode = () => {
    if (!fabricRef.current) {
      console.error('fabricRef.current не определён');
      return;
    }

    try {
      console.log('PencilBrush доступен:', !!fabric.PencilBrush);
      const newMode = !isDrawingMode;
      setIsDrawingMode(newMode);
      fabricRef.current.isDrawingMode = newMode;

      if (newMode) {
        if (!fabric.PencilBrush) {
          console.error('fabric.PencilBrush не найден. Версия Fabric.js:', fabric.version);
          return;
        }
        fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
        fabricRef.current.freeDrawingBrush.color = '#000';
        fabricRef.current.freeDrawingBrush.width = 3;
        console.log('PencilBrush инициализирован');
      }
    } catch (error) {
      console.error('Ошибка при настройке режима рисования:', error);
    }
  };

  const addRoom = () => {
    if (!fabricRef.current) return;
    const rect = new fabric.Rect({
      left: Math.random() * 300 + 50,
      top: Math.random() * 300 + 50,
      width: 150,
      height: 120,
      fill: 'rgba(59, 130, 246, 0.1)',
      stroke: '#3B82F6',
      strokeWidth: 2,
      selectable: true,
    });
    fabricRef.current.add(rect);
    fabricRef.current.renderAll();
    console.log('Добавлена комната');
  };

  const addWall = () => {
    if (!fabricRef.current) return;
    const line = new fabric.Line([100, 100, 300, 100], {
      stroke: '#000',
      strokeWidth: 3,
      selectable: true,
    });
    fabricRef.current.add(line);
    fabricRef.current.renderAll();
    console.log('Добавлена стена');
  };

  const clear = () => {
    if (!fabricRef.current) return;
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = '#ffffff';
    fabricRef.current.renderAll();
    if (onUpdate) onUpdate(null);
    console.log('Canvas очищен');
  };

  const saveProject = () => {
    if (!fabricRef.current) return;
    localStorage.setItem('project', JSON.stringify(fabricRef.current.toJSON()));
    alert('Проект сохранён!');
    console.log('Проект сохранён');
  };

  const loadProject = () => {
    if (!fabricRef.current) return;
    const data = localStorage.getItem('project');
    if (data) {
      fabricRef.current.loadFromJSON(JSON.parse(data), () => {
        fabricRef.current?.renderAll();
        console.log('Проект загружен');
      });
    } else {
      alert('Нет сохранённого проекта!');
    }
  };

  const showIn3D = () => {
    if (!fabricRef.current) {
      console.error('fabricRef.current не определён');
      return;
    }
    if (!onUpdate) {
      console.error('onUpdate не передан в Editor2D');
      return;
    }
    try {
      const data = fabricRef.current.toJSON();
      console.log('Данные для 3D:', JSON.stringify(data, null, 2));
      onUpdate(data);
      alert('Чертеж передан в 3D!');
    } catch (error) {
      console.error('Ошибка при передаче данных в 3D:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-2 flex-wrap">
        <button onClick={addRoom} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
          + Комната
        </button>
        <button onClick={addWall} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
          + Стена (фиксированная)
        </button>
        <button onClick={toggleDrawingMode} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
          {isDrawingMode ? 'Выключить рисование' : 'Рисовать стену (мышью)'}
        </button>
        <button onClick={clear} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
          Очистить
        </button>
        <button onClick={saveProject} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
          Сохранить
        </button>
        <button onClick={loadProject} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
          Загрузить
        </button>
        <button onClick={showIn3D} className="px-3 py-1 text-sm text-white rounded" style={{ backgroundColor: '#3B82F6' }}>
          Показать в 3D
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
        <canvas ref={canvasRef} className="border border-gray-300 dark:border-gray-700" />
      </div>
    </div>
  );
};












// import React, { useEffect, useRef, useState } from 'react';
// import * as fabric from 'fabric';

// interface Editor2DProps {
//   onUpdate?: (data: any) => void;
//   initialData?: any;
// }

// export const Editor2D: React.FC<Editor2DProps> = ({ onUpdate, initialData }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const fabricRef = useRef<fabric.Canvas | null>(null);
//   const [isDrawingMode, setIsDrawingMode] = useState(false);

//   useEffect(() => {
//     if (!canvasRef.current || !containerRef.current) {
//       console.error('canvasRef.current или containerRef.current не определены');
//       return;
//     }

//     try {
//       console.log('Инициализация Fabric.js, версия:', fabric.version);
//       const canvas = new fabric.Canvas(canvasRef.current, {
//         width: containerRef.current.clientWidth || 800,
//         height: containerRef.current.clientHeight || 600,
//         backgroundColor: '#ffffff',
//       });
//       fabricRef.current = canvas;

//       // Snapping к сетке (10 пикселей, с учетом зума)
//       canvas.on('object:moving', (e) => {
//         const obj = e.target;
//         if (obj) {
//           const zoom = canvas.getZoom();
//           const grid = 10 / zoom; // Корректировка snapping под зум
//           obj.left = Math.round(obj.left! / grid) * grid;
//           obj.top = Math.round(obj.top! / grid) * grid;
//         }
//       });

//       // Загрузка начальных данных
//       if (initialData) {
//         canvas.loadFromJSON(initialData, () => {
//           canvas.renderAll();
//           console.log('Начальные данные загружены:', initialData);
//         });
//       } else {
//         const rect = new fabric.Rect({
//           left: 100,
//           top: 100,
//           width: 200,
//           height: 150,
//           fill: 'transparent',
//           stroke: '#000',
//           strokeWidth: 2,
//         });
//         canvas.add(rect);
//         canvas.renderAll();
//         console.log('Добавлен пример прямоугольника');
//       }

//       // Реализация бесконечного холста с зумом и паннингом
//       let isDragging = false;
//       let lastPosX = 0;
//       let lastPosY = 0;

//       canvas.on('mouse:down', (opt) => {
//         const evt = opt.e;
//         if (evt.altKey) {
//           isDragging = true;
//           canvas.selection = false;
//           lastPosX = evt.screenX;
//           lastPosY = evt.screenY;

//           const onMouseMove = (e: MouseEvent) => {
//             if (isDragging) {
//               const vpt = canvas.viewportTransform;
//               vpt[4] += e.screenX - lastPosX;
//               vpt[5] += e.screenY - lastPosY;
//               canvas.requestRenderAll();
//               lastPosX = e.screenX;
//               lastPosY = e.screenY;
//             }
//           };

//           const onMouseUp = (e: MouseEvent) => {
//             canvas.setViewportTransform(canvas.viewportTransform);
//             isDragging = false;
//             canvas.selection = true;
//             document.removeEventListener('mousemove', onMouseMove);
//             document.removeEventListener('mouseup', onMouseUp);
//           };

//           document.addEventListener('mousemove', onMouseMove);
//           document.addEventListener('mouseup', onMouseUp);
//         }
//       });

//       canvas.on('mouse:wheel', (opt) => {
//         const delta = opt.e.deltaY;
//         let zoom = canvas.getZoom();
//         zoom *= 0.999 ** delta;
//         if (zoom > 20) zoom = 20;
//         if (zoom < 0.01) zoom = 0.01;
//         canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//         opt.e.preventDefault();
//         opt.e.stopPropagation();
//       });

//       // Обработка ресайза
//       const handleResize = () => {
//         if (!canvasRef.current || !fabricRef.current || !containerRef.current) return;
//         fabricRef.current.setWidth(containerRef.current.clientWidth);
//         fabricRef.current.setHeight(containerRef.current.clientHeight);
//         fabricRef.current.renderAll();
//       };
//       window.addEventListener('resize', handleResize);
//       handleResize();

//       return () => {
//         canvas.dispose();
//         window.removeEventListener('resize', handleResize);
//       };
//     } catch (error) {
//       console.error('Ошибка при инициализации Fabric.js:', error);
//     }
//   }, [initialData]);

//   const toggleDrawingMode = () => {
//     if (!fabricRef.current) {
//       console.error('fabricRef.current не определён');
//       return;
//     }

//     try {
//       console.log('PencilBrush доступен:', !!fabric.PencilBrush);
//       const newMode = !isDrawingMode;
//       setIsDrawingMode(newMode);
//       fabricRef.current.isDrawingMode = newMode;

//       if (newMode) {
//         if (!fabric.PencilBrush) {
//           console.error('fabric.PencilBrush не найден. Версия Fabric.js:', fabric.version);
//           return;
//         }
//         fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
//         fabricRef.current.freeDrawingBrush.color = '#000';
//         fabricRef.current.freeDrawingBrush.width = 3;
//         console.log('PencilBrush инициализирован');
//       }
//     } catch (error) {
//       console.error('Ошибка при настройке режима рисования:', error);
//     }
//   };

//   const addRoom = () => {
//     if (!fabricRef.current) return;
//     const rect = new fabric.Rect({
//       left: Math.random() * 300 + 50,
//       top: Math.random() * 300 + 50,
//       width: 150,
//       height: 120,
//       fill: 'rgba(59, 130, 246, 0.1)',
//       stroke: '#3B82F6',
//       strokeWidth: 2,
//       selectable: true,
//     });
//     fabricRef.current.add(rect);
//     fabricRef.current.renderAll();
//     console.log('Добавлена комната');
//   };

//   const addWall = () => {
//     if (!fabricRef.current) return;
//     const line = new fabric.Line([100, 100, 300, 100], {
//       stroke: '#000',
//       strokeWidth: 3,
//       selectable: true,
//     });
//     fabricRef.current.add(line);
//     fabricRef.current.renderAll();
//     console.log('Добавлена стена');
//   };

//   const clear = () => {
//     if (!fabricRef.current) return;
//     fabricRef.current.clear();
//     fabricRef.current.backgroundColor = '#ffffff';
//     fabricRef.current.renderAll();
//     if (onUpdate) onUpdate(null);
//     console.log('Canvas очищен');
//   };

//   const saveProject = () => {
//     if (!fabricRef.current) return;
//     localStorage.setItem('project', JSON.stringify(fabricRef.current.toJSON()));
//     alert('Проект сохранён!');
//     console.log('Проект сохранён');
//   };

//   const loadProject = () => {
//     if (!fabricRef.current) return;
//     const data = localStorage.getItem('project');
//     if (data) {
//       fabricRef.current.loadFromJSON(JSON.parse(data), () => {
//         fabricRef.current?.renderAll();
//         console.log('Проект загружен');
//       });
//     } else {
//       alert('Нет сохранённого проекта!');
//     }
//   };

//   const showIn3D = () => {
//     if (!fabricRef.current) {
//       console.error('fabricRef.current не определён');
//       return;
//     }
//     if (!onUpdate) {
//       console.error('onUpdate не передан в Editor2D');
//       return;
//     }
//     try {
//       const data = fabricRef.current.toJSON();
//       console.log('Данные для 3D:', JSON.stringify(data, null, 2));
//       onUpdate(data);
//       alert('Чертеж передан в 3D!');
//     } catch (error) {
//       console.error('Ошибка при передаче данных в 3D:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-2 flex-wrap">
//         <button onClick={addRoom} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           + Комната
//         </button>
//         <button onClick={addWall} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           + Стена (фиксированная)
//         </button>
//         <button onClick={toggleDrawingMode} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           {isDrawingMode ? 'Выключить рисование' : 'Рисовать стену (мышью)'}
//         </button>
//         <button onClick={clear} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           Очистить
//         </button>
//         <button onClick={saveProject} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           Сохранить
//         </button>
//         <button onClick={loadProject} className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
//           Загрузить
//         </button>
//         <button onClick={showIn3D} className="px-3 py-1 text-sm text-white rounded" style={{ backgroundColor: '#3B82F6' }}>
//           Показать в 3D
//         </button>
//       </div>
//       <div ref={containerRef} className="flex-1 overflow-hidden p-4 bg-gray-100 dark:bg-gray-900">
//         <canvas ref={canvasRef} className="border border-gray-300 dark:border-gray-700" />
//       </div>
//     </div>
//   );
// };