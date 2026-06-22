import { Stack } from 'expo-router';

export default function AppLayout() {
  // На верхнем уровне защищенной зоны используем Stack или Tabs навигацию
  return <Stack screenOptions={{ headerShown: false }} />;
}