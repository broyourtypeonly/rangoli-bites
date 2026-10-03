# Rangoli Bites Express

Recreate and publicly deploy my existing restaurant ordering website "Rangoli Bites" as a standalone public website. It must NOT require user login or any Higgsfield account.

Preserve this design and functionality:
- Brand: Rangoli Bites
- Indian minimalist restaurant aesthetic with a subtle animated Holi-inspired theme: pink, yellow, green accents, clean white/cream surfaces, tasteful rangoli-inspired decorative details.
- Hero headline: "Colour outside. Eat inside."
- Sticky minimalist navbar.
- Menu cards with quantity steppers and a floating cart.
- Menu items and prices:
  1. Royal Chicken Biryani — ₹249
  2. Gulab Jamun — ₹99
  3. Saffron Ice Cream — ₹89
  4. Seekh Kebab — ₹199
- Story section titled "The Rangoli Way"
- Delivery information strip.
- Checkout modal/form collecting customer name, phone number, delivery address, and preferred delivery time.
- Order summary and total.
- After order submission, show a clear confirmation to the customer.
- Restaurant order notification should be designed to send an email to rsrigangaram@gmail.com. If a server-side email provider/secret is not yet connected, keep the order flow working and make the email integration easy to configure later; never expose secrets in client-side code.
- Use temporary food photography for now; structure the code so the images can be replaced later.
- Fully responsive on phone and desktop.
- No authentication, no sign-in screen, no Higgsfield SDK, no account requirement.
- Make the public production deployment accessible anonymously to anyone with the link.

Please build the complete working site, not a mockup. Use a simple reliable full-stack setup suitable for public hosting.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rangoli-bites-order-joy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7e2d76de-23cd-42ac-b226-70a6d62ceced).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
