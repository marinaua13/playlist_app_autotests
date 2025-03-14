# Playlist App Autotests

This project contains automated tests (written in [Playwright](https://playwright.dev)) for a "Playlist" web application.  

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn** (whichever you prefer)
- *(Optional)* [Git](https://git-scm.com/) for version control

## Installation

1. **Clone or download** this repository:

   ```bash
   https://github.com/marinaua13/playlist_app_autotests.git
   cd playlist_app_autotests
   
## Install dependencies:
   npm install

## Set up .env if needed:
   BASE_URL=https://vite-react-alpha-lemon.vercel.app/

##### Make sure it’s in the project root alongside playwright.config.js.

## How to Run Tests
   - npm run test
   
   or
   
   - npx playwright test
   
   or

   - npm run test:headed

   or

   - npx playwright test --headed

### Debug mode:
   - npm run test:debug

#### Tests will run in parallel for each configured project (e.g., Chromium, Firefox) as specified in playwright.config.js.

