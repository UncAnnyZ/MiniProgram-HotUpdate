//index.js
//获取应用实例

Page({
  data: {
    grade: '',       //年级
    sex: true,      //性别    男:true  女:false
    tall: 0,        //身高
    weight: 0,      //体重
    volume: 0,      //肺活量
    jump: 0,        //跳远
    handlong: 0,    //坐位体前屈
    ishandlong: false,  //是否已填写
    shortrun: 0,    //50m
    longrun: 0,     //800、1000m
    min: 0,
    second: 0,
    sit_up: 0,      //仰卧起坐
    pull_up: 0,     //引体向上
    score: {
      fat: 0,          //体脂
      tall: 0,        //身高
      weight: 0,      //体重
      volume: 0,      //肺活量
      jump: 0,        //跳远
      handlong: 0,    //坐位体前屈
      shortrun: 0,    //50m
      longrun: 0,     //800、1000m
      sit_up: 0,      //仰卧起坐
      pull_up: 0,     //引体向上
    },
    total: 0,
    block:[
      {
        label:"身高",
        input:"tall",
        unit:"cm",
        score:"tall",
        sex:2,
        power:0.15
      },
      {
        label:"体重",
        input:"weight",
        unit:"kg",
        score:"fat",
        sex:2,
        power:0.15
      },
      {
        label:"肺活量",
        input:"volume",
        unit:"ml",
        score:"volume",
        sex:2,
        power:0.15
      },
      {
        label:"立定跳远",
        input:"jump",
        unit:"cm",
        score:"jump",
        sex:2,
        power:0.1
      },
      {
        label:"坐位体前屈",
        input:"handlong",
        unit:"cm",
        score:"handlong",
        sex:2,
        power:0.1
      },
      {
        label:"引体向上",
        input:"pull_up",
        unit:"个",
        score:"pull_up",
        sex: true,
        power:0.1
      },
      {
        label:"仰卧起坐",
        input:"sit_up",
        unit:"个",
        score:"sit_up",
        sex: false,
        power:0.1
      },
      {
        label:"50m",
        input:"shortrun",
        unit:'"',
        score:"shortrun",
        sex: 2,
        power:0.2
      }
    ]
  },

  onLoad: function (e) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          elementStyle: 'width:' + res.windowWidth + 'px;' + 'min-height:' + res.windowHeight + 'px;'
        })
      },
    })
    wx.setStorageSync('state', "onload")
    this.gradeClick({
      target:{ id:1 }
    })
    wx.removeStorageSync('state')
  },

  tips(e){
    var id = e.target.id
    var text;
    if(id == "tall" || id == "fat")
      text = "体脂\n权重为：" + e.target.dataset.power
    else 
      text = e.target.dataset.label + "\n" + "权重为：" + e.target.dataset.power

    wx.showToast({
      title: text,
      icon: "none",
      duration: 2000
    })
  },

  /* 性别 */
  Setsex: function (e) {
    if (e.detail.value) {
      this.setData({
        sex: e.detail.value,    //男：true 女：false
        min: 0,
        second: 0,
        longrun: 0,
        "score.longrun": 0,
        sit_up: 0

      })
    }
    if (!e.detail.value) {
      this.setData({
        sex: e.detail.value,    //男：true 女：false
        min: 0,
        second: 0,
        longrun: 0,
        "score.longrun": 0,
        pull_up: 0,
      })
    }
    this.update();
  },

  /* 年级 */
  gradeClick: function (e) {
    this.setData({
      grade: e.target.id
    })
    this.update();
  },


  /* 体脂 */
  tall: function (e) {
    if (e != undefined)
      this.setData({
        tall: Number(e.detail.value)
      })
    var fat;
    if (this.data.tall != 0 && this.data.tall != "" && this.data.weight != 0 && this.data.weight != "") {
      fat = this.data.weight / (this.data.tall * this.data.tall / 10000)
      if (this.data.sex == true)    //男生
      {
        if (fat >= 27.95)
          this.setData({
            'score.fat': 60
          })
        if (23.95 <= fat < 27.95)
          this.setData({
            'score.fat': 80
          })
        if (17.75 <= fat < 23.95)
          this.setData({
            'score.fat': 100
          })
        if (fat < 17.75)
          this.setData({
            'score.fat': 80
          })
      }
      if (this.data.sex == false)    //女生
      {
        if (fat >= 27.95)
          this.setData({
            'score.fat': 60
          })
        if (23.95 <= fat < 27.95)
          this.setData({
            'score.fat': 80
          })
        if (17.15 <= fat < 23.95)
          this.setData({
            'score.fat': 100
          })
        if (fat < 17.15)
          this.setData({
            'score.fat': 80
          })
      }
      this.calculate();
    }
    else {
      this.setData({
        'score.fat': 0
      })
      this.calculate();
    }
  },
  weight: function (e) {
    if (e != undefined)
      this.setData({
        weight: Number(e.detail.value)
      })
    var fat;
    if (this.data.tall != 0 && this.data.tall != "" && this.data.weight != 0 && this.data.weight != "") {
      fat = this.data.weight / (this.data.tall * this.data.tall / 10000)
      if (this.data.sex == true)    //男生
      {
        if (fat >= 27.95)
          this.setData({
            'score.fat': 60
          })
        else if (fat >= 23.95)
          this.setData({
            'score.fat': 80
          })
        else if (fat >= 17.75)
          this.setData({
            'score.fat': 100
          })
        else if (fat < 17.75)
          this.setData({
            'score.fat': 80
          })
      }
      if (this.data.sex == false)    //女生
      {
        if (fat >= 27.95)
          this.setData({
            'score.fat': 60
          })
        else if (fat >= 23.95)
          this.setData({
            'score.fat': 80
          })
        else if (fat >= 17.15)
          this.setData({
            'score.fat': 100
          })
        else if (fat < 17.15)
          this.setData({
            'score.fat': 80
          })
      }
      this.calculate();
    }
    else {
      this.setData({
        'score.fat': 0
      })
      this.calculate();
    }


  },

  /* 肺活量 */
  volume: function (e) {
    if (e != undefined)
      this.setData({
        volume: Number(e.detail.value)
      })
    var volume;

    if (this.data.sex == true) {   //男生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.volume >= 4300) {
          if (this.data.volume >= 5040)
            volume = 100
          else if (this.data.volume >= 4800)
            volume = Math.floor((this.data.volume - 4800) / 120) * 5 + 90
          else {
            volume = Math.floor((this.data.volume - 4300) / 250) * 5 + 80
          }
        }
        else if (this.data.volume >= 3100) {
          volume = Math.floor((this.data.volume - 3100) / 120) * 2 + 60
        }
        else if (this.data.volume >= 2300) {
          volume = Math.floor((this.data.volume - 2300) / 160) * 10 + 10
        }
        else
          volume = 0
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.volume >= 4400) {
          if (this.data.volume >= 5140)
            volume = 100
          else if (this.data.volume >= 4900)
            volume = Math.floor((this.data.volume - 4900) / 120) * 5 + 90
          else {
            volume = Math.floor((this.data.volume - 4400) / 250) * 5 + 80
          }
        }
        else if (this.data.volume >= 3200) {
          volume = Math.floor((this.data.volume - 3200) / 120) * 2 + 60
        }
        else if (this.data.volume >= 2350) {
          volume = Math.floor((this.data.volume - 2350) / 170) * 10 + 10
        }
        else
          volume = 0
      }
    }
    if (this.data.sex == false) {    //女生
      if (this.data.grade == 1 || this.data.grade == 2) {
        if (this.data.volume >= 3000) {
          if (this.data.volume >= 3400)
            volume = 100
          else if (this.data.volume >= 3300)
            volume = Math.floor((this.data.volume - 3300) / 50) * 5 + 90
          else {
            volume = Math.floor((this.data.volume - 3000) / 150) * 5 + 80
          }
        }
        else if (this.data.volume >= 2000) {
          volume = Math.floor((this.data.volume - 2000) / 100) * 2 + 60
        }
        else if (this.data.volume >= 1800) {
          volume = Math.floor((this.data.volume - 1800) / 40) * 10 + 10
        }
        else
          volume = 0
      }
      if (this.data.grade == 3 || this.data.grade == 4) {
        if (this.data.volume >= 3050) {
          if (this.data.volume >= 3450)
            volume = 100
          else if (this.data.volume >= 3350)
            volume = Math.floor((this.data.volume - 3350) / 50) * 5 + 90
          else {
            volume = Math.floor((this.data.volume - 3050) / 150) * 5 + 80
          }
        }
        else if (this.data.volume >= 2050) {
          volume = Math.floor((this.data.volume - 2050) / 100) * 2 + 60
        }
        else if (this.data.volume >= 1800) {
          volume = Math.floor((this.data.volume - 1850) / 40) * 10 + 10
        }
        else
          volume = 0
      }
    }
    this.setData({
      'score.volume': volume
    })
    this.calculate();
  },
  /* 跳远 */
  jump: function (e) {
    if (e != undefined)
      this.setData({
        jump: Number(e.detail.value)
      })
    var jump;

    if (this.data.sex == true) {   //男生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.jump >= 248) {
          if (this.data.jump >= 273)
            jump = 100
          else if (this.data.jump >= 268)
            jump = 95
          else if (this.data.jump >= 263)
            jump = 90
          else if (this.data.jump >= 256)
            jump = 85
          else if (this.data.jump >= 248)
            jump = 80
        }
        else if (this.data.jump >= 208) {
          jump = Math.floor((this.data.jump - 208) / 4) * 2 + 60
        }
        else if (this.data.jump >= 183) {
          jump = Math.floor((this.data.jump - 183) / 5) * 10 + 10
        }
        else
          jump = 0
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.jump >= 250) {
          if (this.data.jump >= 275)
            jump = 100
          else if (this.data.jump >= 270)
            jump = 95
          else if (this.data.jump >= 265)
            jump = 90
          else if (this.data.jump >= 258)
            jump = 85
          else if (this.data.jump >= 250)
            jump = 80
        }
        else if (this.data.jump >= 210) {
          jump = Math.floor((this.data.jump - 210) / 4) * 2 + 60
        }
        else if (this.data.jump >= 185) {
          jump = Math.floor((this.data.jump - 185) / 5) * 10 + 10
        }
        else
          jump = 0
      }
    }
    if (this.data.sex == false) {   //女生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.jump >= 181) {
          if (this.data.jump >= 207)
            jump = 100
          else if (this.data.jump >= 201)
            jump = 95
          else if (this.data.jump >= 195)
            jump = 90
          else if (this.data.jump >= 188)
            jump = 85
          else if (this.data.jump >= 181)
            jump = 80
        }
        else if (this.data.jump >= 151) {
          jump = Math.floor((this.data.jump - 151) / 3) * 2 + 60
        }
        else if (this.data.jump >= 126) {
          jump = Math.floor((this.data.jump - 126) / 5) * 10 + 10
        }
        else
          jump = 0
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.jump >= 182) {
          if (this.data.jump >= 208)
            jump = 100
          else if (this.data.jump >= 202)
            jump = 95
          else if (this.data.jump >= 196)
            jump = 90
          else if (this.data.jump >= 189)
            jump = 85
          else if (this.data.jump >= 182)
            jump = 80
        }
        else if (this.data.jump >= 152) {
          jump = Math.floor((this.data.jump - 152) / 3) * 2 + 60
        }
        else if (this.data.jump >= 127) {
          jump = Math.floor((this.data.jump - 127) / 5) * 10 + 10
        }
        else
          jump = 0
      }
    }
    this.setData({
      'score.jump': jump
    })
    this.calculate();
  },
  /* 体前屈 */
  handlong: function (e) {
    if (e != "update") {
      this.setData({
        ishandlong: true,
        handlong: Number(e.detail.value),
      })
      if (e.detail.value == "") {
        this.setData({
          ishandlong: false
        })
      }
    }

    var handlong;
    
    if (this.data.sex == true) {   //男生
      if (this.data.grade == 1 || this.data.grade == 2) { //大一、大二
        if (this.data.handlong >= 17.7) {
          if (this.data.handlong >= 24.9)
            handlong = 100;
          else if (this.data.handlong >= 17.7)
            handlong = Math.floor(((this.data.handlong - 17.7) / 1.8)) * 5 + 80
        }
        else if (this.data.handlong >= 3.7) {
          handlong = Math.floor(((this.data.handlong - 3.7) / 1.4)) * 2 + 60
        }
        else if (this.data.handlong >= (-1.3)) {
          handlong = Math.floor(((this.data.handlong + 1.3) / 1)) * 10 + 10
        }
        else
          handlong = 0
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.handlong >= 18.2) {
          if (this.data.handlong >= 25.1)
            handlong = 100;
          else if (this.data.handlong >= 21.5)
            handlong = Math.floor(((this.data.handlong - 21.5) / 1.8)) * 5 + 90
          else if (this.data.handlong >= 18.2)
            handlong = Math.floor(((this.data.handlong - 18.2) / 1.7)) * 5 + 80
        }
        else if (this.data.handlong >= 4.2) {
          handlong = Math.floor(((this.data.handlong - 4.2) / 1.4)) * 2 + 60
        }
        else if (this.data.handlong >= (-0.8)) {
          handlong = Math.floor(((this.data.handlong + 0.8) / 1)) * 10 + 10
        }
        else
          handlong = 0
      }
    }
    if (this.data.sex == false) {   //女生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.handlong >= 19) {
          if (this.data.handlong >= 25.8)
            handlong = 100;
          else if (this.data.handlong >= 22.2)
            handlong = Math.floor(((this.data.handlong - 22.2) / 1.8)) * 5 + 90
          else if (this.data.handlong >= 19)
            handlong = Math.floor(((this.data.handlong - 19) / 1.6)) * 5 + 80
        }
        else if (this.data.handlong >= 6) {
          handlong = Math.floor(((this.data.handlong - 6) / 1.3)) * 2 + 60
        }
        else if (this.data.handlong >= 2) {
          handlong = Math.floor(((this.data.handlong - 2) / 0.8)) * 10 + 10
        }
        else
          handlong = 0
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.handlong >= 19.5) {
          if (this.data.handlong >= 26.3)
            handlong = 100;
          else if (this.data.handlong >= 24.4)
            handlong = 95
          else if (this.data.handlong >= 22.4)
            handlong = 90
          else if (this.data.handlong >= 21.0)
            handlong = 85
          else if (this.data.handlong >= 19.5)
            handlong = 80
        }
        else if (this.data.handlong >= 6.5) {
          handlong = Math.floor(((this.data.handlong - 6.5) / 1.3)) * 2 + 60
        }
        else if (this.data.handlong >= 2.5) {
          handlong = Math.floor(((this.data.handlong - 2.5) / 0.8)) * 10 + 10
        }
        else
          handlong = 0
      }
    }

    if (!this.data.ishandlong)
      handlong = 0

    this.setData({
      'score.handlong': handlong
    })
    this.calculate();

  },
  /* 仰卧起坐 */
  sit_up: function (e) {
    if (e != undefined)
      this.setData({
        sit_up: Number(e.detail.value)
      })
    var sit_up;

    if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
      if (this.data.sit_up >= 46) {
        if (this.data.sit_up >= 56)
          sit_up = 100;
        else if (this.data.sit_up >= 52)
          sit_up = Math.floor(((this.data.sit_up - 52) / 2)) * 5 + 90
        else if (this.data.sit_up >= 46)
          sit_up = Math.floor(((this.data.sit_up - 46) / 3)) * 5 + 80
      }
      else if (this.data.sit_up >= 26) {
        sit_up = Math.floor(((this.data.sit_up - 26) / 2)) * 2 + 60
      }
      else if (this.data.sit_up >= 16) {
        sit_up = Math.floor(((this.data.sit_up - 16) / 2)) * 10 + 10
      }
      else
        sit_up = 0
    }
    if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
      if (this.data.sit_up >= 47) {
        if (this.data.sit_up >= 57)
          sit_up = 100;
        else if (this.data.sit_up >= 53)
          sit_up = Math.floor(((this.data.sit_up - 53) / 2)) * 5 + 90
        else if (this.data.sit_up >= 47)
          sit_up = Math.floor(((this.data.sit_up - 47) / 3)) * 5 + 80
      }
      else if (this.data.sit_up >= 27) {
        sit_up = Math.floor(((this.data.sit_up - 27) / 2)) * 2 + 60
      }
      else if (this.data.sit_up >= 17) {
        sit_up = Math.floor(((this.data.sit_up - 17) / 2)) * 10 + 10
      }
      else
        sit_up = 0
    }
    this.setData({
      'score.sit_up': sit_up
    })
    this.setData({
      total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + sit_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
    })
  },
  /* 引体向上 */
  pull_up: function (e) {
    if (e != undefined)
      this.setData({
        pull_up: Number(e.detail.value)
      })
    var pull_up;

    if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
      if (this.data.pull_up >= 19)
        pull_up = 100
      else if (this.data.pull_up >= 15) {
        pull_up = (this.data.pull_up - 15) * 5 + 80
      }
      else if (this.data.pull_up >= 10) {
        pull_up = (this.data.pull_up - 10) * 4 + 60
      }
      else if (this.data.pull_up >= 5) {
        pull_up = (this.data.pull_up - 5) * 10 + 10
      }
      else
        pull_up = 0
    }
    if (this.data.grade == 3 || this.data.grade == 4) {   //大三、大四
      if (this.data.pull_up >= 20)
        pull_up = 100
      else if (this.data.pull_up >= 16) {
        pull_up = (this.data.pull_up - 16) * 5 + 80
      }
      else if (this.data.pull_up >= 11) {
        pull_up = (this.data.pull_up - 11) * 4 + 60
      }
      else if (this.data.pull_up >= 6) {
        pull_up = (this.data.pull_up - 6) * 10 + 10
      }
      else
        pull_up = 0
    }
    this.setData({
      'score.pull_up': pull_up
    })
    this.setData({
      total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + pull_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
    })
  },
  /* 短跑50m */
  shortrun: function (e) {
    if (e != undefined) 
      this.setData({
        shortrun: Number(e.detail.value)
      })

    var shortrun;

    if (this.data.sex == true) {   //男生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.shortrun > 10.1 || this.data.shortrun == 0)
          shortrun = 0
        else if (this.data.shortrun >= 9.1) {
          shortrun = 60 - Math.ceil(((this.data.shortrun - 9.1) / 0.2)) * 10
        }
        else if (this.data.shortrun >= 7.1) {
          shortrun = 80 - Math.ceil(((this.data.shortrun - 7.1) / 0.2)) * 2
        }
        else if (this.data.shortrun >= 6.7) {
          shortrun = 100 - Math.ceil(((this.data.shortrun - 6.7) / 0.1)) * 5
        }
        else
          shortrun = 100
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.shortrun > 10)
          shortrun = 0
        else if (this.data.shortrun >= 9) {
          shortrun = 60 - Math.ceil(((this.data.shortrun - 9) / 0.2)) * 10
        }
        else if (this.data.shortrun >= 7.0) {
          shortrun = 80 - Math.ceil(((this.data.shortrun - 7) / 0.2)) * 2
        }
        else if (this.data.shortrun >= 6.6) {
          shortrun = 100 - Math.ceil(((this.data.shortrun - 6.6) / 0.1)) * 5
        }
        else
          shortrun = 100
      }
    }
    if (this.data.sex == false) {   //女生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.shortrun > 11.3)
          shortrun = 0
        else if (this.data.shortrun >= 10.3) {
          shortrun = 60 - Math.ceil(((this.data.shortrun - 10.3) / 0.2)) * 10
        }
        else if (this.data.shortrun >= 8.3) {
          shortrun = 80 - Math.ceil(((this.data.shortrun - 8.3) / 0.2)) * 2
        }
        else if (this.data.shortrun >= 7.7) {
          shortrun = 100 - Math.ceil(((this.data.shortrun - 7.7) / 0.3)) * 5
        }
        else if (this.data.shortrun >= 7.5) {
          shortrun = 100 - Math.ceil(((this.data.shortrun - 7.5) / 0.1)) * 5
        }
        else
          shortrun = 100
      }
      if (this.data.grade == 3 || this.data.grade == 4) { //大三、大四
        if (this.data.shortrun > 11.2)
          shortrun = 0
        else if (this.data.shortrun >= 10.2) {
          shortrun = 60 - Math.ceil(((this.data.shortrun - 10.2) / 0.2)) * 10
        }
        else if (this.data.shortrun >= 8.2) {
          shortrun = 80 - Math.ceil(((this.data.shortrun - 8.2) / 0.2)) * 2
        }
        else if (this.data.shortrun >= 7.6) {
          shortrun = 100 - Math.ceil(((this.data.shortrun - 7.6) / 0.3)) * 5
        }
        else if (this.data.shortrun >= 7.4) {
          shortrun = 100 - Math.ceil(((this.data.shortrun - 7.4) / 0.1)) * 5
        }
        else
          shortrun = 100
      }
    }

    if(e != undefined && e.detail.value == 0)
      shortrun = 0;

    this.setData({
      'score.shortrun': shortrun
    })
    // if (this.data.shortrun != 0)
      this.calculate();
  },
  /* 长跑800、1000 */
  min: function (e) {
    if (e != undefined)
      this.setData({
        min: e.detail.value,
        longrun: Number(e.detail.value) * 60 + Number(this.data.second)
      })
    this.longrun();

  },
  second: function (e) {
    if (e != undefined)
      this.setData({
        second: e.detail.value,
        longrun: Number(this.data.min) * 60 + Number(e.detail.value)
      })
    this.longrun();

  },
  longrun: function (e) {
    var longrun;
    if (this.data.sex == true) {   //男生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.longrun > 372)
          longrun = 0
        else if (this.data.longrun >= 272) {
          longrun = 60 - Math.ceil(((this.data.longrun - 272) / 20)) * 10
        }
        else if (this.data.longrun >= 222) {
          longrun = 80 - Math.ceil(((this.data.longrun - 222) / 5)) * 2
        }
        else if (this.data.longrun >= 207) {
          longrun = 90 - Math.ceil(((this.data.longrun - 207) / 7)) * 5
        }
        else if (this.data.longrun >= 197) {
          longrun = 100 - Math.ceil(((this.data.longrun - 197) / 5)) * 5
        }
        else
          longrun = 100
      }
      if (this.data.grade == 3 || this.data.grade == 4) {   //大三、大四
        if (this.data.longrun > 370)
          longrun = 0
        else if (this.data.longrun >= 270) {
          longrun = 60 - Math.ceil(((this.data.longrun - 270) / 20)) * 10
        }
        else if (this.data.longrun >= 220) {
          longrun = 80 - Math.ceil(((this.data.longrun - 220) / 5)) * 2
        }
        else if (this.data.longrun >= 205) {
          longrun = 90 - Math.ceil(((this.data.longrun - 205) / 7)) * 5
        }
        else if (this.data.longrun >= 195) {
          longrun = 100 - Math.ceil(((this.data.longrun - 195) / 5)) * 5
        }
        else
          longrun = 100
      }
    }
    if (this.data.sex == false) {   //女生
      if (this.data.grade == 1 || this.data.grade == 2) {   //大一、大二
        if (this.data.longrun > 324)
          longrun = 0
        else if (this.data.longrun >= 274) {
          longrun = 60 - Math.ceil(((this.data.longrun - 274) / 10)) * 10
        }
        else if (this.data.longrun >= 224) {
          longrun = 80 - Math.ceil(((this.data.longrun - 224) / 5)) * 2
        }
        else if (this.data.longrun >= 210) {
          longrun = 90 - Math.ceil(((this.data.longrun - 210) / 7)) * 5
        }
        else if (this.data.longrun >= 198) {
          longrun = 100 - Math.ceil(((this.data.longrun - 198) / 6)) * 5
        }
        else
          longrun = 100
      }
      if (this.data.grade == 3 || this.data.grade == 4) {   //大三、大四
        if (this.data.longrun > 322)
          longrun = 0
        else if (this.data.longrun >= 272) {
          longrun = 60 - Math.ceil(((this.data.longrun - 272) / 10)) * 10
        }
        else if (this.data.longrun >= 222) {
          longrun = 80 - Math.ceil(((this.data.longrun - 222) / 5)) * 2
        }
        else if (this.data.longrun >= 208) {
          longrun = 90 - Math.ceil(((this.data.longrun - 208) / 7)) * 5
        }
        else if (this.data.longrun >= 196) {
          longrun = 100 - Math.ceil(((this.data.longrun - 196) / 6)) * 5
        }
        else
          longrun = 100
      }
    }
    if(this.data.longrun == 0)
      longrun = 0;
      
    this.setData({
      'score.longrun': longrun
    })
    // if (this.data.longrun != 0)
      this.calculate();
  },

  /* 计算统计 */
  calculate: function (e) {
    if (this.data.sex == true)
      this.setData({
        total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + this.data.score.pull_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
      })
    if (this.data.sex == false)
      this.setData({
        total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + this.data.score.sit_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
      })
  },

  /* 更新数据 */
  update: function (e) {
    this.tall();
    this.weight();
    this.volume();
    this.jump();
    if (wx.getStorageSync("state")=="")
      this.handlong("update");
    this.sit_up();
    this.pull_up();
    if (this.data.shortrun != 0)
      this.shortrun();
    if (this.data.longrun != 0)
      this.longrun();

    this.calculate();
  }

})
