'use client';

import { LanguageProvider } from './LanguageContext';
import { ToastProvider } from './ToastContext';
import { StoreProvider } from './StoreContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <StoreProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </StoreProvider>
        </LanguageProvider>
    );
}
