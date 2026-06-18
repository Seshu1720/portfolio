# Portfolio Deployment and Formspree Setup

## Files to Deploy

Upload everything inside this `outputs` folder to your GitHub Pages repository:

- `index.html`
- `style.css`
- `script.js`
- `profile-photo.jpeg`
- `Perikala Sesha Vardhan_Resume.pdf`

The resume buttons already point to:

```text
Perikala%20Sesha%20Vardhan_Resume.pdf
```

This works on GitHub Pages as long as the PDF stays in the same folder as `index.html`.

## Formspree Contact Form Setup

The portfolio contact form is already connected to this Formspree endpoint:

```text
https://formspree.io/f/mgobjzgp
```

Receiving email:

```text
seshu.perikala58@gmail.com
```

The active form tag in `index.html` is:

```html
<form class="contact-form glass reveal" id="contactForm" action="https://formspree.io/f/mgobjzgp" method="POST" novalidate>
```

After deployment, submit one test message from the live website and confirm the Formspree email verification if prompted.

The form already includes:

- Name, email, and message validation
- Success and error messages
- Honeypot anti-spam field
- Direct fallback email shown on failure

## GitHub Pages Deployment

1. Create a GitHub repository, for example `portfolio`.
2. Upload the files from this `outputs` folder to the repository root.
3. Go to repository `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.
7. GitHub will publish the site at a URL like:

```text
https://your-username.github.io/portfolio/
```

## Final Checks After Deployment

- Click `View Resume` and confirm the PDF opens in a new tab.
- Click `Download Resume` and confirm the PDF downloads.
- Click LinkedIn and GitHub and confirm they open in new tabs.
- Click Email and confirm your mail app opens.
- Submit the contact form after replacing the Formspree endpoint.
- Check the website on mobile and desktop.
