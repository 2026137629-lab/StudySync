StudySync is a Student Academic Management System

1. Project Overview

StudySync is a web-based Student Academic Management System designed to help students organise and manage their academic activities in one place.

The system provides a centralised platform where students can manage their subjects, assignments, study schedules, and academic progress through a simple and user-friendly interface.

This project was developed as individual assignment of the SI262 Information System Managemnent with the coursecode IMS566 Advanced Web Design Development and Content Management at Universiti Teknologi MARA (UiTM).




2. Key Features

- User Login: Provides a simple login interface for accessing the student dashboard.
- Dashboard: Displays an overview of academic activities, including subjects, assignments, upcoming deadlines, and study schedules.
- My Subjects: Allows students to add, edit, delete, search, and filter their subject information.
- My Assignments: Enables students to manage assignments, set priorities, track deadlines, and update completion status.
- Study Schedule: Allows students to organise study sessions by subject, activity, day, and time.
- Progress Report: Presents students' assignment completion progress through a visual progress indicator.
- User Profile: Provides access to profile information and profile editing options.
- Theme Customisation: Allows users to switch between available display themesn which is light and dark modes.




3. Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structures the web pages |
| CSS3 | Styles and customises the interface |
| JavaScript | Implements interactive features and functionality |
| Bootstrap 5 | Provides responsive layouts and UI components |
| Bootstrap Icons | Provides interface icons |
| Visual Studio Code | Code development environment |
| Laragon | Local development environment |
| GitHub | Source code hosting and deployment |




4. Demo Login Credentials

The system uses hardcoded login credentials for demonstration purposes. No database connection is required.

| Field | Credentials |
|-------|-------------|
| Email | student@studysync.com |
| Password | 123456 |

Note: This is a demonstration login system and is not intended for real user authentication.




5. Installation and Setup

Follow these steps to run StudySync on your local computer:

1. Download or clone the StudySync project repository.
2. Place the project folder inside the Laragon `www` directory.
3. Open Laragon and start the Apache server.
4. Open your web browser.
5. Enter the following address:

   `http://localhost/IND4B/`

6. Log in using the demo credentials provided above.



6. Project Structure

The project is organised into the following files:

IND4B/
│
├── index.html
├── dashboard.html
├── subjects.html
├── assignments.html
├── schedule.html
├── progress.html
│
├── style.css
│
├── script.js
├── layout.js
├── theme.js
├── dashboard.js
├── assignments.js
├── subjects.js
├── schedule.js
└── progress.js

Note: The project structure may be updated as additional files or features are developed.




7. Data Storage

StudySync uses browser-based session storage to manage application data during the demonstration.

The system does not currently use a database or server-side data management. Therefore, the application is designed as a front-end demonstration project rather than a production-ready student management system.




8. Deployment

The project can be hosted using GitHub Pages.

To deploy the project:

1. Create a new repository on GitHub.
2. Upload or push all StudySync project files into the repository.
3. Open the repository's Settings.
4. Navigate to Pages.
5. Under the Build and Deployment section, select Deploy from a branch.
6. Select the `main` branch and `/ (root)` folder.
7. Save the settings and wait for GitHub Pages to publish the website.

Once deployment is complete, GitHub will provide a public URL to access the StudySync website.




9. Project Purpose

StudySync aims to provide students with a convenient and organised way to manage their academic responsibilities. By combining subject management, assignment tracking, study scheduling, and progress monitoring, the system helps students keep track of their academic journey in one place.

---

StudySync – Your academic journey, organised in one place.