import { useEffect, useState } from "react";

export function useCachedState<T extends {}>(initActionSet: string, initAction: string, keySuffix: string, defaultData: T) {
    const key = `${initActionSet}_${initAction}_${keySuffix}`;
    const cache = localStorage.getItem(key);
    const hadCache = !!cache
    const [cacheState, setCacheState] = useState<T>(hadCache ? JSON.parse(cache) : defaultData);

    const saveCache = () => localStorage.setItem(key, JSON.stringify(cacheState));

    useEffect(() => saveCache(), [cacheState]);

    return { cacheState, setCacheState, saveCache, hadCache };
}
