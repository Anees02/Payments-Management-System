# Payment Management System

## Repository
https://github.com/Anees02/Payments-Management-System

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of JavaScript and Vue.js

## Tech Stack
- Vue.js 3 (Composition API)
- Vite (Build tool)
- Vuex 4 (State management)
- Vue Router 4 (Routing)
- Tailwind CSS (Styling)
- Jest (Testing)
- Heroicons (Icons)

## Project Structure
```
src/
  ├── components/      # Reusable Vue components
  │   ├── Header.vue   # Navigation header
  │   ├── Login.vue    # Authentication form
  │   ├── PaymentForm.vue  # Payment creation/editing
  │   ├── PaymentDetails.vue  # Payment view
  │   ├── UserForm.vue   # User management
  │   └── UserDetail.vue  # User view
  ├── views/          # Page components
  │   ├── PaymentList.vue  # Payment dashboard
  │   └── UserList.vue    # User dashboard
  ├── store/          # Vuex state management
  │   └── index.js    # State, mutations, actions
  ├── router/         # Vue Router configuration
  │   └── index.js    # Route definitions
  └── data/           # Seed data
      └── seedData.json  # Initial app data
```

## Core Logic Flow

### Authentication Flow
1. User attempts to access the application
2. Route guard checks for authentication state in localStorage
3. If not authenticated, redirect to login page
4. User provides credentials (admin/admin)
5. System validates against static credentials
6. On successful login, sets isAuthenticated flag in localStorage
7. User is redirected to dashboard

### Data Flow
1. Initial application load:
   - Load seed data from seedData.json
   - Initialize Vuex store with users and payments
   - Set up localStorage sync

2. State Management:
   - All data operations go through Vuex
   - Actions handle async operations
   - Mutations update state
   - State changes trigger component updates

3. Data Persistence:
   - Every state change syncs to localStorage
   - Data survives page refreshes
   - Session management for auth state

## Features

### User Management
1. User Operations
   - Create new user profiles
   - View detailed user information
   - Edit existing user details
   - Delete user accounts
   - Search users by name/ID

2. User Data Fields
   - User ID (auto-generated)
   - Full Name
   - Email Address
   - Contact Number
   - Account Status

### Payment Management
1. Payment Operations
   - Create new payments
   - View payment details
   - Edit payment information
   - Delete payments
   - Bulk operations support

2. Payment Features
   - Real-time filtering system
   - Status tracking system
   - Category management
   - User association
   - Payment history

3. Filtering Capabilities
   - Filter by user name
   - Filter by payment ID
   - Filter by status
   - Filter by category
   - Multiple filter combination

4. Payment Categories
   - Transfer
   - Bill Payment
   - Top-Up
   - Custom categories

5. Status Types
   - Completed
   - Pending
   - Failed
   - Processing

## Technical Implementation
### Component Architecture
1. Vue Components
   - Modular design pattern
   - Single Responsibility Principle
   - Reusable component library
   - Parent-child communication

2. Composition API Usage
   - Setup function for component logic
   - Reactive data management
   - Computed properties
   - Lifecycle hooks
   - Custom composables

3. Component Communication
   - Props down
   - Events up
   - Provide/Inject for deep nesting
   - Vuex for global state

### State Management Implementation
1. Vuex Store Structure
   ```js
   store/
     ├── index.js        # Store configuration
     ├── state.js        # Initial state
     ├── mutations.js    # Synchronous updates
     ├── actions.js      # Async operations
     └── getters.js      # Computed state
   ```

2. State Organization
   - Users module
   - Payments module
   - Auth module
   - UI state module

3. Action Patterns
   - API call wrapping
   - Error handling
   - Loading states
   - Optimistic updates

### Routing Implementation
1. Route Structure
   ```js
   router/
     └── index.js
   ```

2. Route Configuration
   - Nested routes for resources
   - Route meta fields
   - Dynamic parameters
   - Navigation guards

3. Authentication Guards
   - Simple localStorage check
   - Redirect to login if not authenticated
   - Basic route protection

### UI/UX Implementation
1. Tailwind Configuration
   - Custom theme
   - Responsive breakpoints
   - Color palette
   - Typography scale

2. Component Styling
   - Utility-first approach
   - Consistent spacing
   - Responsive design
   - Dark mode support

3. User Interface
   - Mobile-first design
   - Accessibility features
   - Loading states
   - Error handling UI

## Running the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Anees02/Payments-Management-System.git
   cd Payments-Management-System
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open http://localhost:5173 in your browser
   - Login Credentials:
     * Username: admin
     * Password: admin

## Testing
```bash
# Run all tests
npm run test

# Run specific test file
npm run test PaymentList.spec.js
```

## Development Guidelines
1. Follow Vue.js best practices
2. Use Composition API for new components
3. Write tests for new features
4. Maintain consistent code formatting
5. Document significant changes

## Common Issues and Solutions
1. **Login Issues**
   - Clear browser localStorage
   - Check credentials

2. **Data Persistence**
   - Verify localStorage access
   - Check browser storage quotas

3. **Build Problems**
   - Clear npm cache
   - Remove node_modules and reinstall

Note: Make sure you have Node.js and npm installed on your system before running the project.
