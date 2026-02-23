export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-8 text-sm text-gray-400 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Headless Chart. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>
            Built with{" "}
            <a
              href="https://github.com/nicepkg/flitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent-blue transition-colors"
            >
              Flitter
            </a>
          </span>
          <a
            href="https://github.com/meursyphus/headless-chart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-accent-blue transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
