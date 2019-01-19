class Person {
	
	constructor (container, idNum, moniker, courses, hobbies, environment) {
		this.idNum = idNum;
		this.moniker = moniker;
		this.courses = courses;
		this.hobbies = hobbies;
		this.environment = environment;

		this.container = container;
		this.element = this.createPersonDOM(moniker, courses, hobbies, environment);
	}

	// For the HTML element
	createPersonDOM (moniker, courses, hobbies, environment) {
		let personContainer = document.createElement("div");
		personContainer.style.backgroundColour = "#d0e6df";
		personContainer.style.height = "200px";
		personContainer.style.width = "200px";
		personContainer.innerHTML = "Name: " + moniker + "<br>Courses: " + courses + "<br> Hobbies: " + hobbies + "<br>Environment: " + environment;
		personContainer.addEventListener('pointerdown', dragStart);
    	personContainer.addEventListener('pointermove', dragMove);
    	personContainer.addEventListener('pointerup', dragEnd);
    	return personContainer;
	}
}