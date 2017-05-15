<template>
  <li style="padding:4px;" :class="{todatLi:today}">
    <div @click="showDate(dateList.date)" :class="{ gray: (dateList.isOld||dateList.isNew),today:today&&!event}">
      <div>
        {{dateList.date}}
      </div> <span class="event" v-if="event&&!dateList.isOld&&!dateList.isNew" :class="{choose:select==dateList.date}"></span></div>
  </li>
</template>

<script>
export default {
    props:{
      dateList:Object,
      eventsYear:'',
      eventsMonth:'',
      demoEvents:''
    },
  name: 'hello',
  data () {
    return {
      event:false,
      index:'',
      select:'',
    }
  },
  watch:{
    dateList: function () {
      let day = this.eventsYear+'-'+this.month+'-'+this.thisDay;
      for(let i = 0;i<this.demoEvents.length;i++){
        if(day.indexOf(this.demoEvents[i].date)===0){
          this.index = i;
          this.event = true;
          break
        } else {
          this.event = false;
        }
      }
    }
  },
  computed:{
    month:function () {
      if (this.eventsMonth >= 1 && this.eventsMonth <= 9) {
       return  "0" + this.eventsMonth;
      } else {
        return this.eventsMonth;
      }
    },
    thisDay:function () {
      if (this.dateList.date >= 1 && this.dateList.date <= 9) {
        return  "0" + this.dateList.date;
      } else {
        return this.dateList.date;
      }
    },
    today:function () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 1 && day <= 9) {
        day = "0" + day;
      }
      let thisDay = this.eventsYear+'-'+this.month+'-'+this.thisDay;
      let today = year+'-'+month+'-'+day;
      return thisDay === today;
    }
  },
  mounted(){
        this.initTodo();
  },
  methods:{
    showDate(showDate){
      if(this.dateList.isOld){
        this.$emit("lastMonth")
      }if(this.dateList.isNew){
        this.$emit("nextMonth")
      }else{
          if(this.event === true){
              this.select = this.demoEvents[this.index].date.split('-')[2];
            this.$emit("showDate",[this.demoEvents[this.index],this.select])
          }
      }
    },
    initTodo(){
      let day = this.eventsYear+'-'+this.month+'-'+this.thisDay;
      let dateList=[];
      for(let i = 0;i<this.demoEvents.length;i++){
        dateList.push(this.demoEvents[i].date);
        if(dateList.includes(day)){
          this.index = i;
          this.event = true;
          break
        } else {
          this.event = false;
        }
      }
    }
  }
}
</script>


<style scoped>
  div{
    font-size:12px;
  }
  .event{
    display: inline-block;
    background-color: #DB4D4C;
    position: relative;
    top: -5px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    transition: all 0.2s ease;
  }
  .choose{
    width:17px;
    border-radius:5px;
  }
.gray {
  color: #766565;
  opacity:0.3;
}
  .today{
    display: inline-block;
    padding: 4px;
    background-color: #20b2d9;
    border-radius: 100%;
    color: #fff;
  }
  .todatLi{
    padding:0 4px!important;
  }
</style>
