import React, { useState, useEffect } from 'react';
import { getArchivedProjects, deleteArchivedProject, Project } from '../utils/storage';
import { Button } from '../components/ui/button';
import { Archive as ArchiveIcon, Trash2 } from 'lucide-react';
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

export const Archive: React.FC = () => {
  const [archivedProjects, setArchivedProjects] = useState<Project[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadArchive();
  }, []);

  const loadArchive = async () => {
    const projects = await getArchivedProjects();
    setArchivedProjects(projects);
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      await deleteArchivedProject(projectToDelete);
      loadArchive();
      setProjectToDelete(null);
      setDeleteDialogOpen(false);
    }
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
        <div className="mb-8">
          <h1 className="text-gray-900 dark:text-white">Архив проектов</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Архивированные проекты хранятся в IndexedDB
          </p>
        </div>

        {archivedProjects.length === 0 ? (
          <div className="text-center py-20">
            <ArchiveIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-gray-900 dark:text-white mb-2">Архив пуст</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Здесь будут храниться архивированные проекты
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div
                  className="h-40 bg-gradient-to-br from-gray-400 to-gray-600"
                  style={{
                    backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : undefined,
                    backgroundSize: 'cover',
                  }}
                />
                <div className="p-4">
                  <h3 className="text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Создан: {formatDate(project.createdAt)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Архивирован: {formatDate((project as any).archivedAt || project.updatedAt)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Удалить из архива
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить проект из архива?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Проект будет удален из архива навсегда.
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
