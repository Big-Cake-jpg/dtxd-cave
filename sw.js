importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
);

let cacheSuffixVersion = "-230414"; // 缓存版本号
const maxEntries = 100; // 最大条目数

core.setCacheNameDetails({
  prefix: "dtxd-cave", // 前缀
  suffix: cacheSuffixVersion, // 后缀
});

workbox.routing.registerRoute(
  // 匹配 fonts.googleapis.com 和 fonts.gstatic.com 两个域名
  new RegExp("^https://(?:fonts\\.googleapis\\.com|fonts\\.gstatic\\.com)"),
  new workbox.strategies.StaleWhileRevalidate({
    // cache storage 名称和版本号
    cacheName: "font-cache" + cacheSuffixVersion,
    plugins: [
      // 使用 expiration 插件实现缓存条目数目和时间控制
      new workbox.expiration.ExpirationPlugin({
        // 最大保存项目
        maxEntries,
        // 缓存 30 天
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      // 使用 cacheableResponse 插件缓存状态码为 0 的请求
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("^https://npm\\.onmicrosoft\\.cn"),
  new workbox.strategies.CacheFirst({
    cacheName: "static-immutable" + cacheSuffixVersion,
    fetchOptions: {
      mode: "cors",
      credentials: "omit",
    },
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("^https://jsd\\.onmicrosoft\\.cn"),
  new workbox.strategies.CacheFirst({
    cacheName: "static-immutable" + cacheSuffixVersion,
    fetchOptions: {
      mode: "cors",
      credentials: "omit",
    },
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp(".*.(?:png|jpg|jpeg|svg|gif|webp)"),
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp(".*.(css|js)"),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
  })
);
