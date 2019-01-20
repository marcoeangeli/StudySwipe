class App {
	constructor (userId) {
		this.userId = userId;
		this.user = this.findUser(userId);
		this.swipe = new SwipeScreen(document.querySelector("#swipe"));
		this.message = new MessageScreen(document.querySelector("#message"));
		this.setting = new SettingScreen(document.querySelector("#setting"));
		
		this.swipeButt = document.querySelector("#swipeButt");
		this.messageButt = document.querySelector("#messageButt");
		this.settingButt = document.querySelector("#settingButt");

		this.clickSwipe = this.clickSwipe.bind(this);
		this.clickMess = this.clickMess.bind(this);
		this.clickSet = this.clickSet.bind(this);

		this.swipeButt.addEventListener("click", this.clickSwipe);
		this.messageButt.addEventListener("click", this.clickMess);
		this.settingButt.addEventListener("click", this.clickSet);

		this.sortPeople = this.sortPeople.bind(this);

		document.querySelector("#banner").classList.remove("inactive");
		document.querySelector("#swipe").classList.remove("inactive");
		document.querySelector("#signUp").classList.add("inactive");

		this.sortPeople();

	}

	clickSwipe(event) {
		console.log(this.swipeButt);
		if (this.swipe.classList.contains("inactive")) {
			this.swipe.classList.remove("inactive");	
		}
		if (!this.message.classList.contains("inactive")) {
			this.message.classList.add("inactive");
		}
		if (!this.setting.classList.contains("inactive")) {
			this.setting.classList.add("inactive");
		}
	}
	startChat(userId, otherId) {
		chat = new Chat(userId, otherId);
	}
	clickMess(event) {
		if (!this.swipe.classList.contains("inactive")) {
			this.swipe.classList.add("inactive");
		}
		if (this.message.classList.contains("inactive")) {
			this.message.classList.remove("inactive");	
		}
		if (!this.setting.classList.contains("inactive")) {
			this.setting.classList.add("inactive");
		}
		var userId = firebase.auth().currentUser.uid;

		return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

			var matched = snapshot.val().matched;
			var i;
			var container = document.querySelector('#convs');
	    	var TEST = '<div class="btn-group">\n';
	    	for (i = 0; i < matched.length; i++) {
					TEST = TEST + '<button onClick="chat = new Chat(\'' + userId + '\', \'' + matched[i] + '\')">' + matched[i] + '</button>' + '\n';
			}
			TEST = TEST + "</div>";
			console.log(TEST)
			container.innerHTML = TEST;
	    	});
		console.log(matched);

	}
	
	clickSet(event) {
		if (!this.swipe.classList.contains("inactive")) {
			this.swipe.classList.add("inactive");
		}
		if (!this.message.classList.contains("inactive")) {
			this.message.classList.add("inactive");
		}
		if (this.setting.classList.contains("inactive")) {
			this.setting.classList.remove("inactive");	
		}
	}

	findUser(userId) {
		for(let i = 0; i <database.people.length; i ++) {
			if (userId === database.people[i].idNum) {
				return database.people.splice(i, 1)[0];
			}
		}
	}

	sortPeople () {

		let tempPeople = [];
		let tempNum = [];

		// FInds all courses, changes map into array
		for (let person in database.people) {
			console.log(database.people[person]);

		// For every person in the base
		// for (let i = 0; i < database.people.length; i ++) {

			let count = 0; //finds number matches
			let randHobbies = database.people[person].hobbies; // finds and sorts hobbies/courses
			let randCourses = database.people[person].courses;
			randHobbies.sort(); // alphabeticize can also do it numeric
			randCourses.sort();
			this.user.hobbies.sort();
			
			let j = 0;
			let k = 0;
			// Finds matches hobbies
			while (j < randHobbies.length && k < this.user.hobbies.length) {
				if (randHobbies[j] === this.user.hobbies[k]) {
					count +=1;
					j ++;
					k ++;
				} else if (randHobbies[j] > this.user.hobbies[k]) {
					k ++;
				} else {
					j ++;
				}
			}
			// Finds matches courses
			j = 0;
			k = 0;
			while (j < randCourses.length && k < this.user.courses.length) {
				if (randCourses[j] === this.user.courses[k]) {
					count +=1;
					j ++;
					k ++;
				} else if (randCourses[j] > this.user.courses[k]) {
					k ++;
				} else {
					j ++;
				}
			}
			tempNum.push(count); // adds sorted hobbies with number matches to temp array
		// }
		}
		console.log(tempNum);

		// Reorders
		for (let i = 0; i < tempNum.length-1; i ++) {

			for (let j = i+1; j < tempNum.length; j ++) {

				if (tempNum[i] < tempNum[j]) {
					let placeHolder = tempNum[i];
					tempNum[i] = tempNum[j];
					tempNum[j] = placeHolder;
					placeHolder = database.people[i];
					database.people[i] = database.people[j];
					database.people[j] = placeHolder;
				}

			}
		}
		console.log(tempNum);		
		console.log(database.people);
	}
}