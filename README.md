
<!-- Readme top-->
<a name="readme-top"></a>

<!-- Project shields -->

<!-- centered shields -->

<span style="display:block" align="center" class="shields">

  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]

</span>

<!-- Readme Header -->

<div align="center">
  <img src="assets/images/screenshots/header.png" alt="header-image" width="800" height="400">
</div>


<!-- PROJECT LOGO -->
<br />
<!-- <div align="center">
  <a href="https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine">
    <img src="assets/images/favicon.ico" alt="Logo" width="100" height="100">
  </a> -->

#
<h2 align="center">"Music 4 You: The ultimate music artist library and ticket sourcing search engine!</h2>

  <p align="center">
    A sleek, useful music library creation app with the ability to search for artists, add them to a 'artist library'; then choose to either listen to artists playlists, watch their music videos, read about the artist and even search for tour dates and buy tickets!  This app is very enjoyable and simple to use and looks great.
    Coded in vanilla JavaScript with dynamically rendered HTML, and an HTML and CSS interactive GUI.
    <br />
    <a href="https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine">View Project</a>
    ·
    <a href="https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine/issues">Report Bug</a>
    ·
    <a href="https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine/issues">Request Feature</a>
    ·
    <a href="https://github.com/Matt-Jones-Developer?tab=repositories">Check out my work</a>
    ·
  </p>
</div>

#

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
      <li><a href="#overview">Overview</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
      <li><a href="#the-product">The Product</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- Product screenshot: -->

