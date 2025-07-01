import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useWeather } from '../../components/WeatherContext';

export default function DetailsScreen() {
  const { weather } = useWeather();

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>No weather data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather Details</Text>
      <Text style={styles.label}>City:</Text>
      <Text style={styles.value}>{weather.city}, {weather.country}</Text>
      <Text style={styles.label}>Temperature:</Text>
      <Text style={styles.value}>{weather.temp}°C</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{weather.description}</Text>
      <Text style={styles.label}>Humidity:</Text>
      <Text style={styles.value}>{weather.humidity}%</Text>
      <Text style={styles.label}>Wind Speed:</Text>
      <Text style={styles.value}>{weather.wind} m/s</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    marginBottom: 4,
  },
});
