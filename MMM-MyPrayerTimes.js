/*
//-------------------------------------------
MMM-MyPrayerTimes
Copyright (C) 2019 - H. Tilburgs
MIT License
//-------------------------------------------
*/

Module.register('MMM-MyPrayerTimes', {

	// Default values
	defaults: {
		date: new Date(),			// Today
		mptLat: null,				// = Latitude
		mptLon: null, 				// = Longitude
		mptMethod: null, 			// Calculation Method - Default 2: MuslimWorldLeague
		showSunrise: true,			// Display Sunrise, false if you want to hide
		showSunset: true,			// Display Sunset, false if you want to hide
		showMidnight: true,			// Display Midnight, false if you want to hide
		maxWidth: "500px",			// Max width wrapper
		animationSpeed: 1000, 			// fade in and out speed
		initialLoadDelay: 1000,
		retryDelay: 2500,
		updateInterval: 60 * 60 * 1000
	},
		
	// Define stylesheet
	getStyles: function () {
		return ["MMM-Test.css"];
	},  

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define required translations.
	getTranslations: function () {
		// The translations for the default modules are defined in the core translation files.
		// Therefor we can just return false. Otherwise we should have returned a dictionary.
		// If you're trying to build your own module including translations, check out the documentation.
		return false;
	},
			
	// Override getHeader method.
 	getHeader: function() {
 		return this.config.header;
 	},
	
	start: function() {
		Log.info("Starting module: " + this.name);
		requiresVersion: "2.1.0",

		// Set locales
		this.url = "https://api.aladhan.com/v1/timings/" + this.config.date + "?latitude=" + this.config.mptLat + "&longitude=" + this.config.mptLon + "&method=" + this.config.mptMethod;
		this.MPT = [];			// <-- empty array
		this.scheduleUpdate();       	// <-- When the module updates (see below)
	},

	getDom: function() {
		
		// creating the table
		var table = document.createElement("table");
		table.className = "small";
		
		// creating the wrapper
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		wrapper.style.maxWidth = this.config.maxWidth;
	
		// The loading sequence
        	if (!this.loaded) {
            	    wrapper.innerHTML = "Loading....";
            	    wrapper.classList.add("bright", "light", "small");
            	    return wrapper;
        	}
		
		var MPT = this.MPT;

		// creating the tablerows
		// Fajr
		var FajrRow = document.createElement("tr")
		FajrRow.className = "small fajr-row";
		
		var FajrTextCell = document.createElement("td");
		FajrTextCell.innerHTML = "Fajr";
		FajrRow.appendChild(FajrTextCell);
		table.appendChild(FajrRow);
		
		var FajrTimeCell = document.createElement("td");
		FajrTimeCell.className = "bright";
		FajrTimeCell.innerHTML = MPT.Fajr;
		FajrRow.appendChild(FajrTimeCell);
		table.appendChild(FajrRow);
		
		var FajrArabCell = document.createElement("td");
		FajrArabCell.innerHTML = "الفجر";
		FajrRow.appendChild(FajrArabCell);
		table.appendChild(FajrRow);
		
		// Sunrise
		if (this.config.showSunrise != false) {
			var SunriseRow = document.createElement("tr")
			SunriseRow.className = "small sunrise-row";

			var SunriseTextCell = document.createElement("td");
			SunriseTextCell.innerHTML = "Sunrise";
			SunriseRow.appendChild(SunriseTextCell);
			table.appendChild(SunriseRow);

			var SunriseTimeCell = document.createElement("td");
			SunriseTimeCell.className = "bright";
			SunriseTimeCell.innerHTML = MPT.Sunrise;
			SunriseRow.appendChild(SunriseTimeCell);
			table.appendChild(SunriseRow);

			var SunriseArabCell = document.createElement("td");
			SunriseArabCell.innerHTML = "شروق الشمس";
			SunriseRow.appendChild(SunriseArabCell);
			table.appendChild(SunriseRow);
		}
		
		//Dhuhr
		var DhuhrRow = document.createElement("tr")
		DhuhrRow.className = "small dhuhr-row";		
		
		var DhuhrTextCell = document.createElement("td");
		DhuhrTextCell.innerHTML = "Dhuhr";
		DhuhrRow.appendChild(DhuhrTextCell);
		table.appendChild(DhuhrRow);
		
		var DhuhrTimeCell = document.createElement("td");
		DhuhrTimeCell.className = "bright";
		DhuhrTimeCell.innerHTML = MPT.Dhuhr;
		DhuhrRow.appendChild(DhuhrTimeCell);
		table.appendChild(DhuhrRow);
		
		var DhuhrArabCell = document.createElement("td");
		DhuhrArabCell.innerHTML = "الظهر";
		DhuhrRow.appendChild(DhuhrArabCell);
		table.appendChild(DhuhrRow);
		
		//Asr
		var AsrRow = document.createElement("tr")
		AsrRow.className = "small asr-row";		
		
		var AsrTextCell = document.createElement("td");
		AsrTextCell.innerHTML = "Asr";
		AsrRow.appendChild(AsrTextCell);
		table.appendChild(AsrRow);
		
		var AsrTimeCell = document.createElement("td");
		AsrTimeCell.className = "bright";
		AsrTimeCell.innerHTML = MPT.Asr;
		AsrRow.appendChild(AsrTimeCell);
		table.appendChild(AsrRow);
		
		var AsrArabCell = document.createElement("td");
		AsrArabCell.innerHTML = "العصر";
		AsrRow.appendChild(AsrArabCell);
		table.appendChild(AsrRow);
		
		//Sunset
		if (this.config.showSunset != false) {		
			var SunsetRow = document.createElement("tr")
			FajrRow.className = "small sunset-row";		

			var SunsetTextCell = document.createElement("td");
			SunsetTextCell.innerHTML = "Sunset";
			SunsetRow.appendChild(SunsetTextCell);
			table.appendChild(SunsetRow);

			var SunsetTimeCell = document.createElement("td");
			SunsetTimeCell.className= "bright";
			SunsetTimeCell.innerHTML = MPT.Sunset;
			SunsetRow.appendChild(SunsetTimeCell);
			table.appendChild(SunsetRow);

			var SunsetArabCell = document.createElement("td");
			SunsetArabCell.innerHTML = "غروب الشمس";
			SunsetRow.appendChild(SunsetArabCell);
			table.appendChild(SunsetRow);
		}
		
		//Maghrib
		var MaghribRow = document.createElement("tr")
		MaghribRow.className = "small maghrib-row";		
		
		var MaghribTextCell = document.createElement("td");
		MaghribTextCell.innerHTML = "Maghrib";
		MaghribRow.appendChild(MaghribTextCell);
		table.appendChild(MaghribRow);
		
		var MaghribTimeCell = document.createElement("td");
		MaghribTimeCell.className = "bright";
		MaghribTimeCell.innerHTML = MPT.Maghrib;
		MaghribRow.appendChild(MaghribTimeCell);
		table.appendChild(MaghribRow);
		
		var MaghribArabCell = document.createElement("td");
		MaghribArabCell.innerHTML = "المغرب";
		MaghribRow.appendChild(MaghribArabCell);
		table.appendChild(MaghribRow);
		
		//Isha
		var IshaRow = document.createElement("tr")
		IshaRow.className = "small isha-row";
		
		var IshaTextCell = document.createElement("td");
		IshaTextCell.innerHTML = "Isha";
		IshaRow.appendChild(IshaTextCell);
		table.appendChild(IshaRow);
		
		var IshaTimeCell = document.createElement("td");
		IshaTimeCell.className = "bright";
		IshaTimeCell.innerHTML = MPT.Isha;
		IshaRow.appendChild(IshaTimeCell);
		table.appendChild(IshaRow);
		
		var IshaArabCell = document.createElement("td");
		IshaArabCell.innerHTML = "لعشاء";
		IshaRow.appendChild(IshaArabCell);
		table.appendChild(IshaRow);
		
		//Midnight
		if (this.config.showMidnight != false) {		
			var MidnightRow = document.createElement("tr")
			MidnightRow.className = "small midnight-row";		

			var MidnightTextCell = document.createElement("td");
			MidnightTextCell.innerHTML = "Midnight";
			MidnightRow.appendChild(MidnightTextCell);
			table.appendChild(MidnightRow);

			var MidnightTimeCell = document.createElement("td");
			MidnightTimeCell.className = "bright";
			MidnightTimeCell.innerHTML = MPT.Midnight;
			MidnightRow.appendChild(MidnightTimeCell);
			table.appendChild(MidnightRow);

			var MidnightArabCell = document.createElement("td");
			MidnightArabCell.innerHTML = "منتصف الليل";
			MidnightRow.appendChild(MidnightArabCell);
			table.appendChild(MidnightRow);
		}		
		return table;	
			
	}, // <-- closes the getDom function from above
		
	// this processes your data
	processMPT: function(data) { 
		this.MPT = data; 
		console.log(this.MPT); // uncomment to see if you're getting data (in dev console)
		this.loaded = true;
	},
	
	// this tells module when to update
	scheduleUpdate: function() { 
		setInterval(() => {
		    this.getMPT();
		}, this.config.updateInterval);
		this.getMPT();
		var self = this;
	},
	  
	// this asks node_helper for data
	getMPT: function() { 
		this.sendSocketNotification('GET_MPT', this.url);
	},
	
	// this gets data from node_helper
	socketNotificationReceived: function(notification, payload) { 
		if (notification === "MPT_RESULT") {
		    this.processMPT(payload);
		}
		this.updateDom(this.config.initialLoadDelay);
	},
});
