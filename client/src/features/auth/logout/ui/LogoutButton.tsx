'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/shared/ui/Button';

import { useLogoutMutation } from '../model';

const LogoutButton = () => {
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      variant="destructive"
    >
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;
