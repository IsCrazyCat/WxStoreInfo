// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    categoryList: {},
    storeList:[],
    pageNum:0,
    storeInfo:{},
    iconLoadedFlag:false,
    iconLoadingFlag:false
  },
  getStoreInfo:function(event){
    wx.showLoading({
      title: '正在加载中...'
    })
    const _this = this;
    var dict = event.currentTarget.dataset.dict;
    var storeInfoObj = {};
    storeInfoObj.type = dict.code;
    _this.setData({
      storeInfo: storeInfoObj
    });  
    
    wx.request({
      url: getApp().data.servers +"/api/store/findStoreInfo?page=0&size=3",
      data: {
         type: dict.code
      },
      method: "POST",
      success: function (data) {
        _this.setData({
          iconLoadedFlag: false,
          pageNum: 0,
          storeList: data.data.content
        });
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  findMoreStore:function(){
    const _this = this;
    _this.setData({
      iconLoadingFlag:true
    });
    console.log("type = " + _this.data.storeInfo["type"]);
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
      complete:function(){
        _this.setData({
          iconLoadingFlag: false
        });
      }
    })
  },
  callMe:function (event) {
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
  * 点击searchbar进入搜索页面
  */
  goSearchPage: function () {
    wx.navigateTo({
      url: "../search/search"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imageArray = [];
    const _this = this;
    //获取轮播图片
    wx.request({
      url: getApp().data.servers+"/api/dict/findDict",
      data: {
        categoryCode: "showIndex"
      },
      method: "POST",
      success: function (data) {

        for (var i = 0; i < data.data.length; i++) {
          var imageObj = data.data[i];
          imageArray.push(imageObj["imageUrl"]);
        }
        _this.setData({
          imgUrls: imageArray
        });
      },
      complete: function () {

      }
    });

    wx.request({
      url: getApp().data.servers +"/api/dict/findDict",
      data: {
        categoryCode: "storeType"
      },
      method: "POST",
      success: function (data) {
        var storetypeArray = [];
        var pageArray = [];
        var pageNum = 0;
        for (var i = 0; i < data.data.length; i++) {
          var typeObj = data.data[i];
          var typeArray = {};
          if (pageArray.length == 4) {
            storetypeArray.push(pageArray);
            pageArray = [];
            pageNum++;
          }
          typeArray.name = typeObj["name"];
          typeArray.src = typeObj["imageUrl"];
          typeArray.categoryCode = typeObj["categoryCode"];
          typeArray.code = typeObj["code"];
          pageArray.push(typeArray);
          typeArray = {};
          if (i == data.data.length - 1) {
            storetypeArray.push(pageArray);
          }
        }
        _this.setData({
          categoryList: storetypeArray,
        });
      }
    });
    wx.request({
      url: getApp().data.servers +"/api/store/findStoreInfo?page=0&size=4&sort=order_id:DESC",
      data: {},
      method: "POST",
      success: function (data) {
        _this.setData({
          storeList: data.data.content
        });
      }
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})