import { useEffect } from "react";
import { initViewportFocus } from "@/lib/animations/viewportFocus";

export function useViewportFocus() {
  useEffect(() => {
    return initViewportFocus();
  }, []);
}
