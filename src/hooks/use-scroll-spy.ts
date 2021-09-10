import { useState } from "react";
import throttle from "lodash.throttle";

import { useEffect } from "react";

export default function useScrollSpy(throttleMs: number) {
  const [activeSection, setActiveSection] = useState(null);

  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName("notion-h");

    let prevBBox: DOMRect = null;
    let currentSectionId = activeSection;

    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i];
      if (!section || !(section instanceof Element)) continue;

      if (!currentSectionId) {
        currentSectionId = section.getAttribute("data-id");
      }

      const bbox = section.getBoundingClientRect();
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
      const offset = Math.max(150, prevHeight / 4);

      // GetBoundingClientRect returns values relative to viewport
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute("data-id");

        prevBBox = bbox;
        continue;
      }

      // No need to continue loop, if last element has been detected
      break;
    }

    setActiveSection(currentSectionId);
  }, throttleMs);

  useEffect(() => {
    window.addEventListener("scroll", actionSectionScrollSpy);

    actionSectionScrollSpy();

    return () => {
      window.removeEventListener("scroll", actionSectionScrollSpy);
    };
  }, []);

  return [activeSection, setActiveSection];
}
