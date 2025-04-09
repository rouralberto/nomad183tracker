export default {
  appName: '游牧183追踪器',
  appTagline: '跟踪您的国际停留并监控税务居住门槛',
  form: {
    title: '添加新停留',
    editTitle: '编辑停留',
    country: '国家',
    countryPlaceholder: '选择国家',
    checkIn: '入住日期',
    checkOut: '退房日期',
    days: '天数',
    notes: '备注（可选）',
    notesPlaceholder: '关于您停留的任何其他详情',
    add: '添加停留',
    update: '更新停留',
    cancel: '取消'
  },
  list: {
    title: '您的停留',
    noStays: '尚未记录任何停留。使用上面的表格添加您的第一个停留！',
    country: '国家',
    dates: '日期',
    days: '天数',
    notes: '备注',
    actions: '操作',
    edit: '编辑',
    delete: '删除'
  },
  summary: {
    title: '国家摘要',
    country: '国家',
    totalDays: '总天数',
    noData: '没有可用数据。添加您的停留以查看国家摘要。',
    threshold: '税务居住门槛',
    thresholdWarning: '在{country}停留{days}天（门槛: 183天）'
  },
  alerts: {
    stayAdded: '新停留添加成功！',
    stayUpdated: '停留更新成功！',
    stayDeleted: '停留删除成功！',
    dataReset: '所有数据已重置。',
    loadError: '加载数据时出错。从空状态开始。',
    saveError: '保存数据时出错。更改可能不会保存。',
    dataExported: '数据导出成功！',
    exportError: '导出数据时出错。',
    dataImported: '数据导入成功！',
    importError: '导入数据时出错。请检查文件格式。'
  },
  actions: {
    resetData: '重置所有数据',
    resetConfirm: '您确定要删除所有数据吗？此操作无法撤消！',
    exportData: '导出数据',
    importData: '导入数据',
    importConfirm: '这将替换您现有的数据。继续吗？'
  },
  footer: {
    description: '游牧183追踪器 - 为数字游民在移动中跟踪税务居住',
    privacy: '数据存储在您的浏览器中 - 保护您的隐私',
    contribute: '在GitHub上贡献',
    madeWith: '由',
    by: '制作，充满'
  },
  theme: {
    dark: '深色模式',
    light: '浅色模式'
  },
  language: {
    english: 'English',
    chinese: '中文',
    spanish: 'Español'
  }
} 
