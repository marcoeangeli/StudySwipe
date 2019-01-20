class Person {
	
	constructor (idNum, moniker, courses, hobbies, environment) {
		this.idNum = idNum;
		this.moniker = moniker;
		this.courses = courses;
		this.hobbies = hobbies;
		this.environment = environment;

		this.element = this.createPersonDOM(moniker, courses, hobbies, environment);
	}	

	// For the HTML element
	createPersonDOM (moniker, courses, hobbies, environment) {
		let personContainer = document.createElement("div");
		
		let nameContainer = document.createElement("div");
		nameContainer.id = "profileName";
		nameContainer.textContent = moniker;
		nameContainer.style.marginBottom = "7%";
		
		let classesContainer = document.createElement("div");
		classesContainer.classList.add("swipeClasses");
		classesContainer.innerHTML = "<strong>Courses:</strong>";
		console.log(courses);
		if (courses.length < 2) {
			classesContainer.textContent +=  courses;	
		} else {
			for(let i = 0; i < courses.length;i ++) {
				let tempContainer = document.createElement("div");
				if (courses[i+1] !== undefined) {
					tempContainer.textContent = courses[i] + "   " + courses[i+1];
				} else {
					tempContainer.textContent = courses[i];
				}
				i ++;
				classesContainer.appendChild(tempContainer);
			}
		}
		
		
		let hobbiesContainer = document.createElement("div");
		hobbiesContainer.classList.add("swipeClasses");
		hobbiesContainer.innerHTML = "<strong>Hobbies:</strong>";

		if (hobbies.length < 2) {
			hobbiesContainer.innerHTML +=  hobbies;	
		} else {
			for(let i = 0; i < hobbies.length;i ++) {
				let tempContainer = document.createElement("div");
				if (hobbies[i+1] !== undefined) {
					tempContainer.innerHTML = hobbies[i] + "   " + hobbies[i+1];
				} else {
					tempContainer.innerHTML = hobbies[i];
				}
				i ++;
				hobbiesContainer.appendChild(tempContainer);
			}
		}

		let environmentContainer = document.createElement("div");
		environmentContainer.classList.add("swipeClasses");
		environmentContainer.innerHTML = "<strong>Environment: </strong>" + environment;
		personContainer.id = "swipeCard";
		personContainer.appendChild(nameContainer);
		personContainer.appendChild(classesContainer);
		personContainer.appendChild(hobbiesContainer);
		personContainer.appendChild(environmentContainer);
		personContainer.addEventListener('pointerdown', dragStart);
    	personContainer.addEventListener('pointermove', dragMove);
    	personContainer.addEventListener('pointerup', dragEnd);
    	return personContainer;
	}


 }