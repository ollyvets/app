import { useColorScheme } from 'react-native';

export const lightTheme = {
  background: '#F2F2F7',      // Основной фон из твоего макета
  surface: '#FFFFFF',         // Фон карточек/инпутов
  text: '#1A1A1A',            // Основной текст
  textSecondary: '#3C3C43',   // Вторичный текст (как в макете)
  primary: '#362623',         // Твой фирменный темно-коричневый
  accent: '#0088FF',          // Синий акцент (кнопки/ссылки)
  border: '#E5E5EA',          // Границы
  error: '#FF3B30',           // Ошибки
};

export const darkTheme = {
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  primary: '#362623',         // Оставляем фирменный для узнаваемости
  accent: '#0A84FF',
  border: '#38383A',
  error: '#FF453A',
};

export const metrics = {
  radius: { sm: 8, md: 12, lg: 16, xl: 30 }, // xl: 30 - скругление твоего логотипа
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkTheme : lightTheme;
  
  return { colors, metrics, isDark };
};