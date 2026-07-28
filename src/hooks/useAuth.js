import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken, logout } from '../actions'

function decodeJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

function isJwtValid(token) {
    if (!token) return false;
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return true; 
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp > nowInSeconds;
}

export const useAuth = () => {
    const dispatch = useDispatch();
    const {user, token} = useSelector(state => state.user);

    const login = (userData, token) => {
        dispatch(setUser(userData));
        dispatch(setToken(token));
        localStorage.setItem('token', token);
    }

    const updateUser = (userData) => {
        dispatch(setUser(userData));
    }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    }

    const isAuthenticated = useMemo(() => isJwtValid(token), [token]);

    return {
        user,
        token,
        login,
        updateUser,
        logout: handleLogout,
        isAuthenticated
    }
}