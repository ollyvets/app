import { View, Text } from 'react-native';
import { useTheme } from '../../../src/utils/theme';

export default function BridesScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Модуль Невест</Text>
    </View>
  );
}