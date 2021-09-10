import React from "react";
import throttle from "lodash.throttle";
import { useEffect } from "react";
export default function useScrollSpy(throttleMs) {
    var _a = React.useState(null), activeSection = _a[0], setActiveSection = _a[1];
    var actionSectionScrollSpy = throttle(function () {
        var sections = document.getElementsByClassName("notion-h");
        var prevBBox = null;
        var currentSectionId = activeSection;
        for (var i = 0; i < sections.length; ++i) {
            var section = sections[i];
            if (!section || !(section instanceof Element))
                continue;
            if (!currentSectionId) {
                currentSectionId = section.getAttribute("data-id");
            }
            var bbox = section.getBoundingClientRect();
            var prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
            var offset = Math.max(150, prevHeight / 4);
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
    useEffect(function () {
        window.addEventListener("scroll", actionSectionScrollSpy);
        actionSectionScrollSpy();
        return function () {
            window.removeEventListener("scroll", actionSectionScrollSpy);
        };
    }, []);
    return [activeSection, setActiveSection];
}
//# sourceMappingURL=use-scroll-spy.js.map