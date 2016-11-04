export function startTime() {
    let today = new Date();
    let h = today.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    let m = today.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    let time = h + ":" + m;
    return time
}

export function getMonthStartAsStamp(monthInput, yearInput) {
    let month = Number(monthInput);

    if (month <= 9) {
        month = '0' + month;
    }
    let date = '01/' + month + '/' + yearInput;

    let stamp = this.stampDate(date);

    return stamp;
}

export function getNextMonthAsStamp(monthInput, yearInput){
  let month = Number(monthInput) + 1;
  let year = yearInput

  if(month == 12){
    month = 1;
    year = (Number(year) + 1);
  }
  if (month <= 9) {
      month = '0' + month;
  }

  let date = '01/' + month + '/' + year;

  let stamp = this.stampDate(date);

  return stamp;
}

export function getYearStartAsStamp(yearInput){
  let date = '01/01/' + yearInput;
  let stamp = this.stampDate(date);

  return stamp;
}
export function getNextYearAsStamp(yearInput){
  let date = '01/01/' + (Number(yearInput) + 1);
  let stamp = this.stampDate(date);
  return stamp;
}
export function startDate(timeStamp) {
    var today = new Date();

    if (timeStamp) {
        today = new Date(Number(timeStamp));
    }
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + "/" + mm + "/" + yyyy;
    return today;
}

export function stampDate(date) {
    if (date) {
        if (date.length == 10) {
            date = date.split('/');
            let newDate = date[1] + "," + date[0] + "," + date[2];
            let today = new Date(newDate).getTime();
            return today;
        } else {
            return date;
        }
    } else {
        let today = new Date().getTime();
        return today
    }
}

export function isValidTime(time) {
    let nTime = this.getTimeAsNum(time);
    if (nTime[0] >= 24 || nTime[1] >= 60) {
        return false;
    }
    return true;
}

export function isValidDate(date) {
    if (date.length <= 0) {
        return false;
    }
    let valid = true;
    date = date.split('/');

    let day = Number(date[0]);
    let month = Number(date[1]);
    let year = Number(date[2]);
    if ((month < 1) || (month > 12))
        valid = false;
    else if ((day < 1) || (day > 31))
        valid = false;
    else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30))
        valid = false;
    else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29))
        valid = false;
    else if ((month == 2) && ((year % 100) == 0) && (day > 29))
        valid = false;
    else if ((month == 2) && (day > 28))
        valid = false;
    else if (isNaN(day) && isNaN(month) && isNaN(year))
        valid = false;
    if (valid == false) {
        return false;
    }
    return true;
}

export function getTimeAsNum(time) {
    let numTime = time.split(':');
    numTime[0] = Number(numTime[0]);
    numTime[1] = Number(numTime[1]);
    return numTime;
}

export function getTimeDifference(endTime, startTime) {
    if (endTime == undefined) {
        return '--:--';
    }

    let end_time = this.getTimeAsNum(endTime);
    let start_time = this.getTimeAsNum(startTime);
    if (!isNaN(start_time[0]) && !isNaN(start_time[1]) && !isNaN(end_time[0]) && !isNaN(end_time[1])) {
        if (end_time[0] <= start_time[0]) {
            end_time[0] = end_time[0] + 24;
        }
        if (end_time[1] < start_time[1]) {
            end_time[1] = end_time[1] + 60;

            if (end_time[0] != 0) {
                end_time[0] = end_time[0] - 1;
            }
        }
        let hoursDif = end_time[0] - start_time[0];

        if ((hoursDif == 24) && (end_time[1] >= start_time[1]))
            hoursDif = 0;
        if ((hoursDif == 0) && (end_time[1] < start_time[1]))
            hoursDif = 23;

        let minsDif = end_time[1] - start_time[1];
        let timeD = (hoursDif < 10
            ? '0' + hoursDif
            : hoursDif) + ':' + (minsDif < 10
            ? '0' + minsDif
            : minsDif);

        return timeD;

    }

}
