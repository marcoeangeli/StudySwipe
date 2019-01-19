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
		
		let classesContainer = document.createElement("div");
		classesContainer.classList.add("swipeClasses");
		classesContainer.textContent = "Courses: " + courses;
		
		let hobbiesContainer = document.createElement("div");
		hobbiesContainer.classList.add("swipeClasses");
		hobbiesContainer.textContent = "Hobbies: " + hobbies;

		let environmentContainer = document.createElement("div");
		environmentContainer.classList.add("swipeClasses");
		environmentContainer.textContent = "Environment: " + environment;

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