import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useWeather } from '../../components/WeatherContext';

export default function HomeScreen() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [city, setCity] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={() => fetchWeather(city)}
        returnKeyType="search"
      />
      <Button title="Get Weather" onPress={() => fetchWeather(city)} />
      {loading && <ActivityIndicator style={{ margin: 20 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>{weather.city}, {weather.country}</Text>
          <Text style={styles.temp}>{weather.temp}°C</Text>
          <Text style={styles.desc}>{weather.description}</Text>
          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#fff',
  },
  card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
