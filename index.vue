<template>
  <div id="_vue_data_calendar">
    <div class="top clear">
      <div class="left lf-tri" @click="lastMonth()"></div>
      <div class="left content">{{this.year}}年{{this.month+1}}月{{thisDay}}日</div>
      <div class="left rf-tri" @click=" nextMonth()"></div>
    </div>
    <div>
      <div id="week">
        <ul class="clear">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div>
      <div>
        <ul class="clear" v-for="item,idx in dateItem">
          <li is="todo-list" :keys="index" :demoEvents="demoEvents" :eventsYear="year" :eventsMonth="month+1" @lastMonth="lastMonth" @nextMonth="nextMonth" @showDate="showDate" :dateList="itemx" v-for="itemx,index in item.dateList" ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import todoList from './datelist.vue'
  export default {
    props:{
      demoEvents: Array,
    },
    name: 'app',
    data () {
      return {
        today:new Date(),
        totalDay:'',
        list:'',
        days:'',
        month:'',
        year:'',
        firstDay:'',
        lastMonthDay:'',
        lastDayCal:'',
        dateList:'',
        dateItem:'',
        isTody:'',
        thisDay:''
      }
    },
    components:{
      todoList
    },
    created(){
        let date = new Date().getDate();
        if (date >= 1 && date <= 9) {
          this.thisDay=  "0" + date;
        } else {
           this.thisDay = date;
        }
    },
    watch:{
      demoEvents: function () {
        this.loadCalendar();
      },
    },
    mounted:function () {
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth();
      this.loadCalendar();
    },
    methods: {
      $(id){
        return document.getElementById(id);
      },
      change(cls){
        return document.getElementsByClassName(cls);
      },
      getDateNum(e){
        if (e.target.nodeName == "LI") { //先判断nodeName是LI
          if (e.target.className != "gray") { //点击本月的日期，显示在日期栏
            this.thisDay = e.target.innerHTML
          } else { //点击灰色日期即（上个月或者下个月日期）切换到当月
            if (e.target.innerHTML > 14) {
              this.lastMonth();
            } else {
              this.nextMonth();
            }
          }
        }
      },
      loadCalendar(){
        this.totalDay = this.getMonthDays(this.year, this.month+1); //计算一个月的天数
        this.firstDay = (new Date(this.year, this.month, 1)).getDay(); //计算每个月1号在星期几
        this.lastMonthDay = this.getMonthDays(this.year, this.month);
        this.lastDayCal = this.lastMonthDay - this.firstDay + 1; //计算上个月在第一行显示的天数
        this.dateList = [];
        let num = 1;
        let nextNum = 1;
        this.dateItem=[];
        let restDate = [];
        for(let i=0;i<6;i++){
          if(i == 0){
            for(let j = 0;j<this.firstDay;j++){
              this.dateList.push({
                date:this.lastDayCal,
                isOld:true,
                isNew:false
              });
              this.lastDayCal++;
            }
            for(let k=0;k<7-this.firstDay;k++){
              this.dateList.push({
                date:num,
                isOld:false,
                isNew:false
              });
              num++;
            }
            this.dateItem.push({
              dateList: this.dateList
            });
          } else {
            this.dateList = [];
            for(let k=0;k<7;k++){
              if(num<=this.totalDay){
                this.dateList.push({
                  date:num,
                  isOld:false,
                  isNew:false
                });
                num++;
              } else {
                restDate.push(nextNum);
                this.dateList.push({
                  date:nextNum,
                  isOld:false,
                  isNew:true
                });
                nextNum++
              }
            }
            this.dateItem.push({
              dateList: this.dateList
            });
          }
        }
      },
      getMonthDays(year, month){
        //判断2月份天数
        if (month === 2) {
          this.days = (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
        } else {
          //1-7月 单数月为31日
          if (month < 7) {
            this.days = month % 2 === 1 ? 31 : 30;
          } else {
            //8-12月 双月为31日
            this.days = month % 2 === 0 ? 31 : 30;
          }
        }
        return this.days;
      },
      nextMonth(){
        this.month++;
        if ( this.month > 11) {
          this.year += 1;
          this.month = 0;
        }
        this.thisDay = 1;
        this.loadCalendar();
        this.$emit('nextMonth',[this.month,this.year])
      },
      lastMonth(){
        this.month--;
        if (this.month < 0) {
          this.month = 11;
          this.year -= 1;
        }
        this.thisDay = 1;
        this.loadCalendar();
        this.$emit('lastMonth',[this.month,this.year])
      },
      showDate(showDate){
        this.$children.forEach((value)=>{
              value.select = showDate[1]
        });
        this.thisDay = showDate[0].date.split('-')[2];
        this.$emit('event',showDate[0])
      }
    }
  }
</script>

<style scoped>
  #_vue_data_calendar{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #week .clear{
    color: #333;
    font-size:14px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    line-height: 24px;
  }
  #_vue_data_calendar .clear:after {
    content: "";
    display: table;
    clear: both;
  }

  #_vue_data_calendar .left {
    float: left;
  }
  #_vue_data_calendar ul {
    padding: 0px;
    margin-top: 6px;
    margin-bottom: 0px;
    display: flex;
  }

  #_vue_data_calendar ul>li {
    flex: 0 0 1;
    float: left;
    list-style: none;
    width: 14.285%;
    height: 24px;
    text-align: center;
  }

  #_vue_data_calendar .gray {
    color: #766565;
    opacity:0.4;
  }
  #_vue_data_calendar .top {
    height: 25px;
  }

  #_vue_data_calendar .top .lf-tri:before {
    content: "";
    margin-top:8px;
    position: absolute;
    margin-left:5px;
    width: 10px;
    height: 10px;
    color: #ccc;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  #_vue_data_calendar .top .rf-tri:before {
    color: #ccc;
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-left: -18px;
    margin-top:8px;
  }

  #_vue_data_calendar .top .content {
    font-size: 14px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    font-weight:600;
    text-align: center;
  }
</style>
