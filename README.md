This project is a case study implementation of a maintainable, scalable application, designed with React, TypeScript and Vite. As well as it has strict type rules, it enforces linter rules to maintain readability, prevent possible bugs and follow best practices on the syntax.

The project is using Tailwind CSS as for styling. All components are responsive and provide a mobile-friendly UI for smaller screens.

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn (recommended for dependency management)

### Quick Start with Yarn

1. Clone the repository:

   ```
   git clone <https://github.com/wethil/react-case-study>
   cd <react-case-study>
   ```

2. Install dependencies:

   ```
   yarn install
   ```

   **Note:** If you're using Yarn version 3 or later, you may need to install the core SDKs for IDEs first:

   ```
   yarn dlx @yarnpkg/sdks
   ```

   Then run `yarn install` as usual.

3. Install Git hooks (handled automatically via Husky during installation):
   ```
   yarn postpack  # Optional, but run if hooks aren't set up
   ```

### Alternative: Using npm

If you prefer npm:

```
npm install
npx husky install  # For Git hooks
```

### Running the Project

- Start the development server: `yarn dev`
- Build for production: `yarn build`
- Lint the code: `yarn lint`
- Preview the production build: `yarn preview`
- Run tests: `yarn test:run`
- Run tests with coverage: `yarn test:coverage`
- Run tests in UI mode: `yarn test:ui`

## Architectural Structure

- Practiced SOLID principles to enable readability, scalability and maintainability. Each component, hook and function has single responsibility. I avoided tightly coupled between component and logic.

- The Linter rules, enforces that any code that written must follow the best practices and typed (not with any).

- Every TypeScript file must have explicit types for props, state, function parameters and returns.

## Coding Convention

- Every React component with prop has type declarations and has a `displayName` for debugging.

- Components use PascalCase; functions and variables use camelCase.

- Functions and hooks are created with `export [default] function FN(Parameters)` or arrow function conventions.

## Accessibility

- Semantic HTML and ARIA attributes are used throughout for accessibility.

- Keyboard navigation is supported with Tailwind `focus-visible:ring`.

- All tap targets are at least 44x44px for mobile usability.

## State Management

Since the project doesn't carry a huge data, no any external state management library is used. I used React Contexts to pass the resource service to child components, for now using component's its own state to store the data.

## Data Fetching

Even we don't have a test server for the project, I modularised the fetching data resource to ensure that any resource service can be implemented easily and without requiring significant code change.

## How the Application Gets Data

On the project, resource pattern is implemented to make the usage of React Suspense and React ErrorBoundary. That pattern ensure that we will always have a promise that will be resolved or rejected. Since Suspense and ErrorBoundary is looking and checking the promises in the component, we needed to be sure that we are using promises correctly. That is why I created "Resource" class. This class will be used in the `useGetProducts` hook. The hook will create a resource for every request based on their parameter keys. The hook will use the same resource if there is any existing resource that created before in order to prevent unnecessary resource creation.

Since I use the React Context to pass the service context to children components (`ProductDataContext`), I am able to use that in `useGetProducts` to reach any resource that my context is using. (In this case, `MockProductDataService`).

## How useGetProducts hook is working alongside with Suspense and ErrorBoundary

That `useGetProducts` hook has two parameters.

```
const useGetProducts = (
  params?: Record<string, unknown>,
  cache: IResourceCache = globalCache
)
```

`params`: The parameter will include the params for our data request from any source.
`cache`: The cache that stores created resources. If not provided, there will be a globalCache that will be created inside of the hook. Accepting the `cache` as parameter, enable us to use different cache strategies and sources on future, and make the testing easier.

