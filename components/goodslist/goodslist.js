// components/goodslist/goodslist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goodsItemData: {
            type: Object,
            value: {}
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
        sendhiddlechange(e){
            // 发送数据给父组件
            this.triggerEvent("fatherchange",e.currentTarget.dataset.id)
        },
        sendczhiddle(e){
            let obj = {
                id: e.currentTarget.dataset.id,
                cz: e.currentTarget.dataset.cz
            }
            this.triggerEvent("fatherhiddlecz",obj)
        }
    }
})
