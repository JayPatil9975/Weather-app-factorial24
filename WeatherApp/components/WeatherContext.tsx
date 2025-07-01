import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WeatherData {
  temp: number;
  description: string;
  city: string;
  country: string;
  humidity: number;
  wind: number;
}

interface WeatherContextProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => void;
  fetchWeatherByCoords: (lat: number, lon: number) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      // Use the provided OpenWeatherMap API key
      const apiKey = '4abcc25e2c7275cf694e0dde6979a058';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (e: any) {
      setError(e.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default city on mount
  useEffect(() => {
    fetchWeather('Mumbai');
  }, []);

  // New: Fetch weather by latitude and longitude
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = '4abcc25e2c7275cf694e0dde6979a058';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error('Location not found');
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (e: any) {
      setError(e.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, error, fetchWeather, fetchWeatherByCoords }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
