Contact line with always-visible copyable text and a copy button — the booker-friendly fix vs the old icon-only row.

```jsx
<ContactRow label="Booking" value="bookings.goyen@gmail.com" href="mailto:bookings.goyen@gmail.com" />
<ContactRow label="Instagram" value="@goyen" href="https://instagram.com/goyen" />
<ContactRow label="BES" value="@bes.rave" />
```

`icon` may accompany the label (Lucide), never replace the value. Set `copyable={false}` to hide the copy button.
