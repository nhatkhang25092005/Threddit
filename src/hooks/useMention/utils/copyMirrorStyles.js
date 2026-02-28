import { MIRROR_STYLE_PROPS } from "../const";
export function copyMirrorStyles(target, computedStyle) {
  MIRROR_STYLE_PROPS.forEach((prop) => {
    target.style[prop] = computedStyle[prop];
  });
}