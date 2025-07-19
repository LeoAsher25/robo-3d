# CashCanvas UI/UX Specification

## Introduction

This document defines the user experience goals, information architecture, user flows, and visual design specifications for the CashCanvas mobile application. Its purpose is to provide a clear blueprint for the design and frontend development, ensuring an intuitive and cohesive user experience.

- **Link to Primary Design Files:** {A specific Figma/Sketch link would be created here, e.g., `https://www.figma.com/design/ZP67IINPNDk2Fp2W84o1Il/Expense-management-app-ui-kit--Community-?node-id=1-198&p=f&t=bvenrH7bd6GUFBx6-0`}
- **Link to Deployed Storybook / Design System:** {Not applicable yet, will be created during development}

## Overall UX Goals & Principles

- **Target User Personas:** Individuals, students, and young professionals who need a simple, no-fuss way to track their personal finances on their mobile devices.
- **Usability Goals:**
  - **Effortless Entry:** Users should be able to log a new transaction in under 10 seconds.
  - **At-a-Glance Clarity:** The dashboard must provide an immediate and clear understanding of the user's current financial state.
  - **High Learnability:** The app's core functions should be discoverable and usable without any tutorial or instructions.
  - **Goal Achievement:** Users should feel motivated and supported in reaching their financial goals.
  - **Proactive Reminders:** Users should never miss important payments through timely notifications.
- **Design Principles:**
  1.  **Clarity First:** Prioritize clear information presentation over decorative elements.
  2.  **Frictionless Interaction:** Minimize the number of steps required to complete any core task.
  3.  **Encouraging & Positive:** The UI should feel supportive and non-judgmental, helping users feel in control of their finances.
  4.  **Progressive Disclosure:** Show essential information first, with details available on demand.
  5.  **Visual Hierarchy:** Use size, color, and spacing to guide user attention effectively.

## Information Architecture (IA)

- **Site Map / Screen Inventory:**

  ```mermaid
  graph TD
      A[App Entry] --> B{Is Authenticated?};
      B -- No --> C[Onboarding Flow];
      C --> D[Login / Signup Screen];
      B -- Yes --> E[Main Dashboard];
      D --> E;
      E --> F[Add Transaction Screen];
      E --> G[Transaction History Screen];
      E --> H[Savings & Goals Screen];
      E --> I[Payment Reminders Screen];
      E --> J[Notifications Center];
      E --> K[Settings Screen];
      F --> L[Add Income Screen];
      F --> M[Add Expense Screen];
      G --> N[Transaction Detail Screen];
      H --> O[Create Goal Screen];
      H --> P[Goal Detail Screen];
      I --> Q[Create Reminder Screen];
      I --> R[Reminder Detail Screen];
      K --> D;
  ```

- **Navigation Structure:** A primary bottom tab bar will be used for main navigation between Dashboard, Transaction History, Savings & Goals, Payment Reminders, and Notifications. The "Add Transaction" button will be a prominent floating action button. Settings will be accessible from a gear icon on the Dashboard header.

## User Flows

### Onboarding & User Authentication

- **Goal:** A new user experiences an engaging onboarding and creates an account, or an existing user logs in securely.

- **Steps / Diagram:**

  ```mermaid
  graph TD
      Start((Start)) --> SplashScreen[Splash Screen with Logo];
      SplashScreen --> Onboarding1[Onboarding Slide 1: Note Down Expenses];
      Onboarding1 --> Onboarding2[Onboarding Slide 2: Simple Money Management];
      Onboarding2 --> Onboarding3[Onboarding Slide 3: Easy to Track and Analyze];
      Onboarding3 --> WelcomeScreen[Welcome Screen with Login/Signup options];
      WelcomeScreen --> Signup[Select 'Sign Up'];
      WelcomeScreen --> Login[Select 'Login'];
      Signup --> EnterSignupDetails[Enter Email, Password, Confirm Password];
      EnterSignupDetails --> ValidateSignup{Details Valid?};
      ValidateSignup -- Yes --> CreateAccount[API: Create Account];
      CreateAccount --> Dashboard[Navigate to Dashboard];
      ValidateSignup -- No --> ShowSignupError[Show Validation Error];
      ShowSignupError --> EnterSignupDetails;
      Login --> EnterLoginDetails[Enter Email, Password];
      EnterLoginDetails --> ValidateLogin{Credentials Correct?};
      ValidateLogin -- Yes --> Dashboard;
      ValidateLogin -- No --> ShowLoginError[Show 'Invalid Credentials' Error];
      ShowLoginError --> EnterLoginDetails;
      Login --> ForgotPassword[Select 'Forgot Password'];
      ForgotPassword --> ResetPassword[Enter Email for Reset];
      ResetPassword --> PasswordReset[API: Send Reset Email];
      PasswordReset --> PasswordUpdated[Show 'Password Updated' Confirmation];
  ```

