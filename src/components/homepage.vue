<template>
  <div id="root">
    <div :class="navigationShadow ? 'navigation-shadow' : 'navigation'">
      <logo class="logo">
        <img class="logo-image" src="../assets/logo.png">
        <div>SACC</div>
      </logo>
      <div class="navigation-list">
        <div class="nav-name">
          <div class="nav-name-child" v-for="(list,index) in navigationList" :key="index" @click="changeDistance" @tap="changeDistance">{{list}}</div>
        </div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="nav-menu" src='../assets/menu.png' />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(list,index) in navigationList" :key="index" @click="changeDistance" @tap="changeDistance">{{list}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <header>
      <canvas id="c"></canvas>
      <div class="header-container">
        <div>
          <div class="society-name animated fadeInUp">计算机学院、软件学院科学与技术协会</div>
          <slogan class="animated fadeInUp">计算机的世界只有0和1，我们很单纯，但我们不简单。 加入我们，一切从Hello World开始。</slogan>
          <div class="button-container animated fadeInUp">
            <div class="button1" @tap="recruitNew" @click="recruitNew">
              <div>加入我们</div>
            </div>
            <div class="button2" @tap="checkMore" @click="checkMore">
              <div>查看更多</div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <department>
      <div :class="departmentStatus ? 'navigation-font animated fadeInUp' : 'navigation-font animated fadeOutDown'">
        部门介绍
      </div>
      <div class="depart-container">
        <div :class="departMentAppear ? 'group animated fadeInUp' : 'group animated fadeOutDown'" v-for="(item,index) in departMent"
          :key="index">
          <div class="group-detail-title">
            <div>{{item.name}}</div>
          </div>
          <div class="group-detail-content">
            <div class="department-intro">{{item.detail}}</div>
          </div>
        </div>
      </div>
    </department>
    <activity>
      <div :class="activityStatus ? 'navigation-font animated fadeInUp' : 'navigation-font animated fadeOutDown'">
        活动通知
      </div>
      <carousel>
        <div :class="sowingStatus ? 'carousel-container animated fadeInUp' : 'carousel-container animated fadeOutDown'">
          <el-carousel indicator-position="outside" class="sacc-carousel">
            <el-carousel-item v-if="screenWidth < 980" v-for="(item,index) in articles" :key="index">
              <div class="activity-content">
                <div class="activity-title">{{item.article_title}}</div>
                <div class="activity-detail">{{item.summary}}</div>
                <div class="wechat-check" v-bind:id="index" @click="checkArticle">更多前往微信公众号查看</div>
              </div>
            </el-carousel-item>
            <el-carousel-item v-if="screenWidth >= 980" v-for="(item,index) in articles" :key="index">
              <div class="pc-carousel">
                <div class="activity-content">
                  <div class="activity-title">{{item.article_title}}</div>
                  <div class="activity-detail">{{item.summary}}</div>
                  <div class="wechat-check" v-bind:id="index" @click="checkArticle">更多前往微信公众号查看</div>
                </div>
                <div class="pc-carousel-img">
                  <img class="carousel-img" v-bind:src="item.image">
                  <div class="pc-img-author">
                    <div>
                      <div class="author-item">作者</div>
                      <div class="author-index">{{item.author}}</div>
                    </div>
                    <div>
                      <div class="author-item">发布时间</div>
                      <div class="author-index">{{item.publish_time}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </carousel>
    </activity>
    <history>
      <div class="navigation-font">
        科协历届
      </div>
      <div class="history-container">
        <div v-if="screenWidth < 980">
          <div class="history-items">
            <div class="history-title">
              14级主席
            </div>
            <div style="display: flex">
              <div class="history-avatar" v-for="(item,index) in avatar14" :key="index">
                <img v-bind:src="item.avatar" v-bind:id="index" @click="president" @tap="president">
              </div>
              <div class="president-info" v-if="chooseStatus">
                <div class="president-name">姓名:{{avatar14[chooseId].name}}</div>
                <div class="president-intro">介绍:{{avatar14[chooseId].intro}}</div>
              </div>
            </div>
          </div>
          <div class="history-items">
            <div class="history-title">
              15级主席
            </div>
            <div style="display: flex">
              <div class="history-avatar" v-for="(item,index) in avatar15" :key="index">
                <img v-bind:src="item.avatar" v-bind:id="index" @click="president2" @tap="president2">
              </div>
              <div class="president-info" v-if="choose2Status">
                <div class="president-name">姓名:{{avatar15[choose2Id].name}}</div>
                <div class="president-intro">介绍:{{avatar15[choose2Id].intro}}</div>
              </div>
            </div>
          </div>
          <div class="history-items">
            <div class="history-title">
              16级主席
            </div>
            <div style="display: flex">
              <div class="history-avatar" v-for="(item,index) in avatar16" :key="index">
                <img v-bind:src="item.avatar" v-bind:id="index" @click="president3" @tap="president3">
              </div>
              <div class="president-info" v-if="choose3Status">
                <div class="president-name">姓名:{{avatar16[choose3Id].name}}</div>
                <div class="president-intro">介绍:{{avatar16[choose3Id].intro}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pc-avatar-container" v-if="screenWidth >= 980">
          <div class="pc-avatar-body">
            <!-- <div class="pc-avatar-child"> -->
            <div class="pc-avatar-item" v-for="(item,index) in avatar14" :key="index">
              <div class="pc-intro speech-bubble">
                <div class="pc-name">{{item.name}} 14级主席</div>
                <div class="pc-comment">{{item.intro}}</div>
              </div>
              <img v-bind:src="item.avatar" v-bind:id="index" onmouseover="">
            </div>
            <div class="pc-avatar-item" v-for="(item,index) in avatar15" :key="index">
              <div class="pc-intro speech-bubble">
                <div class="pc-name">{{item.name}} 15级主席</div>
                <div class="pc-comment">{{item.intro}}</div>
              </div>
              <img v-bind:src="item.avatar" v-bind:id="index">
            </div>
            <div class="pc-avatar-item" v-for="(item,index) in avatar16" :key="index">
              <div class="pc-intro speech-bubble">
                <div class="pc-name">{{item.name}} 16级主席</div>
                <div class="pc-comment">{{item.intro}}</div>
              </div>
              <img v-bind:src="item.avatar" v-bind:id="index">
            </div>
          </div>
        </div>
      </div>
    </history>
    <contactus>
      <div class="contact-container">
        <div class="contact-child">
          <div class="navigation-font">
            联系我们
          </div>
          <div class="contact-group">
            <div class="saccqrcode">
              <div>
                <img src="../assets/chat-group.png" alt="">
              </div>
              <div class="contact-content">科协交流群: 93125629</div>
            </div>
            <div class="saccqrcode">
              <div>
                <img src="../assets/saccqrcode.jpg" alt="">
              </div>
              <div class="contact-content">微信公众号: nuptsacc</div>
            </div>
          </div>
        </div>
        <div class="copyright" @click="yellowDog" @tap="yellowDog">
          Copyright © 2018 Sacc. All Rights Reserved.
        </div>
      </div>
    </contactus>
  </div>
</template>

<script>
import "element-ui";
import axios from "axios";
export default {
  name: "HomePage",
  data() {
    return {
      navigationList: [`首页`, `部门介绍`, `活动通知`, `科协历届`, `联系我们`],
      departMent: [
        {
          name: `前端组`,
          detail: `我们是网站的艺术总监，只写有情怀的代码。
        我们是科协的颜值担当，只做有情调的码农。`
        },
        {
          name: `后端组`,
          detail: `如果你喜欢设计应用程序的基础设施，实现算法和逻辑，以及工作于数据，那么你可能会喜欢成为一名后端开发人员。`
        },
        {
          name: `安全组`,
          detail: `安全组是科协一个特别的组，因为凡是涉及到计算机都与安全密不可分。也正因为如此，对于组员需要有强大的自学能力，以后的学习也都大多是自学。我们祖传宁缺勿滥的原则，只有达到要求被承认的人才能加入。`
        },
        {
          name: `嵌入式开发组`,
          detail: `带领认识linux到深入linux操作系统内核，硬件、嵌入式、物联网开发，以及任何与计算机技术相关交流，欢迎dalao和萌新加入。`
        },
        {
          name: `新媒体部`,
          detail: `作为科协的推广部门，新媒体的小伙伴们主要负责的是关于科协的信息的发布与分享，以及院科协公众号的运营，同时还会教授剪辑学院视频的内容，一起见证科协的各项活动，为院科协的蓬勃发展添上有力的一笔。`
        },
        {
          name: `算法组`,
          detail: `算法是实现一切愿望的工具，无论你想学前后端或是安全，嵌入式或是python，乃至成为（看着别人头秃的）马猴烧酒，算法组都是都是你的不二选择哟～`
        },
        {
          name: `python组`,
          detail: `Python是现在非常火爆的一门编程语言，尤其在人工智能方面独霸一方，数据挖掘数据分析上也有不菲的性能，爬虫更是活跃于各大网站。我们Python组是以爬虫和数据分析为主，一起学习一起进步的大家庭，希望萌新们多多关注。`
        },
        {
          name: `秘书处`,
          detail: `秘书部是科协办公部门与技术部门之间的桥梁，负责科协大型活动的组织。虚心肯学的你能在这里锻炼活动组织的能力。同时与技术部门开展的freetalk能让你在收获友情的同时又能学到感兴趣的专业知识。办公室，让你遇见更好的自己！`
        }
      ],
      departMentAppear: false,
      // 到顶部的距离
      topDistance: 0,
      // 导航栏的阴影
      navigationShadow: false,
      // contact
      contactStatus: false,
      // saccqrcode
      saccqrcodeStatus: false,
      saccqrcodeStatus2: false,
      departmentStatus: false,
      activityStatus: false,
      // 活动的轮播
      articles: [],
      sowingStatus: false,
      preLoadStatus: false,
      avatar15: [
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_wyh.jpg",
          name: "王玉函",
          intro: "ball ball you 说点什么吧"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_dt.jpg",
          name: "刁太",
          intro: "这个人很懒，什么都没有写。"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_cwq.jpg",
          name: "陈维清",
          intro: "啥也不会的咸鱼王"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_why.jpg",
          name: "王化益",
          intro:
            "本人男，很帅，敲了3年代码，很累，现寻找漂亮小姐姐一起浪迹天涯，有意者加我微信:fytc1011"
        }
      ],
      avatar14: [
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_nxy.jpg",
          name: "牛夕源",
          intro: "就职于华为，祝愿看到这里的人：人生永远没有bug！",
          aid: 0
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_wd.jpg",
          name: "王丹",
          intro:
            "14级老学姐，才华才是你散发魅力的根本，刚好科协需要这样有魅力的你",
          aid: 1
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_fl.jpg",
          name: "范莉",
          intro:
            "技术不在多高，敢想敢做就是大神！科协助你在大神之路上越走越远！加油吧，柚子们！",
          aid: 2
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_wjh.jpg",
          name: "王家豪",
          intro: "ball ball you 说点什么吧",
          aid: 3
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_lyy.jpg",
          name: "梁羽燕",
          intro: "ball ball you 说点什么吧",
          aid: 4
        }
      ],
      avatar16: [
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_zj.jpg",
          name: "张嘉",
          intro: "广告位出租(ಡωಡ)有意私聊"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_ck.jpg",
          name: "陈坤",
          intro: "咸鱼王的小弟"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_gym.jpg",
          name: "郭亚旻",
          intro:
            "本人划水小公主一枚。可文静可开朗，喜欢交朋友，看世界。单身，不可撩哈哈哈哈哈哈哈哈哈哈哈哈哈（其实内心十分期待小学弟"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_gy.jpg",
          name: "高宇",
          intro: "可以做后台开发，对CV更感兴趣"
        },
        {
          avatar: "http://pd2qkcgty.bkt.clouddn.com/head_lzh.jpg",
          name: "雷镇豪",
          intro: "ball ball you 说点什么吧"
        }
      ],
      chooseId: 0,
      chooseStatus: false,
      choose2Id: 0,
      choose2Status: false,
      choose3Id: 0,
      choose3Status: false,

      // 屏幕宽度
      screenWidth: 0
    };
  },
  computed: {
    shadowHeight() {
      return this.navigationShadow === true
        ? document.querySelector(".navigation-shadow").clientHeight
        : document.querySelector(".navigation").clientHeight;
    }
  },
  methods: {
    handleScroll: function() {
      this.topDistance =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      const navFontArray = Array.from(
        document.querySelectorAll(".navigation-font")
      ).map(x => x.offsetTop);
      this.topDistance >= navFontArray[0] / 3
        ? (this.departmentStatus = true)
        : (this.departmentStatus = false);
      // >220 => 部门的出现
      this.topDistance >= navFontArray[0] / 2.9
        ? (this.departMentAppear = true)
        : (this.departMentAppear = false);

      // 导航栏加上阴影
      this.topDistance >= 625
        ? (this.navigationShadow = true)
        : (this.navigationShadow = false);

      // let activityHeight = document.querySelector(`activity`).clientHeight;
      // 活动
      this.topDistance >= navFontArray[1] / 1.4
        ? (this.activityStatus = true)
        : (this.activityStatus = false);
      // 轮播
      this.topDistance >= navFontArray[1] / 1.3
        ? (this.sowingStatus = true)
        : (this.sowingStatus = false);

      // 联系方式的fade
      this.topDistance >= 3270
        ? (this.contactStatus = true)
        : (this.contactStatus = false);
    },
    // 导航栏 => 改变到顶部的距离
    // 100vh == 976px
    changeDistance: function() {
      Array.from(document.querySelectorAll(".el-dropdown-menu__item")).forEach(
        x =>
          x.addEventListener(`click`, e => {
            let text = e.target.innerText;
            if (text === `首页`) {
              this.calculateDistance(0);
            } else if (text === `部门介绍`) {
              this.calculateDistance(
                document.querySelector("department").offsetTop -
                  this.shadowHeight
              );
            } else if (text === `活动通知`) {
              this.calculateDistance(
                document.querySelector("activity").offsetTop - this.shadowHeight
              );
            } else if (text === `科协历届`) {
              this.calculateDistance(
                document.querySelector("history").offsetTop - this.shadowHeight
              );
            } else if (text === `联系我们`) {
              this.calculateDistance(
                document.querySelector("contactus").offsetTop -
                  document.querySelector("contactus").clientHeight
              );
            }
          })
      );
      Array.from(document.querySelectorAll(".nav-name-child")).forEach(x =>
        x.addEventListener(`click`, e => {
          let text = e.target.innerText;
          if (text === `首页`) {
            this.calculateDistance(0);
          } else if (text === `部门介绍`) {
            this.calculateDistance(
              document.querySelector("department").offsetTop - this.shadowHeight
            );
          } else if (text === `活动通知`) {
            this.calculateDistance(
              document.querySelector("activity").offsetTop - this.shadowHeight
            );
          } else if (text === `科协历届`) {
            this.calculateDistance(
              document.querySelector("history").offsetTop - this.shadowHeight
            );
          } else if (text === `联系我们`) {
            this.calculateDistance(
              document.querySelector("contactus").offsetTop -
                document.querySelector("contactus").clientHeight
            );
          }
        })
      );
    },
    // 跳转到微信
    checkArticle: function(e) {
      const index = Number(e.target.id);
      window.location.href = `${this.articles[index].wxurl}`;
    },

    // 距离计算
    calculateDistance: function(targetDistance = 0) {
      if (targetDistance <= this.topDistance) {
        let reduce = setInterval(() => {
          document.documentElement.scrollTop -= 10;
          if (
            Math.abs(document.documentElement.scrollTop - targetDistance) <= 10
          ) {
            document.documentElement.scrollTop = targetDistance;
            clearInterval(reduce);
          }
        }, 10);
      } else {
        let addDis = setInterval(() => {
          document.documentElement.scrollTop += 10;
          if (
            Math.abs(document.documentElement.scrollTop - targetDistance) <= 10
          ) {
            document.documentElement.scrollTop = targetDistance;
            clearInterval(addDis);
          }
        }, 10);
      }
    },
    // 二维码的动画
    saccqrcodeDisplay: function() {
      this.saccqrcodeStatus = true;
    },
    saccqrcodeDisappear: function() {
      this.saccqrcodeStatus = false;
    },
    saccqrcodeDisplay2: function() {
      this.saccqrcodeStatus2 = true;
    },
    saccqrcodeDisappear2: function() {
      this.saccqrcodeStatus2 = false;
    },

    yellowDog: function() {
      window.location.href = "http://zaiyewujiang.cn";
    },
    recruitNew: function() {
      window.location.href = "http://join.njupt-sacc.com/";
    },
    checkMore: function() {
      this.calculateDistance(
        document.querySelector("department").offsetTop - 64
      );
    },
    // 加载
    preLoad: function() {
      setTimeout(() => {
        this.preLoadStatus = true;
      }, 2000);
    },

    // 主席信息
    president: function(e) {
      this.chooseId = Number(e.target.id);
      this.chooseStatus = true;
      this.choose2Status = false;
      this.choose3Status = false;
      setTimeout(() => {
        this.chooseStatus = false;
      }, 2000);
    },
    president2: function(e) {
      this.choose2Id = Number(e.target.id);
      this.chooseStatus = false;
      this.choose2Status = true;
      this.choose3Status = false;
      setTimeout(() => {
        this.choose2Status = false;
      }, 2000);
    },
    president3: function(e) {
      this.choose3Id = Number(e.target.id);
      this.chooseStatus = false;
      this.choose2Status = false;
      this.choose3Status = true;
      setTimeout(() => {
        this.choose3Status = false;
      }, 2000);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.preLoad();
    this.changeDistance();
    // 屏幕宽度
    this.screenWidth = document.body.offsetWidth || document.body.clientWidth;
    axios({
      url: "http://admin.njupt-sacc.com/article/list/",
      method: "GET"
    }).then(res => {
      let result = res.data.results;
      result = result
        .filter(x => x.is_stick === true)
        .sort(
          (x, y) =>
            Number(x.publish_time.split(`-`).join(``)) -
              Number(y.publish_time.split(`-`).join(``)) >
            0
        );
      this.articles = result;
    });
  }
};
</script>

<style lang="sass" scoped>
@import "../style/index.sass"
@import "../style/bubble.sass"
@import "../style/animate.sass"
</style>

