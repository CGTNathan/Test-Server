// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		section: "ORAS Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Unrated Random Battle",
		section: "ORAS Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "OU",
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite']
	},
	{
		name: "OU (suspect test)",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Landorus']
	},
	{
		name: "OU (no Mega)",
		section: "ORAS Singles",

		ruleset: ['OU'],
		onBegin: function () {
			for (var i = 0; i < this.p1.pokemon.length; i++) {
				this.p1.pokemon[i].canMegaEvo = false;
			}
			for (var i = 0; i < this.p2.pokemon.length; i++) {
				this.p2.pokemon[i].canMegaEvo = false;
			}
		}
	},
	{
		name: "Ubers",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Ban Mod'],
		banlist: []
	},
	{
		name: "UU",
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Alakazite', 'Altarianite', 'Diancite', 'Heracronite', 'Galladite', 'Gardevoirite', 'Lopunnite', 'Medichamite',
			'Metagrossite', 'Pinsirite', 'Drizzle', 'Drought', 'Shadow Tag'
		]
	},
	{
		name: "UU (suspect test)",
		section: "ORAS Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'Alakazite', 'Altarianite', 'Diancite', 'Heracronite', 'Galladite', 'Gardevoirite', 'Lopunnite', 'Medichamite',
			'Metagrossite', 'Pinsirite', 'Drizzle', 'Drought', 'Shadow Tag', 'Crawdaunt', 'Diggersby', 'Hawlucha', 'Klefki', 'Scolipede',
			'Smeargle', 'Staraptor', 'Terrakion', 'Thundurus-Therian', 'Togekiss', 'Venomoth', 'Volcarona', 'Weavile', 'Zygarde'
		]
	},
	{
		name: "RU",
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2', 'Galladite', 'Houndoominite', 'Pidgeotite']
	},
	{
		name: "RU (suspect test)",
		section: "ORAS Singles",

		challengeShow: false,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2', 'Galladite', 'Houndoominite', 'Pidgeotite']
	},
	{
		name: "NU",
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'Cameruptite', 'Glalitite', 'Steelixite']
	},
	{
		name: "NU (suspect test)",
		section: "ORAS Singles",

		challengeShow: false,
		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'Cameruptite', 'Glalitite', 'Steelixite']
	},
	{
		name: "LC",
		section: "ORAS Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger']
	},
/*	{
		name: "Random LC",
		section: "ORAS Singles",

		maxLevel: 5,
		team: 'randomlc',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod'],
		banlist: ['Dragon Rage', 'Sonic Boom', 'Swagger', 'LC Uber', 'Gligar', 'Misdreavus']
	},*/
	{
		name: "Anything Goes",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal']
	},
	/*{
		name: "CAP Plasmanta Playtest",
		section: "ORAS Singles",

		ruleset: ['CAP Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Soul Dew',
			'Tomohawk', 'Necturna', 'Mollux', 'Aurumoth', 'Malaconda', 'Cawmodore', 'Volkraken', 'Syclant', 'Revenankh', 'Pyroak', 'Fidgit', 'Stratagem', 'Arghonaut', 'Kitsunoh', 'Cyclohm', 'Colossoil', 'Krilowatt', 'Voodoom'
		]
	},*/
	{
		name: "Battle Spot Singles",
		section: "ORAS Singles",

		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 3) return ['You must bring at least three Pokémon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Battle Spot Special 10",
		section: "ORAS Singles",

		maxForcedLevel: 50,
		ruleset: ['Battle Spot Singles'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 3) return ['You must bring at least three Pokémon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Custom Game",
		section: "ORAS Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Doubles Battle",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles OU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom', 'Salamencite', 'Soul Dew', 'Dark Void',
			'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore'
		]
	},
	{
		name: "Doubles OU (suspect test)",
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew', 'Dark Void',
			'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore'
		]
	},
	{
		name: "Doubles Ubers",
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void']
	},
	{
		name: "Doubles UU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: ['Aegislash', 'Amoonguss', 'Azumarill', 'Bisharp', 'Breloom', 'Camerupt', 'Chandelure', 'Charizard', 'Conkeldurr',
		'Cresselia', 'Diancie', 'Dragonite', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoir',
		'Gengar', 'Greninja', 'Gyarados', 'Heatran', 'Hitmontop', 'Hydreigon', 'Kangaskhan', 'Keldeo',
		'Kyurem-Black', 'Landorus', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Mamoswine', 'Mawile', 'Metagross', 'Mew',
		'Politoed', 'Rotom-Wash', 'Sableye', 'Scizor', 'Scrafty', 'Shaymin-Sky',
		'Suicune', 'Sylveon', 'Talonflame', 'Terrakion', 'Thundurus', 'Togekiss',
		'Tyranitar', 'Venusaur', 'Weavile', 'Whimsicott', 'Zapdos'
		]
	},
	{
		name: "Doubles NU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles UU'],
		banlist: ['Snorlax', 'Machamp', 'Lopunny', 'Galvantula', 'Mienshao', 'Infernape', 'Aromatisse',
		'Clawitzer', 'Kyurem', 'Flygon', 'Lucario', 'Alakazam', 'Gastrodon', 'Bronzong', 'Chandelure',
		'Dragalge', 'Mamoswine', 'Genesect', 'Arcanine', 'Volcarona', 'Aggron', 'Manectric', 'Salamence',
		'Tornadus', 'Porygon2', 'Latias', 'Meowstic', 'Ninetales', 'Crobat', 'Blastoise', 'Darmanitan',
		'Sceptile', 'Jirachi', 'Goodra', 'Deoxys-Attack', 'Milotic', 'Victini', 'Hariyama', 'Crawdaunt',
		'Aerodactyl', 'Abomasnow', 'Krookodile', 'Cofagrigus', 'Druddigon', 'Escavalier', 'Dusclops',
		'Slowbro', 'Slowking', 'Eelektross', 'Spinda', 'Cloyster', 'Raikou', 'Thundurus-Therian', 'Swampert',
		'Nidoking', 'Aurorus', 'Granbull', 'Braviary'
		]
	},
	{
		name: "Battle Spot Doubles (VGC 2015)",
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Tornadus + Defiant', 'Thundurus + Defiant', 'Landorus + Sheer Force'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Doubles Challenge Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Smogon Triples",
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Perish Song'
		]
	},
	{
		name: "Battle Spot Triples",
		section: "ORAS Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 6) return ['You must have six Pokémon.'];
		}
	},
	{
		name: "Triples Challenge Cup",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Triples Custom Game",
		section: "ORAS Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "2v2 Doubles",
		section: "OM of the Month",
		column: 2,

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: ['Perish Song'],
		validateTeam: function (team, format) {
			if (team.length > 4) return ['You may only bring up to four Pokémon.'];
		},
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 2);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 2);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "[Seasonal] You are (not) prepared",
		section: 'OM of the Month',

		team: 'randomSeasonalMay2015',
		mod: 'seasonal',
		gameType: 'triples',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('raw|<b><font color="red">IMPORTANT!</font></b> All moves on this seasonal are custom. Use the command <b>/seasonaldata</b>, <b>/sdata</b>, or <b>/sdt</b> to know what they do.');
			this.add('raw|More information can be found <a href="http://www.smogon.com/forums/threads/3491902/page-12#post-6202283">here</a>');
		},
		onModifyMove: function (move) {
			// Shows legit name after use...
			var legitNames = {
				recover: "Cura", softboiled: "Curaga", reflect: "Wild Growth", acupressure: "Power Shield",
				holdhands: "Rejuvenation", luckychant: "Fairy Ward", followme: "Taunt", meditate: "Sacrifice",
				helpinghand: "Cooperation", spite: "Slow Down", aromaticmist: "Healing Touch", healbell: "Penance",
				fakeout: "Stop", endure: "Last Stand", withdraw: "Barkskin", seismictoss: "Punishment",
				flamethrower: "Flamestrike", fireblast: "Conflagration", thunderbolt: "Moonfire", thunder: "Starfire",
				toxic: "Corruption", leechseed: "Soul Leech", icebeam: "Ice Lance", freezeshock: "Frostbite",
				aircutter: "Hurricane", muddywater: "Storm", furyswipes: "Fury", scratch: "Garrote", slash: "Mutilate",
				smog: "Poison Gas", protect: "Evasion", matblock: "Sacred Shield"
			};
			if (move.id in legitNames) {
				move.name = legitNames[move.id];
			}
		},
		onFaint: function (pokemon) {
			var message = {
				'Amy': 'French?', 'Princess Leia': 'Why, you stuck up, half-witted, scruffy-looking Nerf herder.',
				'Scruffy': "Scruffy's gonna die the way he lived. [Turns page of Zero-G Juggs magazine.] Mmhm.",
				'Yoda': 'Wrath leads to the dark side.', 'Bender': 'DEATH TO ALL HUMANS!', 'Gurren Lagann': 'Later, buddy.',
				'Lagann': "Eh, I guess I'm no one.", 'Rei Ayanami': 'Man fears the darkness, and so he scrapes away at the edges of it with fire.',
				'Slurms McKenzie': 'I will keep partying until the end.', 'C3PO': 'Oh, dear!',
				'Hermes': 'I can still... limbo...', 'Professor Farnsworth': 'Bad news, everyone!', 'Kif': 'Sigh.',
				'Jar Jar Binks': "Better dead here than deader in the Core. Ye gods, whatta meesa sayin'?",
				'R2D2': '*beep boop*', 'Asuka Langley': 'Disgusting.', 'Chewy': 'GRARARWOOWRALWRL',
				'Fry': 'Huh. Did everything just taste purple for a second?', 'Han Solo': 'I should have shot first...',
				'Leela': 'Yeeee-hAW!', 'Luke Skywalker': 'I could not use the force...',
				'Nibbler': 'I hereby place an order for one cheese pizza.',
				'Shinji Ikari': 'It would be better if I never existed. I should just die too.', 'Zoidberg': 'Why not Zoidberg?',
				'Anti-Spiral': 'If this is how it must be, protect the universe at all costs.', 'Gendo Ikari': 'Everything goes according to the plan.',
				'Kaworu Nagisa': 'Dying of your own will. That is the one and only absolute freedom there is.',
				'Jabba the Hut': 'Han, ma bukee.', 'Lilith': '...', 'Lrrr': "But I'm emperor of Omicron Persei 8!",
				'Mommy': 'Stupid!', 'Bobba Fett': "I see now I've done terrible things.", 'Zapp Brannigan': "Oh, God, I'm pathetic. Sorry. Just go...",
				'An angel': ',,,', 'Darth Vader': "I'm sorry, son.", 'Emperor Palpatine': 'What the hell is an "Aluminum Falcon"?',
				'Fender': '*beeps*', 'Storm Trooper': 'But my aim is perfect!'
			}[pokemon.name];
			this.add('-message', pokemon.name + ': ' + message);
		}
	},
	{
		name: "CAP",
		section: "Other Metagames",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Allow CAP']
	},
	{
		name: "Battle Factory",
		section: "Other Metagames",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Battle Cup 1v1",
		section: "Other Metagames",

		team: 'randomBC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview 1v1'],
		onBegin: function () {
			this.debug('Cutting down to 1');
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Challenge Cup",
		section: "Other Metagames",

		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Balanced Hackmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter']
	},
	{
		name: "1v1",
		section: 'Other Metagames',

		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview 1v1'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky',
			'Xerneas', 'Yveltal', 'Zekrom', 'Focus Sash', 'Kangaskhanite', 'Soul Dew'
		],
		validateTeam: function (team, format) {
			if (team.length > 3) return ['You may only bring up to three Pokémon.'];
		},
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Tier Shift",
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU'],
		banlist: ['Shadow Tag', 'Chatter']
	},
	{
		name: "PU",
		section: "Other Metagames",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Altarianite', 'Beedrillite', 'Lopunnite', 'Chatter', 'Shell Smash + Baton Pass']
	},
	{
		name: "Inverse Battle",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Diggersby', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Serperior',
			'Shaymin-Sky', 'Snorlax', 'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew'
		],
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Almost Any Ability",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities', 'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja + Sturdy', 'Slaking', 'Smeargle + Prankster', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal',
			'Zekrom', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Chatter'
		],
		validateSet: function (set) {
			var bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				var template = this.getTemplate(set.species || set.name);
				var legalAbility = false;
				for (var i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pokémon that do not naturally have it.'];
			}
		}
	},
	{
		name: "STABmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore STAB Moves', 'Arceus', 'Blaziken', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Diggersby', 'Genesect', 'Giratina', 'Giratina-Origin',
			'Greninja', 'Groudon', 'Ho-Oh', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia',
			'Porygon-Z', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Sylveon', 'Xerneas', 'Yveltal', 'Zekrom', 'Aerodactylite', 'Altarianite',
			'Gengarite', 'Kangaskhanite', "King's Rock", 'Lopunnite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Razor Fang', 'Salamencite', 'Slowbronite',
			'Soul Dew'
		]
	},
	{
		name: "LC UU",
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Cottonee', 'Croagunk', 'Diglett',
			'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus', 'Gastly', 'Gothita', 'Houndour', 'Larvesta', 'Magnemite', 'Mienfoo',
			'Munchlax', 'Omanyte', 'Onix', 'Pawniard', 'Ponyta', 'Porygon', 'Pumpkaboo-Super', 'Scraggy', 'Shellder', 'Skrelp', 'Snivy',
			'Snubbull', 'Spritzee', 'Staryu', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby', 'Vulpix', 'Zigzagoon', 'Shell Smash'
		]
	},
	{
		name: "Averagemons",
		section: "Other Metagames",

		mod: 'averagemons',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Evasion Abilities Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Sableye + Prankster', 'Shedinja', 'Smeargle',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Gengarite', 'Kangaskhanite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag'
		]
	},
	{
		name: "Hidden Type",
		section: "Other Metagames",

		searchShow: false,
		mod: 'hiddentype',
		ruleset: ['OU']
	},
	{
		name: "Middle Cup",
		section: "Other Metagames",

		searchShow: false,
		maxLevel: 50,
		defaultLevel: 50,
		validateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (!template.evos || template.evos.length === 0 || !template.prevo) {
				return [set.species + " is not the middle Pokémon in an evolution chain."];
			}
		},
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Chansey', 'Frogadier', 'Eviolite']
	},
	{
		name: "OU Theorymon",
		section: "Other Metagames",

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU']
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber']
	},
	{
		name: "Monotype Random Battle",
		section: "Monotype",
		column: 2,

		team: 'randomMonotype',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Monotype",
		section: "Monotype",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Shaymin-Sky', 'Slowbronite', 'Soul Dew'
		]
		},
	{
		name: "Duotype",
		section: "Monotype",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Duo Type Clause', 'Team Preview'],
		banlist: ['Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina',
			'Giratina-O', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia','Mewtwo','Palkia','Rayquaza','Reshiram',
			'Shaymin-Sky','Talonflame','Xerneas','Yveltal','Zekrom','Damp Rock','Gengarite','Kangaskanite','Lucarionite',
			'Mawilite','Salamencite','Slowbronite','Soul Dew','Double Team','Minimize','Swagger'
		]
	},
