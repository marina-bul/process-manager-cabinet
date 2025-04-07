import { useState, useEffect, useCallback } from 'react';

import { apiService } from '../../api/ApiService';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('auth_token');
    });

    const login = useCallback(async () => {
        try {
            await apiService.getToken();
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Cannot get token:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('auth_token'));
    }, []);

    return {
        isAuthenticated,
        login,
        logout,
    };
}
