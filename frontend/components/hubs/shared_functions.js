const months = {'01': "Jan", '02': "Feb", '03': "Mar", '04': "Apr", '05': "May", '06': "Jun", '07': "Jul", '08': "Aug", '09': "Sep", '10': "Oct", '11': "Nov", '12': "Dec"}


export function convertToDisplayableDate(string){
	//2017-06-19T17:00:51.000Z to 
	//0123456789
	
	let digitsToRollbackOnTimeChange = string.slice(11,13);
	//get the number of minutes the user is away from GMT
	let offset = new Date().getTimezoneOffset();
	//divide minutes offset by 60 to get hours
	let offsetHours = offset/60;
	let newHours = "";
	let time = string.slice(11,16);
	let year = string.slice(0,4);
	let day = string.slice(8,10);
	let month = string.slice(5,7);
	let namedMonth = months[month];
	
	if(offsetHours > parseInt(digitsToRollbackOnTimeChange)){
		//if offsetHours causes the date to rollback a day, need to account for it.
		newHours += ((parseInt(digitsToRollbackOnTimeChange) + 24) - offsetHours);
		//consider if offset rolls day back
		//consider if offset rolls day back which rolls months back
		//consider if offset rolls day back which rolls months back which rolls year back
	} else {
		newHours += (parseInt(digitsToRollbackOnTimeChange) - offsetHours);
	}
	let amOrPm = (newHours >= 12) ? "pm" : "am";
	let displayTime = "" + time + amOrPm;
	
	return "" + namedMonth + " " + day + ", " + year + " " + displayTime;
}