/*	{
		name: "Random Monotype",
		section: "Monotype",
		column: 2,

		team: 'randommonotype',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},*/
	{
		name: "Tier Shift Monotype",
		section: "Monotype",
		column: 2,

		mod: 'tiershift',
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Shaymin-Sky', 'Slowbronite', 'Soul Dew'
		]
	},
	{
		name: "Ubers Monotype",
		section: "Monotype",

		ruleset: ['Pokemon', 'Standard Ubers', 'Same Type Clause'],
		banlist: []
	},
	{
		name: "UU Monotype",
		section: "Monotype",

		ruleset: ['OU', 'Same Type Clause'],
		banlist: ['OU', 'BL', 'Heracronite', 'Medichamite', 'Gardevoirite', 'Drizzle', 'Drought']
	},
	{
		name: "RU Monotype",
		section: "Monotype",

		ruleset: ['UU', 'Same Type Clause'],
		banlist: ['UU', 'BL2']
	},
	{
		name: "NU Monotype",
		section: "Monotype",

		ruleset: ['RU (beta)', 'Same Type Clause'],
		banlist: ['RU', 'BL3']
	},
	{
		name: "LC Monotype",
		section: "Monotype",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup', 'Same Type Clause'],
		banlist: ['Dragon Rage', 'Sonic Boom', 'Swagger', 'LC Uber', 'Gligar']
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		section: "BW2 Singles",
		column: 3,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	{
		name: "[Gen 5] Ubers",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: []
	},
	{
		name: "[Gen 5] UU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning']
	},
	{
		name: "[Gen 5] RU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning']
	},
	{
		name: "[Gen 5] NU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist']
	},
	{
		name: "[Gen 5] LC",
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Scyther', 'Sneasel', 'Tangela']
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		validateSet: function (set) {
			if (!set.level || set.level >= 50) set.forcedLevel = 50;
			return [];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		banlist: ['Sky Drop', 'Dark Void']
	},
	{
		name: "[Gen 5] Custom Game",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Doubles OU",
		section: 'BW2 Doubles',
		column: 3,

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void', 'Soul Dew', 'Sky Drop',
			'Mewtwo',
			'Lugia',
			'Ho-Oh',
			'Kyogre',
			'Groudon',
			'Rayquaza',
			'Dialga',
			'Palkia',
			'Giratina', 'Giratina-Origin',
			'Arceus',
			'Reshiram',
			'Zekrom',
			'Kyurem-White'
		]
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Sky Drop', 'Dark Void']
	},
	{
		name: "[Gen 5] Doubles Custom Game",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		section: "Past Generations",
		column: 3,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 4] Ubers",
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus']
	},
	{
		name: "[Gen 4] UU",
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL']
	},
	{
		name: "[Gen 4] LC",
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma']
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 3] OU",
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain']
	},
	{
		name: "[Gen 3] Ubers",
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers']
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 2] OU",
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 2] Random Battle",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard']
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] OU",
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 1] OU (tradeback)",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Random Battle",
		section: "Past Generations",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	/*{
		name: "[Gen 1] Challenge Cup",
		section: "Past Generations",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},*/
	{
		name: "[Gen 1] Stadium",
		section: "Past Generations",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Super Staff Bros.",
		section: "Other Metagames",
	   
		team: 'randomOMAuth',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
			onBegin: function () {
				// This seasonal gets a bit from Super Smash Bros., that's where the initial message comes from.
				this.add('message', "GET READY FOR THE NEXT BATTLE!");
				// This link leads to a post where all signature moves can be found so the user can use this resource while battling.
				this.add("raw|Seasonal help for moves can be found <a href='http://pastebin.com/a9myzB9c'>here.</a>");
				// This variable saves the status of a spammy conversation to be played, so it's only played once.
				this.convoPlayed = false;
	 
				// This code here is used for the renaming of moves showing properly on client.
				var globalRenamedMoves = {
					'defog': "Defrog"
				};
				var customRenamedMoves = {};
				var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
	 
				for (var i = 0, len = allPokemon.length; i < len; i++) {
					var pokemon = allPokemon[i];
					var last = pokemon.moves.length - 1;
					if (pokemon.moves[last]) {
						pokemon.moves[last] = toId(pokemon.set.signatureMove);
						pokemon.moveset[last].move = pokemon.set.signatureMove;
						pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
					}
					for (var j = 0; j < pokemon.moveset.length; j++) {
						var moveData = pokemon.moveset[j];
						if (globalRenamedMoves[moveData.id]) {
							pokemon.moves[j] = toId(pokemon.set.signatureMove);
							moveData.move = globalRenamedMoves[moveData.id];
							pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
						}
						if (customRenamedMoves[pokemon.name] && customRenamedMoves[pokemon.name][moveData.id]) {
							pokemon.moves[j] = toId(pokemon.set.signatureMove);
							moveData.move = customRenamedMoves[pokemon.name][moveData.id];
							pokemon.baseMoveset[j].move = customRenamedMoves[pokemon.name][moveData.id];
						}
					}
					if (pokemon.name === '%Pikachuun') {
						var hprat = pokemon.hp/pokemon.maxhp;
						pokemon.baseStats = {atk:348, def:155, spa:266, spd:207, spe:419};
						pokemon.maxhp = 270;
						pokemon.hp = Math.floor(pokemon.maxhp*hprat);
						//This corresponds to 70 / 132 / 72 / 120 / 90 / 149 Stats, because I keep forgetting them...
					}
					if (pokemon.name === '+insanelegend') {
						var hprat = pokemon.hp/pokemon.maxhp;
						pokemon.baseStats = {hp:334, atk:150, def:217, spa:129, spd:138, spe:108};
						pokemon.maxhp = 334;
						pokemon.hp = Math.floor(pokemon.maxhp*hprat);
					}
				}
			},
			// Here we add some flavour or design immunities.
			onImmunity: function (type, pokemon) {
				//stuff
			},
			// Hacks for megas changed abilities. This allow for their changed abilities.
			onUpdate: function (pokemon, target) {
				var name = toId(pokemon.name);
	 
				if (pokemon.template.isMega) {
					if (name === 'snaquaza' && !pokemon.ascensionCount && !pokemon.ascended) {
						pokemon.ascensionCount = -1;
					}
					if (name === 'leafshield' && pokemon.getAbility().id === 'lightningrod') {
						pokemon.setAbility('chlorophyll');
						this.add('-ability', pokemon, pokemon.ability);
					}
				}
			},
			// Here we treat many things, read comments inside for information.
			onSwitchIn: function (pokemon) {
				var name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
				if (pokemon.marked && pokemon.marked > 0) { //Pikachuun's 11th Moonspeak Move
					this.add('-message', "活性化されたマーキング！");
					if (pokemon.ability === 'sturdy' && pokemon.marked >= pokemon.maxhp && pokemon.hp === pokemon.maxhp) pokemon.ability = 'nullified';
					if ((pokemon.item === 'focussash' && pokemon.marked >= pokemon.maxhp && pokemon.hp === pokemon.maxhp) || pokemon.item === 'focusband') pokemon.item = 'nullified';
					this.moveHit(pokemon, pokemon, 'moonspeak', {damage: pokemon.marked});
					pokemon.marked = 0;
				}
				if (pokemon.side.ascensionBoost) {
					var aB = pokemon.side.ascensionBoost;
					if (aB > 0) {
						this.add('-message', "@Snaquaza couldn't have been stopped from ascending early!");
						aB = 1;
						var potato = 'ascended snek';
					} else {
						this.add('-message', "@Snaquaza gets his revenge for not ascending on time!");
						aB = -2;
						var potato = 'banned snek';
					}
					this.boost({atk:aB, def:aB, spa:aB, spd:aB, spe:aB, accuracy:aB}, pokemon, pokemon, potato);
					pokemon.side.ascensionBoost = 0;
				}
				//Tour Win
				if (pokemon.side.getSideCondition('tourwin')) {
					this.boost({spe:1}, pokemon, pokemon, 'tour win');
					pokemon.side.removeSideCondition('tourwin');
				}
				// No OP pls. Balance stuff, changing them upon switch in. Wonder Guard gets curse to minimise their turns out.
				if (pokemon.getAbility().id === 'wonderguard') {
					this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
				}
				// Weak Pokémon get a boost so they can fight amongst the other monsters.
				// Ransei is just useless, so the boosts are a prank. Uselesscrab is legitimately useless.
				if (name === 'manu11' && !pokemon.illusion) {
					this.boost({spa:1, spd:1, spe:1}, pokemon, pokemon, 'surskit powers');
				}
				if (name === 'uselesscrab' && !pokemon.illusion) {
					this.boost({atk:-12, def:-12, spa:-12, spd:-12, spe:-12, accuracy:-12, evasion:-12}, pokemon, pokemon, 'being useless');
				}
				if (name === 'adrianmarinbh' && !pokemon.illusion) {
					this.boost({def:1, spd:1}, pokemon, pokemon, 'stallish tactics');
				}
				if (name === 'dremz' && !pokemon.illusion) {
					this.boost({atk:3, def:1, spd:2}, pokemon, pokemon, 'weed');
				}
				if (name === 'insanelegend' && !pokemon.illusion) {
					this.boost({atk:1, def:1, spa:1, spd:1}, pokemon, pokemon, 'illumimodi');
				}
				if (name === 'lucina09' && !pokemon.illusion) {
					this.boost({atk:1, def:1, spd:1, spe:2}, pokemon, pokemon, 'kawaii-ness');
				}
				if (name === 'ransei' && !pokemon.illusion) {
					this.boost({atk:6, def:6, spa:6, spd:6, spe:6, accuracy:6}, pokemon, pokemon, 'divine grace');
				}
				if (name === 'choonbot' && !pokemon.illusion) {
					this.boost({spa:4, spe:2}, pokemon, pokemon, 'recent update');
				}
	 
				// Add here more hacky stuff for mega abilities.
				// This happens when the mega switches in, as opposed to mega-evolving on the turn.
				var oldAbility = pokemon.ability;
				if (pokemon.template.isMega) {
					if (name === 'leafshield' && pokemon.getAbility().id !== 'chlorophyll') {
						pokemon.setAbility('chlorophyll');
						this.add('-ability', pokemon, pokemon.ability);
					}
				} else {
					pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
				}
	 
				// Add here special typings, done for flavour mainly.
				if (name === 'piccolo' && !pokemon.illusion) {
					this.add('-start', pokemon, 'typechange', 'Fairy/Grass');
					pokemon.typesData = [
						{type: 'Fairy', suppressed: false,  isAdded: false},
						{type: 'Grass', suppressed: false,  isAdded: false}
					];
				}
				if (name === 'adrianmarinbh' && !pokemon.illusion) {
					this.add('-start', pokemon, 'typechange', 'Dragon/Fairy');
					pokemon.typesData = [
						{type: 'Dragon', suppressed: false,  isAdded: false},
						{type: 'Fairy', suppressed: false,  isAdded: false}
					];
				}
				if (name === 'dremz' && !pokemon.illusion) {
					this.add('-start', pokemon, 'typechange', 'Grass/Fire');
					pokemon.typesData = [
						{type: 'Grass', suppressed: false,  isAdded: false},
						{type: 'Fire', suppressed: false,  isAdded: false}
					];
				}
				if (name === 'insanelegend' && !pokemon.illusion) {
					this.add('-start', pokemon, 'typechange', 'Normal/Water');
					pokemon.typesData = [
						{type: 'Normal', suppressed: false,  isAdded: false},
						{type: 'Water', suppressed: false,  isAdded: false}
					];
				}
				if (name === 'lucina09' && !pokemon.illusion) {
					this.add('-start', pokemon, 'typechange', 'Normal/Fairy');
					pokemon.typesData = [
						{type: 'Normal', suppressed: false,  isAdded: false},
						{type: 'Fairy', suppressed: false,  isAdded: false}
					];
				}
			   
				//0Loyd0's custom moves go here
				if (name === '0loyd0' && !pokemon.illusion && !pokemon.customs) {
					pokemon.customs = [Math.floor(Math.random()*3) + 1, Math.floor(Math.random()*3) + 1, Math.floor(Math.random()*3) + 1, Math.floor(Math.random()*3) + 1];
					this.add('-message', '0Loyd0\'s custom moveset is ' + pokemon.customs[0] + '/' + pokemon.customs[1] + '/' + pokemon.customs[2] + '/' + pokemon.customs[3] + '!');
				}
	 
				// Edgy switch-in sentences go here.
				// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
				var sentences = [];
				var sentence = '';
			   
				// Room Owners.
				if (name === 'eeveegeneral') {
					sentences = ['Eevee army assemble!', 'To the ramparts!', 'You and what army?'];
					this.add('c|#Eevee General|' + sentences[this.random(3)]);
				}
				if (name === 'hollywood') {
					this.add('c|#hollywood|Kappa');
				}
				if (name === 'joim') {
					var dice = this.random(4);
					if (dice === 1) {
						// Fullscreen toucan!
						this.add('-message', '░░░░░░░░▄▄▄▀▀▀▄▄███▄');
						this.add('-message', '░░░░░▄▀▀░░░░░░░▐░▀██▌');
						this.add('-message', '░░░▄▀░░░░▄▄███░▌▀▀░▀█');
						this.add('-message', '░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌');
						this.add('-message', '░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄');
						this.add('-message', '░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄');
						this.add('-message', '░░░░░░░░░░░░░▐░░░░▐███████████▄');
						this.add('-message', '░░blessed by░░░░▐░░░░▐█████████████▄');
						this.add('-message', '░░le toucan░░░░░░▀▄░░░▐██████████████▄');
						this.add('-message', '░░░░░░ of ░░░░░░░░▀▄▄████████████████▄');
						this.add('-message', '░░░░░luck░░░░░░░░░░░░░█▀██████');
					} else if (dice === 2) {
						// Too spammy, sends it to chat only.
						this.add('c|~Joim|░░░░░░░░░░░░▄▐');
						this.add('c|~Joim|░░░░░░▄▄▄░░▄██▄');
						this.add('c|~Joim|░░░░░▐▀█▀▌░░░░▀█▄');
						this.add('c|~Joim|░░░░░▐█▄█▌░░░░░░▀█▄');
						this.add('c|~Joim|░░░░░░▀▄▀░░░▄▄▄▄▄▀▀');
						this.add('c|~Joim|░░░░▄▄▄██▀▀▀▀');
						this.add('c|~Joim|░░░█▀▄▄▄█░▀▀');
						this.add('c|~Joim|░░░▌░▄▄▄▐▌▀▀▀');
						this.add('c|~Joim|▄░▐░░░▄▄░█░▀▀ U HAVE BEEN SPOOKED');
						this.add('c|~Joim|▀█▌░░░▄░▀█▀░▀');
						this.add('c|~Joim|░░░░░░░▄▄▐▌▄▄ BY THE');
						this.add('c|~Joim|░░░░░░░▀███▀█░▄');
						this.add('c|~Joim|░░░░░░▐▌▀▄▀▄▀▐▄ SPOOKY SKILENTON');
						this.add('c|~Joim|░░░░░░▐▀░░░░░░▐▌');
						this.add('c|~Joim|░░░░░░█░░░░░░░░█');
						this.add('c|~Joim|░░░░░▐▌░░░░░░░░░█');
						this.add('c|~Joim|░░░░░█░░░░░░░░░░▐▌SEND THIS TO 7 PPL OR SKELINTONS WILL EAT YOU');
					} else if (dice === 3) {
						this.add('-message', '░░░░░░░░░░░░▄▄▄▄░░░░░░░░░░░░░░░░░░░░░░░▄▄▄▄▄');
						this.add('-message', '░░░█░░░░▄▀█▀▀▄░░▀▀▀▄░░░░▐█░░░░░░░░░▄▀█▀▀▄░░░▀█▄');
						this.add('-message', '░░█░░░░▀░▐▌░░▐▌░░░░░▀░░░▐█░░░░░░░░▀░▐▌░░▐▌░░░░█▀');
						this.add('-message', '░▐▌░░░░░░░▀▄▄▀░░░░░░░░░░▐█▄▄░░░░░░░░░▀▄▄▀░░░░░▐▌');
						this.add('-message', '░█░░░░░░░░░░░░░░░░░░░░░░░░░▀█░░░░░░░░░░░░░░░░░░█');
						this.add('-message', '▐█░░░░░░░░░░░░░░░░░░░░░░░░░░█▌░░░░░░░░░░░░░░░░░█');
						this.add('-message', '▐█░░░░░░░░░░░░░░░░░░░░░░░░░░█▌░░░░░░░░░░░░░░░░░█');
						this.add('-message', '░█░░░░░░░░░░░░░░░░░░░░█▄░░░▄█░░░░░░░░░░░░░░░░░░█');
						this.add('-message', '░▐▌░░░░░░░░░░░░░░░░░░░░▀███▀░░░░░░░░░░░░░░░░░░▐▌');
						this.add('-message', '░░█░░░░░░░░░░░░░░░░░▀▄░░░░░░░░░░▄▀░░░░░░░░░░░░█');
						this.add('-message', '░░░█░░░░░░░░░░░░░░░░░░▀▄▄▄▄▄▄▄▀▀░░░░░░░░░░░░░█');
					} else {
						sentences = ["Gen 1 OU is a true skill metagame.", "Finally a good reason to punch a teenager in the face!", "So here we are again, it's always such a pleasure.", "( ͝° ͜ʖ͡°)"].randomize();
						sentence = sentences[0];
						this.add('c|#Joim|' + sentence);
					}
				}
				if (name === 'theimmortal') {
					this.add('c|~The Immortal|Give me my robe, put on my crown!');
				}
	 
				// Global leaders who actually visit
				if (name === 'verbatim') {
					this.add('c|&verbatim|All in');
				}
	 
				// Moderators
				if (name === 'arcticblast') {
					sentences = ['BEAR MY ARCTIC BLAST', 'lmao what kind of team is this', 'guys guys guess what?!?!?!?!', 'Double battles are completely superior to single battles.', 'I miss the days when PS never broke 100 users and all the old auth were still around.'];
					this.add('c|@Arcticblast|' + sentences[this.random(5)]);
				}
				if (name === 'betahousing') {
					this.add('c|@BetaHousing|why do you sound like a teen talking to his parents and saying to them "It\'s not a phase, this is who I am"'); //no u
				}
				if (name === 'dell') {
					this.add('c|@Dell|<[~.~]> Next best furry besides Yoshi taking the stand!');
				}
				if (name === 'imas234') { //Swirlix
					this.add('c|@imas234|n_N'); //;_;
				}
				if (name === 'piccolo') { //Xerneas
					sentences = ['DANK', 'dank meme', 'imas needs pet'];
					this.add('c|@piccolo|' + sentences[this.random(3)]); //your memes were too dank for me
				}
				if (name === 'rekeri') {
					this.add('c|@rekeri|Get Rekeri\'d :]');
				}
				if (name === 'rosiethevenusaur') {
					sentences = ['!dt party', 'Are you Wifi whitelisted?', 'Read the roomintro!'];
					this.add('c|@RosieTheVenusaur|' + sentences[this.random(3)]);
				}
				if (name === 'snaquaza') { //Rayquaza + Dragon Ascent
					this.add('c|@Snaquaza|Terrorizing PS since 2012.') //ASK HIM
				}
				if (name === 'unfixable') {  //Cacnea duh
					this.add('c|@unfixable|no boo!') //ASK HIM
				}
				if (name === 'uselesscrab') {
					this.add('c|@uselesscrab|/me !'); //i played really badly anyway
				}
				if (name === 'xfix') {
					var hazards = {stealthrock: 1, spikes: 1, toxicspikes: 1, stickyweb: 1};
					var hasHazards = false;
					for (var hazard in hazards) {
						if (pokemon.side.getSideCondition(hazard)) {
							hasHazards = true;
							break;
						}
					}
					if (hasHazards) {
						this.add('c|@xfix|(no haz... too late)');
					} else {
						this.add('c|@xfix|(no hazards, attacks only, final destination)');
					}
				}
	 
				// Drivers.
				if (name === 'adrianmarinbh') { //is mime
					sentences = ['tech me hao pla', 'i dun no hao pokeymanz', 'i am an aran maran http://i.imgur.com/KBNU2CUh.jpg prezz A 2 plai', 'heloz i am random personz'];
					this.add('c|%Adrian Marin BH|' + sentences[this.random(4)]);
				}
				if (name === 'bottt') { //It's ttt
					this.add('c|%boTTT|Welcome to boTTT!');
				}
				if (name === 'cactuscacti') { //Maractus with Metronome that only calls hax moves
					this.add('c|%CactusCacti|DICKS'); //oh my
				}
				if (name === 'e4flint') { //Something really offensive (get your mind out of the gutter)
					this.add('c|%E4 Flint|lel'); //*shrugs
				}
				if (name === 'kidwizard') {
					this.add('c|%Kid Wizard|I should be a mod by now.');
				}
				if (name === 'kl4ng') { //Probably Klang
					this.add('c|%Kl4ng|**praise**'); //>.>
				}
				if (name === 'manu11') { //Surskit
					this.add('c|%manu 11|yo'); //bs
				}
				if (name === 'peefrimgar') {
					this.add('c|%Peef Rimgar|I am Peef. Hear me Roar!');
				}
				if (name === 'pikachuun') { //Is Pikachu
					sentences = ['o3o', '.3.', '¥(°∀°)¥', '(´･ω･`)', '(.3.)/', 'soup', 'WELCOME TO THE SPACE JAM! HERE\'S YOUR CHANCE DO YOUR DANCE AT THE SPACE JAM, ALRIGHT!', '2hu is best animu', '⑨'];
					this.add('c|%Pikachuun|' + sentences[this.random(9)]);
				}
				if (name === 'quotecs') {
					this.add('c|%QuoteCS|Yeah, I know what you mean, but unfortunately I lack good answers to those because of my incredibly dry personality.');
				}
	 
				// Voices.
		   
				if (name === '0loyd0') {
					this.add('c|+0Loyd0|I shall end you. o.O');
				}
				if (name === 'aesf') {
					this.add('c|+aesf|I am completely balanced');
				}
				if (name === 'dremz') {
					this.add('c|+DreMZ|smoke');
					this.add('c|+DreMZ|weed');
					this.add('c|+DreMZ|every');
					this.add('c|+DreMZ|day!');
				}
				if (name === 'insanelegend') {
					this.add('c|+insanelegend|The OM mods are controlled by lizard people!');
				}
				if (name === 'illusio') { //Chatot
					this.add('c|+Illusio|Flying types rule!');
				}
				if (name === 'imanalt') {
					this.add('c|+imanalt|muh bulk');
				}
				if (name === 'kitkasai') {
					this.add('c|+Kit Kasai|spooky'); //Should've looked like Kyurem-Black
				}
				if (name === 'lcass4919') { //Xatu
					this.add('c|+lcass4919|the allmighty xatu warrior shall smite you')
				}
				if (name === 'leafshield') {
					this.add('c|+Leafshield|hi');
				}
				if (name === 'lucina09') {
					this.add('c|+Lucina09|Please take it nice and easy. I\'m a noob. (◡‿◡✿)');
				}
				if (name === 'mamp') {
					this.add('c|+Mamp|Hey everyone. Remember to vote Averagemons.');
				}
				if (name === 'ransei') {
					this.add('c|+Ransei|I am an innovamania clone and I am proud')
				}
				if (name === 'shaymin') {
					this.add('c|+shaymin|Ready for hax?');
				}
				if (name === 'word') {
					var keys = '1234567890qwertyuiopasdfghjklzxcvbnm';
					var username = '';
					var rng = -8;
					var stillgoing = true;
					while (stillgoing) {
						username += keys[this.random(keys.length)];
						rng++;
						if (Math.floor(Math.random() * rng) > 0 || username.length === 19) stillgoing = false;
					}
					this.add('c|+word|//nick ' + username);
				}
				if (name === 'yoman5') {
					this.add('c|+yoman5|yolo'); //Shouldn't have tried to play dota at the same time
				}
		   
				//And ChoonBot is here too
				if (name === 'choonbot') { //Pichu
					this.add('c| ChoonBot|Hello! This is a test command I made to see if the bot is working.');        
					/*ReferenceError: child_process is not defined*/
				}
		   
		   
				//Stat Change Messages
				if (name === 'pikachuun' && !pokemon.illusion && !pokemon.baseStatChange) {
					this.add('-message', '%Pikachuun: Wait, I haven\'t been sent out yet? Well then...');
					this.add('-message', '%Pikachuun: BEHOLD DOOR, I SHALL NOW DEFEAT YOU WITH MY SUPERIOR MENTAL MIND POWERS! GRANT ME ACCESS, I COMMAND YOU!!!!');
					this.add('-anim', pokemon, "Geomancy", pokemon);
					this.add('-anim', pokemon, "Geomancy", pokemon);
					this.add('-message', 'Pikachuun has powered up! A door has opened somewhere!');
					pokemon.baseStatChange = true;
				}
				if (name === 'insanelegend' && !pokemon.illusion && !pokemon.baseStatChange) {
					this.add('-message', 'insanelegend has recieved buffs from Tier Shift!');
					pokemon.baseStatChange = true;
				}
				if (name === 'mamp' && !pokemon.illusion && !pokemon.baseStatChange) {
					this.add('-message', 'Mamp has become his Averagemons equivalent!');
					pokemon.baseStatChange = true;
				}
			},
			// Here we deal with some special mechanics due to custom sets and moves.
			onBeforeMove: function (pokemon, target, move) {
				var name = toId(pokemon.name);
				// Special Shaymin forme change.
				if (name === 'shaymin' && !pokemon.illusion) {
					var targetSpecies = (move.category === 'Status') ? 'Shaymin' : 'Shaymin-Sky';
	 
					if (targetSpecies !== pokemon.template.species) {
						this.add('message', pokemon.name + ((move.category === 'Status') ? ' has reverted to Land Forme!' : ' took to the sky once again!'));
						var template = this.getTemplate(targetSpecies);
						pokemon.formeChange(targetSpecies);
						pokemon.baseTemplate = template;
						pokemon.setAbility(template.abilities['0']);
						pokemon.baseAbility = template.ability;
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						this.add('detailschange', pokemon, pokemon.details);
					}
				}
	 
				// Break the secondary of Dell's sig if an attack is attempted.
				if (target.volatiles['parry'] && move.category !== 'Status') {
					target.removeVolatile('parry');
				}
	 
				if (pokemon.volatiles['needles']) {
					var dice = this.random(3);
					pokemon.removeVolatile('needles');
					if (dice === 2) {
						this.boost({atk:1, spe:1, def:-1}, pokemon, pokemon, 'used needles');
					} else if (dice === 1) {
						this.boost({def:1, spd:1, spe:-1}, pokemon, pokemon, 'used needles');
					} else {
						this.boost({atk:1, def:1, spe:-1}, pokemon, pokemon, 'used needles');
					}
				}
	 
				if (move.id === 'judgment' && name === 'shrang' && !pokemon.illusion) {
					this.add('-start', pokemon, 'typechange', 'Dragon/Fairy');
					pokemon.typesData = [
						{type: 'Dragon', suppressed: false,  isAdded: false},
						{type: 'Fairy', suppressed: false,  isAdded: false}
					];
				}
			},
			// Various
			onModifyPriority: function (priority, pokemon, target, move) {
				var name = toId(pokemon.name);
				if (name === 'kl4ng' && target.name === '%E4 Flint' && move.id === 'geargrind') {
					return 1;
				}
				if (name === '0loyd0' && move.id === 'focuspunch') {
					if (move.name === 'Falcon Dash Punch' || pokemon.customs[0] === 2) return 0;
					if (move.name === 'Mighty Falcon Punch' || pokemon.customs[0] === 3) return -7;
				} else if (name === '0loyd0' && move.id === 'skyuppercut') {
					if (move.name === 'Heavy Raptor Boost' || pokemon.customs[1] === 2) return -1;
					if (move.name === 'Wind-up Raptor Boost' || pokemon.customs[1] === 3) return 1;
				} else if (name === '0loyd0' && move.id === 'dive') {
					if (move.name === 'Falcon Strike' || pokemon.customs[2] === 2) return 1;
					if (move.name === 'Explosive Falcon Dive' || pokemon.customs[2] === 3) return -1;
				}
			},
			// Add here salty tears, that is, custom faint phrases.
			onFaint: function (pokemon) {
				if (pokemon.illusioTransformed) {
					pokemon.name = '+Illusio';
					pokemon.illusioTransformed = false;
				}
				var name = toId(pokemon.name);
				var sentences = [];
				var sentence = '';
	 
				// Admins.
				if (name === 'eeveegeneral') {
					this.add('c|#Eevee General|' + ['Retreat!', 'You may have won the battle, but you haven\'t won the war!'][this.random(2)]);
				}
				if (name === 'hollywood') {
					this.add('c|#hollywood|BibleThump');
				}
				if (name === 'joim') {
					sentences = ['AVENGE ME, KIDS! AVEEEENGEEE MEEEEEE!!', '``This was a triumph, I\'m making a note here: HUGE SUCCESS.``', '``Remember when you tried to kill me twice? Oh how we laughed and laughed! Except I wasn\'t laughing.``', '``I\'m not even angry, I\'m being so sincere right now, even though you broke my heart and killed me. And tore me to pieces. And threw every piece into a fire.``'];
					this.add('c|#Joim|' + sentences[this.random(4)]);
				}
				if (name === 'theimmortal') {
					this.add('c|~The Immortal|Oh how wrong we were to think immortality meant never dying.');
				}
	 
				// Leaders who actually visit
				if (name === 'verbatim') {
					this.add('c|&verbatim|Crash and Burn');
				}
	 
				// Mods.
				if (name === 'arcticblast') {
					sentences = ['totally had it but choked, gg', 'I would have won if it weren\'t for HAX', 'oh', 'Double battles are stil superior to single battles.', 'newfag'];
					this.add('c|@Arcticblast|' + sentences[this.random(5)]);
				}
				if (name === 'betahousing') {
					this.add('c|@BetaHousing|:I');
				}
				if (name === 'dell') {
					this.add('c|@Dell|All because I couldn\'t use Yoshi...');
					this.add('c|@Dell|───────────────████─███────────');
					this.add('c|@Dell|──────────────██▒▒▒█▒▒▒█───────');
					this.add('c|@Dell|─────────────██▒────────█──────');
					this.add('c|@Dell|─────────██████──██─██──█──────');
					this.add('c|@Dell|────────██████───██─██──█──────');
					this.add('c|@Dell|────────██▒▒▒█──────────███────');
					this.add('c|@Dell|────────██▒▒▒▒▒▒───▒──██████───');
					this.add('c|@Dell|───────██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███─');
					this.add('c|@Dell|──────██▒▒▒▒─────▒▒▒▒▒▒▒▒▒▒▒▒█─');
					this.add('c|@Dell|──────██▒▒▒───────▒▒▒▒▒▒▒█▒█▒██');
					this.add('c|@Dell|───────██▒▒───────▒▒▒▒▒▒▒▒▒▒▒▒█');
					this.add('c|@Dell|────────██▒▒─────█▒▒▒▒▒▒▒▒▒▒▒▒█');
					this.add('c|@Dell|────────███▒▒───██▒▒▒▒▒▒▒▒▒▒▒▒█');
					this.add('c|@Dell|─────────███▒▒───█▒▒▒▒▒▒▒▒▒▒▒█─');
					this.add('c|@Dell|────────██▀█▒▒────█▒▒▒▒▒▒▒▒██──');
					this.add('c|@Dell|──────██▀██▒▒▒────█████████────');
					this.add('c|@Dell|────██▀███▒▒▒▒────█▒▒██────────');
					this.add('c|@Dell|█████████▒▒▒▒▒█───██──██───────');
					this.add('c|@Dell|█▒▒▒▒▒▒█▒▒▒▒▒█────████▒▒█──────');
					this.add('c|@Dell|█▒▒▒▒▒▒█▒▒▒▒▒▒█───███▒▒▒█──────');
					this.add('c|@Dell|█▒▒▒▒▒▒█▒▒▒▒▒█────█▒▒▒▒▒█──────');
					this.add('c|@Dell|██▒▒▒▒▒█▒▒▒▒▒▒█───█▒▒▒███──────');
					this.add('c|@Dell|─██▒▒▒▒███████───██████────────');
					this.add('c|@Dell|──██▒▒▒▒▒██─────██─────────────');
					this.add('c|@Dell|───██▒▒▒██─────██──────────────');
					this.add('c|@Dell|────█████─────███──────────────');
					this.add('c|@Dell|────█████▄───█████▄────────────');
					this.add('c|@Dell|──▄█▓▓▓▓▓█▄─█▓▓▓▓▓█▄───────────');
					this.add('c|@Dell|──█▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓█──────────');
					this.add('c|@Dell|──█▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓█──────────');
					this.add('c|@Dell|──▀████████▀▀███████▀──────────');
				}
				if (name === 'imas234') {
					this.add('c|@imas234|;_;');
				}
				if (name === 'piccolo') {
					this.add('c|@piccolo|your memes were too dank for me');
				}
				if (name === 'rekeri') {
					this.add('c|@rekeri|lucky af :[');
				}
				if (name === 'rosiethevenusaur') {
					this.add('c|@RosieTheVenusaur|' + ['SD SKARM SHALL LIVE AGAIN!!!', 'Not my WiFi!'][this.random(2)]);
				}
				if (name === 'snaquaza') {
					this.add('c|@Snaquaza|You can\'t stop me anyway!');
					if (pokemon.ascended && pokemon.ascensionCount) {
						if (pokemon.ascensionCount < 0) {
							pokemon.side.ascensionBoost = 2;
						} else if (pokemon.ascended ) {
							pokemon.side.ascensionBoost = 3 - pokemon.ascensionCount;
						}
						pokemon.ascensionCount = 0;
					} else {
						pokemon.ascended = -2;
						pokemon.ascensionCount = 0;
					}
				}
				if (name === 'unfixable') {
					this.add('c|@unfixable|i may be dead but at least my eyebrows are better than yours');
				}
				if (name === 'uselesscrab') {
					this.add('c|@uselesscrab|i played really badly anyway');
				}
				if (name === 'xfix') {
					var foe = pokemon.side.foe.active[0];
					if (foe.name === '@xfix') {
						this.add('c|@xfix|(annoying Dittos...)');
					} else if (foe.ability === 'magicbounce') {
						this.add('c|@xfix|(why ' + foe.name + ' has Magic Bounce...)');
						this.add('c|@xfix|(gg... why...)');
					} else {
						this.add('c|@xfix|(gg... I guess)');
					}
				}
	 
				// Drivers.
				if (name === 'adrianmarinbh') {
					this.add('c|%Adrian Marin BH|imas saks');
				}
				if (name === 'bottt') {
					this.add('-message', '(Automated response: Your battle contained a banned outcome.)');
				}
				if (name === 'cactuscacti') {
					this.add('c|%CactusCacti|oh my');
				}
				if (name === 'e4flint') {
					this.add('c|%E4 Flint|*shrugs');
				}
				if (name === 'kidwizard') {
					this.add('c|%Kid Wizard|This room sucks.');
				}
				if (name === 'kl4ng') {
					this.add('c|%Kl4ng|>.>');
				}
				if (name === 'manu11') {
					this.add('c|%manu 11|bs');
				}
				if (name === 'peefrimgar') {
					this.add('c|%Peef Rimgar|Homophobe :(');
				}
				if (name === 'pikachuun') {
					sentences = ['*poof*', 'rib (;_;)7', 'sorsly', 'rest in potato', 'I TRIED SO HARD AND GOT SO FAR BUT IN THE END IT DOES\'NT EVEN MATTER', 'Remember kids, always wash your hands after washing your hands. ;^(', 'you\'re obviously cheating', 'for (var i in opponents) this.add(\'-message\', opponents[i] + \' is a nerd\')', 'YOU\'RE DUM N WEERD'];
					this.add('c|%Pikachuun|' + sentences[this.random(9)]);
				}
				if (name === 'quotecs') {
					this.add('c|%QuoteCS|#StillIrrelevant');
				}
	 
				// Ex-staff or honorary voice.
				if (name === 'aesf') {
					this.add('c|+aesf|Now I\'m 33-1 :(');
				}
				if (name === '0loyd0') {
					this.add('c|+0Loyd0|IL, you shall pay for this...');
				}
				if (name === 'dremz') {
					this.add('c|+DreMZ|rip');
					this.add('c|+DreMZ|in');
					this.add('c|+DreMZ|pepperonis');
					this.add('c|+DreMZ|;-;');
				}
				if (name === 'insanelegend') {
					this.add('c|+insanelegend|ILLUMIMODI CONFIRMED');
				}
				if (name === 'illusio') {
					this.add('c|+Illusio|*poof*');
				}
				if (name === 'imanalt') {
					this.add('c|+imanalt|bshax imo');
				}
				if (name === 'kitkasai') {
					this.add('c|+Kit Kasai|Should\'ve been Kyurem-Black');
				}
				if (name === 'lcass4919') {
					this.add('c|+lcass4919|:<');
				}
				if (name === 'leafshield') {
					this.add('c|+Leafshield|hi');
				}
				if (name === 'lucina09') {
					this.add('c|+Lucina09|>////////////////////////////////////////>');
				}
				if (name === 'mamp') {
					this.add('c|+Mamp|VOTE FOR AVERAGEMONS!!!!');
				}
				if (name === 'ransei') {
					this.add('c|+Ransei|brb changing alts');
				}
				if (name === 'shaymin') {
					this.add('c|+shaymin|You\'ve done well, perhaps...too well, even beating the odds!');
				}
				if (name === 'word') {
					//Random Excuse Generator. Let's go.
					var keys = '`1234567890-=qwertyuiop[]\\asdfghjkl;' + "'" + 'zxcvbnm,./';
					var reason = ['My eyes are', 'My CPU is', 'My ' + keys[Math.floor(Math.random()*47)] + ' key is', 'I am', 'The simulator is', 'Your Pokemon is', 'The lag is', 'My skills are', 'My phone is', 'My nose is', 'My mouse is', 'The battle is', 'You are', 'The Sun is', 'This game is', 'My hands are', 'My fingers are', 'Your team is', 'My butt is', 'My fingernails are', 'My breakfast is', 'Pikachuun is', 'My machine is', 'Your machine is', 'Pokemon Red and Blue are', 'Pokemon Gold and Silver are', 'Pokemon Ruby and Sapphire are', 'Pokemon Diamond and Pearl are', 'Pokemon Black and White are', 'Pokemon X and Y are', 'The matchmaking system is', 'My drink is', 'Your rank is', 'My lenny face is'];
					var excuse = ['too sweaty', 'too small', 'in my eyes', 'tired', 'too bright', 'in pain', 'too big', 'too loud', 'too annoying', 'self-destructing', 'broken', 'overpowered', 'messing up my thoughts', 'testing something', 'spammy', 'haxy', 'skillful', 'too laggy', 'too dull', 'itchy', 'too cold', 'too warm', 'too hard to see', 'johning too much', 'third-party', 'sweaty', 'calling me', 'saving you', 'having 0 PP', 'really feeling it!', 'stealing my set!', 'counter-teaming me!', 'counter-teaming the ladder!'];
					this.add('c|+word|' + reason[this.random(reason.length)] + ' ' + excuse[this.random(excuse.length)] + '.');
				}
				if (name === 'yoman5') {
					this.add('c|+yoman5|Shouldn\'t have tried to play dota at the same time');
				}
		   
				//And ChoonBot is here too
				if (name === 'choonbot') {
					this.add('c| ChoonBot|ReferenceError: child_process is not defined');
				}
			},
			// Special switch-out events for some mons.
			onSwitchOut: function (pokemon) {
				if (toId(pokemon.name) === 'hippopotas' && !pokemon.illusion) {
					this.add('-message', 'The sandstorm subsided.');
				}
				// Shaymin forme change.
				if (toId(pokemon.name) === 'shaymin' && !pokemon.illusion) {
					if (pokemon.template.species === 'Shaymin') {
						var template = this.getTemplate('Shaymin-Sky');
						pokemon.formeChange('Shaymin-Sky');
						pokemon.baseTemplate = template;
						pokemon.setAbility(template.abilities['0']);
						pokemon.baseAbility = template.ability;
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
					}
				}
	 
				// Illusio's special transform.
				if (pokemon.illusioTransformed) {
					pokemon.name = '+Illusio';
					pokemon.illusioTransformed = false;
				}
			   
				//Base stat changes go here, to give an appearance of consistency.
				if (pokemon.name === '%Pikachuun' && !pokemon.illusion) {
					var hprat = pokemon.hp/pokemon.maxhp;
					pokemon.baseStats = {atk:348, def:155, spa:266, spd:207, spe:419};
					//This corresponds to 70 / 132 / 72 / 120 / 90 / 149 Stats, because I keep forgetting them...
				}
				if (pokemon.name === '+insanelegend' && !pokemon.illusion) {
					var hprat = pokemon.hp/pokemon.maxhp
					pokemon.baseStats = {hp:334, atk:150, def:217, spa:129, spd:138, spe:108};
				}
			},
			onDragOut: function (pokemon) {
				// Prevents qtrx from being red carded by chaos while in the middle of using sig move, which causes a visual glitch.
				if (pokemon.isDuringAttack) {
				this.add('-message', "But the Unown Aura absorbed the effect!");
				return null;
			}
			if (pokemon.illusioTransformed) {
				pokemon.name = '+Illusio';
				pokemon.illusioTransformed = false;
			}
		},
		onAfterMoveSelf: function (source, target, move) {
			// Make Haunter not immune to Life Orb as a means to balance.
			if (toId(source.name) === 'haunter') {
				this.damage(source.maxhp / 10, source, source, this.getItem('lifeorb'));
			}
		},
		onModifyPokemon: function (pokemon) {
			var name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			// qtrx only has one move anyway. This isn't implemented for Cathy since her moves are all custom. Don't trick her a Scarf!
			if (name !== 'qtrx' && name !== 'Cathy') {
				var moves = pokemon.moveset;
				if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
					for (var i = 0; i < 3; i++) {
						if (!moves[i].disabled) {
							pokemon.disableMove(moves[i].id, false);
							moves[i].disabled = true;
						}
					}
				}
			}
			for (var p in pokemon.side.pokemon) {
				if (pokemon.side.pokemon[p].name === '%Pikachuun') {
					pokemon.side.pokemon[p].baseStats = {atk:348, def:155, spa:266, spd:207, spe:419};
					//This corresponds to 70 / 132 / 72 / 120 / 90 / 149 Stats, because I keep forgetting them...
				}
				if (pokemon.side.pokemon[p].name === '+insanelegend') {
					pokemon.side.pokemon[p].baseStats = {hp:334, atk:150, def:217, spa:129, spd:138, spe:108};
				}
				if (pokemon.side.pokemon[p].name === '+Mamp') {
					pokemon.side.pokemon[p].baseStats = {hp:324, atk:201, def:225, spa:284, spd:224, spe:312};
				}
			}
		},
		// Specific residual events for custom moves.
		// This allows the format to have kind of custom side effects and volatiles.
		onResidual: function (battle) {
			for (var s in battle.sides) {
				var thisSide = battle.sides[s];
				if (thisSide.premonTimer > 4) {
					thisSide.premonTimer = 0;
					thisSide.premonEffect = true;
				} else if (thisSide.premonTimer > 0) {
					if (thisSide.premonTimer === 4) thisSide.addSideCondition('safeguard');
					thisSide.premonTimer++;
				}
				for (var p in thisSide.active) {
					var pokemon = thisSide.active[p];
					var name = toId(pokemon.name);

					if (pokemon.side.premonEffect) {
						pokemon.side.premonEffect = false;
						this.add('c|@zdrup|...dary! __**LEGENDARY!**__');
						this.boost({atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1}, pokemon, pokemon, 'legendary premonition');
						pokemon.addVolatile('aquaring');
						pokemon.addVolatile('focusenergy');
					}
					if (pokemon.volatiles['paranoid'] && !pokemon.fainted && (pokemon.hp !== pokemon.maxhp)) {
						this.heal(pokemon.maxhp / 8, pokemon, pokemon);
						this.add('-message', pokemon.name + "'s stalling healed itself!");
					}
					if (pokemon.volatiles['unownaura'] && !pokemon.fainted && !pokemon.illusion) {
						this.add('-message', "Your keyboard is reacting to " + pokemon.name + "'s Unown aura!");
						if (this.random(2) === 1) {
							this.useMove('trickroom', pokemon);
						} else {
							this.useMove('wonderroom', pokemon);
						}
					}
					if (name === 'beowulf' && !pokemon.fainted && !pokemon.illusion) {
						this.add('c|@Beowulf|/me buzzes loudly!');
					}
					if (name === 'cathy' && !pokemon.fainted && !pokemon.illusion) {
						var messages = [
							'kicking is hilarious!',
							'flooding the chat log with kicks makes me lol',
							'please don\'t stop me from having fun',
							'having fun is great!',
							'isn\'t this so much fun?',
							'let\'s all have fun by spamming the channel!',
							'FUN FUN FUN',
							'SO MUCH FUN!',
							'^_^ fun times ^_^',
							'/me is having so much fun!',
							'having fun is great!',
							'/me thinks spam is fun!',
							'/me loves spamming this channel, because it\'s completely inconsequential!',
							'this is just the internet -- nothing matters!',
							'let\'s have fun ALL NIGHT LONG!!!!!!!!!!!!!!!!!!!!!!'
						];
						this.add('c|HappyFunTimes|' + messages[this.random(15)]);
					}
					if (pokemon.volatiles['parry']) {
						// Dell hasn't been attacked.
						pokemon.removeVolatile('parry');
						this.add('-message', "Untouched, the Aura Parry grows stronger still!");
						this.boost({def:1, spd:1}, pokemon, pokemon, 'Aura Parry');
					}
					if (name === 'snaquaza' && pokemon.template.isMega && !pokemon.ascended) {
						if (pokemon.ascensionCount < 0) {
							this.add('-message', "@Snaquaza is too powerful for this metagame, and needs to ascend to Anything Goes!");
							this.add('-message', "@Snaquaza has 3 turns remaining before he faints automatically! Use Ascension to get him into Anything Goes as soon as possible!");
							pokemon.ascensionCount = 1;
						} else if (pokemon.ascensionCount !== 3) {
							this.add('-message', "@Snaquaza has " + (3 - pokemon.ascensionCount) + " turns remaining before he faints automatically! Use Ascension to get him into Anything Goes as soon as possible!");
							pokemon.ascensionCount++;
						} else {
							this.add('-message', "@Snaquaza was unable to ascend in time!");
							pokemon.ascensionCount++;
							pokemon.ascended = -1;
							pokemon.faint();
						}
					}
				}
				for (var q in thisSide.pokemon) {
					if (q.name === '%Pikachuun') {
						var hprat = q.hp/q.maxhp;
						q.baseStats = {atk:348, def:155, spa:266, spd:207, spe:419};
						//This corresponds to 70 / 132 / 72 / 120 / 90 / 149 Stats, because I keep forgetting them...
					}
					if (q.name === '+insanelegend') {
						var hprat = q.hp/q.maxhp;
						q.baseStats = {hp:334, atk:150, def:217, spa:129, spd:138, spe:108};
					}
				}
			}
		},
		// A moonspeak move
		onGetDamage: function (pokemon, target, move) {
			if (move.id === 'cut' && pokemon.name === '%Pikachuun' && this.random(10) < 1) return target.maxhp;
		},
		// This is where the signature moves are actually done.
		onModifyMove: function (move, pokemon, target) {
			var name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
			// Prevent visual glitch with Spell Steal.
			move.effectType = 'Move';
			// Just because it's funny. It still is.
			if (move.id === 'defog') {
				move.name = 'Defrog';
				this.attrLastMove('[still]');
				this.add('-anim', pokemon, "Defog", pokemon);
			}

			// Room Owner signature moves.

			if (move.id === 'quickattack' && name === 'eeveegeneral') {
				move.name = 'War Crimes';
				move.type = 'Normal';
				move.category = 'Status';
				move.basePower = 0;
				move.onHit = function (pokemon, source) {
					this.directDamage(source.maxhp / 4, source, source);
					pokemon.addVolatile('curse');
					pokemon.addVolatile('confusion');
					this.add("c|#Eevee General|What's a Geneva Convention?");
				};
			} else if (move.id === 'swift' && name === 'eeveegeneral') {
				if (!pokemon.evoBeamHits && pokemon.evoBeamHits !== 0) pokemon.evoBeamHits = 0;
				move.name = 'Evo Beam';
				move.basePower = 22;
				move.category = 'Physical';
				move.basePowerCallback = function (pokemon) {
					var basePowerTable = [22, 44, 44, 52, 52, 26, 44, 52, 44];
					return basePowerTable[pokemon.evoBeamHits];
				};
				var eBH = pokemon.evoBeamHits;
				move.affectedByImmunities = false;
				move.multihit = 9;
				move.flags = {protect: 1, mirror: 1, authentic: 1};
				var tAb = target.ability;
				move.onTryHit = function (target, source, move) {
					target.ability = 'zoidberg'; //Why not?
					this.attrLastMove('[still]');
					var stringTable = ['Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon', 'Sylveon'];
					this.add('-message', stringTable[source.evoBeamHits] + '\'s attack!');
					var move = ['Secret Power', 'Hydro Pump', 'Charge Beam', 'Flamethrower', 'Psybeam', 'Dark Pulse', 'Leaf Storm', 'Ice Beam', 'Dazzling Gleam'][source.evoBeamHits];
					this.add('-anim', source, move, target);
				};
				move.onHit = function (target, pokemon, move) {
					var categoryTable = ['Physical', 'Special', 'Special', 'Physical', 'Special', 'Physical', 'Physical', 'Special', 'Special'];
					if (categoryTable[pokemon.evoBeamHits + 1]) move.category = categoryTable[pokemon.evoBeamHits + 1];
					var typeTable = ['Normal', 'Water', 'Electric', 'Fire', 'Psychic', 'Dark', 'Grass', 'Ice', 'Fairy'];
					if (typeTable[pokemon.evoBeamHits + 1]) move.type = typeTable[pokemon.evoBeamHits + 1];
					var secondaryTable = [{}, {chance: 20, boosts: {spe:-1}}, {chance: 20, status: 'par'}, {chance: 10, status: 'brn'}, {chance: 10, boosts: {spd:-1}}, {chance: 30, volatileStatus: 'flinch'}, {chance: 20, status: 'slp'}, {chance: 10, status: 'frz'}, {chance: 20, boosts: {spa:-1}}];
					if (secondaryTable[pokemon.evoBeamHits]) move.secondaries = [secondaryTable[pokemon.evoBeamHits]];
					pokemon.evoBeamHits++;
					target.ability = tAb;
				};
				move.onAfterMove = function (pokemon) {
					pokemon.evoBeamHits = 0;
				};
			}
			if (move.id === 'geomancy' && name === 'hollywood') {
				move.name = 'Meme Mime';
				move.isTwoTurnMove = false;
				move.onTry = function () {};
				move.boosts = {atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Geomancy", pokemon);
				};
			}
			if (move.id === 'milkdrink' && name === 'joim') {
				move.name = 'Red Bull Drink';
				move.boosts = {spa:1, spe:1, accuracy:1, evasion:-1};
				delete move.heal;
				move.onTryHit = function (pokemon) {
					if (pokemon.volatiles['redbull']) return false;
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Geomancy", pokemon);
				};
				move.onHit = function (pokemon) {
					if (pokemon.volatiles['redbull']) return false;
					pokemon.addVolatile('redbull');
				};
			}
			if (move.id === 'nightslash' && name === 'theimmortal') {
				move.name = 'Primordial Force';
				move.type = 'Dark';
				move.bp = 150;
				move.accuracy = true;
				move.pp = 5;
				move.ignoreDefensive = true;
				delete move.critRatio;
				move.flags = {authentic: 1};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Shadow Force", target);
				};
			}

			// Leader signature moves.
	   
			if (move.id === 'bravebird' && name === 'verbatim') {
				move.name = 'Glass Cannon';
				move.basePower = 170;
				move.accuracy = 80;
				move.recoil = [1, 4];
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "High Jump Kick", target);
				};
				move.onHit = function (pokemon) {
					this.add('c|&verbatim|DEFENESTRATION!');
					if (this.random(20) === 1) pokemon.switchFlag = true;
				};
				move.onMoveFail = function (target, source, move) {
					this.damage(source.maxhp / 2, source, source, 'glasscannon');
				};
			}

			// Mod signature moves.
			if (move.id === 'psychoboost' && name === 'arcticblast') {
				move.name = 'Doubles Purism';
				delete move.self;
				move.onHit = function (target, source) {
					if (source.hp) {
						var hasRemovedHazards = false;
						var sideConditions = {'spikes': 1, 'toxicspikes': 1, 'stealthrock': 1, 'stickyweb': 1};
						for (var i in sideConditions) {
							if (target.side.removeSideCondition(i)) {
								hasRemovedHazards = true;
								this.add('-sideend', target.side, this.getEffect(i).name, '[from] move: Doubles Purism', '[of] ' + source);
							}
							if (source.side.removeSideCondition(i)) {
								hasRemovedHazards = true;
								this.add('-sideend', source.side, this.getEffect(i).name, '[from] move: Doubles Purism', '[of] ' + source);
							}
						}
						if (hasRemovedHazards) this.add('c|@Arcticblast|HAZARDS ARE TERRIBLE IN DOUBLES');
					}
				};
			}
			if (move.id === 'calmmind' && name === 'betahousing') {
				move.name = "Drink's Up";
				if (pokemon.volatiles.confusion) move.boosts = {atk:3, def:3, spa:3, spd:3, spe:3, accuracy:3};
				if (!pokemon.volatiles.confusion && pokemon.hp < pokemon.maxhp) move.heal = [1, 4];
				if (pokemon.volatiles.confusion && pokemon.hp < pokemon.maxhp) move.heal = [1, 1];
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Milk Drink", target);
				};
			}
			if (move.id === 'detect' && name === 'dell') {
				var dmg = Math.ceil(pokemon.maxhp / (pokemon.ability === 'simple' ? 2 : 4));
				move.name = 'Aura Parry';
				move.self = {boosts: {atk:1, spa:1, spe:1}};
				move.onTryHit = function (target, source) {
					if (source.hp <= dmg) return false;
					this.attrLastMove('[still]');
					this.add('-anim', source, "Amnesia", source);
					return !!this.willAct() && this.runEvent('StallMove', target);
				};
				move.onHit = function (target) {
					this.directDamage(dmg, target, target);
					pokemon.addVolatile('parry');
					pokemon.addVolatile('stall');
				};
			}
			if (move.id === 'naturepower' && name === 'imanalt') {
				move.name = 'FREE GENV BH';
				move.onHit = function (target, source) {
					this.useMove('earthquake', source, target);
				};
			}
			if (move.id === 'defensecurl' && name === 'imas234') {
				move.name = 'Defense Swirl';
				move.pp = 10;
				move.boosts = {def: 3}
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Defense Curl", target);
				};
				move.onHit = function (target, source, move) {
					source.side.addSideCondition('reflect');
					source.side.addSideCondition('lightscreen');
				};
			}
			if (move.id === 'swagger' && name === 'imas234') {
				move.name = 'sweg';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Swagger", target);
				};
			}
			if (move.id === 'leafstorm' && name === 'piccolo') {
				move.name = 'dank kush';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Leaf Storm", target);
				};
				move.onHit = function (target, source, move) {
					this.add('c|@piccolo|this dank kush mang');
					var dankAbility = target.setAbility('whitesmoke');
					if (dankAbility) this.add('-ability', target, target.ability, '[from] move: dank kush');
				}
				move.secondaries = [{chance:42.0, status:'brn'}];
				delete move.self
			}
			if (move.id === 'headcharge' && name === 'rekeri') {
				move.name = 'Land Before Time';
				move.basePower = 125;
				move.type = 'Rock';
				move.accuracy = 90;
				move.secondaries = [{chance:10, volatileStatus:'flinch'}];
			}
			if (move.id === 'frenzyplant' && name === 'rosiethevenusaur') {
				move.name = 'Swag Plant';
				move.volatileStatus = 'confusion';
				move.self = {boosts: {atk:1, def:1}};
			}
			if (move.id === 'detect' && name === 'shaymin') {
				move.name = 'Flower Garden';
				move.type = 'Grass';
				move.self = {boosts: {def:1, spa:1, spd:1}};
				move.onTryHit = function (target, source) {
					if (source.volatiles['flowergarden']) return false;
					this.attrLastMove('[still]');
					this.add('-anim', source, "Amnesia", source);
				};
				move.onHit = function (target, source) {
					source.addVolatile('stall');
					source.addVolatile('flowergarden');
				};
			}
			if (move.id === 'selfdestruct' && name === 'snaquaza') {
				move.name = 'Ascension';
				move.basePower = 180;
				move.type = 'Flying';
				move.selfdestruct = false;
				move.flags = {protect: 1, authentic: 1},
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					if (!source.template.isMega) {
						this.add('-anim', source, "FILLERTASTIC", source);
						this.add('-message', "But @Snaquaza is not powerful enough to ascend!");
						return false;
					} else {
						this.add('-anim', source, "Dragon Ascent", target);
					}
				};
				move.onMoveFail = function (target, source, move) {
					if (source.template.isMega) {
						this.add('-message', "@Snaquaza wasn't able to ascend!");
					}
				};
				move.onHit = function (target, source, move) {
					if (source.ascensionCount < 0) {
						this.add('-message', "@Snaquaza successfully ascended, with 3 turns remaining!");
					} else {
						this.add('-message', "@Snaquaza successfully ascended, with " + (4 - source.ascensionCount) + " turns remaining!");
					}
					source.faint();
					source.ascended = 1;
				};
			}
			if (move.id === 'growl' && name === 'unfixable') {
				move.name = 'Wrath of Cacnea';
				move.pp = 10;
				delete move.boosts;
				move.flags = {authentic: 1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					if (!target.volatiles.confusion) this.add('-anim', source, "Curse", source);
				};
				move.onHit = function (target, source, move) {
					if (!target.volatiles.confusion) {
						this.boost({atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1}, source, source);
						target.addVolatile('confusion');
					} else {
						this.add("c|@unfixable|CACNEA");
						this.add('-message', 'BUT WAIT A MINUTE, AS IT TURNS OUT THAT WAS JUST IN PREPARATION FOR...')
						this.useMove('needlearm', source, target);
					}
				};
				move.type = 'Grass';
			}
			if (move.id === 'needlearm' && name === 'unfixable') {
				move.name = 'TRUE WRATH OF CACNEA';
				move.basePowerCallback = function (pokemon) {
					return 60 + 20 * pokemon.positiveBoosts();
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Wood Hammer", target);
				};
				move.onHit = function (target, source, move) {
					this.boost({atk:-1, def:-1, spa:-1, spd:-1, spe:-1, accuracy:-1}, source, source);
					target.removeVolatile('confusion');
				};
			}
			if (move.id === 'splash' && name === 'uselesscrab') {
				move.onTryHit = function (target, source, move) {
					this.add('-message', 'But nothing happened?');
					if (source.volatiles.splash) { //Props to you for using splash twice and living a hit somehow.
						this.add('-message', 'Wait. HOW DID YOU USE THIS TWICE WITHOUT SWITCHING OUT?');
						this.add('-message', 'I MEAN SERIOUSLY. YOU\'RE AT -6 IN EVERY STAT. ALL OF THEM. YOU HAVE NO EVS AND IVS IN THESE STATS TOO. HOW DID YOU LIVE A HIT?');
						this.add('-message', 'MAYBE THAT 1 HP EV I GAVE WAS TOO MUCH? EH I\'LL PATCH IT LATER.');
						this.add('-message', 'FOR NOW, I GIVE UP. TAKE YOUR DUMB WIN AND LEAVE. PLEASE.');
					}
				};
				move.onHit = function (target, source, move) {
					if (!source.volatiles.splash) source.addVolatile('splash');
					else this.win(source.side); //Props to you for using splash twice and living a hit. Here, have this, my treat :3
				};
			}

			// Driver signature moves.
			if (move.id === 'milkdrink' && name === 'adrianmarinbh') {
				move.name = 'Paranoid Stall';
				move.onHit = function (target) {
					if (target.status !== 'tox' && target.status !== 'psn') {
						if (target.status) target.cureStatus();
						target.setStatus('psn');
					}
					target.addVolatile('paranoid');
				}
			}
	   
			if (move.id === 'taunt' && name === 'bottt') {
				move.name = 'Bot Mute';
				move.onHit = function (target) {
					target.addVolatile('embargo');
					target.addVolatile('torment');
					target.addVolatile('healblock');
				};
			}
			if (move.id === 'spikecannon' && name === 'cactuscacti') {
				move.name = 'Spike Canon';
				move.basePower = 80;
				move.type = 'Grass';
				delete move.multihit;
				var spikes = !!(target.side.sideConditions.spikes);
				var slayers = 0;
				if (spikes) slayers = target.side.sideConditions.spikes.layers;
				var tspikes = !!(target.side.sideConditions.toxicspikes);
				var tlayers = 0;
				if (tspikes) tlayers = target.side.sideConditions.toxicspikes.layers;
				var gen = pokemon.gender;
				var ten = target.gender;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Pin Missile", target);
				}
				switch (slayers + tlayers) {
				case 5:
					move.onHit = function (target, source) {
						target.setStatus('par');
						target.addVolatile('confusion');
						source.gender = target.gender === 'M' ? 'F' : 'M';
						if (target.gender !== 'M' && target.gender !== 'F') target.gender = 'F';
						target.addVolatile('attract');
						source.gender = gen;
						target.gender = ten;
						target.addVolatile('leechseed');
						target.addVolatile('taunt');
						target.addVolatile('curse');
						target.addVolatile('torment');
					};
					move.flags = {mirror: 1, authentic: 1};
					break;
				case 4:
					move.onHit = function (target, source) {
						target.setStatus('par');
						target.addVolatile('confusion');
						source.gender = target.gender === 'M' ? 'F' : 'M';
						if (target.gender !== 'M' && target.gender !== 'F') target.gender = 'F';
						target.addVolatile('attract');
						source.gender = gen;
						target.gender = ten;
						target.addVolatile('leechseed');
						target.addVolatile('taunt');
					};
					move.flags = {mirror: 1, authentic: 1};
					break;
				case 3:
					move.onHit = function (target, source) {
						target.trySetStatus('par');
						target.addVolatile('confusion');
						source.gender = target.gender === 'M' ? 'F' : 'M';
						if (target.gender !== 'M' && target.gender !== 'F') target.gender = 'F';
						target.addVolatile('attract');
						source.gender = gen;
						target.gender = ten;
						target.addVolatile('taunt');
					};
					move.flags = {protect: 1, mirror: 1, authentic: 1};
					break;
				case 2:
					move.onHit = function (target, source) {
						target.trySetStatus('par');
						target.addVolatile('confusion');
						source.gender = target.gender === 'M' ? 'F' : 'M';
						if (target.gender !== 'M' && target.gender !== 'F') target.gender = 'F';
						target.addVolatile('attract');
						source.gender = gen;
						target.gender = ten;
					};
					move.flags = {protect: 1, mirror: 1, authentic: 1};
					break;
				case 1:
					move.onHit = function (target, source) {
						target.trySetStatus('par');
						target.addVolatile('confusion');
					};
					break;
				default:
					move.onHit = function (target, source) {
						target.addVolatile('confusion');
					};
					break;
				}
			}
			if (move.id === 'psystrike' && name === 'e4flint') {
				var hyperOffense = !!(target.name === '%Adrian Marin BH')
				move.name = 'Hyper Offense';
				move.basePower = 180;
				move.ohko = hyperOffense;
				delete move.defensiveCategory;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Light of Ruin", target);
					this.add('-anim', source, "Psystrike", target);
				};
				move.self = {boosts: {def: -1, spd: -1, spe: -1}};
			}
			if (move.id === 'tailwhip' && name === 'kidwizard') {
				move.name = 'Broken Wand';
				move.pp = 20;
				delete move.boosts;
				move.flags = {reflectable: 1, nonsky: 1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Spikes", target);
				};
				move.onHit = function (target, source, move) {
					target.side.addSideCondition('spikes');
					target.side.addSideCondition('toxicspikes');
					this.useMove(['icebeam','thunderbolt'][this.random(2)], source);
				};
			}
			if (move.id === 'geargrind' && name === 'kl4ng') {
				move.name = 'Flint Grinder';
				move.basePower = 60;
				move.accuracy = (target.name === '%E4 Flint') ? true : 90;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Gear Grind", target);
				};
				move.onHit = function (target, source, move) {
					if (target.name === '%E4 Flint') {
						this.add('c|%Kl4ng|!git gud flint');
					}
				}
			}
			if (move.id === 'hydropump' && name === 'manu11') {
				move.name = 'Surskit Energy';
				move.basePower = 130;
				move.sideCondition = 'stickyweb';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Origin Pulse", target);
				};
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Bug', type);
				};
			}
			if (name === 'pikachuun') {
				if (move.id === 'metronome') {
					move.name = 'Moonspeak';
					move.onPrepareHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Hyper Voice", target);
					};
					move.onHit = function(target, source) {
						var movespeak = ['fairywind', 'bubble', 'thundershock', 'confusion', 'cut', 'shadowpunch', 'ember', 'thief', 'powdersnow', 'sonicboom', 'nightshade'];
						var moonspoke = movespeak[this.random(11)];
						this.useMove(moonspoke, target)
					}
				} else if (move.id === 'fairywind') {
					move.name = '「パニッシュ・ザ・ジャッジメント」'; //Super Strong, Special [fairy]
					move.basePower = 250;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Judgment", target);
					};
				} else if (move.id === 'bubble') {
					move.name = '禍殃「メエルシュトレエムに呑まれて」'; //Pretty strong, special, chance to OHKO [water]
					move.basePower = 140;
					move.ohko = (this.random(10) < 3);
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Origin Pulse", target);
					};
					delete move.secondary;
					delete move.secondaries;
				} else if (move.id === 'thundershock') {
					move.name = '光速「ルクシオンエッジ」'; //Super Strong, Physical [electric]
					move.basePower = 200;
					move.category = 'Physical';
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Bolt Strike", target);
					};
					delete move.secondary;
					move.secondaries = [{chance: 30, status: 'par'}];
				} else if (move.id === 'confusion') {
					move.name = '魔砲「ファイナルスパーク」'; //Super Strong, Special [Psychic]
					move.basePower = 250;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Hyper Beam", target);
					};
					delete move.secondary;
					delete move.secondaries;
				} else if (move.id === 'cut') {
					move.name = '彼岸剣「地獄極楽滅多斬り」'; //Pretty strong in total, hits 6 times, Has a chance to OHKO, Physical [Steel]
					move.basePower = 33;
					move.type = 'Steel';
					move.accuracy = 100;
					move.multihit = 6;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Slash", target);
					};
				} else if (move.id === 'shadowpunch') {
					move.name = '真紅眼の狂月宴 (レッドアイズ・バンケット)'; //Pretty strong, physical, auto-Taunt [Ghost]
					move.basePower = 180;
					move.accuracy = 100;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Shadow Force", target);
					};
					move.volatileStatus = 'taunt';
				} else if (move.id === 'ember') {
					move.name = '七星「セプテントリオン」'; //Super Strong in total, Special. Chance to burn, hits 7 times. [Fire]
					move.basePower = 25;
					move.multihit = 7;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fusion Flare", target);
					};
				} else if (move.id === 'thief') {
					move.name = '逆符「天下転覆」'; //Pretty srong, inverts targets stat changes and steals them if necessary. [Dark]
					move.basePower = 140;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Dark Void", target);
					};
					move.onHit = function (target, source) {
						var targetBoosts = {};
						var targetDeboosts = {};
						for (var i in target.boosts) {
							targetBoosts[i] = (target.boosts[i] > 0) ? target.boosts[i] : 0;
							targetDeboosts[i] = (target.boosts[i] > 0) ? -target.boosts[i] : 0;
						}
						source.setBoost(targetBoosts);
						target.setBoost(targetDeboosts);
						this.add('-copyboost', source, target, '[from] move: 逆符「天下転覆」');
						this.add('-invertboost', target, '[from] move: 逆符「天下転覆」');
					};
				} else if (move.id === 'powdersnow') {
					move.name = '氷符「パーフェクトグレーシャリスト」'; //Moderate power, special, Hits 9 times. Chance to freeze. [Ice]
					move.basePower = 11;
					move.multihit = 9;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Blizzard", target);
					};
				} else if (move.id === 'sonicboom') {
					move.name = '弾幕幻想'; //Will always leave the opponent with 1 HP.
					move.type = '無効';
					move.damage = 65535;
					move.noFaint = true;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Light of Ruin", target);
					};
				} else if (move.id === 'nightshade'){
					move.name = '世界の終わり'; //Deals ~666 damage to all opponents, distributed evenly. Devastating when pulled.
					move.type = '無効';
					var oppPokes = 0;
					for (var i in target.side.pokemon) {
						if (target.side.pokemon[i].hp) {
							oppPokes += 1;
						}
					}
					var distribution = Math.ceil(666/oppPokes);
					move.damage = distribution;
					move.flags = {protect: 1, mirror: 1, authentic: 1},
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Night Shade", target);
						this.add('-anim', source, "Night Shade", target);
						this.add('-anim', source, "Hyperspace Fury", target);
					};
					move.onHit = function (target, source, move) {
						this.add('-message', '相手のポケモンは死のためにマークされていました！')
						for (var i in target.side.pokemon) {
							if (i > 0 && target.side.pokemon[i].hp) {
								if (!target.side.pokemon[i].marked) target.side.pokemon[i].marked = 0;
								target.side.pokemon[i].marked += distribution;
							}
						}
					};
				}
			}
			if (move.id === 'spikes' && name === 'quotecs') {
				move.name = 'Diversify';
				move.self = {boosts: {atk:1, spd:1}};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Eruption", source);
				};
			}
			if (move.id === 'metronome' && name === 'xfix') {
				if (pokemon.moveset[3] && pokemon.moveset[3].pp) {
					pokemon.moveset[3].pp = Math.round(pokemon.moveset[3].pp * 10 + 6) / 10;
				}
				move.name = '(Super Glitch)';
				move.multihit = [2, 5];
				move.onTryHit = function (target, source) {
					if (!source.isActive) return null;
					if (this.random(777) !== 42) return;
					var opponent = pokemon.side.foe.active[0];
					opponent.setStatus('brn');
					var possibleStatuses = ['confusion', 'flinch', 'attract', 'focusenergy', 'foresight', 'healblock'];
					for (var i = 0; i < possibleStatuses.length; i++) {
						if (this.random(3) === 1) {
							opponent.addVolatile(possibleStatuses[i]);
						}
					}

					function generateNoise() {
						var noise = '';
						var random = this.random(40, 81);
						for (var i = 0; i < random; i++) {
							if (this.random(4) !== 0) {
								// Non-breaking space
								noise += '\u00A0';
							} else {
								noise += String.fromCharCode(this.random(0xA0, 0x3040));
							}
						}
						return noise;
					}
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is frozen solid?)");
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is hurt by its burn!)");
					this.damage(opponent.maxhp * this.random(42, 96) * 0.01, opponent, opponent);
					var exclamation = source.status === 'brn' ? '!' : '?';
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER @xfix is hurt by its burn" + exclamation + ")");
					this.damage(source.maxhp * this.random(24, 48) * 0.01, source, source);
					return null;
				};
			}
			// Voices signature moves.
			if (name === '0loyd0') {
				//Custom Movesets!
				if (move.id === 'focuspunch' && pokemon.customs[0] === 1) {
					move.name = 'Falcon Punch';
					move.basePower = 250;
					move.type = 'Fire';
					move.affectedByImmunities = false; //Too epic
					move.beforeTurnCallback = function (pokemon) {
						this.add('c|+0Loyd0|FALLCCOOOONNNNN...');
						pokemon.addVolatile('focuspunch');
					};
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fire Punch", target);
						this.add('c|+0Loyd0|PAWWWNCCCHHHHHHH!!!!!!!');
					};
				} else if (move.id === 'focuspunch' && pokemon.customs[0] === 2) {
					move.name = 'Falcon Dash Punch';
					move.type = 'Fire';
					move.affectedByImmunities = false; //Too epic
					move.flags = {contact: 1, protect: 1, punch: 1, authentic: 1};
					move.beforeTurnCallback = function (pokemon) {
						this.add('c|+0Loyd0|FALLCCOOOONNNNN...');
						pokemon.addVolatile('focuspunch');
					};
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fire Punch", target);
						this.add('c|+0Loyd0|PAWWWNCCCHHHHHHH!!!!!!!');
					};
				} else if (move.id === 'focuspunch' && pokemon.customs[0] === 3) {
					move.name = 'Mighty Falcon Punch';
					move.basePower = 160;
					move.type = 'Fire';
					move.multihit = 2;
					move.affectedByImmunities = false; //Too epic
					move.beforeTurnCallback = function (pokemon) {
						this.add('c|+0Loyd0|FALLCCOOOONNNNN...');
						pokemon.addVolatile('focuspunch');
					};
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fire Punch", target);
						this.add('c|+0Loyd0|PAWWWNCCCHHHHHHH!!!!!!!'); //This punch is so epic that you have to say PAWNCH twice.
					};
				}
				if (move.id === 'skyuppercut' && pokemon.customs[1] === 1) {
					move.name = 'Raptor Boost';
					move.basePower = 90;
					move.secondaries = [
						{
							chance: 20,
							status: 'brn'
						}, {
							chance: 20,
							volatileStatus: 'flinch'
						}
					];
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Sky Uppercut", target);
					};
				} else if (move.id === 'skyuppercut' && pokemon.customs[1] === 2) {
					move.name = 'Heavy Raptor Boost';
					move.basePower = 120;
					move.secondaries = [{
						chance: 40,
						status: 'brn'
					}];
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Sky Uppercut", target);
					};
				} else if (move.id === 'skyuppercut' && pokemon.customs[1] === 3) {
					move.name = 'Wind-up Raptor Boost';
					move.basePower = 80;
					move.secondaries = [
						{
							chance: 10,
							status: 'brn'
						}, {
							chance: 10,
							volatileStatus: 'flinch'
						}
					];
					move.flags = {contact: 1, protect: 1, mirror: 1, punch: 1, authentic: 1};
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Sky Uppercut", target);
					};
				}
				if (move.id === 'dive' && pokemon.customs[2] === 1) {
					move.name = 'Falcon Dive';
					move.basePower = 120;
					move.type = 'Fire';
					delete move.onTry;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fly", target);
					};
					move.onHit = function () {
						this.add('c|+0Loyd0|YESZH!!');
					};
				} else if (move.id === 'dive' && pokemon.customs[2] === 2) {
					move.name = 'Falcon Strike';
					move.basePower = 80;
					move.type = 'Fire';
					delete move.onTry;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fly", target);
					};
				} else if (move.id === 'dive' && pokemon.customs[2] === 3) {
					move.name = 'Explosive Falcon Dive';
					move.basePower = 150;
					move.type = 'Fire';
					delete move.onTry;
					move.secondaries = [
						{
							chance: 30,
							status: 'brn'
						}
					];
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fly", target);
					};
					move.onHit = function () {
						this.add('c|+0Loyd0|YESZH!!');
					};
				}
				if (move.id === 'blazekick' && pokemon.customs[3] === 1) {
					move.name = 'Falcon Kick';
					move.basePower = 100;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Blaze Kick", target);
						this.add('c|+0Loyd0|FALCON KICK!');
					};
				} else if (move.id === 'blazekick' && pokemon.customs[3] === 2) {
					move.name = 'Falcon Kick Fury';
					move.basePower = 30;
					move.multihit = 5;
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Blaze Kick", target);
						this.add('c|+0Loyd0|FALCON KICK!'); //Intentional
					};
				} else if (move.id === 'blazekick' && pokemon.customs[3] === 3) {
					move.name = 'Lightning Kick';
					move.basePower = 120;
					delete move.secondary;
					move.secondaries = [
						{
							chance: 100,
							status: 'par'
						}
					];
					move.onEffectiveness = function (typeMod, type, move) {
						return typeMod + this.getEffectiveness('Electric', type);
					};
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Blaze Kick", target);
						this.add('c|+0Loyd0|FALCON KICK!');
					};
				}
			}
			if (name === 'aesf' && move.id === 'assist') {
				move.onHit = function (target) {
					this.useMove('thousandarrows', target);
				}
			}
			if (name === 'aesf' && move.id === 'thousandarrows') {
				move.basePower = 60; //To prevent aesf from being 3op
			}
			if (move.id === 'razorleaf' && name === 'dremz') {
				move.name = '420 BLAZE IT';
				move.basePower = 420;
				move.accuracy = 420;
				move.pp = 262.5; //Becomes 420
				delete move.critratio;
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Fire', type);
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Leaf Storm", target);
					this.add('-anim', target, "Fire Blast", target);
				};
				move.onHit = function (target, source, move) {
					this.add('c|+DreMZ|420');
					this.add('c|+DreMZ|BLAZE');
					this.add('c|+DreMZ|IT');
					source.typesData = [
						{type: 'Grass', suppressed: false,  isAdded: false}
					];
					if (this.random(420) < 420) source.setStatus('brn');
					source.typesData = [
						{type: 'Grass', suppressed: false,  isAdded: false},
						{type: 'Fire', suppressed: false,  isAdded: false}
					];
				};
				move.recoil = [420, 420];
				move.self = {
					boosts: {atk: -420}
				};
			}
			if (name === 'illusio' && move.id === 'chatter') {
				move.name = 'Name Change';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Chatter", target);
				};
				move.onHit = function (pokemon, user) {
					var template = pokemon.template;
					if (pokemon.fainted || pokemon.illusion) {
						return false;
					}
					if (!template.abilities || (pokemon && pokemon.transformed) || (user && user.transformed)) {
						return false;
					}
					if (!user.formeChange(template, true)) {
						return false;
					}
					user.transformed = true;
					user.illusioTransformed = true;
					user.typesData = [];
					for (var i = 0, l = pokemon.typesData.length; i < l; i++) {
						user.typesData.push({
							type: pokemon.typesData[i].type,
							suppressed: false,
							isAdded: pokemon.typesData[i].isAdded
						});
					}
					for (var statName in user.stats) {
						user.stats[statName] = pokemon.stats[statName];
					}
					user.moveset = [];
					user.moves = [];
					for (var i = 0; i < pokemon.moveset.length; i++) {
						var move = this.getMove(user.set.moves[i]);
						var moveData = pokemon.moveset[i];
						var moveName = moveData.move;
						if (moveData.id === 'hiddenpower') {
							moveName = 'Hidden Power ' + user.hpType;
						}
						user.moveset.push({
							move: moveName,
							id: moveData.id,
							pp: move.noPPBoosts ? moveData.maxpp : 5,
							maxpp: move.noPPBoosts ? moveData.maxpp : 5,
							target: moveData.target,
							disabled: false
						});
						user.moves.push(toId(moveName));
					}
					for (var j in pokemon.boosts) {
						user.boosts[j] = pokemon.boosts[j];
					}
					this.add('-transform', user, pokemon);
					user.setAbility(pokemon.ability);
					user.originalName = user.name;
					user.name = pokemon.name;
					user.update();
				};
			}
			if (move.id === 'infestation' && name === 'insanelegend') {
				move.name = 'Bidoof Army';
				move.basePower = 80;
				move.category = 'Physical';
				move.type = 'Water';
				move.secondaries = [{
					chance: 100,
					status: 'tox'
				}];
			}
			if (name === 'kitkasai' && move.id === 'judgment') {
				move.name = 'Kagome Kagome';
				move.basePower = 125;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					if (this.runEvent('Plate', pokemon, null, 'judgment', 'Normal') === 'Ghost') this.add('-anim', source, "Psystrike", target);
					else this.add('-anim', source, "Judgment", target);
				};
				move.secondaries = [{
					chance: 20,
					status: 'brn'
				}];
			}
			if (name === 'lcass4919' && move.id === 'boomburst') {
				move.name = 'Smiting of Xatu';
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Psychic', type);
				};
				move.ignoreImmunities = true;
				move.flags = {protect: 1, mirror: 1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Thunder", target);
				};
			}
			if (name === 'leafshield' && move.id === 'spikyshield') {
				move.name = 'Leaf Shield';
				move.self = {boosts: {def:2}};
				move.onTryHit =  function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Leaf Storm", target);
					return !!this.willAct() && this.runEvent('StallMove', target);
				};
			}
			if (name === 'lucina09' && move.id === 'playrough') {
				move.name = 'Anime Girl';
				move.accuracy = 100;
				move.basePower = 80;
				move.basePowerCallback = function (pokemon) {
					if (pokemon.anime > 3) return 100;
					return 80;
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Play Rough", target);
					if (!source.anime) source.anime = 0;
					source.anime++;
				};
				move.self = {boosts: {atk:1, spe:1}};
				delete move.secondary;
				delete move.secondaries;
			}
			if (name === 'mamp' && move.id === 'present') {
				var pepe = this.random(10) < 3 ? -1 : 1
				if (target.pepe && target.pepe !== 0) pepe = target.pepe;
				move.name = 'Rare Pepe';
				move.accuracy = 100;
				move.category = 'Special';
				delete move.onModifyMove;
				if (pepe > 0) {
					move.basePower = 150;
					move.volatileStatus = 'confusion'
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Techno Blast", target);
						target.pepe = 1
					}
				}
				if (pepe < 0) {
					move.basePower = 0;
					move.onHit = function (target, source, move) {
						if (target.hp < target.maxhp) this.heal(target.maxhp, target, source, "Rare Pepe");
						if (target.status) target.cureStatus();
					}
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Heal Pulse", target);
						target.pepe = -1
					}
				}
			}
			if (name === 'peefrimgar' && move.id === 'attract') {
				move.name = 'Gay Agenda';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Attract", target);
				};
				delete move.volatileStatus;
				move.onHit = function (target, source, move) {
					if (target.gender === 'M') {
						target.gender = 'F';
						target.addVolatile('attract');
						target.gender = 'M';
						target.addVolatile('confusion');
						target.trySetStatus('psn');
					} else if (target.gender === 'F') {
						this.directDamage(source.maxhp / 2, source, source);
						this.directDamage(target.maxhp / 2, target, target);
					} else {
						this.add('-message', 'Peef could not comprehend the genderless target!');
						this.useMove('Self-Destruct', source);
					}
				};
			}
			if (move.id === 'splash' && name === 'ransei') {
				move.name = 'Alt Change';
				delete move.onTryHit;
				move.onHit = function (pokemon) {
					pokemon.faint();
				};
			}
			if (move.id === 'partingshot' && name === 'word') {
				move.name = 'Tour Win';
				move.flags = {authentic: 1, protect: 1};
				move.boosts = {atk: -1, def: -1, spd: -1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Parting Shot", target);
				};
				move.onHit = function (target, source, move) {
					source.side.addSideCondition('tourwin');
					for (var i = 0; i < 12; i++) {
						var gratz = this.p1.pokemon.concat(this.p2.pokemon)[i];
						if (toId(gratz.name) !== name && !gratz.fainted) this.add('c|' + gratz.name + '|' + ['gratz', 'congratulations', 'gj', 'yay', 'grats', 'grates', 'gartz', 'GrATS', 'congrats', 'congratz'][this.random(5)] + ['', '', ' word'][this.random(3)]);
						if (gratz === source && !gratz.fainted) this.add('c|+word|thanks');
					}
				};
			}
	   
			//Choonbot
			if (name === 'choonbot' && move.id === 'discharge') {
				var choon = this.random(6) + 1;
				move.name = '$dicegame';
				move.basePower = choon*40;
				delete move.secondary;
				delete move.secondaries;
				move.type = '???';
				move.affectedByImmunities = false;
				move.onPrepareHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Metronome", source);
					this.add('-message', 'ChoonBot is rolling his dice...');
				};
				move.onTryHit = function(target, source) {
					this.add('-message', 'ChoonBot rolled a ' + choon + '!');
					var anims = ["PLACEHOLDER OF TRUUUUUUUUUUUTH", "Secret Power", "Judgment"];
					this.add('-anim', source, anims[Math.floor((choon-1)/2)], target);
				};
			};
		}
	}
];
