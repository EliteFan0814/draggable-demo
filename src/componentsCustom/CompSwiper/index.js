export default {
  name: '轮播图',
  icon: 'el-icon-picture',
  configData: {
    holder: {
      label: '搜索框内容',
      type: 'object',
      children: {
        holderInfo: {
          label: '提示文本',
          type: 'string',
          value: '请输入搜索关键字',
          placeholder: '请输入提示文本'
        },
        holderInfo2: {
          label: '提示文本2',
          type: 'string',
          value: '',
          placeholder: '请输入关键字'
        }
      }
    },
    layout:{
      label:'搜索框布局',
      type:'object'
    }
  },
  configStyle: {}
}
