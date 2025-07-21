// Service Worker registration and management
export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  async register(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      this.registration = registration;

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Show update available notification
            this.showUpdateNotification();
          }
        });
      });

      console.log('Service Worker registered successfully');
      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  async checkForUpdates(): Promise<void> {
    if (this.registration) {
      await this.registration.update();
    }
  }

  private showUpdateNotification(): void {
    // Create a custom update notification
    const notification = document.createElement('div');
    notification.className = `
      fixed bottom-4 right-4 bg-primary-custom text-white p-4 rounded-lg shadow-lg z-50
      flex items-center gap-3 max-w-sm animate-in slide-in-from-right duration-300
    `;
    notification.innerHTML = `
      <div class="flex-1">
        <h4 class="font-semibold mb-1">Update Available</h4>
        <p class="text-sm text-white/90">A new version of the app is ready.</p>
      </div>
      <button id="update-btn" class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium transition-colors">
        Update
      </button>
      <button id="dismiss-btn" class="text-white/70 hover:text-white p-1">
        ×
      </button>
    `;

    document.body.appendChild(notification);

    // Handle update button
    notification.querySelector('#update-btn')?.addEventListener('click', () => {
      window.location.reload();
    });

    // Handle dismiss button
    notification.querySelector('#dismiss-btn')?.addEventListener('click', () => {
      notification.remove();
    });

    // Auto dismiss after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 10000);
  }

  // Background sync for offline form submissions
  async scheduleSync(tag: string, data?: any): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      
      if (data) {
        // Store data for later sync
        const cache = await caches.open('form-data');
        const request = new Request(`/api/sync/${tag}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        await cache.put(request, new Response('{}'));
      }

      // Use type assertion for sync property
      await (registration as any).sync.register(tag);
    }
  }

  // Check if app is running offline
  isOffline(): boolean {
    return !navigator.onLine;
  }

  // Get cache usage statistics
  async getCacheStats(): Promise<{
    cacheNames: string[];
    totalSize: number;
    entries: number;
  }> {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    let entries = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      entries += keys.length;

      for (const key of keys) {
        try {
          const response = await cache.match(key);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        } catch (error) {
          console.warn('Error calculating cache size for:', key.url);
        }
      }
    }

    return {
      cacheNames,
      totalSize,
      entries
    };
  }

  // Clear all caches
  async clearCaches(): Promise<void> {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
  }
}

// Hook for React components
export function useServiceWorker() {
  const sw = ServiceWorkerManager.getInstance();

  const registerSW = async () => {
    return await sw.register();
  };

  const checkForUpdates = async () => {
    await sw.checkForUpdates();
  };

  const scheduleSync = async (tag: string, data?: any) => {
    await sw.scheduleSync(tag, data);
  };

  return {
    registerSW,
    checkForUpdates,
    scheduleSync,
    isOffline: sw.isOffline(),
    getCacheStats: sw.getCacheStats.bind(sw),
    clearCaches: sw.clearCaches.bind(sw)
  };
}
