const isServer = typeof window === 'undefined';

const setupMocks = async () => {
  if (isServer) {
    const { server } = await import('./server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('./browser');
    await worker.start({ quiet: true });
  }
};

void setupMocks();

export {};
