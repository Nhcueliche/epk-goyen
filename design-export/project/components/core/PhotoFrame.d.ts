import * as React from 'react';

export interface PhotoFrameProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. '3 / 4' or '16 / 9'. */
  ratio?: string;
  scrim?: boolean;
  scanlines?: boolean;
  frame?: boolean;
  /** Mono caption shown bottom-left. */
  caption?: React.ReactNode;
  /** Overlaid content (e.g. a GlitchTitle), bottom-aligned. */
  children?: React.ReactNode;
}

/**
 * Brand photo treatment — hairline frame, blue scrim, scanlines, caption band.
 * @startingPoint section="Brand" subtitle="Duotone photo frame with scanlines" viewport="500x600"
 */
export function PhotoFrame(props: PhotoFrameProps): JSX.Element;
