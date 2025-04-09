<script>
export default {
  name: 'LanguageSwitcher',
  props: {
    value: {
      type: String,
      default: 'en'
    }
  },
  data() {
    return {
      languages: [
        { code: 'en', name: 'English' },
        { code: 'zh', name: '中文' },
        { code: 'es', name: 'Español' }
      ]
    };
  },
  methods: {
    changeLanguage(langCode) {
      this.$emit('change-language', langCode);
    }
  }
}
</script>

<template>
  <div class="dropdown">
    <button 
      class="btn btn-outline-secondary dropdown-toggle px-3 py-2" 
      type="button" 
      data-bs-toggle="dropdown" 
      aria-expanded="false">
      <i class="bi bi-translate me-1"></i>
      {{ languages.find(lang => lang.code === value).name }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li v-for="lang in languages" :key="lang.code">
        <button 
          class="dropdown-item" 
          :class="{ active: lang.code === value }"
          @click="changeLanguage(lang.code)">
          {{ lang.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown-item.active,
.dropdown-item:active {
  background-color: var(--bs-secondary);
}
</style> 
