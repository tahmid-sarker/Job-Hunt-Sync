# Job Hunt Sync

Job Hunt Sync is a job listing platform that allows users to discover, save, and apply for jobs. Users can also track job listings, explore company details, and manage their profiles. The application is designed with a smooth and responsive user interface, making it easier for job seekers to find and apply for their next opportunity.

- [Visit the website](https://job-hunt-sync.netlify.app)

## Features

- **User Authentication**: Secure login and registration with Firebase Authentication.
- **Job Tracking**: Save, view, and remove job listings from the saved jobs list.
- **Company Details**: View detailed information about companies and job openings.
- **Profile Management**: Users can update their profiles with personal information.
- **Responsive Design**: TailwindCSS ensures that the app is fully responsive across devices.
- **Dynamic Page Titles**: Each page has a context-aware title that updates based on route and content (e.g., company names or user profile).
- **Theming**: Customizable light theme using DaisyUI.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: Used for authentication and storing job information.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **DaisyUI**: A TailwindCSS plugin providing pre-designed components.
- **React Router**: For routing and navigation within the app.

## Installation

To run this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tahmid-sarker/job-hunt-sync.git
   cd job-hunt-sync
   ```
   
2. **Install dependencies**:
   ```bash
   npm install
   ```
   
3. **Set up Firebase**:
   Go to the [Firebase Console](https://console.firebase.google.com/), create a project, and add your Firebase configuration.
   Create a `firebase.js` file at the root of the project and add your Firebase configuration!
   
5. **Start the development server**:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173` in your browser to view the app.

## How It Works

### Authentication

- **Login & Register**: Users can create an account or log in with their credentials. Firebase Authentication is used to handle the login and registration process.
- **Profile**: Once logged in, users can manage their profiles, including viewing and updating personal details.

### Job Listings

- **Saved Jobs**: Users can browse job listings, save jobs to their account, and view details later.
- **Job Removal**: Saved jobs can be removed from the list, and users will receive notifications about the action.

### Routing

The app utilizes **React Router** for managing the navigation:

- `/`: Home page with job listings and company details.
- `/login`: Login page for user authentication.
- `/forgot-password`: A page for users to reset their password.
- `/register`: Registration page for creating a new account.
- `/company-details/:id`: A dynamic route that displays detailed information about a specific company.
- `/saved-jobs`: A page that displays the saved jobs list.
- `/my-profile`: A page for users to manage their profile.
- `/update-profile`: A page for updating user information.
- `/*`: A catch-all route that redirects to a custom 404 error page if the user tries to access a non-existent route.

## Customizations

### Theming

The app uses DaisyUI's **light theme** by default. You can customize the colors and other UI elements in the `index.css` file.

## Credits

This project was developed by [Md. Tahmid Sarker Mahi](https://tahmid-sarker.github.io).