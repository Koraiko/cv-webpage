import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JsonReader } from '../shared/JsonReader';
import { Settings, AppState } from '../types';

// ========================================================================================
// CONTEXT TYPES
// ========================================================================================

/**
 * Context value interface including state and setters
 */
interface AppContextValue extends AppState {
    setSettings: (settings: Settings) => void;
    setIsLoading: (value: boolean) => void;
}

/**
 * Props for the AppProvider component
 */
interface AppProviderProps {
    children: ReactNode;
}

// ========================================================================================
// CONTEXT CREATION
// ========================================================================================

const AppContext = createContext<AppContextValue | undefined>(undefined);

// ========================================================================================
// PROVIDER COMPONENT
// ========================================================================================

/**
 * AppProvider component that manages global application state
 * Provides settings, loading states, and other shared variables to all child components
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    // Global state variables
    const [settings, setSettings] = useState<Settings>({
        "color-styles": {
            "background-primary": undefined,
            "background-secondary": undefined,
            "text-primary": undefined,
            "text-secondary": undefined,
            "highlight": undefined
        }
    });
    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load settings on provider mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                setIsLoading(true);
                const reader = new JsonReader();
                const data = await reader.readJson("/settings.json");
                setSettings(data as Settings);
                console.log("Settings loaded:", data);
            } catch (error) {
                console.error("Failed to load settings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, []);

    // Context value object
    const contextValue: AppContextValue = {
        settings,
        isLoading,
        setSettings,
        setIsLoading
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// ========================================================================================
// CUSTOM HOOKS
// ========================================================================================

/**
 * Custom hook to access the app context
 * Throws an error if used outside of AppProvider
 */
export const useAppContext = (): AppContextValue => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

/**
 * Custom hook to access settings specifically
 */
export const useSettings = () => {
    const { settings } = useAppContext();
    return settings;
};

/**
 * Custom hook to access loading state
 */
export const useLoadingState = () => {
    const { isLoading, setIsLoading } = useAppContext();
    return { isLoading, setIsLoading };
};