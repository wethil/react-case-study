import React from "react";

const Footer: React.FC<unknown> = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-400 mt-auto"
      aria-label="Footer"
      role="contentinfo"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <p tabIndex={0}>© 2025 ProductHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Privacy Policy"
              tabIndex={0}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Terms of Service"
              tabIndex={0}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Contact"
              tabIndex={0}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
