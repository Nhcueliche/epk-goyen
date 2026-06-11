import * as React from 'react';

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'clean' | 'glitch';
  color?: 'white' | 'electric' | string;
  /** px number or any CSS font-size. */
  size?: number | string;
  live?: boolean;
}

/**
 * The GOYEN wordmark (Archivo Black). Clean for small/flyer use, glitch for covers.
 */
export function Wordmark(props: WordmarkProps): JSX.Element;
