# CashCanvas Product Requirements Document (PRD)

## Goal, Objective and Context

[cite_start]The primary goal is to provide users with immediate financial clarity and control over their personal cash flow through a simple, intuitive, and secure mobile-first experience. [cite: 1] [cite_start]The project will solve the common problem of individuals struggling to maintain a clear and real-time understanding of their finances due to overly complex or clunky tools. [cite: 1] [cite_start]The MVP aims to deliver a cross-platform mobile app that allows for easy tracking of income and expenses and provides an at-a-glance dashboard of the user's financial status. [cite: 1]

## Functional Requirements (MVP)

### 🔰 **1. Onboarding Experience**

- **Splash Screen:** App must display logo and loading screen on startup
- **Onboarding Slides:** Must present 3 introduction screens explaining key features:
  - Note Down Expenses
  - Simple Money Management
  - Easy to Track and Analyze
- **Welcome Flow:** Must include "LET'S GO" button to proceed to authentication

### 🔐 **2. User Authentication**

- **Login Screen:** Users must be able to enter username/password with show/hide password toggle
- **Error Handling:** System must display clear error messages for invalid credentials
- **Forgot Password:** Users must be able to reset password with strength requirements
- **Password Update Confirmation:** System must provide success feedback for password changes

### 📊 **3. Overview Dashboard**

- **Main Dashboard:** Must display comprehensive overview showing:
  - Total income and expenses
  - Current balance
  - Monthly financial summary
  - Recent transaction entries
- **Expense Analytics:** Must provide:
  - Daily/monthly expense charts
  - Category-based spending breakdown (pie charts)
  - Visual spending trends
- **Quick Actions:** Must provide easy access to add income/expense

### 💰 **4. Transaction Management**

- **Add Income:** Users must be able to record income with amount, date, description
- **Add Expense:** Users must be able to record expenses with categorization
- **Transaction History:** Users must be able to view chronological list of all transactions
- **Transaction Details:** Users must be able to view detailed information of individual entries
- **Basic Categorization:** Users must be able to assign transactions to predefined categories

### 🎯 **5. Savings & Goals**

- **Savings Overview:** Must display total saved amount and monthly savings targets
- **Goal Management:** Users must be able to:
  - Create financial goals with target amounts
  - Set deadlines for goal completion
  - Track progress towards goals
- **Contribution Types:** Must support Daily, Weekly, Monthly contribution options
- **Goal Deadlines:** Must allow flexible deadline setting for goal completion

### ⏰ **6. Payment Reminders**

- **Reminders List:** Users must be able to view all active payment reminders
- **Create Reminders:** Users must be able to set up new payment reminders
- **Bill Selection:** Users must be able to choose bill types and categories
- **Frequency Settings:** Users must be able to configure reminder frequency
- **Date Selection:** Users must be able to set specific reminder dates and times

### 🔔 **7. Notifications**

- **Notification Center:** Must provide centralized notification management
- **Payment Alerts:** Must send reminders for upcoming bills and payments
- **Goal Updates:** Must provide progress notifications for savings goals
- **Transaction Confirmations:** Must send success notifications for completed actions

## Non Functional Requirements (MVP)

- **Performance:** The mobile application must be fast and responsive, with UI interactions completing in under 200ms.
- **Security:** All user data, especially authentication credentials and financial entries, must be stored securely and transmitted over encrypted channels (HTTPS).
- **Usability:** The application must be highly intuitive, requiring minimal to no instruction for a user to accomplish the core tasks.
- **Platform:** The application must run on both iOS and Android platforms, as facilitated by the choice of React Native.
- **Offline Capability:** Core features must work offline with data synchronization when connection is restored.
- **Data Persistence:** All user data must be securely stored locally and synchronized with cloud storage.

## User Interaction and Design Goals

- **Overall Vision & Experience:** The app should feel modern, clean, and minimalist, making the user feel empowered and in control, not overwhelmed. [cite_start]The experience should be friendly and approachable. [cite: 1]
- **Core Screens/Views (Conceptual):**
  - Onboarding Screens (4 screens)
  - Login / Sign-up Screen
  - Main Dashboard with Analytics
  - Add/Edit Transaction Screen
  - Transaction History / List Screen
  - Savings & Goals Screen
  - Payment Reminders Screen
  - Notifications Center
  - Basic Settings Page (e.g., Logout)
- [cite_start]**Target Devices/Platforms:** The application is a mobile-first responsive web app, targeting modern iOS and Android devices. [cite: 1]

## Technical Assumptions

This is where we can list information mostly to be used by the architect to produce the technical details.

- [cite_start]**Frontend Framework:** The mobile application **must** be built using React Native. [cite: 1]
- [cite_start]**Backend Framework:** The backend API **must** be built using NestJS. [cite:1]
- [cite_start]**Repository & Service Architecture:** A key decision for the Architect will be the repository structure (e.g., Monorepo, Polyrepo) and the high-level service architecture (e.g., Monolith API, Microservices). [cite: 639, 640] This decision will be based on project goals and scalability needs and must be formally documented in the architecture.
- [cite_start]**Testing requirements:** The application will require comprehensive testing, including unit, integration, and end-to-end (E2E) tests to ensure functionality and reliability. [cite: 641]
- **Push Notifications:** Must support push notifications for reminders and alerts
- **Local Storage:** Must implement secure local storage for offline functionality
- **Data Synchronization:** Must handle data sync between local and cloud storage

