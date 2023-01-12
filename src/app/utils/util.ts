export const getDateString= (date:any)=>{
  var year = date.value.getFullYear();
        var month = date.value.getMonth()+1;
        var day = date.value.getDate();
        if(month>=1&&month<=9){
          month="0"+month;
        }
        if(day>=1&&day<=9){
          day="0"+day;
        }
  return year+'-'+month+'-'+day
}

