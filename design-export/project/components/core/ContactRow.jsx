import React from 'react';

/**
 * GOYEN · ContactRow
 * THE fix vs the 2025 kit: contact value is always copyable plain text.
 * Icon (optional) accompanies the label, never replaces it.
 */
export function ContactRow({ label, value, href = null, icon = null, copyable = true, style = {}, ...rest }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = (e) => {
    if (!copyable) return;
    try {
      navigator.clipboard?.writeText(typeof value === 'string' ? value : '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (_) {}
  };
  const Value = href ? 'a' : 'span';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-3) 0',
        borderBottom: '1px solid var(--border-hairline)',
        ...style,
      }}
      {...rest}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-micro)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        minWidth: 110,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
      }}>
        {icon}{label}
      </span>
      <Value
        href={href || undefined}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-mono)',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          flex: 1,
          wordBreak: 'break-all',
        }}
      >
        {value}
      </Value>
      {copyable && (
        <button
          onClick={onCopy}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-micro)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: copied ? 'var(--accent)' : 'var(--text-faint)',
            background: 'transparent',
            border: '1px solid var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '6px 10px',
            cursor: 'pointer',
            transition: 'color var(--dur-fast), border-color var(--dur-fast)',
          }}
        >
          {copied ? 'copiado' : 'copiar'}
        </button>
      )}
    </div>
  );
}