[![Product Name Screen Shot][product-screenshot]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

<!-- ABOUT THE PROJECT -->
## About The Project

The assignment was to build an interactive app that utilises 2 API's and allows users to interact with the data and the app will render it to the page using vanilla Javascript.  The app is built around 2 music database API's (lastFM and Discogs) - it also includes an API for ticketmaster that drives the tour dates, venues and ticket booking modal, per artist!  

It is an exciting, useful app that can be personalised in a way that is unique to the users musical tastes.  Some really great features were implemented including a landing page, an artist library that uses a card grid system, to add or remove artists to.  The cards fetch data on artist name, genre and (from Discogs) fetches artwork for that artist too.
The backend is capable (and ready) to fetch a ton more data too, hold tight for future releases!

The artist cards contain 2 buttons: 1 is a redirect to the artists bio/playlist page where users can read more about their favourite artists, access playlists, music videos and more.  The future update will have an in-built artist page that renders all the re-directed information directly to the main app interface!

The 'get tickets' button allows users to tap into the Ticketmaster API, which renders, per artist, via a modal pop-up.  Users can find out whether the artist is touring, events, venues, and even buy tickets!

Music4You is incredibly fun to use and users can enjoy curating their own personalised music library, which persists their saved artists as entire objects within their browsers local storage!  The artist name is also tracked and stored in a separate array, which caters for a lot of bug catching and API call errors.

Thanks to object storage, when the user refreshes or logs back in to their library, all the saved artist cards are rendered instantly, without ever needing to pass back through the data fetching process; saving a ton of loading time, API error headaches and all the cards popup in a second!

Still to come:

-> The full API from ticketmaster will be rendered to the modal 
-> An 'Artist Page/Section' which will render all the other unused data from the fetch calls; including:
  -> artist biography and background
  -> full useable playlists 
  -> search for similar artists- by artist or genre!
  -> Other custom features including genre playlists and an 'on tour' toggle provided by a handy boolean built in to the API!

-> fully responsive and tested on all device sizes [TODO]


<!-- Product screenshot 2: -->

[![Product Name Screen Shot][product-screenshot-2]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)


## Overview
 
* User can search for any artist, no matter how obscure.  The data (if found) is rendered to a new artist card which the user can either keep or remove.  

* The cards have buttons to listen to their music, watch videos, read their bio page and even find gigs and book tickets!

* The users artist library will be saved to local storage and persist!

* Both API's pull data including artist name, genre, style, an image (that if not found will search for the next available image) bio page, playlist with tracks and videos, a genre playlist and a similar artist search!

* If the user tries to enter a duplicate item; it will not generate a new card and will alert the user via a modal.  

* Several other modals are in place to catch other API errors, including a 'garbage collector', a 'genre search blocker' and a random bug when typing in real names, that conflict with lastFM's slightly dodgy API!

* The app also catches 404's and alerts the user the data was not found.

* A custom graffiti fontface was used for the main text, giving the app a unique, street vibe!

* Detachable sticky nav and fixed footer

* An auto-scroll feature that counts cards and slides down to the next row

#

<!-- the product -->

## The Product

Product screenshot:

[![Product Name Screen Shot][product-screenshot]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

[![Product Name Screen Shot][product-screenshot-2]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

[![Product Name Screen Shot][product-screenshot-3]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)
[![Product Name Screen Shot][product-screenshot-4]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

## Criteria

Use Bootstrap or some other CSS framework.

Be deployed to GitHub Pages.

Be interactive (i.e., accept and respond to user input).

Use at least two server-side APIs.

Does not use alerts, confirms, or prompts (use modals).

Use client-side storage to store persistent data.

Be responsive.

Have a polished UI.

Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

#

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With:

<!-- languages logos -->

![js-logo]::: [![JavaScript]][javascript-url] ![html5-logo]::: [![HTML5]][html5-url] ![css-logo]::: [![CSS]][css-url] ![heart-logo]::: ![coding]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- GETTING STARTED -->

## Getting Started

This very easy to use GUI application that can be accessed through your web browser, you can also see the JS working under the hood by entering the console.  I highly recommend testing using CHROME, since the font face is bolder and it looks better overall.

When you first load the page, the artist library is empty.  

To add an artist, search for one using the sticky nav search bar that detaches from the the main header as you scroll!

Once data is fetched, the API has called artist name, genre, and an artost image, as well as links to the artists songs and videos and a ticketmaster query search modal.  The data is defined and handled by getArtist function which finally calls renderCard() - once you have saved cards - if you refresh the stored artistObject will re-render all your cards instantly without the need to wait for all the data to be fetched again.

These artist dataObject will be saved in local storage until you remove them or clear cache.  If you hit the remove 'x' button - that artists card will clear.

Please open main.js within the scripts folder to view the backend JS code. This will be split into data.js and generate.js scripts as it's quite a large file now at 1000 lines and will be much cleaner for future updating and maintenance. 

You can also see the testing folder for all the testing, tinkering and coding revisions made to reach solutions.  The pseudo was a lot more focussed this time, breaking down each problem and trying to work out the data side of things first, before tinkering with the GUI styling too much.  

Enjoy.

#
### Prerequisites

N/A

#

### Installation

No installation required.  Just load your browser. 

You can clear your caches local storage (artist cards stored) by hitting the remove buttons on each card, or by manually clearing cache.


----------------------------------


<!-- USAGE EXAMPLES -->
## More Screenshots

Screenshot of the programs output with
fully responsive design:

<!-- ![tablet-screenshot1]

<div align="center">
  <img src="assets/images/screenshots/mobile-screenshot.png">
  <img src="assets/images/screenshots/mobile-screenshot2.png">
</div> -->

Console log:

![console-output-screenshot]
![console-output-proof-of-API2]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

Early Ideas/Other unused pages:

[![Product Name Screen Shot][product-screenshot-5]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

[![Product Name Screen Shot][product-screenshot-6]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)


----------------------------------

<!-- ROADMAP -->
## Roadmap

1. build up with bespoke artist pages per artist
2. improve on the existing features and re-design the GUI to incorporate the ticketmaster area, or the artist page (as a built in)
3. improve the UI further, add new features and add my UX design principles 
4. build an advanced user log-in backend database that stores all the user data and offer register and login per user.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- UX/UI DESIGN -->
## UX/UI Design

Screenshot of the web apps UI design stage:

[![Design Screen Shot][wireframe-screenshot]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

[![Design Screen Shot][wireframe-screenshot-2]](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- CONTRIBUTING -->
## Contributing

First group project featured these fine coders and designers:

<div align="center">

  <p align="left"><a href="https://github.com/Matt-Jones-Developer">Matt Jones</a></p>
  <p align="left"><a href="https://github.com/MRMODonnell">Micheal O'Donnell</a></p>
  <p align="left"><a href="https://github.com/DeveloperK7E">Kelvin Enaro </a></p>

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` file for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- CONTACT -->
## Contact

Matt Jones - [@glitchy81_dev](https://twitter.com/glitchy81_dev)

#

## Project links

Project Repo Link: [https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine](https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine)


Deployed Project Link: [https://matt-jones-developer.github.io/music4you_the_API_driven_music_search_engine](https://matt-jones-developer.github.io/music4you_the_API_driven_music_search_engine)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Developed from this original README Template](https://github.com/othneildrew/Best-README-Template)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/matt-jones-developer/music4you_the_API_driven_music_search_engine.svg?style=for-the-badge
[contributors-url]: https://github.com/matt-jones-developer/music4you_the_API_driven_music_search_engine/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/matt-jones-developer/music4you_the_API_driven_music_search_engine.svg?style=for-the-badge
[forks-url]: https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine/network/members
[stars-shield]: https://img.shields.io/github/stars/matt-jones-developer/music4you_the_API_driven_music_search_engine.svg?style=for-the-badge
[stars-url]: https://matt-jones-developer.github.io/music4you_the_API_driven_music_search_engine/stargazer
[issues-shield]: https://img.shields.io/github/issues/matt-jones-developer/music4you_the_API_driven_music_search_engine.svg?style=for-the-badge
[issues-url]: https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine/issues
[license-shield]: https://img.shields.io/github/license/matt-jones-developer/music4you_the_API_driven_music_search_engine.svg?style=for-the-badge
[license-url]: https://github.com/Matt-Jones-Developer/music4you_the_API_driven_music_search_engine/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: www.linkedin.com/in/matt-jones-zx81
[product-screenshot]: assets/images/screenshots/app_screenshot.png
[product-screenshot-2]: assets/images/screenshots/app_screenshot_2.png
[product-screenshot-3]: assets/images/screenshots/app_screenshot_3.png
[product-screenshot-4]: assets/images/screenshots/app_screenshot_4.png
[product-screenshot-5]: assets/images/screenshots/app_screenshot_5.png
[product-screenshot-6]: assets/images/screenshots/app_screenshot_6.png
[console-output-screenshot]: assets/images/screenshots/console_output.png
[console-output-proof-of-API2]: assets/images/screenshots/console_output_tm_api.png
[wireframe-screenshot]: ./assets/images/screenshots/app_wireframing.png
[wireframe-screenshot-2]: ./assets/images/screenshots/app_wireframing_2.png
[tablet-screenshot1]: ./assets/images/screenshots/ipad-screenshot.png
[mobile-screenshot1]: ./assets/images/screenshots/mobile-screenshot1.png
[mobile-screenshot2]: ./assets/images/screenshots/mobile-screenshot2.png
[javascript-url]: https://www.javascript.com
[html5-url]: https://html5.org/
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[coding-url]: https://github.com/Matt-Jones-Developer
[js-logo]: assets/images/logos/js.svg
[html5-logo]: assets/images/logos/html5.svg
[css-logo]: assets/images/logos/css3.svg
[heart-logo]: assets/images/logos/coding_love_logo.png