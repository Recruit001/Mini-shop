// components/tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabsData:{
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        tabsClick(e){
            // 自定义事件传递数据给父元素
            this.triggerEvent("myEvent",e.currentTarget.dataset.index)
        }
    }
})
