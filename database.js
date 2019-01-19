var people = [];


var index = 0;
var willGetAllUsers = new Promise(
    function (resolve, reject) {
        firebase.database().ref('/users').once('value').then(function(snapshot) {
			let usersArray = [];

			let allUsers = snapshot.val();

			for (i in snapshot.val()) {
				usersArray.push([i, allUsers[i].name, allUsers[i].courses, allUsers[i].hobbies, allUsers[i].enviroment]);
			}

			resolve(usersArray);

		});
    }
);

function findPeople () {
	let allUsers = [];
	willGetAllUsers.then(function (all) {
		allUsers = all;
		console.log(allUsers);
	
	
	let container = document.querySelector("#swipe");
	this.allUsers = similarity(["Music"], ["123", "234", "912"], allUsers);
	for (let i = 0; i < this.allUsers.length; i ++) {
		// Adds everyone but the user to the list
		
		people.push(new Person(this.allUsers[i][0], this.allUsers[i][1], this.allUsers[i][2], this.allUsers[i][3], this.allUsers[i][4]));	
			
	
	}

	// ***** Get info from id
	console.log(people);
	

	// allUsers = similarity(["Music"], ["123", "234", "912"], people);
	container.appendChild(people[0].element);
	
	// resolve(people);
	
	});

}

function similarity (userHobbies, userCourses, allUsers) {
	let temp = [];
	for (let i = 0; i < allUsers.length; i ++) {
		let count = 0; //finds number matches
		let randHobbies = allUsers[i][3]; //user from databases hobbies
		let randCourses = allUsers[i][2];
		randHobbies.sort(); // alphabeticize can also do it numeric
		randCourses.sort();
		//*****add ignore case
		let j = 0;
		let k = 0;
		while (j < randHobbies.length && k < userHobbies.length) {
			if (randHobbies[j] === userHobbies[k]) {
				count +=1;
				j ++;
				k ++;
			} else if (randHobbies[j] > userHobbies[k]) {
				k ++;
			} else {
				j ++;
			}
		}
		// Finds matches
		j = 0;
		k = 0;
		while (j < randCourses.length && k < userCourses.length) {
			if (randCourses[j] === userCourses[k]) {
				count +=1;
				j ++;
				k ++;
			} else if (randCourses[j] > userCourses[k]) {
				k ++;
			} else {
				j ++;
			}
		}
		temp.push(count); // adds sorted hobbies with number matches to temp array

	}
	console.log(temp);
	// Reorders
	for (let i = 0; i < temp.length-1; i ++) {

		for (let j = i+1; j < temp.length; j ++) {

			if (temp[i] < temp[j]) {
				let placeHolder = temp[i];
				temp[i] = temp[j];
				temp[j] = placeHolder;
				placeHolder = allUsers[i];
				allUsers[i] = allUsers[j];
				allUsers[j] = placeHolder;
			}

		}
		
		
	}
	console.log(temp);
	console.log(allUsers);
	return allUsers;

}


findPeople();
console.log(people);