### Dashboard & Analytics

- **Goal:** The user gets immediate financial clarity and insights through comprehensive dashboard and analytics.

- **Steps / Diagram:**

  ```mermaid
  graph TD
      Start((Dashboard)) --> Overview[View Financial Overview];
      Overview --> Balance[Current Balance Display];
      Overview --> MonthlySummary[Monthly Income vs Expenses];
      Overview --> RecentTransactions[Recent Transaction List];
      Overview --> Analytics[View Analytics Charts];
      Analytics --> ExpenseChart[Daily/Monthly Expense Chart];
      Analytics --> CategoryChart[Category Spending Pie Chart];
      Analytics --> TrendsChart[Spending Trends Visualization];
      Overview --> QuickActions[Access Quick Actions];
      QuickActions --> AddTransaction[Add New Transaction];
      QuickActions --> ViewGoals[View Savings Goals];
      QuickActions --> SetReminders[Set Payment Reminders];
  ```

### Add a New Transaction

- **Goal:** The user quickly adds a new income or expense record with full categorization.

- **Steps / Diagram:**

  ```mermaid
  graph TD
      Start((Start)) --> ClickAdd[Tap '+' Floating Action Button];
      ClickAdd --> AddTransactionScreen[Show Add Transaction Screen];
      AddTransactionScreen --> EnterAmount[Enter Amount with Numeric Keypad];
      EnterAmount --> SelectType[Choose 'Income' or 'Expense' Type];
      SelectType --> SelectCategory[Select Category from Grid];
      SelectCategory --> EnterDescription[Optionally add Description];
      EnterDescription --> SetDate[Set Transaction Date];
      SetDate --> ClickSave[Tap 'Save'];
      ClickSave --> SaveTransaction[API: Save Transaction];
      SaveTransaction --> ShowConfirmation[Show Success Toast];
      ShowConfirmation --> ReturnToDashboard[Return to Dashboard];
  ```

### Savings & Goals Management

- **Goal:** The user creates and tracks financial goals with systematic saving.

- **Steps / Diagram:**

  ```mermaid
  graph TD
      Start((Savings Screen)) --> ViewGoals[View Current Goals];
      ViewGoals --> GoalProgress[See Goal Progress];
      GoalProgress --> CreateGoal[Tap 'Create New Goal'];
      CreateGoal --> EnterGoalTitle[Enter Goal Title];
      EnterGoalTitle --> SetTargetAmount[Set Target Amount];
      SetTargetAmount --> ChooseContribution[Choose Contribution Type];
      ChooseContribution --> SetDeadline[Set Goal Deadline];
      SetDeadline --> SaveGoal[Save Goal];
      SaveGoal --> GoalCreated[Goal Created Successfully];
      GoalCreated --> TrackProgress[Track Progress Over Time];
      TrackProgress --> GoalAchieved[Goal Achieved Notification];
  ```

### Payment Reminders

- **Goal:** The user sets up payment reminders to never miss important bills.

- **Steps / Diagram:**

  ```mermaid
  graph TD
      Start((Reminders Screen)) --> ViewReminders[View Active Reminders];
      ViewReminders --> CreateReminder[Tap 'Create Reminder'];
      CreateReminder --> SelectBillType[Select Bill Type];
      SelectBillType --> SetAmount[Set Bill Amount];
      SetAmount --> ChooseFrequency[Choose Reminder Frequency];
      ChooseFrequency --> SetDate[Set Reminder Date];
      SetDate --> SaveReminder[Save Reminder];
      SaveReminder --> ReminderCreated[Reminder Created];
      ReminderCreated --> ReceiveNotifications[Receive Push Notifications];
      ReceiveNotifications --> MarkPaid[Mark Bill as Paid];
  ```

## Wireframes & Mockups

All detailed mockups and wireframes will be maintained in the primary design file linked above.

### Core Screen Specifications:

- **Onboarding Screens:**

  - Splash screen with app logo and loading animation
  - 3 slides with illustrations and clear value propositions
  - "LET'S GO" button with prominent call-to-action styling

- **Dashboard Screen:**

  - Large "Current Balance" display at the top
  - Monthly income vs expenses summary cards
  - Recent transactions list (last 5-10 entries)
  - Quick access to analytics charts
  - Floating action button for adding transactions
  - Bottom tab navigation

- **Add Transaction Screen:**

  - Numeric keypad for amount entry
  - Segmented controls for Income/Expense selection
  - Grid of category icons with labels
  - Date picker (defaults to today)
  - Optional description text input
  - Save button with confirmation feedback

