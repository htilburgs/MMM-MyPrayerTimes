# MMM-MyPrayerTimes
MyPrayerTimes is a simple Module, that calculates the prayer times for any location around the world, based on a variety of calculation methods currently used in Muslim communities using the Aladhan API

![Screenshot](screenshot.png)

## Installation
Clone this repository in your modules folder, and install dependencies:

```
cd ~/MagicMirror/modules 
git clone https://github.com/htilburgs/MMM-MyPrayerTimes
cd MMM-MyPrayerTimes
npm install 
```

## Configuration
Go to the MagicMirror/config directory and edit the config.js file.
Add the module to your modules array in your config.js.

```
{
  module: 'MMM-MyPrayerTimes',
  position: 'top_left',
  header: 'My Prayer Times',
  config: {
          mptLat: null,			// Replace with the latitude of your location
	  mptLon: null,			// Replace with the Longitude of your location
	  mptMethode: 3,		// Which calculation methode is used, see options below
	  showSunrise: true,		// Display Sunrise
	  showSunset: true,		// Display Sunset
	  showMidnight: true,		// Display Midnight
	  }
},
```
To get your latitude and longitude, you can go to https://latitudelongitude.org

## Module configuration
Here is the documentation of options for the modules configuration:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>mptLat</code></td>
      <td>The latitude of your location for a correct calculation<br /><br /><strong>Number</strong><br />Default: <code>null</code></td>
    </tr>
    <tr>
      <td><code>mptLon</code></td>
      <td>The longitude of your location for a correct calculation<br /><br /><strong>Number</strong><br />Default: <code>null</code></td>
    </tr>
    <tr>
      <td><code>mptMethod</code></td>
      <td>Kind of calculation method to use<br /><br /><strong>Default: </strong>Number<br /></strong>Possible values:
	  <li>0 - Shia Ithna-Ansari</li>
	  <li>1 - University of Islamic Sciences, Karachi</li>
	  <li>2 - Islamic Society of North America</li>
	  <li>3 - Muslim World League</li>
	  <li>4 - Umm Al-Qura University, Makkah</li>
	  <li>5 - Egyptian General Authority of Survey</li>
	  <li>7 - Institute of Geophysics, University of Tehran</li>
	  <li>8 - Gulf Region</li>
	  <li>9 - Kuwait</li>
	  <li>10 - Qatar</li>
	  <li>11 - Majlis Ugama Islam Singapura, Singapore</li>
	  <li>12 - Union Organization islamic de France</li>
	  <li>13 - Diyanet İşleri Başkanlığı, Turkey</li>
	  <li>99 - Custom. See https://aladhan.com/calculation-methods</li>
	</strong></td>
	</tr>
    <tr>
      <td><code>showSunrise</code></td>
      <td>Shows Sunrise in the Prayer Times<br /><br /><strong>True / False</strong><br />Default: <code>true</code></td>
    </tr>
     <tr>
      <td><code>showSunset</code></td>
      <td>Shows Sunset in the Prayer Times<br /><br /><strong>True / False</strong><br />Default: <code>true</code></td>
    </tr>
    <tr>
      <td><code>showMidnight</code></td>
      <td>Shows Midnight in the Prayer Times<br /><br /><strong>True / False</strong><br />Default: <code>true</code></td>
    </tr>    
</tbody>
</table>

## License
### The MIT License (MIT)

Copyright © 2019 Harm Tilburgs

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
