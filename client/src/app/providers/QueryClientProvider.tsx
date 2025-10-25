'use client';

import { QueryClientProvider as QCProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';

import { queryClient } from '@/shared/api/queryClient';

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return <QCProvider client={queryClient}>{children}</QCProvider>;
};
