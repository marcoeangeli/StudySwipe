// Get data from database

var UserData = [
	["Jane Doe", ["123", "234", "345", "456", "567"], ["Sports"], "quiet cafe"],
	["Morino Aslan", ["234", "345", "456", "567", "912"], ["Music", "Sports"], "library"],
	["Anna Dragon", ["123", "234", "345", "456", "567"], ["Music", "Reading", "Iron-Man"], "well lit room"],
];

function findPeople() {
	let users = [];
	for (let i = 0; i < UserData.length; i ++) {
		users.push(new Person(UserData[i][0], UserData[i][1], UserData[i][2], UserData[i][3]));
	}
	console.log(users);
	return users;
}

let app = new App();

