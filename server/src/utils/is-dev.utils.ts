import { ConfigService } from '@nestjs/config';

export const isDev = (configService: ConfigService) => {
  const env = configService.get<string>('NODE_ENV');
  return env === 'development';
};
