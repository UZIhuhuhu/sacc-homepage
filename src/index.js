//TODO:
// 页面切图
// 导航到页面的时候,距离渐进改变
// 距离改变的时候, 导航栏出现shadow
// 索引的hover效果
// 响应式
var app = new Vue({
  el: "#root",
  data: {
    slogan: `SACC`,
    navigationList: [`首页`, `部门介绍`, `活动通知`, `科协人`],
    departMent: [
      {
        name: `前端组`,
        detail: ` 这里是内容(前端开发`
      },
      {
        name: `后端组`,
        detail: ` 这里是内容(前端开发m`
      },
      {
        name: `安全组`,
        detail: ` 这里是内容(前端开发m`
      },
      {
        name: `嵌入式开发组`,
        detail: ` 这里是内容(前端开发m`
      },
      {
        name: `新媒体`,
        detail: ` 这里是内容(前端开发m`
      },
      {
        name: `算法组`,
        detail: ` 这里是内容(前端开发m`
      },
      {
        name: `python组`,
        detail: ` 这里是内容(前端开发m`
      },
      {
        name: `秘书处`,
        detail: ` 这里是内容(前端开发m`
      }
    ],
    departMentAppear: false,
    //到顶部的距离
    topDistance: 0,
    //导航栏的阴影
    navigationShadow: false
  },

  methods: {
    handleScroll: function() {
      this.topDistance = document.documentElement.scrollTop;
      //>220 => 部门的出现
      if (this.topDistance >= 220 && this.topDistance <= 1400) {
        this.departMentAppear = true;
      } else {
        this.departMentAppear = false;
      }
      //导航栏加上阴影
      if (this.topDistance >= 886) {
        this.navigationShadow = true;
      } else {
        this.navigationShadow = false;
      }
      console.log(this.topDistance);
    },
    //导航栏 => 改变到顶部的距离
    //100vh == 976px
    changeDistance: function(e) {
      let text = e.toElement.innerText;
      if (text === `首页`) {
        document.documentElement.scrollTop = 0;
      } else if (text === `部门介绍`) {
        document.documentElement.scrollTop = 976;
      } else if (text === `活动通知`) {
        document.documentElement.scrollTop = 976 * 2;
      } else if (text === `科协人`) {
        document.documentElement.scrollTop = 976 * 3;
      }
    },

    //距离计算
    calculateDistance: function(targetDistance = 0) {
      if (targetDistance <= this.topDistance) {
      } else {
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  }
});
