var database = (function() {
	
	people = [];



	var index = 1;

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
			this.allUsers = all;
			
				for (let i = 0; i < this.allUsers.length; i ++) {
					// Adds everyone but the user to the list
					people.push(new Person(this.allUsers[i][0], this.allUsers[i][1], this.allUsers[i][2], this.allUsers[i][3], this.allUsers[i][4]));	
				}
			console.log(people);
			let container = document.querySelector("#swipe");
			container.appendChild(people[0].element);
		
		});

	}

	switchSwipe = function () {
		let container = document.querySelector("#swipe");
		container.innerHTML="";
		container.appendChild(people[database.index].element);
		console.log(people);
		console.log("index: " + index);
	}

	function findPeopleField (userId, fieldWanted) {
		let ind = 0;
		for (let i = 0; i < database.people.length; i ++) {
			if (userId === database.people[i].userId) {
				ind = i;
			}
		}
		return database.people[ind][fieldWanted];
	}

	findPeople();
	return {
		people: people,
		index: index,
		switchSwipe: switchSwipe,
		findPeopleField: findPeopleField
	}; 
}).call(this)