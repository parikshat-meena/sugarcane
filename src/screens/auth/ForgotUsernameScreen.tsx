import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/authStore';

const schema = z.object({ email: z.string().email('Valid email required') });
type Form = z.infer<typeof schema>;

export function ForgotUsernameScreen() {
  const sendUsernameReminder = useAuthStore(state => state.sendUsernameReminder);
  const isLoading = useAuthStore(state => state.isLoading);
  const infoMessage = useAuthStore(state => state.infoMessage);
  const errorMessage = useAuthStore(state => state.errorMessage);

  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: Form) {
    sendUsernameReminder(values.email);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your username</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.field}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
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
      <Button title={isLoading ? 'Sending...' : 'Send username'} onPress={handleSubmit(onSubmit)} disabled={isLoading} />
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

