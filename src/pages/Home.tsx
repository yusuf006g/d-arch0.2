import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Box, PenTool, Save } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: PenTool,
      title: 'Рисуйте в 2D',
      description: 'Создавайте планы помещений с помощью простого 2D редактора',
    },
    {
      icon: Box,
      title: 'Просматривайте в 3D',
      description: 'Мгновенно визуализируйте ваш план в трехмерном пространстве',
    },
    {
      icon: Save,
      title: 'Сохраняйте проекты',
      description: 'Все ваши проекты сохраняются локально и доступны в любое время',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-gray-900 dark:text-white mb-4">
            Архитектурный редактор 2D → 3D
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Создавайте архитектурные планы в 2D и мгновенно визуализируйте их в 3D.
            Простой и мощный инструмент для дизайнеров и архитекторов.
          </p>
          <Button
            size="lg"
            className="gap-2"
            style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
            onClick={() => navigate('/projects')}
          >
            Начать работу
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <feature.icon
                className="w-12 h-12 mb-4"
                style={{ color: 'var(--accent-color, #3B82F6)' }}
              />
              <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-gray-900 dark:text-white mb-6">Быстрый старт</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
              >
                1
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Перейдите в раздел «Проекты»</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Создайте новый проект или откройте существующий
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
              >
                2
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Рисуйте план в 2D редакторе</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Используйте инструменты для создания комнат и стен
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-color, #3B82F6)' }}
              >
                3
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Нажмите «Перевести в 3D»</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Ваш план автоматически превратится в 3D модель
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
