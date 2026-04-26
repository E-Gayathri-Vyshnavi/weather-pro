export interface WeatherData {
  name: string;
  main: { 
    temp: number; 
    humidity: number; 
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [{ 
    main: string; 
    description: string; 
    icon: string; // The specific icon code (e.g., '01d')
  }];
  wind: { 
    speed: number 
  };
  sys: {
    country: string;
  };
}