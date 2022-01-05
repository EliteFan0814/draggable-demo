export default {
  name: '公告栏',
  icon: 'el-icon-message-solid',
  configData: {
    notice: {
      label: '公告栏设置',
      type: 'object',
      children: {
        textColor: {
          label: '文本颜色',
          component: 'ConfigColorPick',
          value: '#f60'
        },
        backgroundColor: {
          label: '背景颜色',
          component: 'ConfigColorPick',
          value: '#fff7cc'
        },
        scrollable: {
          label: '滚动播放',
          component: 'ConfigSwitch',
          value: true
        }
      }
    },
    layout: {
      label: '搜索框布局',
      type: 'object'
    }
  }
}
