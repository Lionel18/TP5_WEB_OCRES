var express = require('express');
var router = express.Router();

const search = (tab,ids)=>{
	for(var i = 0 ; i<tab.length ; i++)
	{
		if (tab[i].id == ids )
			return i;
	} 
			return false;

}

//Ajout de Lodash
var _ = require('lodash');
//Ajout Axios
var axios = require('axios');

//Ajout de mon API
const api_key = "7c16a712";
const api_url = "http://www.omdbapi.com/";

//Create RAW data array
let movies = [
{
	id: "tt1375666",
	movie: "Inception",
	yearOfRelease: "2010",
	duration: "148" , // en minutes,
	actors: ["Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy"],
	poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", // lien vers une image d'affiche,
	boxOffice: "N/A", // en USD$,
	rottenTomatoesScore: "87%"
},

{
	id: "tt0100669",
	movie: "Superman",
	yearOfRelease: "1978",
	duration: "143" , // en minutes,
	actors: ["Marlon Brando, Gene Hackman, Christopher Reeve, Ned Beatty"],
	poster: "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg", // lien vers une image d'affiche,
	boxOffice: "N/A", // en USD$,
	rottenTomatoesScore: "94%"
},

{
	id: "tt0848228",
	movie: "The Avengers",
	yearOfRelease: "2012",
	duration: "143" , // en minutes,
	actors: ["Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth"],
	poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", // lien vers une image d'affiche,
	boxOffice: "N/A", // en USD$,
	rottenTomatoesScore: "92%"
},

{
	id: "tt1270797",
	movie: "Venom",
	yearOfRelease: "2018",
	duration: "112" , // en minutes,
	actors: ["Tom Hardy, Michelle Williams, Riz Ahmed, Scott Haze"],
	poster: "https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_SX300.jpg", // lien vers une image d'affiche,
	boxOffice: "N/A", // en USD$,
	rottenTomatoesScore: "30%"
},

{
	id: "tt0117060",
	movie: "Mission: Impossible",
	yearOfRelease: "1996",
	duration: "110" , // en minutes,
	actors: ["Tom Cruise, Jon Voight, Emmanuelle Béart, Henry Czerny"],
	poster: "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_SX300.jpg", // lien vers une image d'affiche,
	boxOffice: "N/A", // en USD$,
	rottenTomatoesScore: "64%"
},
];

// GET movies listing //
router.get('/', (req, res) => {
	//Get list of movies and return JSON
  res.status(200).json({ movies });
});

// GET one movie //
router.get('/:id',(req,res)=>{

	var indice = search(movies,req.params.id);
	console.log(indice);
	if (indice)
	{
		res.end(movies[indice].movie);

	}
	else
	{
		res.end('ca ne correspond à aucun film');
	}
});

// PUT new movie //
router.post('/ajout',(req,res)=>{
	if (req.body.nom && req.body.id)
	{
		movies.push({ id: req.body.id, movie: req.body.nom });
		res.end('ajouté');
	}
	else
		res.end('pas ajouté');

});

//UPDATE movie //
router.post('/update',(req,res)=>{
	if (req.body.nom && req.body.id)
	{
		var indice = search(movies,req.body.id);
		if (indice)
		{
		movies[indice].movie = req.body.nom;
		res.end('modifié');
		}
		else 
			res.end('pas modifié');
	}
	else
		res.end('pas modifié');

});

// DELETE movie //
router.delete('/delete',(req,res)=>{
	if (req.body.id)
	{
		var indice = search(movies,req.body.id);
		if (indice)
		{
		movies.splice(indice,1);
		res.end('supprimé');
		}
		else 
			res.end('pas supprimé');
	}
	else
		res.end('pas supprimé');

});

// PUT avec axios //
router.put('/', (req, res) => {
	const { movie } = req.body;

	const id = _.uniqueId();

	axios({
		method: 'get',
		url: `http://www.omdbapi.com/?t=${movie}&apikey=${api_key}`,
		responseType: 'json'

	})
		.then((response) => {

			const movie2 = response.data;

			movies.push({ movie2, id });

			res.status(200).json({
				message: `${id} a été ajouté`,
				database: { movie2 },
			
			});
		});
});


// Lien vers la documentation //
// https://documenter.getpostman.com/view/13519987/TVes65tL //

module.exports = router;

