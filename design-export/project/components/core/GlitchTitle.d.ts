import * as React from 'react';

export interface GlitchTitleProps extends React.HTMLAttributes<HTMLElement> {
  /** Must be a plain string — it is mirrored into the ghost layers. */
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  /** Animate the flicker (respects prefers-reduced-motion). Off by default. */
  live?: boolean;
  /** Preset display size or any CSS font-size string. */
  size?: 'hero' | 'display' | 'title' | string;
}

/**
 * The signature GOYEN glitch headline — white face with offset blue/cyan ghosts.
 * Headlines and the wordmark only; never reading copy or the rider.
 * @startingPoint section="Brand" subtitle="Signature glitch headline" viewport="700x220"
 */
export function GlitchTitle(props: GlitchTitleProps): JSX.Element;
