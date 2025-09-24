import type { NextConfig } from 'next';
import nextConfig from './next.config.js';

type SecurityHeader = {
  key: string;
  value: string;
};

type RouteHeaderConfig = {
  source: string;
  headers: SecurityHeader[];
};

type NextConfigWithHeaders = NextConfig & {
  headers: () => Promise<RouteHeaderConfig[]>;
  images: NonNullable<NextConfig['images']> & { contentSecurityPolicy: string };
};

const config = nextConfig as NextConfigWithHeaders;

describe('security headers helper', () => {
  it('applies the expected security headers to all routes', async () => {
    expect(typeof config.headers).toBe('function');

    const headers = await config.headers();
    const routeConfig = headers.find((entry) => entry.source === '/:path*');

    if (!routeConfig) {
      throw new Error('Expected security headers to be configured for all routes.');
    }

    const headerMap = Object.fromEntries(
      routeConfig.headers.map((header) => [header.key, header.value] as const)
    ) as Record<string, string>;

    expect(headerMap).toMatchObject({
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      'Content-Security-Policy': config.images.contentSecurityPolicy,
      'X-DNS-Prefetch-Control': 'off',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
    });

    const expectedCsp = [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' https: data:",
      `script-src 'self' 'unsafe-inline'${
        process.env.NODE_ENV !== 'production' ? " 'unsafe-eval'" : ''
      }`,
      `connect-src 'self'${process.env.NODE_ENV !== 'production' ? ' ws:' : ''}`,
      "frame-ancestors 'none'",
    ].join('; ');

    expect(headerMap['Content-Security-Policy']).toBe(expectedCsp);
  });

  it('keeps the CSP value shared between headers and image configuration', async () => {
    const headers = await config.headers();
    const routeConfig = headers.find((entry) => entry.source === '/:path*');

    if (!routeConfig) {
      throw new Error('Expected security headers to be configured for all routes.');
    }

    const cspHeader = routeConfig.headers.find(
      (header) => header.key === 'Content-Security-Policy'
    );
    expect(cspHeader?.value).toBe(config.images.contentSecurityPolicy);
  });
});
