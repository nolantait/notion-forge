var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { Img } from 'react-image';
import { isBrowser } from '../utils';
export var GracefulImage = function (props) {
    if (isBrowser) {
        return React.createElement(Img, __assign({}, props));
    }
    else {
        // @ts-ignore (must use the appropriate subset of props for <img> if using SSR)
        return React.createElement("img", __assign({}, props));
    }
};
//# sourceMappingURL=graceful-image.js.map