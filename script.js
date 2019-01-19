// ***** Get data from database
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

// Consider username/password
var UserData = [
	[0, "Jane Doe", ["123", "234", "345", "456", "567"], ["Sports"], "quiet cafe"],
	[1, "Morino Aslan", ["234", "345", "456", "567", "912"], ["Music", "Sports"], "library"],
	[2, "Anna Dragon", ["123", "234", "345", "456", "567"], ["Music", "Reading", "Iron-Man"], "well lit room"],
	[2, "Fireheart", ["123", "234", "345", "567"], ["Music", "Reading", "Iron-Man"], "well lit room"],
	[2, "Zelna", ["123", "234", "102", "456", "321"], ["Bikes"], "well lit room"],
	[2, "hungry", ["123", "234", "321", "912"], ["Music"], "well lit room"], 
	[2, "asda", ["123", "234", "321", "912"], ["Music"], "well lit room"], 
	[2, "221sf", ["123", "234", "321", "912"], ["Music"], "well lit room"], 
];

var index = 0;

async function findPeople(userId) {
	willGetAllUsers.then(function (allUsers) {

		console.log(allUsers);
	});

	let people = [];
	let container = document.querySelector("#swipe");
	for (let i = 0; i < UserData.length; i ++) {
		// Adds everyone but the user to the list
		if (userId !== UserData[i][0]) {
			people.push(new Person(UserData[i][0], UserData[i][1], UserData[i][2], UserData[i][3], UserData[i][4]));	
			// people.push(new Person(UserData[i].name, UserData[i].))
		}
	}

	similarity(["Music"], ["123", "234", "912"]);
	
	container.appendChild(people[0].element);

	return people;
}

function similarity (userHobbies, userCourses) {
	let temp = [];
	for (let i = 0; i < UserData.length; i ++) {
		let count = 0; //finds number matches
		let randHobbies = UserData[i][3]; //user from databases hobbies
		//*****add rand course var
		let randCourses = UserData[i][2];
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
				placeHolder = UserData[i];
				UserData[i] = UserData[j];
				UserData[j] = placeHolder;
			}

		}
		
		
	}
	console.log(temp);
	console.log(UserData);

}


let origin = [null,null]; //represents original position
let change = [0,0]; //represents the new position
let translate = [0,0];
let dragging = false;


// Drags
function dragStart(event) {
  
  origin[0] = event.clientX; // initial positions, ensures it will reset with movement
  origin[1] = event.clientY;
  console.log("X "+origin[0]);
  console.log("Y "+origin[1]);
  
  dragging = true; // starting to drag
  event.currentTarget.setPointerCapture(event.pointerId);
}

function dragMove(event) {
  if (!dragging) {
    return;
  }
  translate[0] = change[0] + event.clientX - origin[0]; // How much to move
  translate[1] = change[1] + event.clientY - origin[1]; // How much to move
  event.currentTarget.style.transform = 'translate(' +  translate[0] + 'px,' +  translate[1] + 'px) ' ; // translates
  let rotateAngle = 0.2*(event.clientX - origin[0]);
  event.currentTarget.style.transform += 'rotate(' + rotateAngle + 'deg)'; //rotates 
  
}

function dragEnd(event) {
	dragging = false; // end of drag
	if (event.clientX - origin[0] > 150||event.clientX - origin[0] < -150){
		index ++;
		// swipe right
		if (event.clientX - origin[0] > 150){
			// ***** Change database to mark a match
		// Swipe left
		} else if (event.clientX - origin[0] < -150) {
		  	// ***** Change database to mark a match
		}

		// Changes person
		if (index > app.people.length-1) {
			let container = document.querySelector("#swipe");
			container.innerHTML = "<h1>No more potential buddies! Please check again later :)</h1>";
			//**** Reload from database, reset index
		} else {
			let container = document.querySelector("#swipe");
			container.innerHTML = "";
			container.appendChild(app.people[index].element);	
		}
		
	} else {				
  	  event.target.style.transform = '';
    }
  
}

function show (element) {
	element.classList.remove("inactive");
}

function hide (element) {
	element.classList.add("inactive");
}

