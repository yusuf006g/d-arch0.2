import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, Trash2, Archive } from 'lucide-react';
import { getProjects, deleteProject, archiveProject, Project } from '../utils/storage';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = getProjects();
    setProjects(allProjects);
  };

  const createNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `Проект ${projects.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    navigate(`/editor/${newProject.id}`, { state: { project: newProject } });
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      loadProjects();
      setProjectToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleArchive = async (project: Project) => {
    await archiveProject(project);
    deleteProject(project.id);
    loadProjects();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-900 dark:text-white">Проекты</h1>
          <Button
            onClick={createNewProject}
            className="gap-2"
            style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
          >
            <Plus className="w-5 h-5" />
            Создать проект
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-gray-900 dark:text-white mb-2">Нет проектов</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Создайте свой первый проект, чтобы начать работу
            </p>
            <Button
              onClick={createNewProject}
              style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
            >
              Создать первый проект
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 cursor-pointer"
                  onClick={() => navigate(`/editor/${project.id}`)}
                  style={{
                    backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : undefined,
                    backgroundSize: 'cover',
                  }}
                />
                <div className="p-4">
                  <h3
                    className="text-gray-900 dark:text-white mb-2 cursor-pointer hover:opacity-70"
                    onClick={() => navigate(`/editor/${project.id}`)}
                  >
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Обновлено: {formatDate(project.updatedAt)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/editor/${project.id}`)}
                    >
                      Открыть
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArchive(project)}
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Проект будет удален навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
