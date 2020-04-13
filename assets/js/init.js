const numberOfForms = 12;

let inputForms = [];

let initiatives = [];


let initiativeTracker = 0;

function init() {
	generateInputForms();

	preFillInputForms();

	hide("tracker");
};

function generateInputForms() {
	
	let inputContainer = document.getElementById("input");
	
	for (let i = 0; i < numberOfForms; i++) {
		let name = "name" + i;
		let row = document.createElement("DIV");
		row.class = "row";

		let columnLarge = document.createElement("DIV");
		columnLarge.class = "col-sm-8";

		let inputName = document.createElement("INPUT");
		inputName.type = "text";
		inputName.class = "form-control";
		inputName.id = name;

		columnLarge.appendChild(inputName);
		row.appendChild(columnLarge);

		let columnSmall = document.createElement("DIV");
		columnSmall.class = "col-sm-4";
		
		let inputInit = document.createElement("INPUT");
		inputInit.type = "number";
		inputInit.class = "form-control";
		inputInit.id = "number" + i;

		columnSmall.appendChild(inputInit);
		row.appendChild(columnSmall);

		inputContainer.appendChild(row);

		inputForms[i] = document.getElementById(name);
	};
};

function preFillInputForms() {
	for (let i = 0; i < players.length; i++) {
		inputForms[i].value = players[i];
	};
};

function trackInitative() {
	sortInitiatives();

	displayNextInitiative();

	hide("input");
	hide("fightButton");
	display("tracker");
};

function sortInitiatives() {
	getUnsortedInitiatives();

	initiatives.sort(function(a,b) {
		return b.id-a.id;
	})
};

function getUnsortedInitiatives() {
	for (let i = 0; i < inputForms.length; i++) {
		let initiativeNumberId = "number" + i;
		if (document.getElementById(initiativeNumberId).value !== "") {
			initiatives[i] = 
				{"id": document.getElementById(initiativeNumberId).value,
			 	"name": inputForms[i].value,
				};
		};
	};
};

function displayNextInitiative() {
	//if current is empty, set it to the first one
	if (document.getElementById("currentname").innerHTML === "") {
		document.getElementById("currentname").innerHTML = initiatives[0].name;
		document.getElementById("currentinit").innerHTML = "(" + initiatives[0].id + ")";

		document.getElementById("ondeckname").innerHTML = initiatives[1].name;
		document.getElementById("ondeckinit").innerHTML = "(" + initiatives[1].id + ")";
	} else {
		initiativeTracker++;
		if (isEndOfInitiative(initiativeTracker)) {
			initiativeTracker = 0;
		};
		document.getElementById("currentname").innerHTML = initiatives[initiativeTracker].name;
		document.getElementById("currentinit").innerHTML = "(" + initiatives[initiativeTracker].id + ")";
	
		let onDeckIndex = initiativeTracker+1;
		if (isEndOfInitiative(onDeckIndex)) {
			onDeckIndex = 0;
		};
		document.getElementById("ondeckname").innerHTML = initiatives[onDeckIndex].name;
		document.getElementById("ondeckinit").innerHTML = "(" + initiatives[onDeckIndex].id + ")";
	};
};

function isEndOfInitiative(index) {
	return index >= initiatives.length;
};
