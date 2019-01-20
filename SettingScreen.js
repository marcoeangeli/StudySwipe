class SettingScreen {
	constructor (container) {
		this.container = container;
		this.classList = this.container.classList;
		
	}

	buttonClick(event) {
		// FInds out what the change is to be done
		let howChange = document.querySelector("select").value;

		// Finds out waht needs to be changed
		let fieldChange = document.querySelectorAll("select")[1].value;
		
		let propertyName = document.querySelector("#changeVal").value;

		console.log(howChange + " " + fieldChange + " " + propertyName);
	}

}