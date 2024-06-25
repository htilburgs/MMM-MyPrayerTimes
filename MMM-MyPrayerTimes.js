/*
//-------------------------------------------
MMM-MyPrayerTime
Copyright (C) 2019 - H. Tilburgs
MIT License
//-------------------------------------------
*/

Module.register('MMM-MyPrayerTimes', {

	// Default values
	defaults: {
		date: new Date(),			// Today
		mptLat: null,				// Replace null with your Latitude
		mptLon: null, 				// Replace null with your Longitude
		mptMethod: 3, 				// Calculation Method - Default 3: MuslimWorldLeague
		mptOffset: "0,0,0,0,0,0,0,0,0", 	// Time corrections for your location: Imsak, Fajr, Sunrise, Duhr, Asr, Sunset, Maghrib, Isha, Midnight
		showSunrise: true,			// Display Sunrise, false if you want to hide
		showSunset: true,			// Display Sunset, false if you want to hide
		showMidnight: true,			// Display Midnight, false if you want to hide
		showImsak: true,			// Display Imsak, false if you want to hide
		show24Clock: true,			// Default display 24hour clock
		maxWidth: "500px",			// Max width wrapper
		animationSpeed: 1000, 			// fade in and out speed
		initialLoadDelay: 1000,
		retryDelay: 2500,
		updateInterval: 60 * 60 * 1000
	},
		
	// Define stylesheet
	getStyles: function () {
		return ["MMM-MyPrayerTimes.css"];
	},  

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define required translations.
	getTranslations: function () {
		return {
			en: "translations/en.json",
			nl: "translations/nl.json",
			tr: "translations/tr.json",
		}
	},

	
	convert24Time: function (time) {
		// Check correct time format and split into components
		time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) { // If time format correct
		time = time.slice (1);  // Remove full string match value
		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
			}
		return time.join (''); // return adjusted time or original string
	},
	
	start: function() {
		Log.info("Starting module: " + this.name);
		requiresVersion: "2.1.0",

		// Set locales
		this.url = "https://api.aladhan.com/v1/timings/" + moment((this.config.date).valueOf()).format("DD-MM-YYYY") + "?latitude=" + this.config.mptLat + "&longitude=" + this.config.mptLon + "&method=" + this.config.mptMethod + "&tune=" + this.config.mptOffset;
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
		this.loaded = true;
		var MPT = this.MPT;

		// creating the tablerows
		
		// Imsak
		if (this.config.showImsak != false) {
			var ImsakRow = document.createElement("tr")
			ImsakRow.className = "imsak-row";

			var ImsakTextCell = document.createElement("td");
			ImsakTextCell.className = "imsak-text";
			ImsakTextCell.innerHTML = this.translate("IMSAK");
			ImsakRow.appendChild(ImsakTextCell);
			table.appendChild(ImsakRow);

			var ImsakTimeCell = document.createElement("td");
			ImsakTimeCell.className = "imsak-time bright";
			ImsakTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Imsak) : MPT.Imsak;
			ImsakRow.appendChild(ImsakTimeCell);
			table.appendChild(ImsakRow);

			var ImsakArabCell = document.createElement("td");
			ImsakArabCell.className = "imsak-arab";
			ImsakArabCell.innerHTML = "الإمساك";
			ImsakRow.appendChild(ImsakArabCell);
			table.appendChild(ImsakRow);
		}		
		
		// Fajr
		var FajrRow = document.createElement("tr")
		FajrRow.className = "fajr-row";
		
		var FajrTextCell = document.createElement("td");
		FajrTextCell.className = "fajr-text";
		FajrTextCell.innerHTML = this.translate("FAJR");
		FajrRow.appendChild(FajrTextCell);
		table.appendChild(FajrRow);
		
		var FajrTimeCell = document.createElement("td");
		FajrTimeCell.className = "fajr-time bright";
		FajrTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Fajr) : MPT.Fajr;		
		FajrRow.appendChild(FajrTimeCell);
		table.appendChild(FajrRow);
		
		var FajrArabCell = document.createElement("td");
		FajrArabCell.className = "fajr-arab";
		FajrArabCell.innerHTML = "الفجر";
		FajrRow.appendChild(FajrArabCell);
		table.appendChild(FajrRow);
		
		// Sunrise
		if (this.config.showSunrise != false) {
			var SunriseRow = document.createElement("tr")
			SunriseRow.className = "sunrise-row";

			var SunriseTextCell = document.createElement("td");
			SunriseTextCell.className = "sunrise-text";
			SunriseTextCell.innerHTML = this.translate("SUNRISE");
			SunriseRow.appendChild(SunriseTextCell);
			table.appendChild(SunriseRow);

			var SunriseTimeCell = document.createElement("td");
			SunriseTimeCell.className = "sunrise-time bright";
			SunriseTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Sunrise) : MPT.Sunrise;
			SunriseRow.appendChild(SunriseTimeCell);
			table.appendChild(SunriseRow);

			var SunriseArabCell = document.createElement("td");
			SunriseArabCell.className = "sunrise-arab";
			SunriseArabCell.innerHTML = "شروق الشمس";
			SunriseRow.appendChild(SunriseArabCell);
			table.appendChild(SunriseRow);
		}
		
		//Dhuhr
		var DhuhrRow = document.createElement("tr")
		DhuhrRow.className = "dhuhr-row";		
		
		var DhuhrTextCell = document.createElement("td");
		DhuhrTextCell.className = "dhuhr-text";
		DhuhrTextCell.innerHTML = this.translate("DHUHR");
		DhuhrRow.appendChild(DhuhrTextCell);
		table.appendChild(DhuhrRow);
		
		var DhuhrTimeCell = document.createElement("td");
		DhuhrTimeCell.className = "dhuhr-time bright";
		DhuhrTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Dhuhr) : MPT.Dhuhr;
		DhuhrRow.appendChild(DhuhrTimeCell);
		table.appendChild(DhuhrRow);
		
		var DhuhrArabCell = document.createElement("td");
		DhuhrArabCell.className = "dhuhr-arab";
		DhuhrArabCell.innerHTML = "الظهر";
		DhuhrRow.appendChild(DhuhrArabCell);
		table.appendChild(DhuhrRow);
		
		//Asr
		var AsrRow = document.createElement("tr")
		AsrRow.className = "asr-row";		
		
		var AsrTextCell = document.createElement("td");
		AsrTextCell.className = "asr-text";
		AsrTextCell.innerHTML = this.translate("ASR");
		AsrRow.appendChild(AsrTextCell);
		table.appendChild(AsrRow);
		
		var AsrTimeCell = document.createElement("td");
		AsrTimeCell.className = "asr-time bright";
		AsrTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Asr) : MPT.Asr;
		AsrRow.appendChild(AsrTimeCell);
		table.appendChild(AsrRow);
		
		var AsrArabCell = document.createElement("td");
		AsrArabCell.className = "asr-arab";
		AsrArabCell.innerHTML = "العصر";
		AsrRow.appendChild(AsrArabCell);
		table.appendChild(AsrRow);
		
		//Sunset
		if (this.config.showSunset != false) {		
			var SunsetRow = document.createElement("tr")
			FajrRow.className = "sunset-row";		

			var SunsetTextCell = document.createElement("td");
			SunsetTextCell.className = "sunset-text";
			SunsetTextCell.innerHTML = this.translate("SUNSET");
			SunsetRow.appendChild(SunsetTextCell);
			table.appendChild(SunsetRow);

			var SunsetTimeCell = document.createElement("td");
			SunsetTimeCell.className= "sunset-time bright";
			SunsetTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Sunset) : MPT.Sunset;
			SunsetRow.appendChild(SunsetTimeCell);
			table.appendChild(SunsetRow);

			var SunsetArabCell = document.createElement("td");
			SunsetArabCell.className = "sunset-arab";
			SunsetArabCell.innerHTML = "غروب الشمس";
			SunsetRow.appendChild(SunsetArabCell);
			table.appendChild(SunsetRow);
		}
		
		//Maghrib
		var MaghribRow = document.createElement("tr")
		MaghribRow.className = "maghrib-row";		
		
		var MaghribTextCell = document.createElement("td");
		MaghribTextCell.className = "maghrib-text";
		MaghribTextCell.innerHTML = this.translate("MAGHRIB");
		MaghribRow.appendChild(MaghribTextCell);
		table.appendChild(MaghribRow);
		
		var MaghribTimeCell = document.createElement("td");
		MaghribTimeCell.className = "maghrib-time bright";
		MaghribTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Maghrib) : MPT.Maghrib;
		MaghribRow.appendChild(MaghribTimeCell);
		table.appendChild(MaghribRow);
		
		var MaghribArabCell = document.createElement("td");
		MaghribArabCell.className = "maghrib-arab";
		MaghribArabCell.innerHTML = "المغرب";
		MaghribRow.appendChild(MaghribArabCell);
		table.appendChild(MaghribRow);
		
		//Isha
		var IshaRow = document.createElement("tr")
		IshaRow.className = "isha-row";
		
		var IshaTextCell = document.createElement("td");
		IshaTextCell.className = "isha-text";
		IshaTextCell.innerHTML = this.translate("ISHA");
		IshaRow.appendChild(IshaTextCell);
		table.appendChild(IshaRow);
		
		var IshaTimeCell = document.createElement("td");
		IshaTimeCell.className = "isha-time bright";
		IshaTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Isha) : MPT.Isha;
		IshaRow.appendChild(IshaTimeCell);
		table.appendChild(IshaRow);
		
		var IshaArabCell = document.createElement("td");
		IshaArabCell.className = "isha-arab";
		IshaArabCell.innerHTML = "العشاء";
		IshaRow.appendChild(IshaArabCell);
		table.appendChild(IshaRow);
		
		//Midnight
		if (this.config.showMidnight != false) {		
			var MidnightRow = document.createElement("tr")
			MidnightRow.className = "midnight-row";		

			var MidnightTextCell = document.createElement("td");
			MidnightTextCell.className = "midnight-text";
			MidnightTextCell.innerHTML = this.translate("MIDNIGHT");
			MidnightRow.appendChild(MidnightTextCell);
			table.appendChild(MidnightRow);

			var MidnightTimeCell = document.createElement("td");
			MidnightTimeCell.className = "midnight-time bright";
			MidnightTimeCell.innerHTML = this.config.show24Clock == false ? this.convert24Time(MPT.Midnight) : MPT.Midnight;
			MidnightRow.appendChild(MidnightTimeCell);
			table.appendChild(MidnightRow);

			var MidnightArabCell = document.createElement("td");
			MidnightArabCell.className = "midnight-arab";
			MidnightArabCell.innerHTML = "منتصف الليل";
			MidnightRow.appendChild(MidnightArabCell);
			table.appendChild(MidnightRow);
		}		
		wrapper.appendChild(table)
		return wrapper;
			
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
				// this notification doesn't come back on error..
		    this.processMPT(payload);
		    this.updateDom(this.config.initialLoadDelay);  // or put in processMPT
		}
		// do you want to do updateDom on EVER notification? or only yours
		//this.updateDom(this.config.initialLoadDelay);
	},
});
