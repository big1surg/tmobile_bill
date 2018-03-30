function onEdit() {
 var s = SpreadsheetApp.getActiveSheet();
 if( s.getName() == "Sheet1") { //checks that we're on the correct sheet
   //sendDueDateNotification();
   var val1 = SpreadsheetApp.getActiveSheet().getRange('H11').getValue();
   var sendE =  SpreadsheetApp.getActiveSheet().getRange('B23').getValue();
   var sendPersonal = SpreadsheetApp.getActiveSheet().getRange('B24').getValue();
      var timeStamp = new Date();
   timeStamp.setDate(timeStamp.getDate());
   if(val1 == 5) { //checks the column
     //var nextCell = r.offset(0, 5);
     //if( nextCell.getValue() === '' ) //is empty?
     //var time = new Date();
     //time = Utilities.formatDate(time, "PST", "MMM/d/yyyy");
     //nextCell.setValue(time);
     changeStatus();
   };
   if(sendE == 1){
     sendDueDateNotification();
      SpreadsheetApp.getActiveSheet().getRange('B23').setValue(0);
        SpreadsheetApp.getActiveSheet().getRange('C23').setValue(timeStamp);
   };
   if(sendPersonal == 1){
     sendPersonalAmountEmail();
         SpreadsheetApp.getActiveSheet().getRange('B24').setValue(0);
     SpreadsheetApp.getActiveSheet().getRange('C24').setValue(timeStamp);
   };
 }
}



function changeStatus() {
  var nameOfMonth=['JAN','FEB',',MARCH','APRIL','MAY','JUNE','JULY','AUG','SEPT','OCT','NOV','DEC'];
  var month =  SpreadsheetApp.getActiveSheet().getRange('A1').getValue();
  var count = 0;
  for(var k=0; k<12; k++){
    if(nameOfMonth[k] === month){
      count = k;
    }
  }
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var val1 = SpreadsheetApp.getActiveSheet().getRange('H3:H10').getValue();
  var cellArr = ['H3','H4','H5','H6','H7','H8','H9','H10'];
  if(val1==1 && val2==1 && val3==1 && val4==1 && val5==1 && val6==1 && val7==1 && val8==1){
    for(var i=0; i<5; i++){
      sendEmails(month);
      SpreadsheetApp.getActiveSheet().getRange(cellArr[i]).setValue(0);
      SpreadsheetApp.getActiveSheet().getRange('A1').setValue(nameOfMonth[count+1]);
      SpreadsheetApp.getActiveSheet().getRange('G1').setValue(currentDate);
      SpreadsheetApp.getActiveSheet().getRange('C1').setValue(0);
      
    }
  }
     
} //end changeStatus function

function sendEmails(month) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var val1 = SpreadsheetApp.getActiveSheet().getRange('H8').getValue();
  var emailAddrs = [];
  if(val1==5) {
    //for(var i=0; i<emailAddrs.length; i++){
      var emailAddress = emailAddrs[0];  // First column
      var message =   month.concat(' is paid! This is automated. Thank you.') ;    // Second column
      var subject =   month.concat(' Tmobile Bill');
      MailApp.sendEmail(emailAddress, subject, message);
    //}
  }
}

/*function sendDueDateNotification() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getRange('G2').getValue();
  Logger.log(data)
  var row = data;
  var date = new Date();
  var sheetDate = new Date(row);
  Sdate=Utilities.formatDate(date,'UTC-0800','yyyy:MM:dd')
  SsheetDate=Utilities.formatDate(sheetDate,'UTC-0800', 'yyyy:MM:dd')
  Logger.log(Sdate+' =? '+SsheetDate)
  if (Sdate == SsheetDate){
    var emailAddress = '';  // First column
    var message = 'testing';       // Second column
    var subject = "Sending emails from a Spreadsheet";
   MailApp.sendEmail(emailAddress, subject, message);
   Logger.log('SENT :'+emailAddress+'  '+subject+'  '+message)
  }    
}*/

function sendDueDateNotification() {
   var dateDue = SpreadsheetApp.getActiveSheet().getRange('G1').getValue();
   var dateDueFormat = new Date(dateDue);
   var currentDate = new Date();
   //Sdate=Utilities.formatDate(dateDueFormat,'UTC-0800','yyyy:MM:dd')
   //SsheetDate=Utilities.formatDate(currentDate,'UTC-0800', 'yyyy:MM:dd')
   var dayDue = dateDueFormat.getDate();
   var currentDay = currentDate.getDate();
   var remainingTime = dayDue-currentDay;
   var rT = remainingTime.toString(); 
   var emailAddrs = [''];
   //var emailAddress = '';  // First column
   //var subject = rT.concat(' days remaining for bill.');
   //var htmlBody = "GOOGLE SHEETS:  TMOBILE: http://www.t-mobile.com"
   //MailApp.sendEmail(emailAddress, subject, htmlBody);
   //Logger.log('SENT :'+emailAddress+'  '+subject+'  '+message)
   for(var i=0; i<emailAddrs.length; i++){
      var emailAddress = emailAddrs[i];  // First column
      var subject = rT.concat(' days for bill. ');
     var htmlBody = "This is automated"
          //"GOOGLE SHEETS: TMOBILE: http://www.t-mobile.com"
      MailApp.sendEmail(emailAddress, subject, htmlBody);
   }
      
}

function sendPersonalAmountEmail(){
   var dateDue = SpreadsheetApp.getActiveSheet().getRange('G1').getValue();
   var dateDueFormat = new Date(dateDue);
   var currentDate = new Date();
   var dayDue = dateDueFormat.getDate();
   var currentDay = currentDate.getDate();
   var remainingTime = dayDue-currentDay;
   var rT = remainingTime.toString();
  var owe = SpreadsheetApp.getActiveSheet().getRange('I3:I10').getValue();
  var personVal = [];
  var emailAddrs = [];
  var peopleWhoOwe = [];
  var peopleWhoOweEmail = [];
  var count=0;
  
  for(var i=0; i<personVal.length; i++){
      peopleWhoOwe[count] = personVal[i];
      peopleWhoOweEmail[count] = emailAddrs[i];
      count++;
  }
  
  for(var i=0; i<peopleWhoOwe.length; i++){
    var stringOwe = peopleWhoOwe[i].toString();
    var emailAddress = peopleWhoOweEmail[i];
    var subject = stringOwe.concat(' is what you owe,for Tmobile in ');
    var htmlBody = rT.concat(' days');
    MailApp.sendEmail(emailAddress, subject, htmlBody);
    //SpreadsheetApp.getActiveSheet().getRange('B21').setValue(0);
  }
  
}

