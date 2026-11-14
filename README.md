# Mohamed Youssef KTHIRI — Portfolio

A bilingual, responsive portfolio built with Next.js, React, TypeScript, Tailwind CSS and Framer Motion. It is exported as a static site and deployed to GitHub Pages with GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for GitHub Pages

The GitHub Actions workflow sets the project-site base path and canonical URL before building:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/Portfolio-"
$env:NEXT_PUBLIC_SITE_URL = "https://kthiriyoussef.github.io/Portfolio-/"
npm run build
```

The static site is generated in `out/`. Next.js uses a trailing slash for static routes, and the résumé is available at `/Portfolio-/cv/`.

## Contact form on static hosting

GitHub Pages does not run Next.js API routes, server actions or server-side code. The contact form therefore validates the fields in the browser and opens a prefilled email to the portfolio email address. It does not send email in the background. No API credentials or server are needed.

## Configure and deploy

1. Push this project to `https://github.com/kthiriyoussef/Portfolio-` on the `master` branch.
2. In GitHub, open **Settings → Pages**, set the build and deployment source to **GitHub Actions**, and save.
3. Open the **Actions** tab and watch the **Deploy to GitHub Pages** workflow. It builds the static site, uploads `out/`, and deploys it.
4. When the workflow's deploy job succeeds, visit [https://kthiriyoussef.github.io/Portfolio-/](https://kthiriyoussef.github.io/Portfolio-/).

The custom domain is not configured. Update `lib/portfolio-data.ts` to add real social or project URLs when available.
