# 🥑 HealthyHub — Web Application for Health & Nutrition Tracking

> **Team Graduation Project (Fullstack: React + Node.js)**  
> A comprehensive web application designed for nutrition control, daily calorie calculation, water intake tracking, and weight monitoring based on individual user goals.

---

## 🔗 Project Resources & Useful Links

- 🎨 **Figma Design Mockup**: [HEALTH-EN-new-v1](https://www.figma.com/file/TY1tlWppyNqqV3HDMs2hWX/HEALTH-EN-new-v1?type=design&node-id=0%3A1&mode=design&t=TMbGKiuNgvAc1emk-1)
- 📋 **Technical Specification (ТЗ)**: [Google Spreadsheet — HealthyHub Requirements](https://docs.google.com/spreadsheets/d/1-PoZY-nAHrsFF6Q8vgN__gOLV8Qga7A705FPlHjjv9w/edit?usp=sharing)
- 🚀 **Live Demo (GitHub Pages)**: [iberikofer.github.io/healthyHub-page](https://iberikofer.github.io/healthyHub-page/)
- 💻 **Original Front-end Repository**: [AndriiZlt/healthyHub-frontend](https://github.com/AndriiZlt/healthyHub-frontend)
- ⚙️ **Back-end Repository**: [lezver/healthyHub-backend](https://github.com/lezver/healthyHub-backend)
- 📑 **API Documentation (Swagger)**: [healthy-hub.onrender.com/api-docs](https://healthy-hub.onrender.com/api-docs/)

---

## 👥 Team Members & Responsibilities

The project was developed by a team of 12 engineers (Frontend + Backend) following the Agile/Scrum methodology.

### 🌟 Leadership & Management
| Member | Role | Scope of Responsibility | GitHub |
|---|---|---|:---:|
| **Andrii Zlotnikov** | **Team Lead (Front)** | Main page architecture, core client configuration, code reviews | [@AndriiZlt](https://github.com/AndriiZlt) |
| **Yaroslav Sych** | **Scrum Master** | Analytics & metrics dashboard, sprint facilitation, offline mock mode | [@iberikofer](https://github.com/iberikofer) |
| **Vladyslav Hulida** | **Team Lead (Back)** | Server architecture, database schema, backend team management | [@lezver](https://github.com/lezver) |

---

### 💻 Front-end Team
| Member | Scope of Responsibility | GitHub |
|---|---|:---:|
| **Oleh Linskyy** | Header section & Header Modal windows | [@OlehLinskyy](https://github.com/OlehLinskyy) |
| **Yevhen Yaremenko** | Post-registration questionnaire pages | [@Evgeniy-x](https://github.com/Evgeniy-x) |
| **Yuliia Usova** | Recommended Food section & User Settings | [@Iuliia23](https://github.com/Iuliia23) |
| **Iryna Oleksyshyn** | Sign In, Sign Up, and Welcome pages | [@oleksyshyn](https://github.com/oleksyshyn) |
| **Klyment Kim** | Diary page | [@KlymentKim](https://github.com/KlymentKim) |
| **Illia Mysan** | Target Selection | [@k09at1ch](https://github.com/k09at1ch) |
| **Andrii Lysenko** | Add meal modal | *Contributed via Lead PR* |

---

### ⚙️ Back-end Team
| Member | Scope of Responsibility | GitHub |
|---|---|:---:|
| **Serhii Andriienko** | API Endpoints & Swagger API Documentation | [@SerhiiAndriienko](https://github.com/SerhiiAndriienko) |
| **Yevhenii Potiiko** | Server Endpoints implementation | [@PotiykoEvgenij](https://github.com/PotiykoEvgenij) |

---

## 💡 Key Application Features

1. **Authentication & Personalized Onboarding:**
   - Secure sign-up, sign-in, and password recovery via JWT.
   - Step-by-step questionnaire: gender, age, height, current weight, and physical activity level.
   - Goal selection and configuration: lose weight, maintain weight, or gain muscle mass.

2. **Main Dashboard (Main Page):**
   - Daily calorie and water intake calculator based on the Harris-Benedict / Mifflin-St Jeor formulas.
   - Circular macronutrient breakdown charts (proteins, fats, carbs).
   - Real-time water tracker with quick intake logging.
   - Quick meal entry (Breakfast, Lunch, Dinner, Snack) with automatic nutrient summation.

3. **Analytics & Progress (Dashboard):**
   - Interactive weight and calorie progress charts for monthly and annual spans powered by `Chart.js`.
   - Daily average nutrient consumption statistics.

4. **Meal Diary (Diary):**
   - Detailed nutritional history for any selected calendar date.
   - Interactive editing and removal of logged food entries.

5. **Recommendations & Profile Settings:**
   - Catalog of recommended nutritious products.
   - Profile management, avatar upload via Cloudinary, and goal modification.

6. **Offline Demo Mode:**
   - One-click demo login option allowing instant recruiter evaluation without waiting for cold backend spin-ups on Render.

---

## 🛠 Tech Stack

- **Frontend:**
  - React 18, React Router DOM v6
  - Redux Toolkit, Redux Persist (global state management & local caching)
  - Axios (REST API client)
  - Chart.js & react-chartjs-2 (data visualization & charts)
  - React Bootstrap / Custom CSS Modules (responsive Mobile-First design)
  - Notiflix (notification toasts)
  - Dayjs (date & time parsing)

- **Backend:**
  - Node.js, Express.js
  - MongoDB, Mongoose
  - JSON Web Tokens (JWT), Bcrypt
  - Swagger UI Express (interactive API docs)
  - Cloudinary (cloud asset storage)

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iberikofer/healthyHub-page.git
   cd healthyHub-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
