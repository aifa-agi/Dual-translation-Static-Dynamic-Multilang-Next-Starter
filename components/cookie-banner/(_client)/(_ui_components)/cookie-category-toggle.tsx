//components/cookie-banner/(_client)/(_ui_components)/cookie-category-toggle.tsx

'use client';

import React from 'react';

interface CookieCategoryToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Toggle switch component for cookie category enable/disable.
 * Accessible button with animation and ARIA pressed attribute.
 *
 * @param props
 */
export function CookieCategoryToggle({
  enabled,
  onToggle,
  label,
  ariaLabel,
  disabled = false,
  className = '',
}: CookieCategoryToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      onClick={onToggle}
      disabled={disabled}
      className={`${className} w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600 justify-end' : 'bg-gray-300 dark:bg-gray-600 justify-start'
      } flex items-center px-1`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
          enabled ? 'translate-x-6' : ''
        }`}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
