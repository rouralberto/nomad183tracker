<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Tax Residency Summary</h5>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" v-model="showRollingYear" id="rollingYearSwitch">
        <label class="ms-2 form-check-label" for="rollingYearSwitch">
          Rolling 365 days
        </label>
      </div>
    </div>
    <div class="card-body p-0">
      <div v-if="currentSummary.length === 0" class="p-4 text-center text-muted">
        <i class="bi bi-globe display-1"></i>
        <p class="mt-3">No country data to display. Add some stays to see your tax residency summary.</p>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Country</th>
              <th>Total Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="summary in currentSummary" :key="summary.country">
              <td>{{ summary.country }}</td>
              <td>
                <span :class="getDayClass(summary.totalDays)">
                  {{ summary.totalDays }}
                </span>
              </td>
              <td>
                <span v-if="summary.totalDays >= 183" class="badge bg-danger-subtle text-danger">
                  <i class="bi bi-exclamation-triangle-fill me-1"></i> Tax Resident
                </span>
                <span v-else-if="summary.totalDays >= 150" class="badge bg-warning-subtle text-warning">
                  <i class="bi bi-exclamation-circle me-1"></i> Approaching Limit
                </span>
                <span v-else class="badge bg-success-subtle text-success">
                  <i class="bi bi-check-circle me-1"></i> Safe
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
        {{ showRollingYear ? 'Showing days in the last 365 days only' : 'Showing all-time totals' }}
      </div>
      <span class="badge text-body" :class="showRollingYear ? 'bg-info-subtle' : 'bg-secondary-subtle'">
        {{ showRollingYear ? 'Rolling Year' : 'All Time' }}
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
</style> 