The hook will try to read the data from the `Resource`, and return it to component that using it. Depends of the promise status (pending','success','error'), Suspense an ErrorBoundary will reflect on the app to show loading screens or the error page.

That structure could be used for all pages that will communicate with the service. Otherwise, we can manually use the service itself to resolve our data.

## How the List Sorting the Column

The project has `useSort` hook that responsible for sort the data comes from parameter. It has:

`data`: The data needs to be sorted.
`options: { initialSort: boolean}`: It has options with only one `initialSort` key. It indicates initial sorting settings, could be beneficial in future.

The `useSort` hook supports multi-column sorting. When users hold `Shift` and select multiple columns, the most recently selected column becomes the primary sort key, while previously selected columns are sorted in the order they were chosen. This allows users to sort data by several columns, prioritizing the latest selection and maintaining the order of earlier columns for tie-breaking.

On mobile devices or smaller screens, users can activate multi-column sorting using a checkbox displayed above the sortable column buttons.

## Performance

- I used `React.lazy` and `Suspense` to reduce the initial bundle size and improves load times since Vite is fully compatible in terms of building production code and fast refresh.

- I used `useCallback` and `useMemo` to cache expensive calculations like sorting and pagination to prevent unnecessary re-rendering.

- The project have ErrorBoundary to prevent crashing, showing Suspense fallback when internal promise is pending. Besides that, I tried to minimize any re-render.

## Testing

- I implemented `vitest` to write unit test for components and functions.

- I implemented `playwright` for e2e tests. Playwright has a great api to simulate any user behaviour, and tests are easily can be run on different browsers or resolutions.

## CI/CD pipeline

- The project has two github actions `e2e_tests.yaml` and `unit_tests.yaml`. The unit test action will install the project, will run lint and the type checks and unit tests finally. `e2e_tests.yaml` will install the `playwright` and run the e2e tests.

## Dev tools

- The project has ESlint for forcing certain rules and styles, and has prettier to style code automatically. Besides, it has `husky` and `lint-staged` modules to hook git actions and prevent committing code that violates linter rules and the TypeScript typing rules.

## Trade-offs

- In real world, we generally fetch the data by pages instead of fetching whole data collection. In the project, 'usePagination' will paginate the items based on the "page" parameter on the URL. When it comes to fetch from the backend, that hook won't need to `slice` the item array since we will have already paginated items from backend.

- I considered to add Virtualised lists, but since we already show only 10 items, there is no need to virtualise the rows and cards. Adding virtualisation will increase the complexity, overhead the performance for small lists unnecessarily and cause possible touch problems on mobile.

- I created two different layout for Product Listing. The project has a mobile layout with showing Product Cards and desktop layout with showing Rows. We may create one component to show both of them in a responsive way, but that component will possibly has some readability issues, and require some workarounds that disrupt the code quality.

## Suggestion for the future

- Virtualisation may be added if a large data set needs to be shown on the screen.

- I18n may be added if needed

- An external state management (Redux/Zustand) may be added if app needs to handle internal big data structure

- Project is using local data, with a small implementation change, it can accept an external data source with pagination

- More tests can be added for additional edge cases by creating a mock server for the project.

## Usage of AI tools

I actively used co-pilot for creating utils and components. I constantly tried improve the performance and make co-pilot follow the best practices while creating the code. Most of the tests written by co-pilot. I checked if those tests are helpful on my cases and not giving false positives.

---

````markdown
# Senior Frontend Developer - Take-Home Challenge

## 🎯 Overview

Welcome to the ProductsUp take-home challenge! This exercise is designed to evaluate your React architecture skills, Tailwind CSS proficiency, and ability to build scalable, maintainable features.

**Time Allocation:** 3-4 hours

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-takehome-case

# Install dependencies
npm install

# Start development server
npm run dev
```
````

The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 Challenge Requirements

### 1. Sorting Functionality ✅

Enhance the Products table with sorting capabilities:

- [ ] Add sorting by **Product Name** (A-Z, Z-A)
- [ ] Add sorting by **Price** (Low to High, High to Low)
- [ ] Make column headers clickable with visual indicators (arrows/icons)
- [ ] Ensure sorting works seamlessly with the existing category filter
- [ ] Maintain sort state when switching between categories

**Bonus:** Consider multi-column sorting or using lucide-react icons for visual feedback

---

### 2. Pagination 📄

Implement client-side pagination for the product list:

- [ ] Display **10 products per page**
- [ ] Add Previous/Next navigation buttons
- [ ] Show page numbers with current page highlighted
- [ ] Display items range (e.g., "Showing 1-10 of 15 products")
- [ ] Reset to page 1 when filters or sorting changes
- [ ] Structure code to allow easy transition to **server-side pagination** later

**Architecture Note:** Consider creating a reusable `usePagination` hook

---

### 3. Responsive Layout 📱

Make the product table responsive across all devices:

- [ ] **Desktop (1024px+)**: Full table layout (current implementation)
- [ ] **Tablet (768px-1023px)**: Optimized table with adjusted spacing
- [ ] **Mobile (<768px)**: Convert to **card or grid layout**
- [ ] Maintain all functionality (filter, sort, pagination) across breakpoints
- [ ] Ensure touch-friendly tap targets on mobile

**Tailwind Tip:** Use responsive utilities like `hidden`, `block`, `md:table`, `grid`, etc.

---

## 💎 Evaluation Criteria

Your submission will be evaluated on:

### Code Quality (30%)

- Clean, readable component structure
- Proper separation of concerns
- Consistent naming conventions
- Well-organized file structure

### Scalability (25%)

- Easy to extend and maintain
- Reusable components and hooks
- Future-proof architecture
- Clear abstractions

### Performance (20%)

- Efficient rendering patterns
- Proper React optimization (useMemo, useCallback if needed)
- Consideration for large datasets
- Minimal unnecessary re-renders

### UI/UX Polish (25%)

- Thoughtful Tailwind class usage
- Smooth transitions and interactions
- Accessible markup (semantic HTML, ARIA labels)
- Intuitive user experience

---

## 🌟 Bonus Points (Optional)

Impress us with:

- ⭐ **Custom Hooks** - Extract reusable logic (e.g., `usePagination`, `useSort`, `useFilter`)
- ⭐ **TypeScript** - Add types/interfaces for better type safety
- ⭐ **Loading States** - Implement skeleton screens or loading indicators
- ⭐ **Accessibility** - Keyboard navigation, screen reader support
- ⭐ **Animations** - Subtle transitions using Tailwind or CSS
- ⭐ **Error Boundaries** - Graceful error handling
- ⭐ **URL State** - Persist filter/sort/page state in URL params

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── index.css            # Tailwind imports
└── components/          # (You may create this)
    ├── Header.jsx
    ├── Sidebar.jsx
    ├── Footer.jsx
    ├── ProductsPage.jsx
    └── ...
```

**Note:** Feel free to restructure as you see fit. We want to see YOUR architectural decisions.

---

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Tailwind CSS v4** - Styling (using @tailwindcss/vite)
- **Vite** - Build tool
- **Lucide React** - Icon library (optional)
- **React Router** - Available if needed (currently using state-based routing)

---

## 📝 Submission Guidelines

### What to Submit

1. **GitHub Repository**
   - Push your completed code to a public GitHub repo
   - Include this README with any updates/notes

2. **README Updates** (Add a section below)
   - Document your architectural decisions
   - Explain any trade-offs you made
   - List what you'd improve with more time
   - Note any assumptions you made

3. **Code Comments**
   - Add comments for complex logic
   - Explain non-obvious decisions

### Example README Section to Add:

```markdown
## 🏗️ My Implementation Notes

### Architecture Decisions

- Created custom `usePagination` hook to encapsulate pagination logic...
- Chose to keep sorting state in ProductsPage rather than global state because...

### Trade-offs

- Implemented client-side pagination due to time constraints. For production, I'd...
- Used simple category filter instead of multi-select to focus on core requirements...

### What I'd Improve

- Add unit tests for sorting and pagination logic
- Implement virtualization for 10k+ products
- Add debounced search functionality
- Better error handling and loading states

### Time Breakdown

- Sorting: 1 hour
- Pagination: 1.5 hours
- Responsive layout: 1 hour
- Polish & refactoring: 30 minutes
```

---

## ❓ FAQ

**Q: Can I use additional libraries?**  
A: Stick to what's provided. We want to see your core React and Tailwind skills.

**Q: Should I add TypeScript?**  
A: Optional but appreciated. The codebase is JavaScript by default.

**Q: Can I refactor the existing code?**  
A: Absolutely! We want to see your architectural decisions.

**Q: What if I don't finish everything?**  
A: Focus on quality over quantity. It's better to have 2 well-implemented features than 3 rushed ones.

**Q: Can I use React Router for navigation?**  
A: It's available in package.json, but the current state-based approach is fine for this challenge.

**Q: Can I use agentic AI tools (e.g., GitHub Copilot, ChatGPT, Cursor, etc.)?**  
A: Yes — you’re allowed (and even encouraged) to use agentic AI tools if they help you move faster or structure your work more effectively.
However, please be transparent:

- Clearly note **where** and **why** you used AI assistance (e.g., to refactor code, generate utility hooks, or optimize Tailwind classes).
- We’re not grading whether you used AI — we’re assessing your **ability to understand, adapt, and explain** the code you produce.

---

## 🙏 Thank You!

We appreciate you taking the time to complete this challenge. We're excited to see your approach and discuss it with you in the follow-up round.

Good luck! 🚀
