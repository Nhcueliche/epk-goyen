One brutalist mono CTA; use `primary` for the single electric accent per view, `secondary`/`ghost` for everything else.

```jsx
<Button variant="primary" size="lg" onClick={book}>Reservar fecha</Button>
<Button variant="secondary" as="a" href="#rider">Rider técnico</Button>
<Button variant="ghost" size="sm">Cerrar</Button>
```

Variants: `primary` (electric, glows), `secondary` (blue hairline frame), `ghost` (muted text). Sizes `sm | md | lg`. Pass `iconLeft`/`iconRight` for Lucide icons. Use `as="a"` + `href` for link buttons.
