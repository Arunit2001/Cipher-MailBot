# Cipher-MailBot

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

We have build a full stack web application where users can login and send recurring mails
to the recipients.

Features:
* Login and signup via:-
    ○ Username - password
    ○ Gmail Sync (Login with Gmail option)
* The general mail features includes:-
    ○ To
    ○ CC
    ○ Subject
    ○ Schedule Selector (further explained below)
    ○ Mail Body
    ○ Send Mail Button
* The scheduling features include :- 
    ○ Only Once - Mail will be sent Only Once.
    ○ Recurring schedule - Mail will automatically sent to the recipient after every 20 or 30 second
    ○ Weekly schedule - Mail will automatically sent to the recipient on any particular day and time of every week
    ○ Monthly schedule - Mail will automatically sent to the recipient on any particular date and time of every month
    ○ Yearly schedule - Mail will automatically be sent to the recipient on any particular date and time every year
* Home page ( have the list of all the mails scheduled for future)
* History Page ( have the list of mails sent till now )
* We have given a specific mail editor which includes :-
    ○ Making the text bold or italic
    ○ Changing the colour of the text
    ○ Changing the font type of the text

### Built With


* [Node Js](https://nodejs.org)
* [JavaScript](https://www.javascript.com)
* [MongoDB](https://www.mongodb.com)
* [Express]()
* [Html]()
* [CSS]()
* [SendGrid](https://sendgrid.com)
* [Passport]()
* [Heroku](https://www.heroku.com)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)



<!-- GETTING STARTED -->
## Getting Started

Follow the given instructions to setup this project locally.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Online Live Link [https://cipher-mailbot.herokuapp.com](https://cipher-mailbot.herokuapp.com)
2. Clone the repo
   ```sh
   git clone https://github.com/Arunit2001/Cipher-MailBot.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env` file and enter your API in `.env`
   ```JS
   const mongoLink = 'ENTER YOUR Mongo Url';
   ``JS
   const JWT_SECRET = 'ENTER a secret code';
   ``JS
   const clientID = 'ENTER your google oauth client id';
   ``JS
   const clientSecret = 'ENTER your google oauth client secret';
   ``JS
   const SGKEY = 'ENTER your SENDGRID API key';
   ``JS



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact
Phone:- 9667197161 Email:- arunit2001singh@gmail.com
Phone:- 9528303487 Email:- maarachna@gmail.com
Phone:- 8290786228 Email:- Sohail2001.786@gmail.com
Phone:- 8290040908 Email:- tarunkanojiawork@gmail.com

Project Link: [https://github.com/Arunit2001/Cipher-MailBot](https://github.com/Arunit2001/Cipher-MailBot)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png