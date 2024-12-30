/*
//-------------------------------------------
MMM-MyPrayerTime
Copyright (C) 2024 - H. Tilburgs
MIT License
//-------------------------------------------
*/

Module.register('MMM-MyPrayerTimes', {
    // Default values
    defaults: {
        mptLat: null,
        mptLon: null,
        mptMethod: 3,
        mptOffset: "0,0,0,0,0,0,0,0,0",
        showSunrise: true,
        showSunset: true,
        showMidnight: true,
        showImsak: true,
        show24Clock: true,
        maxWidth: "500px",
        animationSpeed: 1000,
        initialLoadDelay: 1000,
        retryDelay: 2500,
        updateInterval: 60 * 60 * 1000,
    },

    // Define required files
    getStyles: function () {
        return ["MMM-MyPrayerTimes.css"];
    },
    getScripts: function () {
        return ["moment.js"];
    },
    getTranslations: function () {
        return {
            en: "translations/en.json",
            nl: "translations/nl.json",
            tr: "translations/tr.json",
        };
    },

    start: function () {
        Log.info("Starting module: " + this.name);
        //this.url = `https://api.aladhan.com/v1/timings/${moment(date.now())}?latitude=${this.config.mptLat}&longitude=${this.config.mptLon}&method=${this.config.mptMethod}&tune=${this.config.mptOffset}`;
        this.url = "https://api.aladhan.com/v1/timings/" + date.now() + "?latitude=" + this.config.mptLat + "&longitude=" + this.config.mptLon + "&method=" + this.config.mptMethod + "&tune=" + this.config.mptOffset;
        this.MPT = {};
        this.loaded = false;
        this.scheduleUpdate();
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Loading....";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        const table = document.createElement("table");
        table.className = "small";

        const prayerTimes = [
            { key: "Imsak", label: "IMSAK", arabic: "الإمساك", show: this.config.showImsak },
            { key: "Fajr", label: "FAJR", arabic: "الفجر" },
            { key: "Sunrise", label: "SUNRISE", arabic: "شروق الشمس", show: this.config.showSunrise },
            { key: "Dhuhr", label: "DHUHR", arabic: "الظهر" },
            { key: "Asr", label: "ASR", arabic: "العصر" },
            { key: "Sunset", label: "SUNSET", arabic: "غروب الشمس", show: this.config.showSunset },
            { key: "Maghrib", label: "MAGHRIB", arabic: "المغرب" },
            { key: "Isha", label: "ISHA", arabic: "العشاء" },
            { key: "Midnight", label: "MIDNIGHT", arabic: "منتصف الليل", show: this.config.showMidnight },
        ];

        prayerTimes.forEach(prayer => {
            if (prayer.show === false) return;
            const row = this.createPrayerRow(prayer.label, this.MPT[prayer.key], prayer.arabic);
            table.appendChild(row);
        });

        wrapper.appendChild(table);
        return wrapper;
    },

    createPrayerRow: function (label, time, arabicText) {
        const row = document.createElement("tr");

        const textCell = document.createElement("td");
        textCell.className = `${label.toLowerCase()}-text`;
        textCell.innerHTML = this.translate(label);
        row.appendChild(textCell);

        const timeCell = document.createElement("td");
        timeCell.className = `${label.toLowerCase()}-time bright`;
        timeCell.innerHTML = this.config.show24Clock ? time : this.convert24Time(time);
        row.appendChild(timeCell);

        const arabicCell = document.createElement("td");
        arabicCell.className = `${label.toLowerCase()}-arab`;
        arabicCell.innerHTML = arabicText;
        row.appendChild(arabicCell);

        return row;
    },

    convert24Time: function (time) {
        const match = time.toString().match(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/);
        if (!match) return time;

        let [hours, minutes] = match.slice(1, 3);
        const suffix = hours < 12 ? " AM" : " PM";
        hours = (hours % 12) || 12;

        return `${hours}:${minutes}${suffix}`;
    },

    processMPT: function (data) {
        this.MPT = data;
        this.loaded = true;
    },

    scheduleUpdate: function () {
        setInterval(() => this.getMPT(), this.config.updateInterval);
        this.getMPT();
    },

    getMPT: function () {
        this.sendSocketNotification("GET_MPT", this.url);
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "MPT_RESULT") {
            this.processMPT(payload);
            this.updateDom(this.config.animationSpeed);
        }
    },
});
