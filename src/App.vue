<script>
import StayForm from './components/StayForm.vue';
import StayList from './components/StayList.vue';
import CountrySummary from './components/CountrySummary.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'App',
  components: {
    StayForm,
    StayList,
    CountrySummary,
    ThemeToggle,
    LanguageSwitcher
  },
  setup() {
    const { locale } = useI18n();
    return { locale };
  },
  data() {
    return {
      stays: [],
      editingStay: null,
      alertMessage: null,
      alertType: 'success',
      showAlert: false,
      storageKey: 'nomad183tracker-stays'
    };
  },
  computed: {
    countrySummary() {
      // Group stays by country and calculate total days
      const summary = this.stays.reduce((acc, stay) => {
        const country = stay.country;
        if (!acc[country]) {
          acc[country] = { country, totalDays: 0 };
        }
        acc[country].totalDays += stay.days;
        return acc;
      }, {});
      
      // Convert to array and sort by total days descending
      return Object.values(summary).sort((a, b) => b.totalDays - a.totalDays);
    }
  },
  created() {
    // Load data from localStorage when component is created
    this.loadStays();
  },
  methods: {
    loadStays() {
      try {
        const savedStays = localStorage.getItem(this.storageKey);
        if (savedStays) {
          this.stays = JSON.parse(savedStays);
        }
      } catch (error) {
        console.error('Error loading stays from localStorage:', error);
        this.showAlertMessage(this.$t('alerts.loadError'), 'danger');
      }
    },
    saveStays() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.stays));
      } catch (error) {
        console.error('Error saving stays to localStorage:', error);
        this.showAlertMessage(this.$t('alerts.saveError'), 'danger');
      }
    },
    addStay(newStay) {
      if (this.editingStay) {
        // Update existing stay
        const index = this.stays.findIndex(s => s.id === this.editingStay.id);
        if (index !== -1) {
          this.stays.splice(index, 1, { ...newStay, id: this.editingStay.id });
          this.showAlertMessage(this.$t('alerts.stayUpdated'), 'success');
        }
        this.editingStay = null;
      } else {
        // Add new stay
        this.stays.push(newStay);
        this.showAlertMessage(this.$t('alerts.stayAdded'), 'success');
      }
      this.saveStays();
    },
    editStay(stay) {
      this.editingStay = stay;
      // The StayForm component will be updated in the next tick
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    deleteStay(stayId) {
      const index = this.stays.findIndex(stay => stay.id === stayId);
      if (index !== -1) {
        this.stays.splice(index, 1);
        this.saveStays();
        this.showAlertMessage(this.$t('alerts.stayDeleted'), 'success');
      }
    },
    cancelEdit() {
      this.editingStay = null;
    },
    resetAllData() {
      if (confirm(this.$t('actions.resetConfirm'))) {
        this.stays = [];
        localStorage.removeItem(this.storageKey);
        this.showAlertMessage(this.$t('alerts.dataReset'), 'warning');
      }
    },
    showAlertMessage(message, type = 'success') {
      this.alertMessage = message;
      this.alertType = type;
      this.showAlert = true;
      
      // Automatically hide the alert after 3 seconds
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    changeLanguage(lang) {
      this.locale = lang;
      localStorage.setItem('language', lang);
    }
  }
}
</script>

<template>
  <div class="container">
    <header class="section text-center position-relative">
      <div class="position-absolute top-0 end-0 mt-2 d-flex">
        <div class="me-2">
          <LanguageSwitcher :value="locale" @change-language="changeLanguage" />
        </div>
        <ThemeToggle />
      </div>
      <h1 class="display-5 mb-3">
        <i class="bi bi-geo-alt"></i> {{ $t('appName') }}
      </h1>
      <p class="lead mb-0">{{ $t('appTagline') }}</p>
    </header>
    
    <!-- Alert for notifications -->
    <div v-if="showAlert" class="alert alert-dismissible fade show" :class="`alert-${alertType}-subtle`" role="alert">
      {{ alertMessage }}
      <button @click="showAlert = false" type="button" class="btn-close" aria-label="Close"></button>
    </div>
    
    <!-- Stay Form -->
    <div class="section">
        <StayForm 
          @add-stay="addStay" 
          @cancel-edit="cancelEdit"
          :key="editingStay ? editingStay.id : 'new'" 
          :editing-stay="editingStay" 
        />
      </div>
    
    <!-- Country Summary -->
    <div class="section">
      <CountrySummary 
        :country-summary="countrySummary" 
        :stays="stays"
      />
    </div>
    
    <!-- Stays List -->
    <div class="section">
      <StayList 
        :stays="stays" 
        @edit-stay="editStay" 
        @delete-stay="deleteStay" 
      />
    </div>
    
    <!-- Reset Button -->
    <div class="section text-center">
      <button @click="resetAllData" class="btn btn-outline-danger">
        <i class="bi bi-trash me-1"></i> {{ $t('actions.resetData') }}
      </button>
    </div>
    
    <footer class="section text-center text-muted small mb-0">
      <p class="mb-1">{{ $t('footer.description') }}</p>
      <p class="mb-0">{{ $t('footer.privacy') }}</p>
      <p class="mb-0 mt-2">
        <a href="https://github.com/rouralberto/nomad183tracker" target="_blank" class="text-decoration-none">
          <i class="bi bi-github me-1"></i>{{ $t('footer.contribute') }}
        </a>
      </p>
      <p class="mb-0 mt-2">
        {{ $t('footer.madeWith') }} <i class="bi bi-heart-fill text-danger"></i> {{ $t('footer.by') }} 
        <a href="https://albertoroura.com" target="_blank" class="text-decoration-none">Alberto Roura</a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
