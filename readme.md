# Personal Portfolio Website

## Overview

This is my personal portfolio website showcasing my profile, academic background, technical skills, projects, and contact information. The website is built using HTML5, CSS3, and JavaScript, with interactive features implemented using jQuery. It includes external data integration such as fetching articles from Dev.to and live weather information using the OpenWeatherMap API.

## Website Structure

The website consists of the following main sections:

- **Home**: A welcoming introduction with a dynamic greeting and profile picture.
- **Profile**: Biography, career goals, and personal interests.
- **Curriculum Vitae (CV)**: Educational background and experiences, with an embedded PDF resume and download option.
- **Education & Technical Expertise**: Details of academic qualifications, programming languages, tools, and technologies.
- **Projects**: Interactive project gallery showcasing featured works.
- **Articles**: Latest articles fetched dynamically from Dev.to using their API.
- **Weather**: Real-time weather information fetched via OpenWeatherMap API.
- **Contact**: Contact form with validation and social media links.

## Implementation Details

### 1. Dev.to Feed Integration

- Utilized the Dev.to public API to fetch my latest articles.
- Implemented JavaScript `fetch()` to retrieve JSON data asynchronously.
- Parsed and dynamically displayed the top 5 article titles with links.
- Added error handling to manage API failure or network issues.

### 2. jQuery Powered Project Gallery

- Created an interactive gallery with project thumbnails.
- Clicking on a thumbnail updates the main display area with project details and images.
- Included a smooth fade-in/out animation for seamless transitions between projects.
- Controls for navigating a photo slideshow related to RSET activities using jQuery events.

### 3. OpenWeatherMap API for Live Weather

- Developed a weather module with an input box for city name.
- Used the OpenWeatherMap Current Weather Data API for fetching live data.
- Displayed city name, temperature in Celsius, weather descriptions, and icons.
- Included error handling for invalid city names and network errors.
- The data is dynamically updated without page reload using JavaScript.

## Additional Features

- Responsive design ensuring seamless experience on desktops and mobile devices.
- Animated navigation bar with active state highlighting and smooth scrolling.
- Cascading and fade-in animations for an engaging user experience.
- Contact form with client-side validation for name, email, and message fields.
- SEO-friendly meta tags supporting better web visibility.
- Embedded PDF resume via an iframe with an easy downloadable button.

- **Home Section:**  
  A welcoming hero section with a smooth, visually pleasing gradient background highlighting my role as an AI and Data Science Engineering student.

- **Latest Articles:**  
  Dynamically loads the latest articles from my Dev.to profile via their public API, displaying them as clean, floating cards with title, date, description, and tags.

- **Education & Technical Expertise:**  
  Highlights my academic qualifications, programming languages, and tools & technologies I am proficient in, using visually separated cards for each category.

- **Contact Section:**  
  A modern, responsive contact form alongside clearly laid-out contact links (Email, LinkedIn, GitHub) displayed as clickable cards with icons, designed to be balanced and uniform in height.

- **Responsive Design:**  
  The website adapts gracefully to different screen sizes, stacking columns vertically on smaller screens.

- **Clean UI:**  
  Sections avoid boxed containers where possible, opting for open, airy layouts with subtle shadows and consistent spacing.

---

## Technologies Used

- HTML5
- CSS3 (Flexbox and Grid Layout)
- JavaScript (ES6+)
- jQuery (for DOM manipulation and Dev.to API integration)
- Dev.to API for fetching articles

---

## Setup & Usage

### Running Locally

1. Clone the repository:


