import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'accent';
  /** Square is the brand default; pill is the one allowed rounded use. */
  shape?: 'square' | 'pill';
}

/** Small mono chip for genres / descriptors (Hard Techno, Industrial, 150–165 BPM). */
export function Tag(props: TagProps): JSX.Element;
