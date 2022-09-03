import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase';
import { showNotification } from '@mantine/notifications';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, []);

  async function handleSignUpWithEmailAndPassword({ email, password }) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showNotification({
        message: 'Account successfully created',
      });
      navigate('/');
    } catch (error) {
      showNotification({
        message: error.message,
        color: 'red',
      });
    }
  }

  async function handleSignInWithEmailAndPassword({ email, password }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification({
        message: 'You are now signed in',
      });
      navigate('/');
    } catch (error) {
      let message = '';
      if (error.message.includes('auth/user-not-found')) {
        message = `Cannot find account with email ${email}`;
      } else if (error.message.includes('auth/wrong-password')) {
        message = 'Password is wrong';
      } else {
        message = error.message;
      }
      showNotification({
        message: message,
        color: 'red',
      });
    }
  }

  async function handleSignInWithGoogle() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      showNotification({
        message: 'You are now signed in',
      });
      navigate('/');
    } catch (error) {
      showNotification({
        message: error.message,
        color: 'red',
      });
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      showNotification({
        message: 'You are now signed out',
      });
      navigate('/');
    } catch (error) {
      showNotification({
        message: error.message,
        color: 'red',
      });
    }
  }

  const value = {
    currentUser,
    handleSignUpWithEmailAndPassword,
    handleSignInWithGoogle,
    handleSignInWithEmailAndPassword,
    handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
