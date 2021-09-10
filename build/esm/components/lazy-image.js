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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { LazyImageFull, ImageState } from 'react-lazy-images';
import { useNotionContext } from '../context';
import { cs } from '../utils';
/**
 * Progressive, lazy images modeled after Medium's LQIP technique.
 */
export var LazyImage = function (_a) {
    var _b, _c;
    var src = _a.src, alt = _a.alt, className = _a.className, style = _a.style, _d = _a.zoomable, zoomable = _d === void 0 ? false : _d, height = _a.height, rest = __rest(_a, ["src", "alt", "className", "style", "zoomable", "height"]);
    var _e = useNotionContext(), recordMap = _e.recordMap, zoom = _e.zoom, previewImages = _e.previewImages;
    var zoomRef = React.useRef(zoom ? zoom.clone() : null);
    var previewImage = previewImages
        ? (_c = (_b = recordMap) === null || _b === void 0 ? void 0 : _b.preview_images) === null || _c === void 0 ? void 0 : _c[src]
        : null;
    function attachZoom(image) {
        if (zoomRef.current) {
            ;
            zoomRef.current.attach(image);
        }
    }
    var attachZoomRef = zoomable ? attachZoom : undefined;
    if (previewImage) {
        var aspectRatio_1 = previewImage.originalHeight / previewImage.originalWidth;
        return (React.createElement(LazyImageFull, __assign({ src: src }, rest), function (_a) {
            var imageState = _a.imageState, ref = _a.ref;
            var isLoaded = imageState === ImageState.LoadSuccess;
            var wrapperStyle = {
                width: '100%'
            };
            var imgStyle = {};
            if (height) {
                wrapperStyle.height = height;
            }
            else {
                imgStyle.position = 'absolute';
                wrapperStyle.paddingBottom = aspectRatio_1 * 100 + "%";
            }
            return (React.createElement("div", { className: cs('lazy-image-wrapper', isLoaded && 'lazy-image-loaded', className), style: wrapperStyle },
                React.createElement("img", { src: previewImage.dataURIBase64, alt: alt, ref: ref, className: 'lazy-image-preview', style: style, width: previewImage.originalWidth, height: previewImage.originalHeight, decoding: 'async' }),
                React.createElement("img", { src: src, alt: alt, ref: attachZoomRef, className: 'lazy-image-real', style: __assign(__assign({}, style), imgStyle), width: previewImage.originalWidth, height: previewImage.originalHeight, decoding: 'async', loading: 'lazy' })));
        }));
    }
    else {
        // TODO: GracefulImage doesn't seem to support refs, but we'd like to prevent
        // invalid images from loading as error states
        return (React.createElement("img", __assign({ className: className, style: style, src: src, ref: attachZoomRef, loading: 'lazy', alt: alt, decoding: 'async' }, rest)));
    }
};
//# sourceMappingURL=lazy-image.js.map