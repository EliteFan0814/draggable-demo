export default {
  name: '轮播图',
  icon: 'el-icon-picture',
  configData: {
    swiper: {
      label: '轮播图设置',
      type: 'object',
      children: {
        autoplay: {
          label: '自动轮播',
          component: 'ConfigSwitch',
          value: true,
          linkageKey: 'autoplayTime'
        },
        autoplayTime: {
          label: '间隔时间',
          component: 'ConfigInput',
          value: 3000,
          inputType: 'number',
          disabled: false
        },
        loop: {
          label: '开启循环',
          component: 'ConfigSwitch',
          value: true
        },
        indicators: {
          label: '开启指示器',
          component: 'ConfigSwitch',
          value: true,
          linkageKey: 'indicatorColor'
        },
        indicatorColor: {
          label: '指示器颜色',
          component: 'ConfigColorPick',
          value: '#fff',
          disabled: false
        }
      }
    },
    layout: {
      label: '搜索框布局',
      type: 'object'
    }
  },
  configStyle: {}
}
