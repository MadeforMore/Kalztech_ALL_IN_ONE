# Task 11 - ReviewCheck Component

## Clean React Component Structure - No Spaghetti Code! 🍝❌

This project demonstrates best practices for building React applications with clean, maintainable code structure.

## Key Features

- **Review Submission Form** with validation
- **Review Management** (Approve/Reject/Delete)
- **Status Filtering** (All, Pending, Approved, Rejected)
- **Star Rating System**
- **Clean Component Architecture**

## Clean Code Principles Applied

### 1. **Separation of Concerns**
- Components are split into presentational and container components
- Business logic separated from UI rendering
- Custom hooks for reusable logic

### 2. **Single Responsibility Principle**
- Each component has one clear purpose
- Utility functions isolated in separate files
- Custom hooks handle specific functionality

### 3. **DRY (Don't Repeat Yourself)**
- Reusable `FormInput` component
- Shared validation utilities
- Constants defined once and imported

### 4. **Component Organization**
```
src/
├── components/       # UI Components
│   ├── ReviewForm.jsx
│   ├── ReviewList.jsx
│   ├── ReviewCard.jsx
│   ├── FormInput.jsx
│   └── StarRating.jsx
├── hooks/           # Custom Hooks
│   ├── useReviews.js
│   └── useFormValidation.js
├── utils/           # Utilities
│   ├── constants.js
│   └── validation.js
└── App.jsx          # Main App
```

## Installation

```bash
cd Task11-ReviewCheck
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## What Makes This "Not Spaghetti Code"?

### ❌ Spaghetti Code Would Have:
- All logic in one massive component
- Inline validation everywhere
- Repeated code blocks
- Mixed concerns (UI + logic + data)
- Hard to test and maintain

### ✅ This Clean Code Has:
- **Modular Components**: Each component is small and focused
- **Custom Hooks**: Reusable logic extracted into hooks
- **Utility Functions**: Shared functions in dedicated files
- **Constants**: Single source of truth for app values
- **Clear Data Flow**: Props flow down, events bubble up
- **Easy to Test**: Each piece can be tested independently
- **Easy to Maintain**: Changes are localized and predictable

## Component Breakdown

- **App.jsx**: Main container, orchestrates the app
- **ReviewForm.jsx**: Handles review submission
- **ReviewList.jsx**: Displays and filters reviews
- **ReviewCard.jsx**: Individual review display
- **FormInput.jsx**: Reusable form input with validation
- **StarRating.jsx**: Interactive star rating component
- **useReviews.js**: Review state management hook
- **useFormValidation.js**: Form validation logic hook

## Learning Points

1. **Component Composition**: Building complex UIs from simple components
2. **Custom Hooks**: Extracting and reusing stateful logic
3. **Prop Drilling Solution**: Using composition to avoid deep prop chains
4. **Validation Pattern**: Centralized validation with clear error handling
5. **State Management**: Local state with custom hooks
