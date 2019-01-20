class SettingScreen {
	constructor (container) {
		this.container = container;
		this.classList = this.container.classList;

		document.querySelector("#updateButton").addEventListener('pointerdown', this.buttonClick);
		
	}

	async buttonClick() {
		console.log("came here");
		var email = document.getElementById('email').value;
	      var password = document.getElementById('setting-password').value;

	      var course1 = document.getElementById('setting-course1').value;
	      var course2 = document.getElementById('setting-course2').value;
	      var course3 = document.getElementById('setting-course3').value;
	      var course4 = document.getElementById('setting-course4').value;
	      var course5 = document.getElementById('setting-course5').value;

	      var hobby1 = document.getElementById('setting-hobby1').value;
	      var hobby2 = document.getElementById('setting-hobby2').value;
	      var hobby3 = document.getElementById('setting-hobby3').value;

	      var enviroment = document.getElementById('setting-enviroment').value;

	      let userId = app.userId;
	      firebase.database().ref('users/' + userId).set({name: "Edgar Drakula", courses: [course1, course2, course3, course4, course5], hobbies: [hobby1, hobby2, hobby3], enviroment: enviroment});
	      document.getElementById('setting-feedback').value = "success";
	}



}