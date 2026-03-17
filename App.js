import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { initDB, getCount, setCount } from './db';

export default function App() {
  const [count, setCountState] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDB()
      .then(() => getCount())
      .then(val => { setCountState(val); setReady(true); });
  }, []);

  const increment = async () => {
    const newVal = count + 1;
    await setCount(newVal);
    setCountState(newVal);
  };

  if (!ready) return (
    <View style={styles.container}>
      <Text style={styles.sub}>Chargement…</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello <Text style={styles.accent}>World</Text></Text>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity style={styles.btn} onPress={increment}>
        <Text style={styles.btnText}>TAP ME</Text>
      </TouchableOpacity>
      <Text style={styles.sub}>Stocké en SQLite natif · permanent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center', gap: 24 },
  title:    { fontSize: 40, fontWeight: '700', color: '#f0f0f0', letterSpacing: -1 },
  accent:   { color: '#ff4500' },
  count:    { fontSize: 80, fontWeight: '700', color: '#ff4500' },
  btn:      { backgroundColor: '#ff4500', paddingVertical: 14, paddingHorizontal: 48, borderRadius: 4 },
  btnText:  { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 2 },
  sub:      { color: '#555', fontSize: 13 },
});