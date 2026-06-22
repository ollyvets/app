import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { useTheme } from '../../src/utils/theme';
import { Logo } from '../../src/components/icons/Logo';
import { useAuth } from '../../src/features/auth/context/AuthContext';

export default function LoginScreen() {
  const { colors, metrics } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      login();
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* ScrollView устраняет рассинхрон анимаций */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            bounces={false} 
            showsVerticalScrollIndicator={false}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40, 
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