export default {
  appName: '183Tracker',
  appTagline: 'Track your international stays and monitor tax residency thresholds',
  form: {
    title: 'Add New Stay',
    editTitle: 'Edit Stay',
    country: 'Country',
    countryPlaceholder: 'Select country',
    checkIn: 'Check-In Date',
    checkOut: 'Check-Out Date',
    days: 'Days',
    notes: 'Notes (Optional)',
    notesPlaceholder: 'Any additional details about your stay',
    add: 'Add Stay',
    update: 'Update Stay',
    cancel: 'Cancel',
    currentlyHere: 'I\'m currently in this country',
    presentStay: 'Currently here'
  },
  list: {
    title: 'Your Stays',
    noStays: 'No stays recorded yet. Add your first stay using the form above!',
    country: 'Country',
    dates: 'Dates',
    days: 'Days',
    notes: 'Notes',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    present: 'Present',
    entries: '{count} entries',
    confirmDelete: 'Are you sure you want to delete this stay?'
  },
  summary: {
    title: 'Country Summary',
    country: 'Country',
    totalDays: 'Total Days',
    noData: 'No data available. Add your stays to see country summaries.',
    threshold: 'Tax Residency Threshold',
    thresholdWarning: '{days} days in {country} (threshold: 183 days)',
    rollingYear: 'Rolling 365 days',
    showingRollingYear: 'Showing days in the last 365 days only',
    showingAllTime: 'Showing all-time totals',
    rollingYearLabel: 'Rolling Year',
    allTimeLabel: 'All Time',
    taxResident: 'Tax Resident',
    safe: 'Safe'
  },
  alerts: {
    stayAdded: 'New stay added successfully!',
    stayUpdated: 'Stay updated successfully!',
    stayDeleted: 'Stay deleted successfully!',
    dataReset: 'All data has been reset.',
    loadError: 'Error loading your data. Starting with empty state.',
    saveError: 'Error saving your data. Changes may not persist.',
    dataExported: 'Data exported successfully!',
    exportError: 'Error exporting your data.',
    dataImported: 'Data imported successfully!',
    importError: 'Error importing data. Please check the file format.'
  },
  actions: {
    resetData: 'Reset All Data',
    resetConfirm: 'Are you sure you want to delete ALL your data? This cannot be undone!',
    exportData: 'Export Data',
    importData: 'Import Data',
    importConfirm: 'This will replace your existing data. Continue?'
  },
  footer: {
    description: '183Tracker - For digital nomads tracking tax residency on the move',
    privacy: 'Data stored locally in your browser - Your privacy protected',
    contribute: 'Contribute on GitHub',
    madeWith: 'Made with',
    by: 'by'
  },
  theme: {
    dark: 'Dark Mode',
    light: 'Light Mode'
  },
  language: {
    english: 'English',
    chinese: '中文',
    spanish: 'Español',
    german: 'Deutsch',
    french: 'Français',
    thai: 'ไทย'
  }
} 
