import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  createActorWithConfig,
  useInternetIdentity,
} from "@caffeineai/core-infrastructure";
import { mockBackend } from "@/mocks/backend";

declare const CANISTER_ID_BACKEND: string | undefined;

const ACTOR_QUERY_KEY = "actor";

async function resolveBackendCanisterId() {
  if (
    typeof CANISTER_ID_BACKEND !== "undefined" &&
    CANISTER_ID_BACKEND &&
    CANISTER_ID_BACKEND !== "undefined"
  ) {
    return CANISTER_ID_BACKEND;
  }

  try {
    const baseUrl = import.meta.env.BASE_URL || "/";
    const response = await fetch(`${baseUrl}env.json`, { cache: "no-store" });
    if (!response.ok) {
      return undefined;
    }

    const config = (await response.json()) as { backend_canister_id?: unknown };
    const backendCanisterId = typeof config.backend_canister_id === "string" ? config.backend_canister_id : undefined;
    if (!backendCanisterId || backendCanisterId === "undefined") {
      return undefined;
    }

    return backendCanisterId;
  } catch {
    return undefined;
  }
}

async function createActorWithMockFallback(createActor: unknown, options?: unknown) {
  const backendCanisterId = await resolveBackendCanisterId();
  if (!backendCanisterId) {
    return mockBackend;
  }

  return await createActorWithConfig(createActor as any, options as any);
}

export function useActor(createActor: unknown) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();

  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return createActorWithMockFallback(createActor);
      }

      return createActorWithMockFallback(createActor, {
        agentOptions: { identity },
      });
    },
    staleTime: Number.POSITIVE_INFINITY,
    enabled: true,
  });

  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => !query.queryKey.includes(ACTOR_QUERY_KEY),
      });
      queryClient.refetchQueries({
        predicate: (query) => !query.queryKey.includes(ACTOR_QUERY_KEY),
      });
    }
  }, [actorQuery.data, queryClient]);

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
  };
}
