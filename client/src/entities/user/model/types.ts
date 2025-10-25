import type { BaseEntity } from '@/entities/types';

export type User = BaseEntity & {
  email: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  dateOfBirth: Date;
  showBirthDay: boolean;
};
