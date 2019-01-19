// ***** Get data from database

// Consider username/password
var UserData = [
	[0, "Jane Doe", ["123", "234", "345", "456", "567"], ["Sports"], "quiet cafe"],
	[1, "Morino Aslan", ["234", "345", "456", "567", "912"], ["Music", "Sports"], "library"],
	[2, "Anna Dragon", ["123", "234", "345", "456", "567"], ["Music", "Reading", "Iron-Man"], "well lit room"],
];

var index = 0;

function findPeople() {
	let users = [];
	let container = document.querySelector("#swipe");
	for (let i = 0; i < UserData.length; i ++) {
		users.push(new Person(UserData[i][0], UserData[i][1], UserData[i][2], UserData[i][3], UserData[i][4]));
	}

	// Sort by hobbies
	// Sort by classes

	container.appendChild(users[0].element);

	console.log(users);
	return users;
}

let origin = [null,null]; //represents original position
let change = [0,0]; //represents the new position
let translate = [0,0];
let dragging = false;


// Drags
function dragStart(event) {
  
  origin[0] = event.clientX; // initial positions, ensures it will reset with movement
  origin[1] = event.clientY;
  console.log("X "+origin[0]);
  console.log("Y "+origin[1]);
  
  dragging = true; // starting to drag
  event.currentTarget.setPointerCapture(event.pointerId);
}

function dragMove(event) {
  if (!dragging) {
    return;
  }
  translate[0] = change[0] + event.clientX - origin[0]; // How much to move
  translate[1] = change[1] + event.clientY - origin[1]; // How much to move
  event.currentTarget.style.transform = 'translate(' +  translate[0] + 'px,' +  translate[1] + 'px) ' ; // translates
  let rotateAngle = 0.2*(event.clientX - origin[0]);
  event.currentTarget.style.transform += 'rotate(' + rotateAngle + 'deg)'; //rotates 
  
}

function dragEnd(event) {
	dragging = false; // end of drag
	if (event.clientX - origin[0] > 150||event.clientX - origin[0] < -150){
		index ++;
		// swipe right
		if (event.clientX - origin[0] > 150){
			// ***** Change database to mark a match
		// Swipe left
		} else if (event.clientX - origin[0] < -150) {
		  	// ***** Change database to mark a match
		}

		// Changes person
		if (index > app.people.length-1) {
			let container = document.querySelector("#swipe");
			container.innerHTML = "<h1>No more potential buddies! Please check again later :)</h1>";
			//**** Reload from database, reset index
		} else {
			let container = document.querySelector("#swipe");
			container.innerHTML = "";
			container.appendChild(app.people[index].element);	
		}
		
	} else {				
  	  event.target.style.transform = '';
    }
  
}

function show (element) {
	element.classList.remove("inactive");
}

function hide (element) {
	element.classList.add("inactive");
}

