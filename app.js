class App {
	constructor (user) {
		this.user = user;
		this.people = findPeople();
		const swipe = new SwipeScreen(document.querySelector("#swipe"), this.people);
		const message = new MessageScreen(document.querySelector("#message"));
		const setting = new SettingScreen(document.querySelector("#setting"));
	}

}