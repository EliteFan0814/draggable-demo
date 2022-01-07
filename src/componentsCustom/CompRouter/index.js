export default {
  name: '图文导航',
  icon: 'el-icon-menu',
  configData: {
    settings: {
      label: '导航栏布局设置',
      type: 'object',
      children: {
        routerMode: {
          label: '模式选择',
          component: 'ConfigSelect',
          value: 'fixed',
          selectList: [
            { label: '固定', value: 'fixed' },
            { label: '单行滑动', value: 'slideSingle' },
            { label: '多行滑动', value: 'slideMultify' }
          ],
          linkageKey: 'pageRowNum',
          haveChildren: true,
          children: {
            pageRowNum: {
              label: '每页行数',
              component: 'ConfigSelect',
              showValueList: ['slideMultify'], //关联父元素值在此范围内则可用
              value: 2,
              selectList: [
                { label: '2行', value: 2 },
                { label: '3行', value: 3 }
              ],
              disabled: true
            }
          }
        },
        singleNum: {
          label: '每行个数',
          component: 'ConfigSelect',
          // value: { value: '25%', numValue: 4 },
          value: 25,
          selectList: [
            { label: '3个', value: 33.33 },
            { label: '4个', value: 25 },
            { label: '5个', value: 20 },
            { label: '6个', value: 16.67 }
            // { label: '3个', value: { value: '33.33%', numValue: 3 } },
            // { label: '4个', value: { value: '25%', numValue: 4 } },
            // { label: '5个', value: { value: '20%', numValue: 5 } },
            // { label: '6个', value: { value: '16.67%', numValue: 6 } }
          ]
        },
        routerForm: {
          label: '显示类型',
          component: 'ConfigSelect',
          value: 'all',
          selectList: [
            { label: '图片', value: 'img' },
            { label: '文字', value: 'text' },
            { label: '图文', value: 'all' }
          ]
        }
        // backgroundColor: {
        //   label: '背景颜色',
        //   component: 'ConfigColorPick',
        //   value: '#fff7cc'
        // },
        // scrollable: {
        //   label: '滚动播放',
        //   component: 'ConfigSwitch',
        //   value: true
        // }
      }
    },
    layout: {
      label: '搜索框布局',
      type: 'object'
    }
  }
}
