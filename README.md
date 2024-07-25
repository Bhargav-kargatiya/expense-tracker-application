# Expense Tracker

A full-stack application for managing personal finances, allowing users to track income and expenses with an intuitive interface and data visualization.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

| ![Transaction Detail Form](https://github.com/user-attachments/assets/6e0b81f2-e690-458c-a5b5-f7f861e9f462) | ![Add Category Form](https://github.com/user-attachments/assets/45ced761-cd8f-4d98-9227-d6233aaa791f) |
|:--:|:--:|
| **Transaction Detail Form** | **Add Category Form** |

| ![Categories List](https://github.com/user-attachments/assets/896364e1-830a-4f80-ad86-0a5c7011bccc) | ![Dashboard](https://github.com/user-attachments/assets/85e11bd3-cb65-4aea-9081-cbe29adfc634) |
|:--:|:--:|
| **Categories List** | **Dashboard** |


## Features
- User registration and login.
- Category management (income and expenses)
- Transaction management (add, edit, delete)
- Dashboard with charts for total income and expenses
- Transaction filtering by date, category, and type
- User profile management (username and password change)

## Tech Stack
- **Frontend**: React, Vite, Redux Toolkit, React Router DOM, Axios, Formik, Yup, Chart.js, Tailwind CSS.
- **Backend**: Node.js, Express, Mongoose, JWT (jsonwebtoken), bcryptjs, dotenv, cors

## Dependencies
### Backend
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-async-handler](https://www.npmjs.com/package/express-async-handler)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)

### Frontend
- [axios](https://www.npmjs.com/package/axios)
- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react)
- [@heroicons/react](https://www.npmjs.com/package/@heroicons/react)
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [formik](https://www.npmjs.com/package/formik)
- [react](https://www.npmjs.com/package/react)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
- [yup](https://www.npmjs.com/package/yup)


## Installation
### Backend Setup
1. **Clone the repository:**
   ```bash
   https://github.com/Bhargav-kargatiya/expense-tracker-application.git
   cd expense-tracker/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install   
   ```
3. **Start the server:**
   ```bash
   npm run server  
   ```

### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install   
   ```
3. **Start the development server::**
   ```bash
   npm run dev
   ```   


## Environment Variables
Create a `.env` file in the root of the backend and frontend directories and add the following variables:
* **Backend**:

```
NODE_ENV=development 
JWT_SECRET=your_jwt_secret 
```
      
## Usage
* **Register/Login**: Create an account or log in using the provided forms.
* **Manage Categories**: Create, edit, or delete income and expense categories.
* **Add Transactions**:Record transactions by selecting a category, type, and entering details.
* **View Dashboard**: Access a visual summary of income and expenses with filtering options.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure to follow the project's coding standards and include necessary tests.

