import * as React from 'react';

export interface ContactRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  /** Always plain, copyable text — never an icon alone (the 2025 kit's mistake). */
  value: React.ReactNode;
  href?: string | null;
  icon?: React.ReactNode;
  /** Show the copy button. Default true. */
  copyable?: boolean;
}

/**
 * Contact line with always-visible copyable text + a copy button.
 * @startingPoint section="Core" subtitle="Copyable contact row (the booker-friendly fix)" viewport="700x140"
 */
export function ContactRow(props: ContactRowProps): JSX.Element;