- **Transaction History Screen:**

  - Scrollable list grouped by date
  - Each transaction shows: description, category icon, amount, date
  - Pull-to-refresh functionality
  - Search/filter options

- **Savings & Goals Screen:**

  - Total savings amount display
  - List of active goals with progress bars
  - "Create Goal" button
  - Goal cards showing: title, target amount, current progress, deadline

- **Payment Reminders Screen:**

  - List of active reminders
  - Reminder cards showing: bill type, amount, due date, frequency
  - "Create Reminder" button
  - Reminder status indicators

- **Notifications Center:**
  - Chronological list of notifications
  - Different notification types (payment reminders, goal updates, transaction confirmations)
  - Mark as read functionality
  - Clear all option

## Component Library / Design System Reference

A comprehensive design system will be developed, focusing on reusable components:

### Core Components:

- **Buttons:** Primary, Secondary, Floating Action, Icon buttons
- **Input Fields:** Text inputs, numeric keypad, date picker, category selector
- **Cards:** Transaction cards, goal cards, reminder cards, summary cards
- **Charts:** Pie charts, line charts, bar charts for analytics
- **Navigation:** Bottom tab bar, header with actions, breadcrumbs
- **Feedback:** Toast notifications, loading states, error messages
- **Lists:** Transaction lists, goal lists, reminder lists with pull-to-refresh

### Layout Components:

- **Containers:** Screen containers, modal overlays, bottom sheets
- **Grid Systems:** Category grids, dashboard layouts
- **Spacing:** Consistent spacing scale (8px base unit)
- **Typography:** Hierarchical text styles for headings, body, labels

## Branding & Style Guide Reference

- **Color Palette:**

  - Primary: Modern blue (`#4A90E2`)
  - Secondary: Neutral dark grey for text (`#4A4A4A`)
  - Success/Income: Positive green (`#7ED321`)
  - Warning/Expense: Attention orange (`#F5A623`)
  - Error: Alert red (`#D0021B`)
  - Background: Off-white (`#F8F9FA`)
  - Surface: White (`#FFFFFF`)
  - Border: Light grey (`#E5E5E5`)

- **Typography:**

  - Font Family: 'Inter' for modern, clean appearance
  - Headings: Bold weight (600-700)
  - Body/Labels: Regular weight (400)
  - Captions: Light weight (300)
  - Font Sizes: 12px, 14px, 16px, 18px, 24px, 32px

- **Iconography:**

  - Consistent set of outlined icons (Feather Icons or similar)
  - Category icons with consistent style and color coding
  - Action icons for common tasks (add, edit, delete, share)

- **Shadows & Elevation:**
  - Subtle shadows for cards and floating elements
  - Consistent elevation levels for different UI layers
  - Material Design-inspired shadow system

## Accessibility (AX) Requirements

- **Target Compliance:** WCAG 2.1 AA.
- **Specific Requirements:**
  - All interactive elements must have clear focus indicators
  - Color contrast ratios must meet AA standards (4.5:1 for normal text)
  - All form inputs must have associated labels for screen readers
  - The app must be navigable and usable with screen reader technology (VoiceOver, TalkBack)
  - Touch targets must be at least 44x44 points for easy interaction
  - Text must be scalable up to 200% without loss of functionality
  - Alternative text for all images and icons
  - Keyboard navigation support for all interactive elements

## Responsiveness

- **Breakpoints:** As this is a mobile-first application, the primary design target is phone-sized screens (320px - 428px width).
- **Adaptation Strategy:**
  - Components will use flexible layouts (Flexbox) to adapt to screen width
  - Font sizes will use responsive units (`rem`) to scale appropriately
  - Touch targets will maintain minimum 44px size across all screen sizes
  - Charts and graphs will be responsive and readable on all screen sizes
  - Modal overlays and bottom sheets will adapt to different screen heights

## Performance & Animation Guidelines

- **Animation Principles:**

  - Smooth, purposeful animations (200-300ms duration)
  - Easing curves for natural feel (ease-out for entering, ease-in for exiting)
  - Subtle micro-interactions for feedback
  - Loading states for all async operations

- **Performance Targets:**
  - App launch time: < 3 seconds
  - Screen transitions: < 200ms
  - Data loading: < 1 second for cached data
  - Offline functionality for core features

## Change Log

| Change        | Date       | Version | Description                                       | Author    |
| :------------ | :--------- | :------ | :------------------------------------------------ | :-------- |
| Initial Draft | 2025-07-14 | 1.0     | First draft based on PRD.                         | Jane (DA) |
| Updated       | 2025-01-XX | 1.1     | Expanded to include comprehensive Monex features. | Jane (DA) |
