// tests/auth.test.js
import { isAuthenticated } from '../src/middleware/auth.js';
import httpMocks from 'node-mocks-http';

describe('auth middleware', () => {
  test('autorise avec token admin-token', () => {
    const req = httpMocks.createRequest({
      headers: { authorization: 'admin-token' },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    isAuthenticated(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('rejette sans token', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    isAuthenticated(req, res, () => {});
    expect(res.statusCode).toBe(401);
  });

  test('rejette avec token incorrect', () => {
    const req = httpMocks.createRequest({
      headers: { authorization: 'bad-token' },
    });
    const res = httpMocks.createResponse();

    isAuthenticated(req, res, () => {});
    expect(res.statusCode).toBe(403);
  });
});
