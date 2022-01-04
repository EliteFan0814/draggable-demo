export default {
  name: '搜索',
  icon: 'el-icon-search',
  configData: {
    holder: {
      label: '搜索框内容',
      type: 'object',
      children: {
        holderInfo: {
          label: '提示文本',
          component: 'ConfigInput',
          value: '请输入搜索关键字',
          placeholder: '请输入提示文本'
        },
        alignment: {
          label: '对齐方式',
          component: 'ConfigSelect',
          value: 'left',
          selectList: [
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' }
          ]
        }
      }
    }
  },
  configStyle: {}
}
