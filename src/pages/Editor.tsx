import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Editor2D } from '../components/Editor2D';
import { Editor3D } from '../components/Editor3D';
import { getProject, saveProject, addHistoryEntry } from '../utils/storage';
import type { Project } from '../utils/storage';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [canvasData, setCanvasData] = useState<any>(null);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (!id) {
      console.error('ID проекта не указан');
      navigate('/projects');
      return;
    }

    // Проверяем, есть ли проект в state (новый проект)
    const stateProject = location.state?.project as Project | undefined;
    if (stateProject) {
      setProject(stateProject);
      setProjectName(stateProject.name);
      setCanvasData(stateProject.canvas2D);
      saveProject(stateProject);
      console.log('Загружен новый проект:', stateProject);
    } else {
      // Загружаем существующий проект
      const existingProject = getProject(id);
      if (existingProject) {
        setProject(existingProject);
        setProjectName(existingProject.name);
        setCanvasData(existingProject.canvas2D);
        console.log('Загружен существующий проект:', existingProject);
      } else {
        console.error('Проект не найден:', id);
        navigate('/projects');
      }
    }
  }, [id, location.state, navigate]);

  const handleCanvasUpdate = (data: any) => {
    console.log('Editor: Получены данные от Editor2D:', JSON.stringify(data, null, 2));
    setCanvasData(data);
  };

  const handleSave = () => {
    if (!project || !id) {
      console.error('Не удалось сохранить проект: project или id отсутствует');
      toast.error('Ошибка при сохранении проекта');
      return;
    }

    const updatedProject: Project = {
      ...project,
      name: projectName,
      canvas2D: canvasData,
      updatedAt: new Date().toISOString(),
    };

    try {
      saveProject(updatedProject);
      addHistoryEntry({
        projectId: id,
        action: 'Сохранение проекта',
        data: canvasData,
      });
      setProject(updatedProject);
      toast.success('Проект сохранён');
      console.log('Проект сохранён:', updatedProject);
    } catch (error) {
      console.error('Ошибка при сохранении проекта:', error);
      toast.error('Ошибка при сохранении проекта');
    }
  };

  if (!project) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        
        <div className="flex-1">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-900 dark:text-white"
            placeholder="Название проекта"
          />
        </div>

        <Button
          onClick={handleSave}
          className="gap-2"
          style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
        >
          <Save className="w-4 h-4" />
          Сохранить
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-800">
          <Editor2D onUpdate={handleCanvasUpdate} initialData={canvasData} />
        </div>
        <div className="w-1/2">
          <Editor3D canvasData={canvasData} />
        </div>
      </div>
    </div>
  );
};