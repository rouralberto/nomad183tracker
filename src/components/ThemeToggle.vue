<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDarkMode: false
    };
  },
  created() {
    // Check if theme preference is saved
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user prefers dark mode in their OS
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or OS preference
    this.isDarkMode = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    
    // Apply theme on component creation
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
    },
    applyTheme() {
      // Set the data-bs-theme attribute on the HTML element
      document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
      
      // Save preference to localStorage
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
}
</script>

<template>
  <button 
    @click="toggleTheme" 
    class="btn rounded-circle shadow-sm theme-toggle text-body" 
    :class="isDarkMode ? 'btn-light-subtle' : 'btn-dark-subtle'"
    :aria-label="isDarkMode ? $t('theme.light') : $t('theme.dark')"
    :title="isDarkMode ? $t('theme.light') : $t('theme.dark')"
  >
    <i class="bi" :class="isDarkMode ? 'bi-sun' : 'bi-moon'"></i>
  </button>
</template>

<style scoped>
.theme-toggle {
  transition: all 0.3s ease;
  border: none;
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 0.125rem 0.25rem var(--shadow-color);
}

.btn-light-subtle {
  background-color: var(--bs-light-bg-subtle);
  color: var(--bs-dark);
}

.btn-dark-subtle {
  background-color: var(--bs-dark-bg-subtle);
  color: var(--bs-light);
}
</style> 
