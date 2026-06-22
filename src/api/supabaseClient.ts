import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';
import { Database } from './types/database';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const isMockMode = !SUPABASE_URL || !SUPABASE_ANON_KEY;

if (isMockMode) {
  console.warn('⚠️ Запуск в MOCK-режиме: ключи Supabase отсутствуют, бэкенд отключен.');
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

// Передаем фейковые данные, чтобы избежать краша инициализации
export const supabase = createClient<Database>(
  SUPABASE_URL || 'https://mock.supabase.co',
  SUPABASE_ANON_KEY || 'mock-key',
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: !isMockMode,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

AppState.addEventListener('change', (state) => {
  if (!isMockMode) {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  }
});