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
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
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
      class="btn btn-outline-secondary dropdown-toggle px-2 language-toggle" 
      type="button" 
      data-bs-toggle="dropdown"
      aria-expanded="false">
      {{ languages.find(lang => lang.code === value).flag }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end" style="min-width: 40px;">
      <li v-for="lang in languages" :key="lang.code">
        <button 
          class="dropdown-item text-center" 
          :class="{ active: lang.code === value }"
          @click="changeLanguage(lang.code)"
          :title="lang.name">
          {{ lang.flag }}
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

.language-toggle {
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 
