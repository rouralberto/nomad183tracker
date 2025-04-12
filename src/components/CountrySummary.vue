<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">{{ $t('summary.title') }}</h5>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" v-model="showRollingYear" id="rollingYearSwitch">
        <label class="ms-2 form-check-label" for="rollingYearSwitch">
          {{ $t('summary.rollingYear') }}
        </label>
      </div>
    </div>
    <div class="card-body p-0">
      <div v-if="currentSummary.length === 0" class="p-4 text-center text-muted">
        <i class="bi bi-globe display-1"></i>
        <p class="mt-3">{{ $t('summary.noData') }}</p>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>{{ $t('summary.country') }}</th>
              <th>{{ $t('summary.totalDays') }}</th>
              <th>{{ $t('summary.threshold') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="summary in currentSummary" :key="summary.country" 
                :class="{'current-location': isCurrentLocation(summary.country)}">
              <td>
                {{ summary.country }}
                <span v-if="isCurrentLocation(summary.country)" class="badge rounded-pill bg-success text-white ms-1" title="Currently in this country">
                  <i class="bi bi-geo-fill"></i> {{ $t('list.present') }}
                </span>
              </td>
              <td>
                <span :class="getDayClass(summary.totalDays)">
                  {{ summary.totalDays }}
                </span>
              </td>
              <td>
                <span v-if="summary.totalDays >= 183" class="badge bg-danger-subtle text-danger">
                  <i class="bi bi-exclamation-triangle-fill me-1"></i> {{ $t('summary.taxResident') }}
                </span>
                <span v-else-if="summary.totalDays >= 150" class="badge bg-warning-subtle text-warning">
                  <i class="bi bi-exclamation-circle me-1"></i> 
                  {{ $t('summary.thresholdWarning', { days: summary.totalDays, country: summary.country }) }}
                </span>
                <span v-else class="badge bg-success-subtle text-success">
                  <i class="bi bi-check-circle me-1"></i> {{ $t('summary.safe') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer small text-muted d-flex justify-content-between align-items-center">
      <div>
        <i class="bi bi-info-circle me-1"></i> 
        {{ showRollingYear ? $t('summary.showingRollingYear') : $t('summary.showingAllTime') }}
      </div>
      <span class="badge text-body" :class="showRollingYear ? 'bg-info-subtle' : 'bg-secondary-subtle'">
        {{ showRollingYear ? $t('summary.rollingYearLabel') : $t('summary.allTimeLabel') }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountrySummary',
  props: {
    countrySummary: {
      type: Array,
      required: true
    },
    stays: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showRollingYear: true // Default to showing rolling year
    }
  },
  computed: {
    currentSummary() {
      return this.showRollingYear ? this.rollingYearSummary : this.countrySummary;
    },
    rollingYearSummary() {
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setDate(today.getDate() - 365);
      
      // Convert to string format for comparison with stay dates
      const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];
      
      // Filter stays that are within the last 365 days
      const recentStays = this.stays.filter(stay => {
        const endDate = new Date(stay.endDate);
        return endDate >= oneYearAgo;
      });
      
      // Calculate days within the rolling window
      const summary = {};
      
      recentStays.forEach(stay => {
        const country = stay.country;
        if (!summary[country]) {
          summary[country] = { country, totalDays: 0 };
        }
        
        // Calculate days that fall within the rolling year window
        const startDate = new Date(stay.startDate);
        const endDate = new Date(stay.endDate);
        
        // Adjust start date if it's before one year ago
        const effectiveStartDate = startDate < oneYearAgo ? oneYearAgo : startDate;
        
        // Calculate days in the rolling window
        if (endDate >= effectiveStartDate) {
          const diffTime = Math.abs(endDate - effectiveStartDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end day
          summary[country].totalDays += diffDays;
        }
      });
      
      // Convert to array and sort by total days descending
      return Object.values(summary).sort((a, b) => b.totalDays - a.totalDays);
    },
    currentLocation() {
      // Find the country where the user is currently at
      const presentStay = this.stays.find(stay => stay.isPresent === true);
      return presentStay ? presentStay.country : null;
    }
  },
  methods: {
    getDayClass(days) {
      if (days >= 183) {
        return 'days-danger fw-bold';
      } else if (days >= 150) {
        return 'days-warning fw-bold';
      } else {
        return 'days-normal';
      }
    },
    isCurrentLocation(country) {
      return country === this.currentLocation;
    }
  }
}
</script>

<style scoped>
.form-switch .form-check-input {
  cursor: pointer;
  width: 2.5em;
}
.form-check-label {
  cursor: pointer;
}
.current-location {
  background-color: rgba(25, 135, 84, 0.05);
  border-left: 3px solid var(--bs-success);
}
</style> 
