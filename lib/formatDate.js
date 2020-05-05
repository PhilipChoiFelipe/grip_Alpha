//format date for user's reflection.

const formatDate = (finishedDate) => {
	let year = finishedDate.getFullYear();
	let month = finishedDate.getMonth() + 1;
	let day = finishedDate.getDate();
	if(month < 10){
		month = '0' + month; 
	}
	if(day < 10){
		day = '0' + day;
	}
	return `${year}-${month}-${day}`;
	
}

module.exports = formatDate;