import * as React from 'react';

export interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Dotted leader between label and value. Default true. */
  leader?: boolean;
}

/** Mono key/value row for rider lines, specs and fast facts. */
export function DataRow(props: DataRowProps): JSX.Element;
