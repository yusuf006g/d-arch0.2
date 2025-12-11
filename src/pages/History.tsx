import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory, HistoryEntry } from '../utils/storage';
import { Button } from '../components/ui/button';
import { Trash2, Clock } from 'lucide-react';
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

export const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const entries = getHistory();
    setHistory(entries);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    setClearDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-900 dark:text-white">История изменений</h1>
          {history.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setClearDialogOpen(true)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Очистить историю
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-gray-900 dark:text-white mb-2">История пуста</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Здесь будут отображаться все ваши действия в проектах
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white mb-1">
                      {entry.action}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Проект ID: {entry.projectId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Очистить историю?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Вся история изменений будет удалена.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory}>
              Очистить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
