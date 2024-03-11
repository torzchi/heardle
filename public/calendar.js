

function getFirstMonths()
{
    let yearInput = document.getElementById("an").value;
    let year = parseInt(yearInput);
    console.log(year)

    var months = ['January', 'February', 'March'];
    var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    var calendarHTML = "";
  
    for (var i = 0; i < 3; i++) {
      var monthName = months[i];
      var daysInMonth = new Date(year, i + 1, 0).getDate();
      var firstDay = new Date(year, i, 1).getDay();
  
      calendarHTML += "<h2>" + monthName + " " + year + "</h2>";
      calendarHTML += "<table>";
      calendarHTML += "<tr>";
      for (var dow = 0; dow < daysOfWeek.length; dow++) {
        calendarHTML += "<th>" + daysOfWeek[dow] + "</th>";
      }
      calendarHTML += "</tr>";
  
      var day = 1;
      var firstWeekDay = (firstDay + 6) % 7; 
      for (var j = 0; j < 6; j++) {
        calendarHTML += "<tr>";
        for (var k = 0; k < 7; k++) {
          if ((j === 0 && k < firstWeekDay) || day > daysInMonth) {
            calendarHTML += "<td></td>";
          } else {
            calendarHTML += "<td>" + day + "</td>";
            day++;
          }
        }
        calendarHTML += "</tr>";
        if (day > daysInMonth) break;
      }
  
      calendarHTML += "</table>";
    }
  
    document.getElementById("output").innerHTML = calendarHTML;
  }