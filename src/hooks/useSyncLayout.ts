import { useEffect, useRef } from "react";
import { useDashStore } from "@/store/useDashStore";
import { useSession } from "@/lib/auth-client";

export function useSyncLayout() {
  const { data: session, isPending } = useSession();
  const { categories, setCategories } = useDashStore();
  const initialSyncDone = useRef(false);

  // 1. Fetch initial layout if logged in
  useEffect(() => {
    if (isPending) return;
    
    if (session && !initialSyncDone.current) {
      const fetchLayout = async () => {
        try {
          const res = await fetch("/api/layout");
          if (res.ok) {
            const data = await res.json();
            if (data?.layout && Array.isArray(data.layout) && data.layout.length > 0) {
              setCategories(data.layout);
            }
          }
        } catch (error) {
          console.error("Failed to fetch layout:", error);
        } finally {
          initialSyncDone.current = true;
        }
      };
      fetchLayout();
    }
  }, [session, isPending, setCategories]);

  // 2. Sync to cloud with debounce
  useEffect(() => {
    if (!session || !initialSyncDone.current) return;

    const timer = setTimeout(async () => {
      try {
        await fetch("/api/layout", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ layout: categories }),
        });
      } catch (error) {
        console.error("Failed to sync layout:", error);
      }
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(timer);
  }, [categories, session]);
}
