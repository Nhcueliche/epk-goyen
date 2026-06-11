import React from 'react';

/**
 * GOYEN · Button
 * Brutalist, square-ish. One electric "primary" per view max.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 'var(--type-small)', minHeight: 38 },
    md: { padding: '12px 22px', fontSize: 'var(--type-body)', minHeight: 46 },
    lg: { padding: '16px 30px', fontSize: 'var(--type-lead)', minHeight: 56 },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6em',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-xs)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...sizes[size],
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      boxShadow: 'var(--shadow-accent-glow)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-frame)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      borderColor: 'transparent',
    },
  };

  const Tag = as;
  return (
    <Tag
      disabled={as === 'button' ? disabled : undefined}
      data-variant={variant}
      className="gy-btn"
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </Tag>
  );
}
