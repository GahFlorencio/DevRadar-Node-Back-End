const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
	async store(request, response) {
		const { github_username, techs, latitude, longitude } = request.body;		
		let dev = await Dev.findOne({ github_username });

		if (!dev) {
			const apiResponse = await axios.get(
				`https://api.github.com/users/${github_username}`,
			);
			let { name = login, avatar_url, bio } = apiResponse.data;

			const techsArray = parseStringAsArray(techs);

			const location = {
				type: "Point",
				coordinates: [longitude, latitude],
			};

			let repos =  await axios.get(
				`https://api.github.com/users/${github_username}/repos`,
			);
			let devRepos = [];
			
				
			repos.data.map((repo ,index )=>{
				if(index <= 2) {
				devRepos.push({
					'name':repo.name,
					'language':repo.language,
					'updated_at':repo.updated_at,
					'created_at': repo.created_at,
					'description':repo.description,
					'index':index
				})}
				
			})
	

			 dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location,
				repos:devRepos
			});
		}
		
		
		return response.json(dev);
	},

	async index(request,response){
		const devs = await Dev.find();
		return response.json(devs);
	},

	async destroy(request,response){
		const { github_username} = request.query;

		let dev = await Dev.findOneAndDelete({ github_username });

		return response.json(dev);


	},
	async update(request,response){
		const { github_username, techs, latitude, longitude } = request.body;	

		const location = {
			type: "Point",
			coordinates: [longitude, latitude],
		};

		let repos =  await axios.get(
			`https://api.github.com/users/${github_username}/repos`,
		);
		let devRepos = [];
		
			
		repos.data.map((repo ,index )=>{
			if(index <= 2) {
			devRepos.push({
				'name':repo.name,
				'language':repo.language,
				'updated_at':repo.updated_at,
				'created_at': repo.created_at,
				'description':repo.description,
				'index':index
			})}
			
		})
		
		
		let dev = await Dev.findOneAndUpdate({github_username},{
			techs,
			location,
			repos:devRepos
		})

		dev = await Dev.findOne({github_username})	
		return response.json(dev);


	}

};
