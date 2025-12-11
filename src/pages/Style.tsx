import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Palette, Moon, Sun } from 'lucide-react';

export const Style: React.FC = () => {
  const { theme, toggleTheme, accentColor, setAccentColor } = useTheme();

  const presetColors = [
    { name: 'Синий', value: '#3B82F6' },
    { name: 'Фиолетовый', value: '#8B5CF6' },
    { name: 'Розовый', value: '#EC4899' },
    { name: 'Зелёный', value: '#10B981' },
    { name: 'Оранжевый', value: '#F59E0B' },
    { name: 'Красный', value: '#EF4444' },
    { name: 'Индиго', value: '#6366F1' },
    { name: 'Бирюзовый', value: '#14B8A6' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 dark:text-white mb-2">Настройки стиля</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Настройте внешний вид приложения под себя
          </p>
        </div>

        {/* Тема */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {theme === 'light' ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-blue-400" />
            )}
            <h2 className="text-gray-900 dark:text-white">Тема</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Выберите светлую или тёмную тему интерфейса
          </p>
          <div className="flex gap-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => theme === 'dark' && toggleTheme()}
              className="gap-2"
            >
              <Sun className="w-4 h-4" />
              Светлая
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => theme === 'light' && toggleTheme()}
              className="gap-2"
            >
              <Moon className="w-4 h-4" />
              Тёмная
            </Button>
          </div>
        </div>

        {/* Акцентный цвет */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6" style={{ color: accentColor }} />
            <h2 className="text-gray-900 dark:text-white">Акцентный цвет</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Выберите основной цвет интерфейса
          </p>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {presetColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setAccentColor(color.value)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105"
                style={{
                  borderColor: accentColor === color.value ? color.value : 'transparent',
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-gray-900 dark:text-white">{color.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <label className="block text-gray-900 dark:text-white mb-2">
              Или выберите свой цвет:
            </label>
            <div className="flex gap-4">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-20 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white"
                placeholder="#3B82F6"
              />
            </div>
          </div>
        </div>

        {/* Предпросмотр */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mt-6">
          <h2 className="text-gray-900 dark:text-white mb-4">Предпросмотр</h2>
          <div className="space-y-4">
            <Button style={{ backgroundColor: accentColor }} className="text-white">
              Кнопка с акцентным цветом
            </Button>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: accentColor + '20', borderLeft: `4px solid ${accentColor}` }}
            >
              <p className="text-gray-900 dark:text-white">
                Пример блока с акцентным цветом
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
