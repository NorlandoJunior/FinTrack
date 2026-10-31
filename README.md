# FinTrack

**Your money, your control.**

FinTrack is a web application designed to help people organize their personal finances, track income and expenses, manage monthly budgets, and plan future payments.

The project aims to provide a simple and practical way for users to understand their financial situation and make better financial decisions.

## Project Overview

Many people struggle to understand where their money goes, especially when dealing with credit card installments, recurring expenses, and multiple income sources.

FinTrack aims to simplify financial organization by bringing important financial information together in one place.

## Main Features

- **Income Management:** Register salaries and other sources of income.
- **Expense Tracking:** Record and categorize personal expenses.
- **Installment Management:** Organize purchases divided into multiple installments.
- **Monthly Budget:** Set monthly spending limits.
- **Budget Progress:** Monitor spending and remaining budget.
- **Financial Dashboard:** View income, expenses, and available balance.
- **Future Expense Planning:** Track upcoming installments and recurring payments.

## Technologies

The project is planned to use the following technologies:

- **HTML5:** Page structure.
- **CSS3:** Styling, layouts, and animations.
- **JavaScript:** Application logic and interactive features.
- **React:** User interface development.
- **Vite:** Development server and build tool.
- **Git:** Version control.
- **GitHub:** Repository hosting and team collaboration.

A database may be incorporated in a future development stage to store financial transactions and budget information.

## Getting Started

Follow these instructions to download and run the project on your local computer.

### Prerequisites

Before starting, make sure you have installed:

- [Node.js (LTS)](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

Node.js includes npm, which is used to install the project's dependencies.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone <REPOSITORY-URL>
```

Replace `<REPOSITORY-URL>` with the GitHub repository URL.

### 2. Open the Project Folder

Navigate to the project directory:

```bash
cd FinTrack
```

Open the project in Visual Studio Code:

```bash
code .
```

### 3. Install Dependencies

Run the following command in the project terminal:

```bash
npm install
```

This command automatically downloads and installs the dependencies listed in `package.json`.

**Note:** You do not need to download or upload the `node_modules` folder manually.

### 4. Run the Development Server

Start the application using:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173/
```

Open this address in your browser to view the application.

## Project Structure

```text
FinTrack/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Development Status

The project is currently in its initial development stage.

The first development phase focuses on building the homepage and establishing the visual identity of the application.

Authentication, database integration, and financial management features are planned for future development.

## Team Collaboration

GitHub is used to manage the project's source code and support team collaboration.

Team members should pull the latest changes before starting new work and commit their contributions regularly.

## Project Information

**Project:** FinTrack

**Course:** CSE 499 – Senior Project

**Purpose:** Personal Finance Management

**Repository:** GitHub
