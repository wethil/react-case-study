export interface Route {
  path: string;
  title: string;
  ariaLabel: string;
  icon?: string;
}

export const routes: Record<string, Route> = {
  products: {
    path: "/products",
    title: "Products",
    ariaLabel: "Products page",
    icon: "📦",
  },
  about: {
    path: "/about",
    title: "About",
    ariaLabel: "About page",
    icon: "ℹ️",
  },
  home: {
    path: "/",
    title: "Home",
    ariaLabel: "Home page",
    icon: "🏪",
  },
};
