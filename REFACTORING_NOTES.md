# Refactoring Notes: SalesForm Component

## Component Location
`src/components/SalesForm.jsx` (220+ lines)

## Identified Complexity Issues

### 1. **Multiple Responsibilities (Violates Single Responsibility Principle)**
The component handles:
- Form state management
- Form validation logic
- API calls (leads, email)
- Analytics tracking
- Discount code validation and pricing calculations
- UI rendering
- Error handling

### 2. **Overly Complex useEffects**
- Discount calculation logic embedded in useEffect with multiple nested conditionals
- Analytics tracking in separate useEffect
- Side effects scattered across multiple hooks

### 3. **Monolithic Validation Function**
- `validateForm()` is 40+ lines with all validation logic in one place
- Each field has complex validation rules inline
- Hard to test individual validation rules
- Difficult to reuse validation logic

### 4. **Massive Submit Handler**
- `handleSubmit()` is 60+ lines doing everything:
  - Analytics tracking
  - Validation
  - Multiple API calls
  - Email sending
  - State updates
  - Error handling
- Hard to test and debug

### 5. **Complex Conditional Rendering**
- Multiple conditional renders scattered throughout JSX
- Makes the component hard to read and understand

### 6. **Tight Coupling**
- Discount logic tightly coupled to the component
- Analytics calls embedded throughout
- API integration not abstracted

## Refactoring Strategy

### Planned Improvements:
1. **Extract validation logic** → Create separate validator functions/hooks
2. **Extract discount logic** → Create a useDiscount hook
3. **Extract API calls** → Create service functions
4. **Extract analytics** → Create useAnalytics hook
5. **Simplify form state** → Use a custom useForm hook
6. **Split UI components** → Create smaller, focused components:
   - FormField component
   - PriceSummary component
   - StatusMessage component
7. **Create a form submission handler** → Separate business logic from UI

### Benefits After Refactoring:
- Each function/component has a single responsibility
- Easier to test individual pieces
- More reusable code
- Better readability and maintainability
- Reduced coupling between concerns
