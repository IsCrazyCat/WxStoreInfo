// pages/index/search/search.js
//获取应用实例，请求数据的方法

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active_search_val: "",                 //实时搜索显示
    active_search: true,                   //实时搜索推荐
    cancel_icon: true,                     //searchbar关闭按钮的显示
    input_value: "",                       //初始化输入框为空
  },

  /**
   * 生命周期函数--监听页面加载
   * @pram options--页面跳转带来的参数
   */
  onLoad: function (options) {
    
  },

  /**
   * input输入内容时cancel按钮的显示隐藏
   * @pram e 当前点击对象的属性集合
   */
  inputShow(e) {
    //输入值时
    if (e.detail.value) {
      this.setData({
        active_search_val: e.detail.value,  //当前下拉显示的实时搜索功能
        active_search: false,               //显示实时搜索的结果   
        cancel_icon: false,                 //显示关闭按钮
        input_value: e.detail.value         //设置输入框的值为当前输入的值
      })
    } else {
      this.setData({
        active_search: true,           //隐藏实时搜索的结果
        cancel_icon: true,             //隐藏关闭按钮
        input_value: ""                //输入框的值为空
      })
    }
  },

  
  /**
   * input输入内容时cancel按钮的显示隐藏
   * @pram e--当前点击对象的属性集合
   */
  clearInput(e) {
    this.setData({
      active_search: true,
      cancel_icon: true,
      input_value: ""
    })
  },

  /**
   * 点击取消返回上一级
   */
  getBack() {
    wx.navigateBack({
      delta: 1       //返回的页面层数
    })
  }
});