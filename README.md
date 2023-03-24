# Welcome!

This is a rewrite of the Jekyll Kraedt website, using React. The original plan was to rewrite the entire backend and clean things up, moving more functionality to the server-side to make things easier to update when I release new music.
However, I've mostly decided to get rid of the backend entirely and find an alternative method of hosting song files and data. Work in progress!

Feel free to read through the code, but you won't find any hidden releases or secret download links here :)

P.S: Note to self, to deploy the site to GH Pages run `npm run deploy`

## Technologies used

The project consists of almost entirely front-end Typescript and React. The front-end is built to support multiple music asliases as "sub-pages" in the single-page web app.

For fetching data, a Google Cloud Function is used in place of a VM (going for lowest maintenance cost possible) and utilizes Google Drive's API to load a json file containing all data related to an alias. This allows me to edit the data and add new songs / albums without needing to built out a UI or log into a database. Song files are also stored in Google Drive (only the ones that are free and downloadable).
