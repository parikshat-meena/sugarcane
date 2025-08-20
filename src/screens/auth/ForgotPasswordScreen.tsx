import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/authStore';

const schema = z.object({
  usernameOrEmail: z.string().min(3, 'Enter username or email'),
});

type Form = z.infer<typeof schema>;

export function ForgotPasswordScreen() {
  const startResetPassword = useAuthStore(state => state.startResetPassword);
  const isLoading = useAuthStore(state => state.isLoading);
  const infoMessage = useAuthStore(state => state.infoMessage);
  const errorMessage = useAuthStore(state => state.errorMessage);

  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { usernameOrEmail: '' },
  });

  function onSubmit(values: Form) {
    startResetPassword(values.usernameOrEmail);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <Controller
        control={control}
        name="usernameOrEmail"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.field}>
            <TextInput
              placeholder="Username or Email"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
      {infoMessage ? <Text style={styles.info}>{infoMessage}</Text> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title={isLoading ? 'Sending...' : 'Send reset link'} onPress={handleSubmit(onSubmit)} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 24, textAlign: 'center' },
  field: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  error: { color: 'crimson', marginTop: 6 },
  info: { color: '#0a7', marginBottom: 8 },
});

