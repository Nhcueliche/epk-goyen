import * as React from 'react';

export interface LinkRowProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Mono platform label, e.g. 'SoundCloud', 'Instagram'. */
  platform: React.ReactNode;
  label: React.ReactNode;
  href?: string;
}

/** External link row (sets, socials, press) — text label + trailing arrow. */
export function LinkRow(props: LinkRowProps): JSX.Element;
