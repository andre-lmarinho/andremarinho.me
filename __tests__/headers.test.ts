type SecurityHeader = {
  key: string;
  value: string;
};

type RouteHeaderConfig = {
  source: string;
  headers: SecurityHeader[];
};

type NextConfigWithHeaders = {
  headers: () => Promise<RouteHeaderConfig[]>;
  images: {
    contentSecurityPolicy: string;
  };
};

const nextConfig = require('../next.config.js') as NextConfigWithHeaders;

describe('next.config.js security headers', () => {
  it('applies the expected security headers to all routes', async () => {
    expect(typeof nextConfig.headers).toBe('function');

    const headers = await nextConfig.headers();
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
      'Content-Security-Policy': nextConfig.images.contentSecurityPolicy,
      'X-DNS-Prefetch-Control': 'off',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
    });

    expect(headerMap['Content-Security-Policy']).toBe(
      "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' https: data:; script-src 'self'; connect-src 'self'; frame-ancestors 'none'"
    );
  });
});
