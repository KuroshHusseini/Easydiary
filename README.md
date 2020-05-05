# DiaryKeeper App / Vanilla JS / Node JS

## Description
EasyDiary is a diary application that allows you to keep a diary with daily entries. It has been made with the word easy on mind. We mean easy by it being easy to handle, fill and manage. With our app you can make it a habbit to write down your feelings.
  EasyDiary creates an imaginable page of actual diary for every day. Then it's up to the user to report their thoughts on. That can mean only a few words or a considerable amount in multible chapters. Either of these can obviously sometimes be a challenge, so we came up with a helping hand. We added mood presets to make it easier to fill the diary when you're not in your most productive state. Sometimes that might still not be what you wanted, so we included the ability to add pictures to your pages as well.
  Whether you plan to use the app to let out your overall feelings or for more serius reporting, EasyDiary is a great choice for all imaginable groups of people.


## Getting Started
These instructions should get you started on running this project on your local or virtual machine for development or testing purposes.

### Prerequisites
To get started you need:
<ul>
  <li>A computer</li>
  <li>Connection to the internet</li>
  <li>Your favorite code editor that suits your web development needs</li>
  <li>Server for production (we used LAMP stack)</li>
</ul>

### Usage
I've provided instructions on how to use this software for localhost or server use.



#### Local computer
<details><summary>Show instructions</summary>
1. Open project in code editor.
  <br/>
2. Change branch to loginPage4 in project with git:
  
```sh 
  $ git checkout loginPage4
```
<br/>
3. Install node module packages:

```sh 
$ npm i
```
<br/>
4. To configure your MariaDB/MySQL database among other things you need to create a .env file and create the following variables:

```sh 
DB_HOST=(e.g. mysql.me.../root/etc.)
DB_USER=(e.g root)
DB_PASS=(DB_USER PASSWORD!)
DB_NAME=(Name of database)
TOKEN=(For JsonWebToken)

PORT=(Port that app uses)
```
<br/>
5. Start Node JS app

```sh 
$ npm run dev
```
<br/>
or 

```sh 
$ node app.js
```
<br/>
</details>

#### Server computer
<details><summary>Show instructions</summary>
Following instructions might not work or be needed depending what you might be using
<br/>
1. Open project in code editor.
<br/>
2. You should be in master branch. If not, you can try this git command:

```sh 
  $ git checkout master
```
</br>
  
3. Install node module packages:
```sh 
$ npm i
```
<br/>
5. You should change all <strong>url</strong> variables in frontend JS files to your server IP address.
<br/>
4. To configure your MariaDB/MySQL database among other things you need to create a .env file and create the following variables:

```sh 
DB_HOST=(usually localhost)
DB_USER=(e.g root)
DB_PASS=(DB_USER PASSWORD!)
DB_NAME=(Name of database)
TOKEN=(For JsonWebToken)

PORT=(Port that app uses)
NODE_ENV=development/production # Production for server side
PROXY_PASS=(If you're using proxy pass)
```

<br/>
3. Start Node JS app in your server.

```sh 
$ npm run dev
```

or 

```sh 
$ node app.js
```

</details>

### Diagrams
Here is an ER diagram of how the entities are related to each other and what kind of data is stored in the database.
<p align = "center">
<img src="readme_images/ER-diagram.png" alt="hackathon_diagram" width="480">
</p>

Diagram that demonstrates what goes on in the background when the user interacts with this software.
<p align = "center">
<img src="readme_images/background-process-diagram.png" alt="background-process-diagram" width="480">
</p>

### Change log
See CHANGELOG [here](CHANGELOG.md)
