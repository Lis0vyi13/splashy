import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsaXNvdnkyM0BnbWFpbC5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2OTg5MjU0MDAsImV4cCI6MTY5ODkzMDgwMH0.DXQFfVZxYv1hYz3n8jK3m5Hk3v4y7w5y6Z8x9y0z1xY',
    description: 'Access token',
  })
  accessToken: string;
}
