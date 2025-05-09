import { MiddlewareMiddleware } from './auth.middleware';

describe('MiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddlewareMiddleware()).toBeDefined();
  });
});
