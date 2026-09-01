import React, { createContext, useContext, useState } from 'react';
import { DistrictCode, GeoPoint } from '../types';
import { usePolicy } from './PolicyContext';

interface LocationContextType {
  district: DistrictCode;
  selectedArea: string;
  userCoords: GeoPoint;
  setDistrict: (district: DistrictCode, areaName?: string) => void;
  setSelectedArea: (area: string) => void;
  requestGeoLocation: () => Promise<boolean>;
}

const DISTRICT_DEFAULTS: Record<DistrictCode, { coords: GeoPoint; defaultArea: string; areas: string[] }> = {
  Gurugram: {
    coords: { lat: 28.4595, lng: 77.0266 },
    defaultArea: 'DLF Cyber Hub',
    areas: ['DLF Cyber Hub', 'Sector 29 Market', 'Golf Course Road', 'MG Road', 'Sohna Road', 'DLF Phase 5'],
  },
  Faridabad: {
    coords: { lat: 28.4089, lng: 77.3178 },
    defaultArea: 'Sector 15 Market',
    areas: ['Sector 15 Market', 'NIT Faridabad', 'Greater Faridabad (Sec 81-89)', 'Mathura Road Corridor'],
  },
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setDistrict: updatePolicyDistrict } = usePolicy();
  const [district, setDistrictState] = useState<DistrictCode>('Gurugram');
  const [selectedArea, setSelectedArea] = useState<string>('DLF Cyber Hub');
  const [userCoords, setUserCoords] = useState<GeoPoint>(DISTRICT_DEFAULTS.Gurugram.coords);

  const setDistrict = (newDistrict: DistrictCode, areaName?: string) => {
    setDistrictState(newDistrict);
    updatePolicyDistrict(newDistrict);
    const def = DISTRICT_DEFAULTS[newDistrict];
    setSelectedArea(areaName || def.defaultArea);
    setUserCoords(def.coords);
  };

  const requestGeoLocation = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            resolve(true);
          },
          () => {
            resolve(false);
          },
          { timeout: 5000 }
        );
      } else {
        resolve(false);
      }
    });
  };

  return (
    <LocationContext.Provider
      value={{
        district,
        selectedArea,
        userCoords,
        setDistrict,
        setSelectedArea,
        requestGeoLocation,
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

export { DISTRICT_DEFAULTS };
