<template>
  <div class="card mb-4">
    <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Your Stays</h5>
      <span class="badge bg-light text-dark">{{ stays.length }} entries</span>
    </div>
    <div class="card-body p-0">
      <div v-if="stays.length === 0" class="p-4 text-center text-muted">
        <i class="bi bi-map display-1"></i>
        <p class="mt-3">No stays recorded yet. Add your first stay using the form above.</p>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Country</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stay in stays" :key="stay.id" class="day-tracker"
                :class="{'recent-stay': isWithinRollingYear(stay)}">
              <td>
                {{ stay.country }}
                <span v-if="isWithinRollingYear(stay)" class="badge rounded-pill bg-info ms-1" title="Within rolling 365 days">
                  <i class="bi bi-calendar-check"></i>
                </span>
              </td>
              <td>{{ formatDate(stay.startDate) }}</td>
              <td>{{ formatDate(stay.endDate) }}</td>
              <td>{{ stay.days }}</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button @click="editStay(stay)" class="btn btn-outline-primary" title="Edit">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button @click="confirmDelete(stay.id)" class="btn btn-outline-danger" title="Delete">
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
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    editStay(stay) {
      this.$emit('edit-stay', { ...stay });
    },
    confirmDelete(stayId) {
      if (confirm('Are you sure you want to delete this stay?')) {
        this.$emit('delete-stay', stayId);
      }
    },
    isWithinRollingYear(stay) {
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setDate(today.getDate() - 365);
      
      const endDate = new Date(stay.endDate);
      return endDate >= oneYearAgo;
    }
  }
}
</script>

<style scoped>
.recent-stay {
  background-color: rgba(13, 202, 240, 0.05);
}
</style> 
