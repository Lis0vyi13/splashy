export type Database = {
  public: {
    Tables: {
      users: {
        Row: { id: string; avatarUrl: string };
        Insert: { avatarUrl: string };
      };
    };
    Views: object;
    Functions: object;
  };
};
