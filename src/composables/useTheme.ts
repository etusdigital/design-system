/**
 * Theme management composable for ETUS Design System
 * Provides runtime theme switching between ETUS and Brius themes
 */
import { ref, computed, onMounted } from 'vue'

export type ThemeType = 'etus' | 'brius'

// Reactive theme state
const currentTheme = ref<ThemeType>('etus')

// Theme class mappings
const THEME_CLASSES: Record<ThemeType, string> = {
  etus: 'etus-theme',
  brius: 'brius-theme'
} as const

/**
 * Theme management composable
 * @returns Theme management utilities
 */
export function useTheme() {
  /**
   * Set the current theme
   * @param theme - Theme to activate
   */
  const setTheme = (theme: ThemeType) => {
    currentTheme.value = theme
    applyThemeToDOM(theme)
    saveThemeToStorage(theme)
  }

  /**
   * Toggle between ETUS and Brius themes
   */
  const toggleTheme = () => {
    const newTheme: ThemeType = currentTheme.value === 'etus' ? 'brius' : 'etus'
    setTheme(newTheme)
  }

  /**
   * Apply theme class to document body
   * @param theme - Theme to apply
   */
  const applyThemeToDOM = (theme: ThemeType) => {
    // Remove all theme classes
    document.body.classList.remove(...Object.values(THEME_CLASSES))
    
    // Add current theme class
    document.body.classList.add(THEME_CLASSES[theme])
  }

  /**
   * Save theme preference to localStorage
   * @param theme - Theme to save
   */
  const saveThemeToStorage = (theme: ThemeType) => {
    try {
      localStorage.setItem('etus-design-system-theme', theme)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
  }

  /**
   * Load theme preference from localStorage
   * @returns Saved theme or default
   */
  const loadThemeFromStorage = (): ThemeType => {
    try {
      const saved = localStorage.getItem('etus-design-system-theme')
      return (saved === 'etus' || saved === 'brius') ? saved : 'etus'
    } catch (error) {
      console.warn('Failed to load theme preference:', error)
      return 'etus'
    }
  }

  /**
   * Initialize theme system
   */
  const initTheme = () => {
    const savedTheme = loadThemeFromStorage()
    setTheme(savedTheme)
  }

  // Computed properties
  const isETUSTheme = computed(() => currentTheme.value === 'etus')
  const isBriusTheme = computed(() => currentTheme.value === 'brius')
  const themeClass = computed(() => THEME_CLASSES[currentTheme.value])

  // Initialize on mount
  onMounted(() => {
    initTheme()
  })

  return {
    // State
    currentTheme: computed(() => currentTheme.value),
    themeClass,
    
    // Computed
    isETUSTheme,
    isBriusTheme,
    
    // Methods
    setTheme,
    toggleTheme,
    initTheme,
    
    // Constants
    THEME_CLASSES,
    availableThemes: Object.keys(THEME_CLASSES) as ThemeType[]
  }
}

// Export for global use
export const themeManager = {
  setTheme: (theme: ThemeType) => {
    currentTheme.value = theme
    document.body.classList.remove(...Object.values(THEME_CLASSES))
    document.body.classList.add(THEME_CLASSES[theme])
    localStorage.setItem('etus-design-system-theme', theme)
  },
  getCurrentTheme: () => currentTheme.value,
  toggleTheme: () => {
    const newTheme: ThemeType = currentTheme.value === 'etus' ? 'brius' : 'etus'
    themeManager.setTheme(newTheme)
  }
}