## Epic Overview

- **Epic 1: Onboarding & User Authentication**

  - **Goal:** To establish the core project infrastructure and implement a secure way for users to create accounts and sign in.
  - **Story 1.1:** As a Developer, I want to set up the initial project structure for the NestJS backend and React Native frontend, including version control, dependencies, and a basic CI/CD pipeline, so that we have a stable foundation for development.
    - {Acceptance Criteria List}
  - **Story 1.2:** As a new user, I want to see an engaging onboarding experience that explains the app's key features, so that I understand how the app can help me manage my finances.
    - {Acceptance Criteria List}
  - **Story 1.3:** As a new user, I want to be able to sign up for an account using my email and a password so that my financial data is kept private and secure.
    - {Acceptance Criteria List}
  - **Story 1.4:** As a returning user, I want to be able to log in to my account so that I can access my cash flow dashboard.
    - {Acceptance Criteria List}
  - **Story 1.5:** As a user, I want to be able to reset my password if I forget it, so that I can regain access to my account.
    - {Acceptance Criteria List}

- **Epic 2: Dashboard & Analytics**

  - **Goal:** To deliver the core value of the application by providing users with immediate financial clarity and insights.
  - **Story 2.1:** As a user, I want to see a comprehensive dashboard with my current cash balance, monthly income vs. expenses, and recent transactions so that I can understand my financial position at a glance.
    - {Acceptance Criteria List}
  - **Story 2.2:** As a user, I want to see visual charts and analytics of my spending patterns so that I can identify trends and make informed financial decisions.
    - {Acceptance Criteria List}
  - **Story 2.3:** As a user, I want to see my spending broken down by categories so that I can understand where my money is going.
    - {Acceptance Criteria List}

- **Epic 3: Transaction Management**

  - **Goal:** To provide users with easy and efficient ways to track their income and expenses.
  - **Story 3.1:** As a user, I want to be able to manually add an income transaction, specifying the amount, date, category, and description, so that I can keep a record of my earnings.
    - {Acceptance Criteria List}
  - **Story 3.2:** As a user, I want to be able to manually add an expense transaction, specifying the amount, date, category, and description, so that I can keep a record of my spending.
    - {Acceptance Criteria List}
  - **Story 3.3:** As a user, I want to view a list of all my past transactions in reverse chronological order so that I can review my spending and earning history.
    - {Acceptance Criteria List}
  - **Story 3.4:** As a user, I want to be able to edit or delete my transactions so that I can correct mistakes or update information.
    - {Acceptance Criteria List}

- **Epic 4: Savings & Goals**

  - **Goal:** To help users set and achieve their financial goals through systematic saving.
  - **Story 4.1:** As a user, I want to create financial goals with target amounts and deadlines so that I can plan for major purchases or savings targets.
    - {Acceptance Criteria List}
  - **Story 4.2:** As a user, I want to track my progress towards my savings goals so that I can stay motivated and on track.
    - {Acceptance Criteria List}
  - **Story 4.3:** As a user, I want to set up automatic contributions to my goals so that I can build savings consistently.
    - {Acceptance Criteria List}

- **Epic 5: Payment Reminders**

  - **Goal:** To help users never miss important bill payments through timely reminders.
  - **Story 5.1:** As a user, I want to create payment reminders for my bills so that I never miss a payment deadline.
    - {Acceptance Criteria List}
  - **Story 5.2:** As a user, I want to set different frequencies for my reminders (daily, weekly, monthly) so that I can customize them to my payment schedule.
    - {Acceptance Criteria List}
  - **Story 5.3:** As a user, I want to view all my active reminders in one place so that I can manage them effectively.
    - {Acceptance Criteria List}

- **Epic 6: Notifications**
  - **Goal:** To keep users informed about their financial activities and important events.
  - **Story 6.1:** As a user, I want to receive notifications for upcoming bill payments so that I can prepare for them.
    - {Acceptance Criteria List}
  - **Story 6.2:** As a user, I want to receive progress updates on my savings goals so that I can stay motivated.
    - {Acceptance Criteria List}
  - **Story 6.3:** As a user, I want to receive confirmation notifications when I complete transactions so that I know my actions were successful.
    - {Acceptance Criteria List}

## Out of Scope Ideas Post MVP

- [cite_start]Plaid integration for automatic bank transaction syncing. [cite: 1]
- [cite_start]Budget creation and tracking against categories. [cite: 1]
- [cite_start]Setting up recurring transactions. [cite: 1]
- [cite_start]Advanced reporting and data visualization. [cite: 1]
- [cite_start]Push notifications for bill payment reminders. [cite: 1]
- **Credit Card Integration:** Automatic credit card transaction import
- **Bill Payment Integration:** Direct bill payment capabilities
- **Smart Categorization:** Automatic transaction categorization
- **Dark Mode:** Complete dark theme support
- **Photo Receipts:** Attach photos to transactions
- **Voice Input:** Voice-to-text for quick transaction entry
- **Family Sharing:** Shared expense tracking for families
- **Export Features:** PDF/CSV export of financial reports

## Change Log

| Change        | Date       | Version | Description                                       | Author    |
| :------------ | :--------- | :------ | :------------------------------------------------ | :-------- |
| Initial Draft | 2025-07-14 | 1.0     | First draft of PRD based on Project Brief.        | John (PM) |
| Updated       | 2025-01-XX | 1.1     | Expanded to include comprehensive Monex features. | John (PM) |
