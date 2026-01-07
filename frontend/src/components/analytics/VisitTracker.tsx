"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

export function VisitTracker() {
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent double tracking in React Strict Mode (dev)
        if (initialized.current) return;
        initialized.current = true;

        const trackVisit = async () => {
            try {
                let visitorId = localStorage.getItem("km_visitor_id");
                if (!visitorId) {
                    visitorId = crypto.randomUUID();
                    localStorage.setItem("km_visitor_id", visitorId);
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase.from("visits") as any).insert({
                    visitor_id: visitorId,
                    page: window.location.pathname,
                    user_agent: navigator.userAgent,
                });

                if (error) {
                    console.error("Failed to track visit:", error);
                }
            } catch (err) {
                // Silent fail to not disrupt user experience
                console.error("Error in visit tracking:", err);
            }
        };

        // Small delay to ensure client is ready and to not block main thread immediately
        const timer = setTimeout(() => {
            trackVisit();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return null; // This component renders nothing
}
