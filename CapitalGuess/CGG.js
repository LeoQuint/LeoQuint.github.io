	//country var
	var latPos;
	var lngPos;
	var country;
	var countryOf;
	var capital;
	var demonym;
	var countryArea;
	var countryRegion;
	var countryLang = [];
	
	//game settings
	var gLength;
	var isCapitals;
	var isSize;
	var isRegion;
	var isLanguages;
	var isInhabitants;
	
	//game variables
	var zoomFactor;
	var guessNo = 0;
	var playerPts = 0;
	var pts = 10;
	var prevCountries = [];
	var prevDone = false;
	var prevCorrect = [];
	var prevWrong = [];
	var cntCount;
	var guessNoTotal = 0;
	var gameOver = false;
	var isBonus = false;
	//references to html divs
	var newGameButton = document.getElementById("newGame");
	var playerScoreBox = document.getElementById("scoreBox");
	var guessBoxText = document.getElementById("guessBoxText");
	var flagPole = document.getElementById("flag");
	var winScreen = document.getElementById("winScreen");
	var guessBox = document.getElementById("guessBox");
	var mainMenu = document.getElementById("mainMenu");
	var playerInput = document.getElementById("playerInput");
	
	//map and JSON variables
	var jsonFile;
	var mapRef;
	var zoomLevel = 16;
	var data;
	//swtich const
	const EASY = "easy";
	const MEDIUM = "medium";
	const HARD = "hard";
	const HARDER = "harder";
	//bonus var
	var mBonusM = 1;
	var cBonusM = 1;
	var dBonusM = 1;
	//delay variable
	var enterLag = 0;
	var gameMap;
	//style for the new google map spawned.
	var gameMap = [{
		featureType: "administrative.country",
		elementType: "geometry.stroke",
		stylers: [{ color: "#ff0000" },
		{weight : 2.5}]},{
		featureType: "poi",
		elementType: "labels",
		stylers: [{ visibility: "off" }]},{
		featureType: "administrative.country",
		elementType: "labels.text",
		stylers: [{ visibility: "off" }]},{
		featureType: "road",
		elementType: "all",
		stylers: [{ visibility: "on" }]},{
		featureType: "water",
		elementType: "labels",
		stylers: [{ visibility: "on" }]},{
		featureType: "transit",
		elementType: "all",
		stylers: [{ visibility: "off" }]},{
		featureType: "administrative.locality",
		elementType: "labels",
		stylers: [{ visibility: "on" }]}];

	//center main menu and guess box/input
	winScreen.style.top = ($(window).height() / 2) - 400 + "px";   
	winScreen.style.left = ($(window).width() / 2) - 300 + "px"; 
	mainMenu.style.top = ($(window).height() / 2) - 200 + "px";   
	mainMenu.style.left = ($(window).width() / 2) - 325 + "px"; 
	guessBox.style.bottom = ($(window).height() / 4) - 200 + "px";   
	guessBox.style.left = ($(window).width() / 2) - 325 + "px"; 	
	
	//add the enter key to validate player input
	$("#playerInput").keyup(function(event){
    if((event.keyCode == 13) && (enterLag == 0)){
        $("#guessButton").click();
    }});	
	//starts all functions needed to run the game
	function launch(difficulty){
		setSettings();
		setMapOptions();
		ajax_get_json(difficulty);
		bonus(difficulty);
	
	}
	//set what clues will be displayed
	function setSettings(){
		isCapitals = (document.getElementById("ckCap").checked);
		if (!isCapitals){
			cBonusM += 0.1;
		}
		isInhabitants = (document.getElementById("ckInh").checked);
		if (!isInhabitants){
			cBonusM += 0.1;
		}
		isLanguages = (document.getElementById("ckLang").checked);
		if (!isLanguages){
			cBonusM += 0.1;
		}
		isSize = (document.getElementById("ckSize").checked);
		if (!isSize){
			cBonusM += 0.1;
		}
		isRegion = (document.getElementById("ckReg").checked);
		if (!isRegion){
			cBonusM += 0.1;
		}
		
		gameLength = document.getElementById("gLength");
		gLength = gameLength.options[gameLength.selectedIndex].value;
	}
	//set map layers/styles options
	function setMapOptions(){
		isR = (document.getElementById("ckRoads").checked);
		isW = (document.getElementById("ckWater").checked);
		isC = (document.getElementById("ckCities").checked);
		if(isR){
		gameMap[3].stylers[0].visibility = "on";
		}
		else{
		gameMap[3].stylers[0].visibility = "off";
		mBonusM += 0.1;
		}
		if(isW){
		gameMap[4].stylers[0].visibility = "on";
		}
		else{
		gameMap[4].stylers[0].visibility = "off";
		mBonusM += 0.1;
		}
		if(isC){
		gameMap[6].stylers[0].visibility = "on";
		}
		else{
		gameMap[6].stylers[0].visibility = "off";
		mBonusM += 0.1;
		}
	}	
	//function loads the json file base on choice of difficulty (4 choices)
	function ajax_get_json(difficulty){
		
	switch(difficulty){
		case EASY:
		jsonFile = "cgg50count.json";
		cntCount = 49.999999;
		break;
		case MEDIUM:
		jsonFile = "cgg100count.json";
		cntCount = 99.999999;
		break;
		case HARD:
		jsonFile = "cgg185count.json";
		cntCount = 184.999999;
		break;
		case HARDER:
		jsonFile = "cgg238count.json";
		cntCount = 237.999999;
		break;
	}
	var results = document.getElementById("results");
    var hr = new XMLHttpRequest();
    hr.open("GET", jsonFile, false);//asynchronous is false so we don't get undefined data at load
    hr.setRequestHeader("Content-type", "application/json", false);
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
			data = JSON.parse(hr.responseText);
	    }
    }
	playerScoreBox.style.visibility = "visible";
	guessBox.style.visibility = "visible";
	mainMenu.style.visibility = "hidden";
	playerInput.style.visibility = "visible";
	
	playerScoreBox.innerHTML = "Score:" + playerPts + "pts";	
    hr.send(null);

	initialize();
	$( "#playerInput" ).focus();
	}
	//starts the game or gets a new city for the player to guess.
	function initialize() {
		winScreen.style.visibility = "hidden";
		flagPole.style.visibility = "hidden";
		guessBox.style.visibility = "visible";
		guessBoxText.innerHTML = "CAN YOU GUESS THE COUNTRY WE ARE IN?";
		playerInput.style.visibility = "visible";
		
		rdmCity();
		var mapCenter = new google.maps.LatLng(latPos,lngPos);
		
		var mapOptions = 
			{
			  center: mapCenter,
			  mapTypeId: google.maps.MapTypeId.HYBRID,
			  zoom: 16,
			  disableDefaultUI: true,
			  disableDoubleClickZoom: true,
			  scrollwheel: false,
			  panControl: false,
			  zoomControl: false,
			  scaleControl: false,
			  draggable: false,
			  streetViewControl: false,
			  
			};
	
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		mapRef = map;
			
		mapRef.setOptions({styles: gameMap});
		
		/*var flagNameLayer = new google.maps.KmlLayer({
		url: "http://www.leoquintgames.com/flagsName.kml"
		,preserveViewport:true,clickable:false,suppressInfoWindows:true});
		flagNameLayer.setMap(map);*/
		
		

		
		enterLag = 0;
	}
	//log a new random country data from the JSON file.
	function rdmCity(){
		do{
		var i = Math.floor(Math.random() * cntCount);
			prevDone = false;
			for (k = 0; k < prevCountries.length; k++)
			{
				if (prevCountries[k] == i)
				{
					prevDone = true;
				}
			}
		}
		while (prevDone);
		//reset the true condition
		prevDone = false;
		//add the current country to the array of previously done
		prevCountries.push(i);
		console.log(i);
		
		latPos = data[i].latlng[0];
		lngPos = data[i].latlng[1];
		country = data[i].name.common;
		countryOf = data[i].name.official;
		demonym = data[i].demonym;
		city = data[i].capital;
		countryArea = data[i].area;
		countryRegion = data[i].region;
		//returns an array
		countryLang = data[i].languages;
		testArray = data[0].languages;
		results.innerHTML = "";
		clueResults();
	}
	//called every time player make a guess 
	function guesses(){
		enterLag = 1;
		input = playerInput.value;
		playerInput.value = "";
		
		//the country name is match against common and official spellings. Case is ignore.
		if ((input.toUpperCase() == country.toUpperCase()) || (input.toUpperCase() == countryOf.toUpperCase()))
		{	
			guessBox.style.opacity = 1.0;
			guessBoxText.innerHTML = "Yes nice one! That's worth " + pts + " points.";
			
			
			playerPts += pts;
			
			prevCorrect.push(country);
			// reset for next round
			zoomLevel = 16;
			guessNo = 0;
			pts = 10;
			setTimeout("tooManyGuess()", 2000);
		}
		else
		{
			wrongGuess();
		}
	}
	//called upon a wrong guess
	function wrongGuess(){
		guessBoxText.innerHTML = "Wrong guess... Check the clues on the left.";
			//switch loop for fail guess one to four.
			switch(guessNo){
				case 0:
					pts -= 3;
					guessNo++;
					flagPole.style.visibility = "visible";
					clueResults();
					setTimeout("zoom()", 1000);	
				break;
				
				case 1:	
					pts -= 5;
					guessNo++;
					clueResults();
					setTimeout("zoom()", 1000);	
				break;
				
				case 2:
					guessBox.style.opacity = 1.0;
					guessBoxText.innerHTML = "Sorry that's enough trying... it was " + country + ". I would of accepted also " + countryOf + ".";
					prevWrong.push(country);
					//reset for next round
					zoomLevel = 16;
					guessNo = 0;
					pts = 10;
					//reiniziatize function.
					setTimeout("tooManyGuess()", 5500);
				break;
			}	
		
	}
	//checks if too many countries have been guessed
	function tooManyGuess(){
		guessNoTotal++;
		playerScoreBox.innerHTML = "Score:" + "&nbsp" + playerPts + "pts"
		+ "<br>" + "Mark:" + "&nbsp" + Math.round(((playerPts/(guessNoTotal*10))*100)) + "%";
		
		if((guessNoTotal >= gLength) || (guessNoTotal >= Math.ceil(cntCount))){
			endOfGame();
		}
		else{
			guessBox.style.opacity = 0.7;
			initialize();
		}
	}
	//calculate the new zoom level after a wrong answer. Country size affects the output.
	function zoom(){
		if (countryArea < 10000){
			zoomFactor = 5;
		}
		else if (countryArea < 100000){
			zoomFactor = 5.5;
		}
		else if (countryArea < 1000000){
			zoomFactor = 5.725;
		}
		else {
			zoomFactor = 6;
		}
		
		zoomLevel -= zoomFactor;
		mapRef.setZoom(Math.round(zoomLevel));
		enterLag = 0;
	}
	//gives players clues
	function clueResults(){
		
		if(isCapitals || isInhabitants || isLanguages || isRegion || isSize){
		results.style.visibility = "visible";
		}
		switch(guessNo){
			case 0:
			if(isCapitals){
			results.innerHTML += "The Capital is :  " + city + "<br>";
			}
			
			break;
			case 1:
			if(isRegion){
				results.innerHTML += "This Country is located in : " +"<br>"+ countryRegion+"<br>";
			}
			
			if(isSize){
				results.innerHTML += "This country is :  " + countryArea + " KM&#xB2" +"<br>";
			}
			
			break;
			case 2:
			
			if(isInhabitants){
				results.innerHTML += "The inhabitants are called : " +"<br>"+ demonym+"<br>";
			}
			if(isLanguages){
				results.innerHTML += "The official language(s) are : " +"<br>";
				//adds all the languages
				j=0;
				while (typeof countryLang[j] != "undefined")
				{
					results.innerHTML += countryLang[j] + "  ";
					j++;
				}
			}
			break;
			
			
		}
			
		
		

	}
	//calculates bonuses
	function bonus(difficulty){
		
	switch(difficulty){
		case EASY:
		dBonusM = 1;
		break;
		case MEDIUM:
		dBonusM = 1.1;
		break;
		case HARD:
		dBonusM = 1.25;
		break;
		case HARDER:
		dBonusM = 1.5;
		break;
	
		
	}
	}
	//called for end of game condition
	function endOfGame(){
		enterLag = 1;
		gameOver = true;
		guessBox.style.visibility = "hidden";
		playerInput.style.visibility = "hidden";
		newGameButton.style.visibility = "visible";
		winScreen.style.visibility = "visible";
		results.style.visibility = "hidden";
		playerScoreBox.style.visibility = "hidden";
		var cDisp = document.getElementById("correct");
		var wDisp = document.getElementById("wrong");
		
		var dBonus = Math.round(playerPts*dBonusM)-playerPts;
		var mBonus = Math.round(playerPts*mBonusM)-playerPts;
		var cBonus = Math.round(playerPts*cBonusM)-playerPts;
		
		winScreenText.innerHTML = "";
		winScreenText.innerHTML += "Points From correct guesses.............................";
		winScreenText.innerHTML += playerPts + "pts"+ "<br>";
		winScreenText.innerHTML += "Maximum points from guesses..........................";
		winScreenText.innerHTML += guessNoTotal*10 + "pts"+ "<br>";
		winScreenText.innerHTML += "Mark Before Bonuses..........................................";
		winScreenText.innerHTML += Math.round(((playerPts/(guessNoTotal*10))*100)) + "%" + "<br>";
		winScreenText.innerHTML += "Bonus from Map options.....................................";
		winScreenText.innerHTML +=  mBonus + "pts "+ "<br>";
		winScreenText.innerHTML += "Bonus from clues..................................................";
		winScreenText.innerHTML +=  cBonus + "pts "+ "<br>";
		winScreenText.innerHTML += "Difficulty Bonus...................................................";
		winScreenText.innerHTML +=  dBonus + "pts "+ "<br>"+ "<br>"+ "<br>"+ "<br>";
		winScreenText.innerHTML += "Total Points...........................................................";
		winScreenText.innerHTML += (playerPts+cBonus+dBonus+mBonus) + "pts "+ "<br>";
		winScreenText.innerHTML += "Final Mark.............................................................";
		winScreenText.innerHTML += Math.round((((playerPts+cBonus+dBonus+mBonus)/(guessNoTotal*10))*100)) + "%"+ "<br>";
		
		if (prevCorrect.length > 0){
			cDisp.innerHTML = "You guessed correctly:"  + "&nbsp";
			for (l = 0; l < prevCorrect.length; l++)
			{
				cDisp.innerHTML += prevCorrect[l] + " ";
			}
		}
		else{
			cDisp.innerHTML = "You didn't guess a single country correctly..";
		}
		if (prevWrong.length > 0){
			wDisp.innerHTML = "You fail to guess : ";
			for (m = 0; m < prevWrong.length; m++)
			{
				wDisp.innerHTML += prevWrong[m] + " ";	
			}
		}
		else{
			wDisp.innerHTML = "You guessed every last one of them correctly too! Well done.";
		}
	}	
	//restart game function
	function restart(){
		winScreen.style.visibility = "hidden";
		newGameButton.style.visibility = "hidden";
		mainMenu.style.visibility = "visible";
		playerPts = 0;
		playerScoreBox.innerHTML = "Score:" + playerPts + "pts";
		guessNoTotal = 0;
		prevCorrect = [];
		prevCountries = [];
		prevWrong = [];
		gameOver = false;
		isBonus = false;
	}
	