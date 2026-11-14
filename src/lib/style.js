/* Inline style for an image focal point (object-position via --fp) plus any extra custom properties */
export const fp = (focal, extra) => ({ '--fp': focal, ...extra });
