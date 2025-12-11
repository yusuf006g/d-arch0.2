export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  canvas2D?: any;
  canvas3D?: any;
  thumbnail?: string;
}

export interface HistoryEntry {
  id: string;
  projectId: string;
  action: string;
  timestamp: string;
  data: any;
}

// LocalStorage для проектов
export const saveProject = (project: Project) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const getProjects = (): Project[] => {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : [];
};

export const getProject = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
};

export const deleteProject = (id: string) => {
  const projects = getProjects().filter(p => p.id !== id);
  localStorage.setItem('projects', JSON.stringify(projects));
};

// История изменений
export const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  history.unshift(newEntry);
  
  // Храним последние 100 записей
  if (history.length > 100) {
    history.splice(100);
  }
  
  localStorage.setItem('history', JSON.stringify(history));
};

export const getHistory = (): HistoryEntry[] => {
  const data = localStorage.getItem('history');
  return data ? JSON.parse(data) : [];
};

export const clearHistory = () => {
  localStorage.setItem('history', JSON.stringify([]));
};

// Архив (IndexedDB)
const DB_NAME = 'ArchiEditorDB';
const DB_VERSION = 1;
const STORE_NAME = 'archive';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const archiveProject = async (project: Project): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ ...project, archivedAt: new Date().toISOString() });
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getArchivedProjects = async (): Promise<Project[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteArchivedProject = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
