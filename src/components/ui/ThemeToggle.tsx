import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [contrast, setContrast] = useState(() => localStorage.getItem('contrast') === 'more');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.contrast = contrast ? 'more' : 'normal';
    localStorage.setItem('theme', theme);
    localStorage.setItem('contrast', contrast ? 'more' : 'normal');
  }, [theme, contrast]);

  return (
    <div className="theme-controls">
      <button type="button" aria-label={`Theme: ${theme}. Toggle theme`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
      <button type="button" aria-label="Toggle high contrast" aria-pressed={contrast} onClick={() => setContrast(!contrast)}>
        Contrast
      </button>
    </div>
  );
}
