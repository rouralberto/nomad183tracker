<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">{{ editingStay ? $t('form.editTitle') : $t('form.title') }}</h5>
    </div>
    <div class="card-body p-0">
      <form @submit.prevent="addStay" class="p-3">
        <div class="form-group mb-3">
          <label for="country" class="form-label">{{ $t('form.country') }}</label>
          <div class="input-group">
            <select v-model="stay.country" class="form-select" id="country" required>
              <option value="" disabled>{{ $t('form.countryPlaceholder') }}</option>
              <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              <option value="other">Other (specify)</option>
            </select>
          </div>
          <div v-if="stay.country === 'other'" class="mt-2">
            <input
              type="text"
              v-model="otherCountry"
              class="form-control"
              placeholder="Enter country name"
              required
            />
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="startDate" class="form-label">{{ $t('form.checkIn') }}</label>
            <input
              type="date"
              v-model="stay.startDate"
              class="form-control"
              id="startDate"
              required
              :max="isPresentStay ? maxDate : (stay.endDate || maxDate)"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="endDate" class="form-label">{{ $t('form.checkOut') }}</label>
            <div v-if="!isPresentStay">
              <input
                type="date"
                v-model="stay.endDate"
                class="form-control"
                id="endDate"
                required
                :min="stay.startDate"
                :max="maxDate"
              />
            </div>
            <div v-else class="form-control-plaintext text-success">
              <i class="bi bi-geo-fill"></i> {{ $t('form.presentStay') }}
            </div>
          </div>
        </div>

        <div class="form-check mb-3">
          <input
            type="checkbox"
            class="form-check-input"
            id="isPresentStay"
            v-model="isPresentStay"
          />
          <label class="form-check-label" for="isPresentStay">
            {{ $t('form.currentlyHere') }}
          </label>
        </div>
        
        <div v-if="formError" class="alert alert-danger-subtle text-danger mt-3">
          {{ formError }}
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button 
            v-if="editingStay" 
            type="button" 
            class="btn btn-outline-secondary me-2" 
            @click="cancelEdit"
          >
            <i class="bi bi-x-circle me-1"></i> {{ $t('form.cancel') }}
          </button>
          <button type="submit" class="btn" :class="editingStay ? 'btn-warning' : 'btn-primary'">
            <i class="bi" :class="editingStay ? 'bi-save' : 'bi-plus-circle'"></i>
            {{ editingStay ? $t('form.update') : $t('form.add') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StayForm',
  props: {
    editingStay: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      stay: {
        id: null,
        country: '',
        startDate: '',
        endDate: ''
      },
      otherCountry: '',
      formError: '',
      isPresentStay: false,
      countries: [
        // Popular in Europe
        'Portugal',
        'Spain',
        'Italy',
        'Greece',
        'Croatia',
        'Germany',
        'France',
        'Netherlands',
        'UK',
        'Estonia',
        'Georgia',
        'Czech Republic',
        'Hungary',
        'Montenegro',
        'Malta',
        'Cyprus',
        // Popular in Asia
        'Thailand',
        'Indonesia',
        'Vietnam',
        'Malaysia',
        'Singapore',
        'Japan',
        'South Korea',
        'Taiwan',
        'Philippines',
        'Cambodia',
        'Sri Lanka',
        'India',
        'Nepal',
        // Americas
        'USA',
        'Mexico',
        'Colombia',
        'Costa Rica',
        'Panama',
        'Brazil',
        'Peru',
        'Argentina',
        'Ecuador',
        'Chile',
        'Canada',
        // Others
        'Australia',
        'New Zealand',
        'UAE',
        'South Africa',
        'Morocco',
        'Turkey'
      ].sort()
    }
  },
  computed: {
    maxDate() {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }
  },
  watch: {
    // Watch for changes to editingStay prop
    editingStay: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // We're in edit mode, populate form with stay data
          this.stay = { ...newVal };
          // Check if this is a present stay (has isPresent flag)
          this.isPresentStay = !!newVal.isPresent;
          // If it's a custom country not in our dropdown
          if (!this.countries.includes(newVal.country)) {
            this.otherCountry = newVal.country;
            this.stay.country = 'other';
          }
        } else {
          // Reset form when not editing
          this.resetForm();
        }
      }
    },
    // Reset end date when present stay is checked
    isPresentStay(newVal) {
      if (newVal) {
        // If checked, we don't need an end date
        this.stay.endDate = '';
      }
    }
  },
  methods: {
    addStay() {
      try {
        // Clear previous errors
        this.formError = '';
        
        // Get today's date for present stays
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        
        // Validate dates
        const start = new Date(this.stay.startDate);
        const end = this.isPresentStay ? today : new Date(this.stay.endDate);
        
        if (end < start) {
          this.formError = 'End date cannot be before start date';
          return;
        }
        
        // Create a new stay object
        const newStay = {
          id: this.editingStay ? this.editingStay.id : Date.now(), // Use timestamp as unique ID for new stays
          country: this.stay.country === 'other' ? this.otherCountry : this.stay.country,
          startDate: this.stay.startDate,
          endDate: this.isPresentStay ? todayString : this.stay.endDate,
          days: this.calculateDays(this.stay.startDate, this.isPresentStay ? todayString : this.stay.endDate),
          isPresent: this.isPresentStay // Add flag for present stays
        };
        
        // Emit the new stay to parent component
        this.$emit('add-stay', newStay);
        
        // Reset form if not editing
        if (!this.editingStay) {
          this.resetForm();
        }
      } catch (error) {
        this.formError = 'An error occurred. Please check your input.';
        console.error('Error adding stay:', error);
      }
    },
    calculateDays(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end day
      return diffDays;
    },
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    resetForm() {
      this.stay = {
        id: null,
        country: '',
        startDate: '',
        endDate: ''
      };
      this.otherCountry = '';
      this.formError = '';
      this.isPresentStay = false;
    }
  }
}
</script> 
