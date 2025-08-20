import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/authStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/auth/AuthNavigator';

const loginSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  password: z.string().min(4, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const login = useAuthStore(state => state.login);
  const isSubmitting = useAuthStore(state => state.isLoading);
  const errorMessage = useAuthStore(state => state.errorMessage);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  function onSubmit(values: LoginForm) {
    login(values.username, values.password);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.field}>
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.field}>
            <TextInput
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              secureTextEntry
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title={isSubmitting ? 'Signing in...' : 'Sign in'} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />

      <View style={styles.linksRow}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotUsername')}>
          <Text style={styles.link}>Forgot username?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  field: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  error: { color: 'crimson', marginTop: 6 },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  link: { color: '#0066cc' },
});

