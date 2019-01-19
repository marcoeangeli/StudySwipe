class App {
	constructor (userId) {
		this.useId = userId;
		this.people = findPeople();
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

		document.querySelector("#signUp").classList.add("inactive");

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

}