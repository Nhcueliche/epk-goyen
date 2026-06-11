import * as React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `primary` is the single electric-blue accent — one per view. */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element, e.g. 'a' for links. */
  as?: 'button' | 'a';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary call-to-action button in the GOYEN system. Mono, uppercase, square.
 * @startingPoint section="Core" subtitle="Brutalist mono CTA — one electric primary per view" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
