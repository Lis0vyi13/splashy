import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Splashy API')
    .setDescription('The Splashy API description')
    .addBearerAuth()
    .build();
};
