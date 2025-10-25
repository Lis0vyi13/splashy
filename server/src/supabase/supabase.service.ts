import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Database } from './types/database.type';

@Injectable()
export class SupabaseService {
  public readonly supabaseClient: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {
    this.supabaseClient = createClient<Database>(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!,
    );
  }
}
