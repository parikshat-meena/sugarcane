import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/authStore';

export function HomeScreen() {
  const logout = useAuthStore(state => state.logout);
  const username = useAuthStore(state => state.user?.username ?? 'User');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {username}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
});

