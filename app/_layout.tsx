import { useEffect } from 'react';
import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router'; // Добавлен useRootNavigationState
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthProvider, useAuth } from '../src/features/auth/context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function InitialLayout() {
  const { isAuthorized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState(); // Достаем состояние навигации

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    const timer = setTimeout(() => {
      if (!isAuthorized && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (isAuthorized && inAuthGroup) {
        router.replace('/(app)/home');
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