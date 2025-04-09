export default {
  appName: 'Nomad183Tracker',
  appTagline: 'Registra tus estancias internacionales y monitorea los umbrales de residencia fiscal',
  form: {
    title: 'Añadir Nueva Estancia',
    editTitle: 'Editar Estancia',
    country: 'País',
    countryPlaceholder: 'Seleccionar país',
    checkIn: 'Fecha de Entrada',
    checkOut: 'Fecha de Salida',
    days: 'Días',
    notes: 'Notas (Opcional)',
    notesPlaceholder: 'Cualquier detalle adicional sobre tu estancia',
    add: 'Añadir Estancia',
    update: 'Actualizar Estancia',
    cancel: 'Cancelar'
  },
  list: {
    title: 'Tus Estancias',
    noStays: '¡Aún no hay estancias registradas. Añade tu primera estancia usando el formulario de arriba!',
    country: 'País',
    dates: 'Fechas',
    days: 'Días',
    notes: 'Notas',
    actions: 'Acciones',
    edit: 'Editar',
    delete: 'Eliminar'
  },
  summary: {
    title: 'Resumen por País',
    country: 'País',
    totalDays: 'Días Totales',
    noData: 'No hay datos disponibles. Añade tus estancias para ver resúmenes por país.',
    threshold: 'Umbral de Residencia Fiscal',
    thresholdWarning: '{days} días en {country} (umbral: 183 días)'
  },
  alerts: {
    stayAdded: '¡Nueva estancia añadida con éxito!',
    stayUpdated: '¡Estancia actualizada con éxito!',
    stayDeleted: '¡Estancia eliminada con éxito!',
    dataReset: 'Todos los datos han sido reiniciados.',
    loadError: 'Error al cargar tus datos. Comenzando con estado vacío.',
    saveError: 'Error al guardar tus datos. Los cambios podrían no persistir.',
    dataExported: '¡Datos exportados con éxito!',
    exportError: 'Error al exportar tus datos.',
    dataImported: '¡Datos importados con éxito!',
    importError: 'Error al importar datos. Por favor, verifica el formato del archivo.'
  },
  actions: {
    resetData: 'Reiniciar Todos los Datos',
    resetConfirm: '¿Estás seguro de que quieres eliminar TODOS tus datos? ¡Esta acción no se puede deshacer!',
    exportData: 'Exportar Datos',
    importData: 'Importar Datos',
    importConfirm: 'Esto reemplazará tus datos existentes. ¿Continuar?'
  },
  footer: {
    description: 'Nomad183Tracker - Para nómadas digitales que rastrean la residencia fiscal en movimiento',
    privacy: 'Datos almacenados localmente en tu navegador - Tu privacidad protegida',
    contribute: 'Contribuir en GitHub',
    madeWith: 'Hecho con',
    by: 'por'
  },
  theme: {
    dark: 'Modo Oscuro',
    light: 'Modo Claro'
  },
  language: {
    english: 'English',
    chinese: '中文',
    spanish: 'Español'
  }
} 
