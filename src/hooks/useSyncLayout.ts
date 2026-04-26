import { useEffect, useRef, useState } from "react";
import { useDashStore } from "@/store/useDashStore";
import { useSession } from "@/lib/auth-client";

export function useSyncLayout() {
  const { data: session, isPending } = useSession();
  const { categories, setCategories } = useDashStore();
  
  const [cloudSynced, setCloudSynced] = useState(false);
  const initialSyncDone = useRef(false);
  const lastCloudState = useRef<string | null>(null);

  // 1. Fetch initial layout se estiver logado
  useEffect(() => {
    if (isPending || initialSyncDone.current) return;
    
    if (session) {
      initialSyncDone.current = true;
      const fetchLayout = async () => {
        try {
          const res = await fetch("/api/layout");
          if (res.ok) {
            const data = await res.json();
            if (data?.layout && Array.isArray(data.layout) && data.layout.length > 0) {
              setCategories(data.layout);
              lastCloudState.current = JSON.stringify(data.layout);
            }
          }
        } catch (error) {
          // Falha silenciosa para fallback local
        } finally {
          setCloudSynced(true);
        }
      };
      fetchLayout();
    } else {
      // Se não tem sessão ativa, consideramos "sincronizado" (apenas local)
      setCloudSynced(true);
    }
  }, [session, isPending, setCategories]);

  // 2. Sincronização em nuvem com Debounce Seguro
  useEffect(() => {
    if (!session || !cloudSynced) return;

    const currentCategoriesStr = JSON.stringify(categories);
    
    // Evita loop enviando o mesmo estado que acabou de ser baixado
    if (currentCategoriesStr === lastCloudState.current) return;

    const timer = setTimeout(async () => {
      try {
        await fetch("/api/layout", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ layout: categories }),
        });
        lastCloudState.current = currentCategoriesStr;
      } catch (error) {
        // Falha silenciosa
      }
    }, 2000); // 2 segundos de debounce para evitar spam

    return () => clearTimeout(timer);
  }, [categories, session, cloudSynced]);
}
