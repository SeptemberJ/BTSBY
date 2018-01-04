//连续月份
export function ReadExcel() {
var arr = ['2016-9', '2016-10', '2016-11', '2016-12', '2017-1', '2017-2'];
var tmpday = null;
//是否连续的标志
var lianxu = true;
for(var i=arr.length-1; i>=0; i--){
  var dateStr = arr[i].split('-');
  var date = new Date(parseInt(dateStr[0]), parseInt(dateStr[1], 10) - 1, 1, 0, 0, 0);
  if(tmpday == null) {
    tmpday = date;
  }else {
    tmpday.setMonth(tmpday.getMonth() - 1);//比较是否相差一个月
    if(date.getTime() != tmpday.getTime()) {
    //月份没有连续
    lianxu = false;
    break;
    }
  }
}
}
//导入excel
export function ReadExcel() {
      var tempStr = "";  
      //得到文件路径的值  
      var filePath = document.getElementById("upfile").value;
      console.log(filePath)  
      //创建操作EXCEL应用程序的实例  
      var oXL = new ActiveXObject("Excel.application");  
      //打开指定路径的excel文件  
      var oWB = oXL.Workbooks.open(filePath);  
      oWB.worksheets(1).select();  
      var oSheet = oWB.ActiveSheet;  
      var nRows = oSheet.usedrange.rows.count;  
      var nColumns = oSheet.usedrange.columns.count;  
      for(var i = 1; i < nRows; i++) {  
          for(var j = 0; j < nColumns; j++) {  
              if(oSheet.Cells(i + 1, j + 1).value == undefined) {  
                  console.log(" ");  
              } else {  
                  console.log(oSheet.Cells(i + 1, j + 1).value);  
              }  
          }  
      }  
      //退出操作excel的实例对象  
      oXL.Application.Quit();  
      //手动调用垃圾收集器  
      CollectGarbage();  
  } 
//多个数组取交集
  export function Intersect() {
            var result = new Array();
            var obj = {};
            console.log(arguments)
            for (var i = 0; i < arguments.length; i++) {
                for (var j = 0; j < arguments[i].length; j++) {
                    var str = arguments[i][j];
                    if (!obj[str]) {
                        obj[str] = 1;
                    }
                    else {
                        obj[str]++;
                        if (obj[str] == arguments.length)
                        {
                            result.push(str);
                        }
                    }//end else
                }//end for j
            }//end for i
            return result;

  }

//创建cookie
  export function setCookie(cname, cvalue, exdays) {
      var d = new Date();
       d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
       //d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      console.info(cname + "=" + cvalue + "; " + expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
      // console.info(document.cookie);
  }

//获取cookie
  export function getCookie(cname){
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
  }

//删除cookie
  export function clearCookie(name) {    
    setCookie(name, "", -1);    
  }  

//随机验证码
 export function generateMixed(n) {
 	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 	var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
 }

//获取当前时间往后的月份（年-月）
 export function getOneYearMonth(n,limitDate) {
    var data=new Date()
    var year=data.getFullYear() 
    var mon 
    var day=data.getDate();
    if(day<limitDate){
      mon=data.getMonth(); 
    }else{
      mon=data.getMonth()+1; 
    } 
    var arry=new Array();  
    for(var i=0;i<n;i++){  
        mon=parseInt(mon)+1;
        
        if(parseInt(mon)>12){  
            year=year+1;  
            mon=mon-12;  
        }
        if(mon<10){ 
            mon='0'+mon;
        }
        arry[i]=year+"-"+mon;  
    }  
    return arry; 
 }

//对象删除对应属性
 export function removeByValue(arr,val) {
  for(let i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}


//数组对象去重
 export function removeSame(arr) {
  let temp = []
  let unique = {}
  arr.forEach(function(gpa){ unique[ JSON.stringify(gpa) ] = gpa })
  for (var key in unique ){
    temp.push(unique[key])  
  }
  return temp
}

// export function formatTime(date) {
//   var year = date.getFullYear()
//   var month = date.getMonth() + 1
//   var day = date.getDate()

//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var second = date.getSeconds()

//   function formatNumber(n) {
//     n = n.toString()
//     return n[1] ? n : '0' + n
//   }

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

//时间戳格式化（年月日时分秒）
  export function timestampToFormatTime(str){  
    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    var oDate = new Date(str),  
    oYear = oDate.getFullYear(),  
    oMonth = oDate.getMonth()+1,  
    oDay = oDate.getDate(),  
    oHour = oDate.getHours(),  
    oMin = oDate.getMinutes(),  
    oSen = oDate.getSeconds(),  
    oTime = oYear +'-'+ formatNumber(oMonth) +'-'+ formatNumber(oDay) +' '+ formatNumber(oHour) +':'+ formatNumber(oMin) +':'+formatNumber(oSen)//最后拼接时间  
    return oTime
  }

//时间戳格式化（年月日）
  export function timestampToFormatTimeS(str){  
    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    var oDate = new Date(str),  
    oYear = oDate.getFullYear(),  
    oMonth = oDate.getMonth()+1,  
    oDay = oDate.getDate(),  
    oHour = oDate.getHours(),  
    oMin = oDate.getMinutes(),  
    oSen = oDate.getSeconds(),  
    oTime = oYear +'-'+ formatNumber(oMonth) +'-'+ formatNumber(oDay)//最后拼接时间  
    return oTime
  }

//时间戳加一天
  export function timestampToNextDay(DATE){ 
    var NewDate= new Date(DATE);
    NewDate = +NewDate + 1000*60*60*24;
    NewDate = new Date(NewDate);
    return NewDate
  }

//根据身份证获取出生日期
  export function autoBirthday(CARDID){
      var birthday=getBirthday();
      switch(birthday){
        case 0:
        return '不能为空';
        break;
        case 1:
        return '格式不对';
        break;
        default: 
        return birthday;
      }  
    function getBirthday(){
      var a=CARDID;
      if(15==a.length || 18==a.length){
        var left=a.length-12;
        var right=a.length-4;
        var b=a.slice(left,right);
        if(8==b.length){
          return b;
        }
        else return 0;
      }else{
        return 1;
      }
    }
  }      
  
// function getzf(num){  
//             if(parseInt(num) < 10){  
//                 num = '0'+num;  
//             }  
//             return num;  
//         }  

