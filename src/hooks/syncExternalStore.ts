import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {}; // 无需订阅逻辑
}

export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true, // 客户端返回 true
    () => false // 服务端返回 false
  );
}
