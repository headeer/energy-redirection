# NeuroPulse - Energy Redirection App

A modern application for tracking, redirecting, and managing impulses using React, TypeScript, and Material UI.

## Features

- Track daily impulses
- Redirect energy to productive activities
- Get suggestions based on impulse categories
- View statistics and earn rewards
- Fully responsive design
- Supports English and Polish languages
- Light and dark mode

## Deployment

### Deploying to Netlify

This project is configured for easy deployment to Netlify:

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Log in to Netlify and click "New site from Git"
3. Select your repository and follow these settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - No environment variables required

The deployment will handle SPA routing automatically via the included netlify.toml configuration.

### Manual Deployment

To build the project for production deployment:

```bash
npm install
npm run build
```

The build folder can then be deployed to any static hosting service.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
