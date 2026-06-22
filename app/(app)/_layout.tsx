import { useEffect } from 'react';
import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Импорт контекста из единой точки распределения стейта
import { AuthProvider, useAuth } from '../../src/features/auth/context/AuthContext';

// Инициализация ядра TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 1000 * 60 * 60 * 24, // Время жизни кэша в RAM — 24 часа
    },
  },
});

// Настройка персистенции кэша на диске устройства
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function InitialLayout() {
  const { isAuthorized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Блокируем выполнение команд маршрутизации до тех пор, 
    // пока Expo Router полностью не смонтирует корневой Slot
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    // Макрозадача (setTimeout) гарантирует, что навигация вызовется 
    // строго в следующем тике Event Loop, когда контекст навигатора уже активен
    const timer = setTimeout(() => {
      if (!isAuthorized && !inAuthGroup) {
        // Нет сессии -> принудительный шлюз на экран авторизации
        router.replace('/(auth)/login');
      } else if (isAuthorized && inAuthGroup) {
        // Успешный вход -> переброс в защищенную зону на вкладку Невесты
        router.replace('/(app)/brides');
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [isAuthorized, segments, navigationState?.key]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PersistQueryClientProvider 
        client={queryClient} 
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <InitialLayout />
      </PersistQueryClientProvider>
    </AuthProvider>
  );
}