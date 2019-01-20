class App {
	constructor (userId) {
		this.userId = userId;
		this.user = this.findUser(userId);
		this.swipe = new SwipeScreen(document.querySelector("#swipe"), this.people);
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

		people = this.sortPeople(this.userId);

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
			var container = document.querySelector('#message');
	    	var TEST = '<div class="btn-group">\n';
	    	for (i = 0; i < matched.length; i++) {
					TEST = TEST + '<button>' + matched[i] + '</button>' + '\n';
			}
			TEST = TEST + "</div>";
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
		for(let i = 0; i <people.length; i ++) {
			if (userId === people[i]) {
				return people.splice(i, 1);
			}
		}
	}

	sortPeople (peopleMap) {

		let tempPeople = [];
		let tempNum = [];

		// FInds all courses, changes map into array
		for (person in peopleMap) {
			tempPeople.push([person.idNum, person.moniker, person.courses, person.hobbies, person.enviroment, person.element])
		}

		// For every person in the base
		for (let i = 0; i < peopleMap.size(); i ++) {

			let count = 0; //finds number matches
			let randHobbies = tempPeople[i][3]; // finds and sorts hobbies/courses
			let randCourses = tempPeople[i][2];
			randHobbies.sort(); // alphabeticize can also do it numeric
			randCourses.sort();
			
			let j = 0;
			let k = 0;
			// Finds matches hobbies
			while (j < randHobbies.length && k < this.user[3].length) {
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
			// Finds matches courses
			j = 0;
			k = 0;
			while (j < randCourses.length && k < this.user[2].length) {
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
			tempNum.push(count); // adds sorted hobbies with number matches to temp array
		}
		console.log(tempNum);

		// Reorders
		for (let i = 0; i < temp.length-1; i ++) {

			for (let j = i+1; j < temp.length; j ++) {

				if (temp[i] < temp[j]) {
					let placeHolder = temp[i];
					temp[i] = temp[j];
					temp[j] = placeHolder;
					placeHolder = tempPeople[i];
					tempPeople[i] = tempPeople[j];
					tempPeople[j] = placeHolder;
				}

			}
		}
		console.log(tempNum);

	}


}