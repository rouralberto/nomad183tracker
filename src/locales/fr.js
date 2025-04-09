export default {
  appName: '183Tracker',
  appTagline: 'Suivez vos séjours internationaux et surveillez les seuils de résidence fiscale',
  form: {
    title: 'Ajouter un nouveau séjour',
    editTitle: 'Modifier le séjour',
    country: 'Pays',
    countryPlaceholder: 'Sélectionner un pays',
    checkIn: 'Date d\'arrivée',
    checkOut: 'Date de départ',
    days: 'Jours',
    notes: 'Notes (Optionnel)',
    notesPlaceholder: 'Tout détail supplémentaire concernant votre séjour',
    add: 'Ajouter un séjour',
    update: 'Mettre à jour le séjour',
    cancel: 'Annuler',
    currentlyHere: 'Je suis actuellement dans ce pays',
    presentStay: 'Actuellement ici'
  },
  list: {
    title: 'Vos séjours',
    noStays: 'Aucun séjour enregistré pour le moment. Ajoutez votre premier séjour en utilisant le formulaire ci-dessus !',
    country: 'Pays',
    dates: 'Dates',
    days: 'Jours',
    notes: 'Notes',
    actions: 'Actions',
    edit: 'Modifier',
    delete: 'Supprimer',
    present: 'Présent',
    entries: '{count} entrées',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce séjour ?'
  },
  summary: {
    title: 'Résumé par pays',
    country: 'Pays',
    totalDays: 'Jours totaux',
    noData: 'Aucune donnée disponible. Ajoutez vos séjours pour voir les résumés par pays.',
    threshold: 'Seuil de résidence fiscale',
    thresholdWarning: '{days} jours en {country} (seuil: 183 jours)',
    rollingYear: 'Derniers 365 jours',
    showingRollingYear: 'Affichage des jours dans les 365 derniers jours uniquement',
    showingAllTime: 'Affichage des totaux de tous les temps',
    rollingYearLabel: 'Année glissante',
    allTimeLabel: 'Tous les temps',
    taxResident: 'Résident fiscal',
    safe: 'Sûr'
  },
  alerts: {
    stayAdded: 'Nouveau séjour ajouté avec succès !',
    stayUpdated: 'Séjour mis à jour avec succès !',
    stayDeleted: 'Séjour supprimé avec succès !',
    dataReset: 'Toutes les données ont été réinitialisées.',
    loadError: 'Erreur lors du chargement de vos données. Démarrage avec un état vide.',
    saveError: 'Erreur lors de l\'enregistrement de vos données. Les modifications pourraient ne pas persister.',
    dataExported: 'Données exportées avec succès !',
    exportError: 'Erreur lors de l\'exportation de vos données.',
    dataImported: 'Données importées avec succès !',
    importError: 'Erreur lors de l\'importation des données. Veuillez vérifier le format du fichier.'
  },
  actions: {
    resetData: 'Réinitialiser toutes les données',
    resetConfirm: 'Êtes-vous sûr de vouloir supprimer TOUTES vos données ? Cette action ne peut pas être annulée !',
    exportData: 'Exporter les données',
    importData: 'Importer les données',
    importConfirm: 'Cela remplacera vos données existantes. Continuer ?'
  },
  footer: {
    description: '183Tracker - Pour les nomades numériques qui suivent la résidence fiscale en déplacement',
    privacy: 'Données stockées localement dans votre navigateur - Votre vie privée protégée',
    contribute: 'Contribuer sur GitHub',
    madeWith: 'Fait avec',
    by: 'par'
  },
  theme: {
    dark: 'Mode sombre',
    light: 'Mode clair'
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
