# Abdul Khalek — Personal Portfolio

A responsive, single-page personal portfolio built with React and Vite. It presents my profile, skills, software projects, and blog articles fetched from a Django REST Framework backend.

## Features

- Personal introduction and professional profile
- Skills and technology overview
- Projects loaded from the backend API
- Blog articles loaded from the backend API
- Client-side blog search across title, excerpt, content, and category
- Blog category filtering and reset filters
- Empty and loading states for blog content
- Contact section and links to professional profiles
- Responsive layout
- Production build using Vite

## Technology Stack

- React
- JavaScript
- Vite
- CSS
- Django REST Framework API

## Live Demo and Repositories

- **Live frontend:** https://abdul-khalek-portfolio-frontend.vercel.app/
- **Backend repository:** https://github.com/teacher019/abdul-khalek-portfolio-backend
- **Frontend repository:** https://github.com/teacher019/abdul-khalek-portfolio-frontend
- **Backend live API:** https://abdul-khalek-portfolio-backend.onrender.com/api/projects/
- **Blog API:** https://abdul-khalek-portfolio-backend.onrender.com/api/blog/

## Local Installation

Requirements: Node.js and npm.

```bash
git clone https://github.com/teacher019/abdul-khalek-portfolio-frontend.git
cd abdul-khalek-portfolio-frontend
npm install
npm run dev
``` 

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## API Integration

The frontend consumes data from the deployed Django REST Framework backend.

| Purpose | Endpoint |
|---|---|
| Projects | `GET /api/projects/` |
| Published blog posts | `GET /api/blog/` |

Base URL: `https://abdul-khalek-portfolio-backend.onrender.com`

Blog search and category filtering are implemented in the frontend. Search matches the post title, excerpt, content, and category.

## Project Structure

Main files include `src/App.jsx`, `src/App.css`, `src/index.css`, and `src/main.jsx`. Public assets are stored in `public/`.

## Routes and Current Scope

The current frontend is a single-page application using section anchors such as `#blog` and `#contact`. Separate `/login` and `/dashboard` routes are not currently implemented in `src/App.jsx`.

Visitor comments, like actions, backend contact-form submission, and a custom post-management dashboard must not be considered complete until implemented and tested.

## Screenshots

Recommended screenshots to capture from the running application:

1. Home/profile section
2. Projects section
3. Blog list with search and category filter
4. Mobile-width responsive layout

## Future Improvements

- Add individual blog detail routes
- Add visitor comment submission and moderation UI
- Add secure login and post-management dashboard
- Implement and test like functionality
- Connect the contact form to a backend endpoint
- Capture screenshots of the actual interface

## Author

**Abdul Khalek**  
Math & Physics Teacher | Web Developer | Flutter App Developer

- GitHub: https://github.com/teacher019
- LinkedIn: https://www.linkedin.com/in/abdul-khalek-sir/

