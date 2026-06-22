import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../src/features/auth/hooks/useAuth';

export default function Index() {
  const { session, isLoading } = useAuth();

  // Пока контекст инициализируется, показываем индикатор загрузки, 
  // чтобы избежать мерцания пустых экранов
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Декларативный редирект в зависимости от статуса мок-сессии
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)/home" />;
}