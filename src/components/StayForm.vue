<template>
  <div class="card mb-4">
    <div class="card-header" :class="editingStay ? 'bg-warning text-dark' : 'bg-primary text-white'">
      <h5 class="mb-0">{{ editingStay ? 'Edit Stay' : 'Add New Stay' }}</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="addStay">
        <div class="mb-3">
          <label for="country" class="form-label">Country</label>
          <div class="input-group">
            <select v-model="stay.country" class="form-select" id="country" required>
              <option value="" disabled>Select a country</option>
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
            <label for="startDate" class="form-label">Start Date</label>
            <input
              type="date"
              v-model="stay.startDate"
              class="form-control"
              id="startDate"
              required
              :max="stay.endDate || maxDate"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="endDate" class="form-label">End Date</label>
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
        </div>
        
        <div v-if="formError" class="alert alert-danger mt-3">
          {{ formError }}
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button 
            v-if="editingStay" 
            type="button" 
            class="btn btn-secondary me-2" 
            @click="cancelEdit"
          >
            <i class="bi bi-x-circle me-1"></i> Cancel
          </button>
          <button type="submit" class="btn" :class="editingStay ? 'btn-warning' : 'btn-primary'">
            <i class="bi" :class="editingStay ? 'bi-save' : 'bi-plus-circle'"></i>
            {{ editingStay ? ' Save Changes' : ' Add Stay' }}
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
      countries: [
        'USA', 
        'UK', 
        'France', 
        'Germany', 
        'Spain', 
        'Italy', 
        'Japan', 
        'Australia', 
        'Canada', 
        'Mexico',
        'Portugal',
        'Netherlands',
        'Switzerland'
      ]
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
    }
  },
  methods: {
    addStay() {
      try {
        // Clear previous errors
        this.formError = '';
        
        // Validate dates
        const start = new Date(this.stay.startDate);
        const end = new Date(this.stay.endDate);
        
        if (end < start) {
          this.formError = 'End date cannot be before start date';
          return;
        }
        
        // Create a new stay object
        const newStay = {
          id: this.editingStay ? this.editingStay.id : Date.now(), // Use timestamp as unique ID for new stays
          country: this.stay.country === 'other' ? this.otherCountry : this.stay.country,
          startDate: this.stay.startDate,
          endDate: this.stay.endDate,
          days: this.calculateDays(this.stay.startDate, this.stay.endDate)
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
    }
  }
}
</script> 
