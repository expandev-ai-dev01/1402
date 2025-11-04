import { useContext } from 'react';
import { AuthContext } from './context';
import type { AuthContextValue } from './types';

/**
 * @hook useAuth
 * @summary Hook to access authentication context
 * @domain core
 * @type context-hook
 * @category authentication
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
