import React from 'react';

/**
 * GOYEN · GlitchTitle
 * The signature headline: clean white face + offset blue/cyan ghosts.
 * Headlines only — never body or rider.
 */
export function GlitchTitle({
  children,
  as = 'h2',
  live = false,
  size = 'display',
  style = {},
  ...rest
}) {
  const sizes = {
    hero: 'var(--type-hero)',
    display: 'var(--type-display)',
    title: 'var(--type-title)',
  };
  const Tag = as;
  const text = typeof children === 'string' ? children : '';
  return (
    <Tag
      data-text={text}
      className={`gy-glitch${live ? ' gy-glitch--live' : ''}`}
      style={{ fontSize: sizes[size] || size, margin: 0, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
