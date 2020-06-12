
function fFixDate(DtStr) {
    if (DtStr==null)
    {
      return DtStr;
    }
    else
    {
      var DtNd=DtStr.split('T')[0];
      if (DtStr.split('T')[1].split(':')[0]!="00"){
          var d=new Date(DtNd);
          d.setDate(d.getDate() +1);
          DtNd=d.toISOString().split('T')[0];
      }
      return DtNd;   // The function returns the product of p1 and p2
    }
   
  }
 
module.exports.FixDate=fFixDate;