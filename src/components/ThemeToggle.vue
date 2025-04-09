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
    class="btn btn-sm rounded-pill shadow-sm theme-toggle" 
    :class="isDarkMode ? 'btn-light text-dark' : 'btn-dark text-light'"
    aria-label="Toggle theme"
  >
    <i class="bi" :class="isDarkMode ? 'bi-sun' : 'bi-moon'"></i>
    <span class="ms-1 d-none d-sm-inline">{{ isDarkMode ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  transition: all 0.3s ease;
  border: none;
}

.theme-toggle:hover {
  transform: translateY(-1px);
}
</style> 
