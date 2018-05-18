// pages/index/search/search.js
//获取应用实例，请求数据的方法

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cancel_icon: true,                     //searchbar关闭按钮的显示
    input_value: "",                       //初始化输入框为空
    storeList:[],                          //搜索结果列表
    pageNum: 0,
    storeInfo: {},
    iconLoadedFlag: false,
    iconLoadingFlag: false
  },
  getInitStoreInfo:function(){
    const _this = this;  
    _this.setData({
      iconLoadedFlag: false,
      iconLoadingFlag: false
    });
    wx.request({
      url: getApp().data.servers + "/api/store/findStoreInfo?page=0&size=6",
      data: _this.data.storeInfo,
      method: "POST",
      success: function (data) {
        _this.setData({
          storeList: data.data.content
        });
      }
    });
  },
  findMoreStore: function () {
    const _this = this;
    _this.setData({
      iconLoadingFlag: true
    });
    var curpage = _this.data.pageNum + 1
    wx.request({
      url: getApp().data.servers + "/api/store/findStoreInfo?page=" + curpage + "&size=3",
      data: _this.data.storeInfo,
      method: "POST",
      success: function (data) {
        var oldstoreList = _this.data.storeList;
        if (data.data.content.length > 1) {
          oldstoreList.concat(data.data.content);
          _this.setData({
            storeList: oldstoreList.concat(data.data.content),
            pageNum: curpage
          });
        } else {
          _this.setData({
            iconLoadedFlag: true,
            iconLoadingFlag: false
          });
        }

      },
      complete: function () {
        _this.setData({
          iconLoadingFlag: false
        });
      }
    })
  },
  callMe: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.mobile, //仅为示例，并非真实的电话号码
      success: function () {
        //更新预约次数
      },
      fail: function (res) {
        console.log("mobile log = " + JSON.stringify(res));
      },
      complete: function () {
        console.log("mobile = " + JSON.stringify(event.currentTarget.dataset.mobile));
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * @pram options--页面跳转带来的参数
   */
  onLoad: function (options) {
    this.getInitStoreInfo();
  },

  /**
   * input输入内容时cancel按钮的显示隐藏
   * @pram e 当前点击对象的属性集合
   */
  inputShow(e) {
    const _this = this;
    var curstoreInfo = _this.data.storeInfo;
    //输入值时
    if (e.detail.value) {
      curstoreInfo.name = e.detail.value;
      _this.setData({
        pageNum: 0,
        storeInfo:curstoreInfo,
        cancel_icon: false,                 //显示关闭按钮
        input_value: e.detail.value         //设置输入框的值为当前输入的值
      })
    } else {
      _this.setData({
        pageNum: 0,
        storeInfo: {},
        cancel_icon: true,             //隐藏关闭按钮
        input_value: ""                //输入框的值为空
      })
    }
    this.getInitStoreInfo();
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