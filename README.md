# 183Tracker

A client-side web application for tracking stays in different countries and monitoring tax residency limits (the 183-day rule).

## Public Deployment

**Use it now: [https://183tracker.guztia.com](https://183tracker.guztia.com)**

The application is freely available at the link above. No installation required - just visit the website and start tracking your stays. Self-hosting (instructions below) is completely optional.

## Features

- Track days spent in different countries
- Monitor tax residency thresholds (183-day rule)
- **Rolling 365-day calculation** for accurate tax residency tracking
- Visual indicators for stays within the last year
- Responsive UI built with Vue.js and Bootstrap
- Available in multiple languages: English, Spanish, and Chinese
- Dark/light theme toggler for comfortable viewing
- All data stored locally in your browser (localStorage)
- No server dependencies - works completely offline after initial load

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Run development server
npm run dev
```

## Production Build

```bash
# Build for production
npm run build
```

This will create a `dist` folder containing the static files ready for deployment.

## How It Works

### Rolling 365-Day Window

183Tracker uses a rolling 365-day window calculation by default to accurately track your tax residency status. Many countries count days within the previous 12 months rather than just a calendar year.

- Stays in the last 365 days are highlighted in the stays list
- The summary view shows days counted only within the rolling year window
- Toggle between rolling year and all-time totals with a simple switch

### Day Counting

Days are counted inclusively (both start and end dates are counted as full days), which is the standard method used by most tax authorities.

## Deployment to AWS S3

1. Create an S3 bucket for your website
2. Enable static website hosting for the bucket
   - Set `index.html` as the index document
   - Optionally set an error document
3. Set the bucket policy to allow public read access
4. Upload the contents of the `dist` folder to your S3 bucket

```bash
# Example using AWS CLI to upload files
aws s3 sync dist/ s3://your-bucket-name/ --acl public-read
```

## Design Philosophy

183Tracker is designed for freelancers and digital nomads tracking their tax residency while traveling. The app is:

- Lightweight - Fast loading and minimal resource usage
- Private - All data stays in your browser
- Simple - Focus on the essential information you need
- Responsive - Works on desktop and mobile devices

## Technologies

- Vue.js
- Bootstrap 5.3.5
- Bootstrap Icons 1.11.3
- Vite (build tool)
- localStorage (data persistence)

## Environment Variables

This application uses environment variables for configuration. Copy the `.env.example` file to a new file named `.env` and adjust the values as needed:

```bash
# Copy example environment variables
cp .env.example .env
```

Available environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_GOOGLE_ANALYTICS_ID | Google Analytics measurement ID | G-XXXXXXXXXX |

Note: The `.env` file is excluded from version control to protect sensitive values.
