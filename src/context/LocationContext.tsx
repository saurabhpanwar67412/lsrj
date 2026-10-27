import React, { createContext, useContext, useState, useEffect } from 'react';
import { District } from '../types';

interface Coordinates {
  lat: number;
  lng: number;
}

const DISTRICT_COORDINATES: Record<District, Coordinates> = {
  Gurugram: { lat: 28.4595, lng: 77.0266 },
  Faridabad: { lat: 28.4089, lng: 77.3178 }
};

interface LocationContextType {
  district: District;
  currentDistrict: District;
  setDistrict: (district: District) => void;
  userCoords: Coordinates;
  isLocating: boolean;
  requestCurrentLocation: () => void;
  locationPermissionStatus: 'prompt' | 'granted' | 'denied';
  calculateDistance: (lat: number, lng: number) => number;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const DISTRICT_STORAGE_KEY = 'nlp_selected_district';

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [district, setDistrictState] = useState<District>(() => {
    const saved = localStorage.getItem(DISTRICT_STORAGE_KEY);
    return saved === 'Faridabad' ? 'Faridabad' : 'Gurugram';
  });

  const [userCoords, setUserCoords] = useState<Coordinates>(DISTRICT_COORDINATES[district]);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  useEffect(() => {
    localStorage.setItem(DISTRICT_STORAGE_KEY, district);
    setUserCoords(DISTRICT_COORDINATES[district]);
  }, [district]);

  const setDistrict = (newDistrict: District) => {
    setDistrictState(newDistrict);
  };

  const requestCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserCoords(coords);
        setLocationPermissionStatus('granted');
        setIsLocating(false);

        // Auto detect nearest NCR district
        const distToGurgaon = Math.hypot(coords.lat - DISTRICT_COORDINATES.Gurugram.lat, coords.lng - DISTRICT_COORDINATES.Gurugram.lng);
        const distToFaridabad = Math.hypot(coords.lat - DISTRICT_COORDINATES.Faridabad.lat, coords.lng - DISTRICT_COORDINATES.Faridabad.lng);
        if (distToFaridabad < distToGurgaon) {
          setDistrictState('Faridabad');
        } else {
          setDistrictState('Gurugram');
        }
      },
      () => {
        setLocationPermissionStatus('denied');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  // Haversine formula distance calculation
  const calculateDistance = (lat: number, lng: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat - userCoords.lat) * Math.PI) / 180;
    const dLon = ((lng - userCoords.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userCoords.lat * Math.PI) / 180) *
        Math.cos((lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  return (
    <LocationContext.Provider
      value={{
        district,
        currentDistrict: district,
        setDistrict,
        userCoords,
        isLocating,
        requestCurrentLocation,
        locationPermissionStatus,
        calculateDistance
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const useLocationContext = useLocation;

