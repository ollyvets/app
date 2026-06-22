import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { useTheme } from '../../src/utils/theme';
import { Logo } from '../../src/components/icons/Logo';
import { useAuth } from '../../src/features/auth/context/AuthContext';

export default function LoginScreen() {
  const { colors, metrics } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // Базовая валидация для теста
    if (!email || !password) return;

    setIsLoading(true);
    
    // Эмуляция сетевого запроса
    setTimeout(() => {
      setIsLoading(false);
      login();
      // Переброс в защищенную зону. Путь зависит от твоей структуры (например, '/(app)/home' или '/')
      router.replace('/'); 
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Logo />
            <Text style={[styles.title, { color: colors.text }]}>С возвращением</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Войдите для доступа к примеркам
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input 
              label="Email"
              placeholder="Введите email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            
            <Input 
              label="Пароль"
              placeholder="Введите пароль"
              isPassword
              value={password}
              onChangeText={setPassword}
            />

            <Button 
              title="Войти" 
              onPress={handleLogin} 
              isLoading={isLoading}
              style={{ marginTop: metrics.spacing.md }}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  }
});