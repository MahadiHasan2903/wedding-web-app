<p align="center">
  <a href="https://nextjs.org/" target="_blank"><img src="https://nextjs.com/img/logo-small.svg" width="120" alt="Next.js Logo" /></a>
</p>

# Wedding Web Application

A **Next.js-based web application** for a wedding/matchmaking platform. Users can create profiles, find matches, like each other's profiles, and have conversations with matches. This application provides server-side functionality for user management, messaging, and relationship interactions.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)

  - [Normal Development](#normal-development)
  - [Using Docker](#using-docker)

- [Deployment](#deployment)
- [Resources](#resources)
- [Support](#support)
- [License](#license)

---

## Project Overview

This web application is built with [Next.js](https://nextjs.org/) and TypeScript. Key features include:

- User registration and profile management
- Matching system for users
- Ability to like profiles
- Real-time conversations via messaging
- Support for scalable and efficient server-side operations

---

## Project Setup

1. Clone the repository:

```bash
# Clone the repo
git clone git@github.com:MahadiHasan2903/wedding-web-app.git
cd wedding-web-app
```

2. Create a `.env` file in the root of the project and add environment variables according to `.env.example`.

3. Install dependencies:

```bash
# Using npm
npm install

# Using yarn (Recommended)
yarn install
```

---

## Running the Project

### Normal Development / Production

1. **Build the project** (for production):

```bash
# Using yarn (Recommended)
yarn build

# Using npm
npm run build
```

2. **Start the server**:

```bash
# Using yarn (Recommended)
yarn start

# Using npm
npm start
```

The server should now be running on the port specified in your `.env` file (default: `8080`).

---

### Using Docker

You can also run the web application using Docker:

1. **Pull the latest Docker image**:

```bash
docker pull mahadihasan2903/wedding-web-app:latest
```

2. **Run the Docker container**:

```bash
docker run -p 3000:3000 --env-file .env mahadihasan2903/wedding-web-app:latest
```

- `-p 3000:3000` maps container port `3000` to your local machine port `3000`.
- `--env-file .env` passes the environment variables to the container.

---

## Deployment

For deploying your Next.js application to production, refer to the [official Next.js deployment documentation](https://nextjs.org/docs/deployment).

You can also use [Vercel](https://vercel.com/new) for fast and easy deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Discord Community](https://discord.com/invite/nextjs)
- [Official Next.js Video Courses](https://nextjs.org/learn)
- [Next.js DevTools](https://nextjs.org/docs/advanced-features/next-devtools)
- [Vercel Enterprise Support](https://vercel.com/enterprise)
- [Next.js Jobs Board](https://nextjs.org/jobs)

---

## Support

This project is MIT-licensed. Contributions and sponsorships are welcome. See [Next.js Support](https://nextjs.org/support).

---

## License

This project is [MIT licensed](https://github.com/MahadiHasan2903/wedding-web-app/blob/main/LICENSE).
