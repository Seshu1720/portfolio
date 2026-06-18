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

Formspree needs a real form endpoint before messages can be delivered to your email.

1. Go to `https://formspree.io/`.
2. Sign in or create a free account.
3. Create a new form.
4. Set the receiving email to `seshu.perikala58@gmail.com`.
5. Copy the endpoint. It will look like:

```text
https://formspree.io/f/abcdwxyz
```

6. Open `index.html`.
7. Find this line:

```html
<form class="contact-form glass reveal" id="contactForm" action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" method="POST" novalidate>
```

8. Replace `https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID` with your real Formspree endpoint.
9. Deploy the updated files to GitHub Pages.
10. Submit one test message from the live website and confirm the Formspree email verification if prompted.

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
