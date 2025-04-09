<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">{{ $t('list.title') }}</h5>
      <span class="badge bg-success-subtle text-body">{{ $t('list.entries', { count: stays.length }) }}</span>
    </div>
    <div class="card-body p-0">
      <div v-if="stays.length === 0" class="p-4 text-center text-muted">
        <i class="bi bi-map display-1"></i>
        <p class="mt-3">{{ $t('list.noStays') }}</p>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>{{ $t('list.country') }}</th>
              <th>{{ $t('form.checkIn') }}</th>
              <th>{{ $t('form.checkOut') }}</th>
              <th>{{ $t('list.days') }}</th>
              <th>{{ $t('list.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stay in sortedStays" :key="stay.id" class="day-tracker"
                :class="{'recent-stay': isWithinRollingYear(stay), 'present-stay': isPresentStay(stay)}">
              <td>
                {{ stay.country }}
                <span v-if="isWithinRollingYear(stay)" class="badge rounded-pill bg-info-subtle text-body ms-1" title="Within rolling 365 days">
                  <i class="bi bi-calendar-check"></i>
                </span>
                <span v-if="isPresentStay(stay)" class="badge rounded-pill bg-success text-white ms-1" title="Currently in this country">
                  <i class="bi bi-geo-fill"></i> {{ $t('list.present') }}
                </span>
              </td>
              <td>{{ formatDate(stay.startDate) }}</td>
              <td>
                <template v-if="isPresentStay(stay)">
                  <span class="text-success">{{ formatDate(getToday()) }}</span>
                </template>
                <template v-else>
                  {{ formatDate(stay.endDate) }}
                </template>
              </td>
              <td>
                <template v-if="isPresentStay(stay)">
                  {{ calculateCurrentDays(stay) }}
                </template>
                <template v-else>
                  {{ stay.days }}
                </template>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button @click="editStay(stay)" class="btn btn-outline-primary" :title="$t('list.edit')">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button @click="confirmDelete(stay.id)" class="btn btn-outline-danger" :title="$t('list.delete')">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StayList',
  props: {
    stays: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedStays() {
      return [...this.stays].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }
  },
  methods: {
    formatDate(dateString) {
      const locale = this.$i18n.locale;
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(locale, options);
    },
    editStay(stay) {
      // If it's a present stay, use today's date for endDate when editing
      if (stay.isPresent) {
        const todayString = this.getToday();
        this.$emit('edit-stay', { ...stay, endDate: todayString });
      } else {
        this.$emit('edit-stay', { ...stay });
      }
    },
    confirmDelete(stayId) {
      if (confirm(this.$t('list.confirmDelete'))) {
        this.$emit('delete-stay', stayId);
      }
    },
    isWithinRollingYear(stay) {
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setDate(today.getDate() - 365);
      
      // For present stays, they are always within rolling year
      if (stay.isPresent) return true;
      
      const endDate = new Date(stay.endDate);
      return endDate >= oneYearAgo;
    },
    isPresentStay(stay) {
      return stay.isPresent === true;
    },
    getToday() {
      return new Date().toISOString().split('T')[0];
    },
    calculateCurrentDays(stay) {
      const start = new Date(stay.startDate);
      const today = new Date();
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end day
      return diffDays;
    }
  }
}
</script>

<style scoped>
.recent-stay {
  background-color: var(--bg-subtle);
  border-left: 3px solid var(--bs-info);
}

.present-stay {
  background-color: rgba(25, 135, 84, 0.05);
  border-left: 3px solid var(--bs-success);
}
</style> 
