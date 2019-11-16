# autora-a1 V2

This project uses:
* [Vue](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Autoura API](https://github.com/Autoura/API/blob/master/readme.md)

## Description

An interactive map that informs a user of various sightseeing locations depending on their interest.
The application provides a search functionality for the user to search for what they would like.
This search functionality accepts two inputs, Group Context and Stop Type, with the minimum required
for a search being the Stop Type. Upon search, a list of results and their accompanying map markers will appear to give a visual representation of where they are located. Clicking either the result list or the map marker will bring up more detailed information of the location.  

### Group contexts

Group context refers to the size of the party doing the sightseeing. There are 7 to choose from.

* Solo
* Couple
* Friends
* Kids
* Teenagers
* Group
* Party

## Project setup

### Clone project

```
https://github.com/ralgr/autora-a1.git
```
### Install requirements 
```
npm install
```

### Compiles and hot-reloads for development 
```
npm run serve
```

### Compiles and minifies for production (For testing PWA)
```
npm run build
```

### Install HTTP-server (For testing PWA)
```
npm install http-server -g
```

### Enter in CLI (For testing PWA)
```
http-server dist
Select http://127.0.0.1:8080
Set browser to offline mode
```

