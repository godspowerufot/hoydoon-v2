"use client";

import { useMemo } from "react";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import {
  AgentHero,
  AgentCategoryChips,
  AgentGrid,
  AgentConnect,
  AgentGuides,
} from "../components/agent";
import type { AgentListing } from "../components/agent/AgentCard";

function takeAgents(payload: unknown, count: number): AgentListing[] {
  const list = Array.isArray(payload) ? payload : [];
  return list.slice(0, count);
}

export default function AgentPage() {
  const { data: allAgent, isLoading } = useGetAgentsQuery({});

  const featuredAgents = useMemo(
    () => takeAgents(allAgent, 8),
    [allAgent]
  );

  return (
    <div className="home-page">
      <AgentHero />
      <AgentCategoryChips />

      <main>
        <AgentGrid
          id="featured-agents"
          title="Real estate agents on Hoydoon"
          href="/agent/all-agent"
          agents={featuredAgents}
          isLoading={isLoading && featuredAgents.length === 0}
          emptyLabel="No agents to show yet. Browse the full directory instead."
        />
        <AgentConnect />
        <AgentGuides />
      </main>
    </div>
  );
}
