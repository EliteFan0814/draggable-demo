export default {
  name: '商品',
  icon: 'el-icon-s-goods',
  configData: {
    holder: {
      label: '搜索框内容',
      type: 'object',
      children: {
        holderInfo: {
          label: '提示文本',
          component: 'ConfigInput',
          value: '请输入搜索关键字',
          placeholder: '请输入提示文本',
          inputType: 'text',
          disabled: false
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
        },
        shape: {
          label: '形状',
          component: 'ConfigSelect',
          value: 'square',
          selectList: [
            { label: '直角', value: 'square' },
            { label: '圆角', value: 'round' }
          ]
        },
        background: {
          label: '外部背景色',
          component: 'ConfigColorPick',
          value: '#fff'
        }
      }
    }
  },
  configStyle: {}
}
