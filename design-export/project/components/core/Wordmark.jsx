import React from 'react';

/**
 * GOYEN · Wordmark
 * The GOYEN name set in Archivo Black. clean (default) or glitch.
 */
export function Wordmark({
  variant = 'clean',
  color = 'white',
  size = 32,
  live = false,
  style = {},
  ...rest
}) {
  const colors = { white: 'var(--white)', electric: 'var(--accent)' };
  const common = {
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-display)',
    lineHeight: 1,
    fontSize: typeof size === 'number' ? `${size}px` : size,
  };
  if (variant === 'glitch') {
    return (
      <span
        data-text="GOYEN"
        className={`gy-glitch${live ? ' gy-glitch--live' : ''}`}
        style={{ ...common, ...style }}
        {...rest}
      >
        GOYEN
      </span>
    );
  }
  return (
    <span style={{ ...common, color: colors[color] || color, ...style }} {...rest}>
      GOYEN
    </span>
  );
}
