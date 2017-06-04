```高度可定制日历

<vue-calendar :demoEvents="demoEvents" @nextMonth="nextMonth" @lastMonth="lastMonth" @event="event"></vue-calendar>
```


###可用接口：
1

------------------------------------------------------------

event(data):Function

返回一个所选日期的demoEvents的某一个json


------------------------------------------------------------
nextMonth(data)/lastMonth(data):Function

返回值data为一个数组，返回当前月份和年份


------------------------------------------------------------
###使用方法：
	在入口文件下引用并use

