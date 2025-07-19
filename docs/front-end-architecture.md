# CashCanvas Frontend Architecture Document

## Table of Contents

- [Introduction](https://www.google.com/search?q=%23introduction)
- [Overall Frontend Philosophy & Patterns](https://www.google.com/search?q=%23overall-frontend-philosophy--patterns)
- [Detailed Frontend Directory Structure](https://www.google.com/search?q=%23detailed-frontend-directory-structure)
- [Component Breakdown & Implementation Details](https://www.google.com/search?q=%23component-breakdown--implementation-details)
  - [Component Naming & Organization](https://www.google.com/search?q=%23component-naming--organization)
  - [Template for Component Specification](https://www.google.com/search?q=%23template-for-component-specification)
- [State Management In-Depth](https://www.google.com/search?q=%23state-management-in-depth)
  - [Store Structure / Slices](https://www.google.com/search?q=%23store-structure--slices)
  - [Key Selectors](https://www.google.com/search?q=%23key-selectors)
  - [Key Actions / Reducers / Thunks](https://www.google.com/search?q=%23key-actions--reducers--thunks)
- [API Interaction Layer](https://www.google.com/search?q=%23api-interaction-layer)
  - [Client/Service Structure](https://www.google.com/search?q=%23clientservice-structure)
  - [Error Handling & Retries (Frontend)](https://www.google.com/search?q=%23error-handling--retries-frontend)
- [Routing Strategy](https://www.google.com/search?q=%23routing-strategy)
  - [Route Definitions](https://www.google.com/search?q=%23route-definitions)
  - [Route Guards / Protection](https://www.google.com/search?q=%23route-guards--protection)
- [Build, Bundling, and Deployment](https://www.google.com/search?q=%23build-bundling-and-deployment)
  - [Build Process & Scripts](https://www.google.com/search?q=%23build-process--scripts)
  - [Key Bundling Optimizations](https://www.google.com/search?q=%23key-bundling-optimizations)
  - [Deployment to CDN/Hosting](https://www.google.com/search?q=%23deployment-to-cdnhosting)
- [Frontend Testing Strategy](https://www.google.com/search?q=%23frontend-testing-strategy)
  - [Component Testing](https://www.google.com/search?q=%23component-testing)
  - [UI Integration/Flow Testing](https://www.google.com/search?q=%23ui-integrationflow-testing)
  - [End-to-End UI Testing Tools & Scope](https://www.google.com/search?q=%23end-to-end-ui-testing-tools--scope)
- [Accessibility (AX) Implementation Details](https://www.google.com/search?q=%23accessibility-ax-implementation-details)
- [Performance Considerations](https://www.google.com/search?q=%23performance-considerations)
- [Internationalization (i18n) and Localization (l10n) Strategy](https://www.google.com/search?q=%23internationalization-i18n-and-localization-l10n-strategy)
- [Feature Flag Management](https://www.google.com/search?q=%23feature-flag-management)
- [Frontend Security Considerations](https://www.google.com/search?q=%23frontend-security-considerations)
- [Browser Support and Progressive Enhancement](https://www.google.com/search?q=%23browser-support-and-progressive-enhancement)
- [Change Log](https://www.google.com/search?q=%23change-log)

## Introduction

This document details the technical architecture specifically for the frontend of CashCanvas. It complements the main CashCanvas Architecture Document and the UI/UX Specification. This document details the frontend architecture and **builds upon the foundational decisions** (e.g., overall tech stack, CI/CD, primary testing tools) defined in the main CashCanvas Architecture Document (`docs/architecture.md` or linked equivalent). **Frontend-specific elaborations or deviations from general patterns must be explicitly noted here.** The goal is to provide a clear blueprint for frontend development, ensuring consistency, maintainability, and alignment with the overall system design and user experience goals.

- **Link to Main Architecture Document (REQUIRED):** `docs/architecture.md`
- **Link to UI/UX Specification (REQUIRED if exists):** `docs/front-end-spec.md`
- **Link to Primary Design Files (Figma, Sketch, etc.) (REQUIRED if exists):** `https://www.figma.com/design/ZP67IINPNDk2Fp2W84o1Il/Expense-management-app-ui-kit--Community-?node-id=1-198&p=f&t=bvenrH7bd6GUFBx6-0`
- **Link to Deployed Storybook / Component Showcase (if applicable):** {To be created}

## Overall Frontend Philosophy & Patterns

- **Framework & Core Libraries:** React Native 0.7x with the Hermes engine. These are derived from the 'Definitive Tech Stack Selections' in the main Architecture Document. This section elaborates on _how_ these choices are applied specifically to the frontend.
- **Component Architecture:** Atomic Design principles will be followed. We will create base, reusable components and compose them into more complex feature components. The overall structure will separate presentational components from container components that handle logic and state.
- **State Management Strategy:** Redux Toolkit will be used for managing global application state (e.g., user session, transactions, goals). Local component state will be handled with `useState` and `useReducer` hooks for UI-specific concerns. This is referenced from main Architecture Document and detailed further in "State Management In-Depth" section.
- **Data Flow:** A unidirectional data flow will be enforced via Redux, ensuring a predictable state container. Asynchronous data fetching will be managed using Redux Thunks.
- **Styling Approach:** **Tailwind CSS** (via `twrnc` or similar library) will be the primary styling solution to allow for rapid UI development and easy adherence to the design system. Configuration File(s): `tailwind.config.js`. Key conventions: "Utility-first approach. Custom component classes will be composed of utilities. Theme extensions for colors, fonts, and spacing will be defined in `tailwind.config.js`."
- **Key Design Patterns Used:** Provider Pattern (for themes and state), Hooks (for reusable logic), Container/Presentational Pattern, Service Pattern (for API calls). These patterns are to be consistently applied.

## Detailed Frontend Directory Structure

```plaintext
src/
├── api/                    # API service definitions and client configuration. MUST contain all API interaction logic.
│   ├── apiClient.ts        # Axios client setup and interceptors.
│   ├── authService.ts      # Authentication related API calls.
│   ├── transactionService.ts # Transaction related API calls.
│   └── goalService.ts        # Goals related API calls.
├── assets/                 # Static assets like images, fonts. MUST contain all static resources.
│   ├── fonts/
│   └── images/
├── components/             # Shared, reusable UI components.
│   ├── ui/                 # Base UI elements (Button, Input, Card). MUST contain only generic, presentational UI elements.
│   ├── layout/             # Layout components (Header, TabBar). MUST contain components structuring page layouts.
│   └── charts/             # Reusable chart components.
├── features/               # Feature-specific logic, hooks, non-global state, services, and components.
│   └── auth/
│       ├── components/     # Components used exclusively by the auth feature.
│       └── screens/        # Screen components for the auth feature (Login, Signup).
├── hooks/                  # Global, sharable custom React Hooks. MUST be generic.
│   └── useDebounce.ts
├── navigation/             # Navigation configuration. MUST contain all React Navigation setup.
│   ├── AppNavigator.tsx    # Main navigator deciding between Auth and Main flows.
│   ├── AuthStack.tsx       # Navigator for Login, Signup, Onboarding screens.
│   └── MainTabNavigator.tsx  # Bottom tab navigator for the main app.
├── screens/                # Top-level screen components for the main app.
│   ├── DashboardScreen.tsx
│   ├── TransactionHistoryScreen.tsx
│   └── SettingsScreen.tsx
├── store/                  # Global Redux state management setup.
│   ├── index.ts            # Main store configuration.
│   ├── rootReducer.ts      # Root reducer combining all slices.
│   └── slices/             # Individual state slices.
│       ├── sessionSlice.ts
│       └── transactionSlice.ts
├── styles/                 # Global styles, theme configurations.
│   └── theme.ts
└── utils/                  # Utility functions, helpers, constants. MUST contain pure functions.
    └── formatCurrency.ts
```

### Notes on Frontend Structure:

The structure is feature-oriented to promote modularity and scalability. Global components are separated from feature-specific components. Navigation has its own dedicated folder to manage all routing logic. AI Agent MUST adhere to this defined structure strictly.

## Component Breakdown & Implementation Details

This section outlines the conventions and templates for defining UI components. The AI agent MUST follow the "Template for Component Specification" below whenever a new component is identified for development.

### Component Naming & Organization

- **Component Naming Convention:** **PascalCase for files and component names: `TransactionCard.tsx`**. All component files MUST follow this convention.
- **Organization:** Globally reusable components in `src/components/ui/` or `src/components/layout/`. Feature-specific components are co-located within their feature directory.

### Template for Component Specification

#### Component: `TransactionCard`

- **Purpose:** To display a summary of a single transaction in a list. MUST be clear and concise.
- **Source File(s):** `src/components/ui/TransactionCard.tsx`. MUST be the exact path.
- **Visual Reference:** Figma link to the transaction list component. REQUIRED.
- **Props (Properties):**
  | Prop Name | Type | Required? | Default Value | Description |
  | :------------ | :--------------------------------------- | :-------- | :------------ | :------------------------------------------------------------------------ |
  | `iconName` | `string` | Yes | N/A | The name of the icon representing the category. MUST be a valid icon name. |
  | `category` | `string` | Yes | N/A | The name of the transaction category (e.g., "Food", "Salary"). |
  | `description` | `string` | Yes | N/A | A short description of the transaction. |
  | `amount` | `number` | Yes | N/A | The transaction amount. Positive for income, negative for expense. |
  | `date` | `string` | Yes | N/A | The date of the transaction in ISO format. |
  | `onPress` | `() => void` | Yes | N/A | Callback function when the card is pressed. |
- **Key UI Elements / Structure:**
  ```html
  <TouchableOpacity
    class="flex-row items-center p-4 bg-white rounded-lg shadow-sm">
    <Icon name="{iconName}" class="text-xl" />
    <View class="flex-1 ml-4">
      <Text class="font-bold">{category}</Text>
      <Text class="text-gray-500">{description}</Text>
    </View>
    <View class="items-end">
      <Text class="{amount > 0 ? 'text-green-500' : 'text-gray-800'} font-bold"
        >{formattedAmount}</Text
      >
      <Text class="text-gray-500">{formattedDate}</Text>
    </View>
  </TouchableOpacity>
  ```
- **Styling Notes:**
  - MUST use Tailwind CSS utility classes. The container uses `p-4 bg-white rounded-lg shadow-sm`. The amount text color MUST be conditional based on the value (income/expense). AI Agent should prioritize direct utility class usage.
- **Accessibility Notes:**
  - The component MUST be wrapped in a touchable element with `accessible={true}` and an `accessibilityLabel` describing the full transaction details, e.g., `"Transaction: {category}, {description}, {amount} on {date}"`.

---

## State Management In-Depth

- **Chosen Solution:** Redux Toolkit
- **Decision Guide for State Location:**
  - **Global State (Redux Toolkit):** User session, auth token, transactions, goals, reminders, notifications. MUST be used for data shared across screens.
  - **Local Component State (`useState`):** Form inputs, modal visibility, UI-specific toggles. MUST be the default choice unless criteria for Global State are met.

### Store Structure / Slices

- **Core Slice Example (`sessionSlice` in `src/store/slices/sessionSlice.ts`):**
  - **Purpose:** Manages user session, authentication status, and basic user profile info accessible globally.
  - **State Shape (Interface/Type):**
    ```typescript
    interface SessionState {
      user: { id: string; email: string } | null;
      token: string | null;
      status: "idle" | "loading" | "succeeded" | "failed";
      error: string | null;
    }
    ```
- **Feature Slice Template (`{featureName}Slice` in `src/store/slices/{featureName}Slice.ts`):**
  - **Purpose:** To be filled out for features like transactions, goals, etc.
  - **Export:** All actions and selectors MUST be exported.

## API Interaction Layer

### Client/Service Structure

- **HTTP Client Setup:** An Axios instance in `src/api/apiClient.ts`. **MUST** include: Base URL from an environment variable (`API_BASE_URL`), default headers, and interceptors for automatically injecting the auth token from the Redux store and for standardizing error handling.
- **Service Definitions (Example):**
  - **`authService.ts` (in `src/api/authService.ts`):**
    - **Purpose:** Handles all API interactions related to authentication.
    - **Functions:** `login(credentials): Promise<{user, token}>`, `signup(details): Promise<{user, token}>`. Each service function MUST have explicit types and call the configured `apiClient`.

### Error Handling & Retries (Frontend)

- **Global Error Handling:** The Axios response interceptor will catch API errors. 401 errors will trigger a logout action. 5xx errors will dispatch an action to show a global error banner/toast.
- **Specific Error Handling:** Forms will handle 4xx validation errors locally to display messages on the relevant fields.

## Routing Strategy

- **Routing Library:** React Navigation
- **Navigator Structure:** A main stack navigator (`AppNavigator`) will conditionally render either the `AuthStack` (for onboarding/login/signup) or the `MainTabNavigator` based on the user's authentication status from the Redux store.

### Route Definitions

| Path Pattern            | Component/Screen (`src/screens/...` or `src/features/...`) | Protection      | Notes                    |
| :---------------------- | :--------------------------------------------------------- | :-------------- | :----------------------- |
| `Onboarding`            | `AuthStack`                                                | `Public`        |                          |
| `Login`                 | `AuthStack`                                                | `Public`        |                          |
| `Signup`                | `AuthStack`                                                | `Public`        |                          |
| `Dashboard`             | `MainTabNavigator`                                         | `Authenticated` |                          |
| `TransactionHistory`    | `MainTabNavigator`                                         | `Authenticated` |                          |
| `Goals`                 | `MainTabNavigator`                                         | `Authenticated` |                          |
| `TransactionDetail/:id` | `(within a stack)`                                         | `Authenticated` | Parameter: `id` (string) |

### Route Guards / Protection

- **Authentication Guard:** The `AppNavigator` will act as the guard. It will listen to the `sessionSlice.token` from the Redux store. If a token exists, it renders the `MainTabNavigator`; otherwise, it renders the `AuthStack`. This ensures unauthenticated users cannot access the main app screens.

## Build, Bundling, and Deployment

- **Build Process & Scripts:** Standard React Native build process using `npx react-native run-ios` and `npx react-native run-android`. `package.json` will contain scripts for `start`, `build:ios`, `build:android`, `test`, and `lint`.
- **Environment Configuration Management:** Using `react-native-config` to manage environment variables (`.env` files) for different environments (dev, staging, prod). AI Agent MUST NOT generate code that hardcodes environment-specific values.
- **Deployment to CDN/Hosting:** Deployment will be to the Apple App Store and Google Play Store. A CI/CD pipeline using GitHub Actions and Fastlane will be configured to automate the build and release process.

## Frontend Testing Strategy

- **Link to Main Overall Testing Strategy:** `docs/architecture.md#overall-testing-strategy`

### Component Testing

- **Tools:** Jest with React Native Testing Library.
- **Focus:** Rendering components with various props, user interactions (`fireEvent`, `userEvent`), and asserting on the rendered output. Snapshot testing MUST be used sparingly.
- **Location:** `*.test.tsx` files co-located with the component files in a `__tests__` subdirectory.

### End-to-End UI Testing Tools & Scope

- **Tools:** Detox
- **Scope (Frontend Focus):** Key user journeys MUST be covered: "User registration and login flow", "Adding an income and an expense transaction and verifying they appear on the dashboard", "Creating a savings goal".

## Accessibility (AX) Implementation Details

- **Semantic HTML:** Not applicable. Instead, **AI Agent MUST prioritize using React Native's accessibility props** on components (`<View>`, `<Text>`, `<TouchableOpacity>`).
- **ARIA Implementation:** The agent MUST use `accessibilityLabel` for interactive elements without visible text, `accessibilityHint` for extra instructions, and `accessibilityRole` (e.g., 'button', 'header') to define the element's purpose.
- **Focus Management:** Focus will be managed using standard React Native focus capabilities. For modals, focus must be trapped within the modal content.
- **Testing Tools for AX:** Automated tests with `jest-axe` will be integrated into the CI pipeline to catch basic violations. Manual testing with VoiceOver (iOS) and TalkBack (Android) is required for critical flows.

## Performance Considerations

- **Image Optimization:** Use `react-native-fast-image` for caching and performant image loading. SVGs for all icons.
- **Minimizing Re-renders:** `React.memo` MUST be used for pure components, especially in lists. Selectors for global state MUST be memoized with Reselect.
- **Virtualization:** `FlatList` and `SectionList` MUST be used for all transaction/goal/reminder lists to ensure memory efficiency. The `getItemLayout` prop should be used where possible to optimize rendering.

## Internationalization (i18n) and Localization (l10n) Strategy

- **Requirement Level:** Not a requirement for MVP.
- **Chosen i18n Library/Framework:** If added post-MVP, `i18next` with `react-i18next` would be the chosen solution.

## Feature Flag Management

- **Requirement Level:** Not a primary architectural concern for this project at this time.

## Frontend Security Considerations

- **Secure Token Storage & Handling:**
  - **Storage Mechanism:** **MUST use a secure storage library like `react-native-keychain`** to store JWTs. `AsyncStorage` is forbidden for storing sensitive tokens.
  - **Token Refresh:** The `apiClient`'s interceptor will handle 401 errors to trigger a token refresh flow.
- **Client-Side Data Validation:**
  - **Purpose:** For UX improvement ONLY. **All critical data validation MUST occur server-side**.
  - **Implementation:** Use a library like `Formik` with `Yup` for form state management and validation.

## Browser Support and Progressive Enhancement

- **Target Browsers:** Not applicable. This is a native mobile application.
- **Target OS Versions:** iOS 15+ and Android 8.0+ (API level 26+).

## Change Log

| Change        | Date       | Version | Description               | Author    |
| :------------ | :--------- | :------ | :------------------------ | :-------- |
| Initial Draft | 2025-07-14 | 1.0     | First draft based on spec | Jane (DA) |
