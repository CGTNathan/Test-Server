var elo = require('elo-rank')();

function ratingToName(rating) {
	if (rating > 1500)
		return "Gold";
	else if (rating > 1200)
		return "Silver";
	else
		return "Bronze";
}

var getleague, Showdown;
var leagueRoom = exports.leagueRoom = (function () {
	function leagueRoom(name, data) {
		data = data || {};
		data.isleagueRoom = true;
		if (!data.ratingData) {
			data.ratingData = {
				wins: 0,
				losses: 0,
				draws: 0,
				rating: 1000
			};
		}

		Rooms.ChatRoom.call(this, toId(name), name, data);

		this.availableMembers = {};
		this.challengesFrom = {};
		this.challengeTo = null;
	}
	leagueRoom.prototype = Object.create(Rooms.ChatRoom.prototype);

	leagueRoom.prototype.getRating = function () {
		return {
			wins: this.ratingData.wins,
			losses: this.ratingData.losses,
			draws: this.ratingData.draws,
			rating: this.ratingData.rating,
			ratingName: ratingToName(this.ratingData.rating)
		};
	};

	leagueRoom.prototype.setMemberAvailable = function (user) {
		if (!this.auth || !this.auth[toId(user)]) return false;
		var expiryTime = this.availableMembers[toId(user)] = Date.now() + (5).minutes();
		return expiryTime;
	};
	leagueRoom.prototype.getAvailableMembers = function () {
		this.pruneAvailableMembers();
		return Object.keys(this.availableMembers);
	};
	leagueRoom.prototype.pruneAvailableMembers = function () {
		for (var m in this.availableMembers) {
			var user = Users.getExact(m);
			if (this.availableMembers[m] < Date.now() || !this.auth[m] || !user || !user.connected) {
				delete this.availableMembers[m];
			}
		}
	};
	leagueRoom.prototype.isEnoughAvailableMembers = function () {
		this.pruneAvailableMembers();
		if (Object.size(this.availableMembers) < 1) {
			this.add("You do not have enough available members for a showdown . At least 4 is required.");
			return false;
		}
		return true;
	};

	leagueRoom.prototype.updateChallenges = function () {
		if (this.challengeTo) {
			var otherleague = getleague(this.challengeTo.to);
			if (otherleague) {
				this.add("You are challenging " + otherleague.title);
			} else {
				this.challengeTo = null;
			}
		}

		var challengesFrom = [];
		for (var c in this.challengesFrom) {
			challengesFrom.push(this.challengesFrom[c].from);
		}
		if (challengesFrom.length > 0) this.add("You are being challenged by: " + challengesFrom.join(", "));

		this.update();
	};
	leagueRoom.prototype.makeChallenge = function (otherleague, format) {
		if (otherleague === this) return;
		if (this.currentShowdown ) return;
		if (!this.isEnoughAvailableMembers()) return;
		if (this.challengeTo) {
			this.updateChallenges();
			return;
		}

		var challenge = {
			from: this.id,
			to: otherleague.id,
			format: format || ''
		};
		this.challengeTo = challenge;
		otherleague.challengesFrom[this.id] = challenge;

		this.updateChallenges();
		otherleague.updateChallenges();
	};
	leagueRoom.prototype.cancelChallengeTo = function () {
		if (!this.challengeTo) return;

		var otherleague = getleague(this.challengeTo.to);
		this.challengeTo = null;
		delete otherleague.challengesFrom[this.id];

		this.add("You have cancelled your challenge.");
		otherleague.add("||" + this.title + " has cancelled their challenge.");

		this.updateChallenges();
		otherleague.updateChallenges();
	};
	leagueRoom.prototype.rejectChallengeFrom = function (otherleague) {
		if (!this.challengesFrom[otherleague.id]) return;

		delete this.challengesFrom[otherleague.id];
		otherleague.challengeTo = null;

		this.add("You have rejected " + otherleague.title + "'s challenge.");
		otherleague.add("||" + this.title + " has rejected your challenge.");

		this.updateChallenges();
		otherleague.updateChallenges();
	};
	leagueRoom.prototype.acceptChallengeFrom = function (otherleague) {
		if (!this.challengesFrom[otherleague.id]) return;
		if (this.currentShowdown ) return;
		if (otherleague.currentShowdown ) return;

		if (!this.isEnoughAvailableMembers()) return;
		if (!otherleague.isEnoughAvailableMembers()) {
			this.add("The other league currently do not have enough available members for a showdown .");
			return;
		}

		var challenge = otherleague.challengeTo;
		delete this.challengesFrom[otherleague.id];
		otherleague.challengeTo = null;

		this.updateChallenges();
		otherleague.updateChallenges();

		var allies = this.getAvailableMembers();
		var opponents = otherleague.getAvailableMembers();
		var matchupsCount = Math.min(allies.length, opponents.length);

		var showdown  = new Showdown(otherleague, this, opponents.slice(0, matchupsCount), allies.slice(0, matchupsCount), challenge.format, otherleague, otherleague.onShowdownEnd.bind(otherleague));
		this.currentShowdown = showdown;
		otherleague.currentShowdown = showdown;
	};

	leagueRoom.prototype.onShowdownEnd = function (leagueA, leagueB, score) {
		var expectedScore = elo.getExpected(leagueA.ratingData.rating, leagueB.ratingData.rating);
		var oldRatingA = leagueA.ratingData.rating;
		var oldRatingB = leagueB.ratingData.rating;
		leagueA.ratingData.rating = elo.updateRating(expectedScore, score, leagueA.ratingData.rating);
		leagueB.ratingData.rating = elo.updateRating(1 - expectedScore, 1 - score, leagueB.ratingData.rating);
		if (leagueA.ratingData.rating < 1000) leagueA.ratingData.rating = 1000;
		if (leagueB.ratingData.rating < 1000) leagueB.ratingData.rating = 1000;

		if (score === 1) {
			++leagueA.ratingData.wins;
			++leagueB.ratingData.losses;
		} else if (score === 0) {
			++leagueA.ratingData.losses;
			++leagueB.ratingData.wins;
		} else {
			++leagueA.ratingData.draws;
			++leagueB.ratingData.draws;
		}

		Rooms.global.writeChatRoomData();

		this.add("||" + leagueA.title + " has " + (["lost", "won"][score] || "drawn") + " the league showdown against " + leagueB.title + ".");
		this.add("|raw|<strong>" + Tools.escapeHTML(leagueA.title) + ":</strong> " + oldRatingA + " &rarr; " + leagueA.ratingData.rating + " (" + ratingToName(leagueA.ratingData.rating) + ")");
		this.add("|raw|<strong>" + Tools.escapeHTML(leagueB.title) + ":</strong> " + oldRatingB + " &rarr; " + leagueB.ratingData.rating + " (" + ratingToName(leagueB.ratingData.rating) + ")");
		this.update();

		leagueA.endCurrentShowdown();
	};
	leagueRoom.prototype.endCurrentShowdown = function () {
		if (!this.currentShowdown) return;

		var otherleague = this.currentShowdown.leagueA === this ? this.currentShowdown.leagueB : this.currentShowdown.leagueA;
		delete otherleague.currentShowdown;
		delete this.currentShowdown;
	};

	leagueRoom.prototype.destroy = function () {
		this.cancelChallengeTo();
		for (var c in this.challengesFrom) this.rejectChallengeFrom(c);
		this.endCurrentShowdown();

		Rooms.ChatRoom.prototype.destroy.call(this);
	};

	return leagueRoom;
})();

var Showdown = exports.Showdown = (function () {
	function Showdown(leagueA, leagueB, battlersA, battlersB, format, room, onEnd) {
		this.leagueA = leagueA;
		this.leagueB = leagueB;
		this.battlersA = battlersA.map(toId).randomize();
		this.battlersB = battlersB.map(toId).randomize();
		this.format = format;
		this.room = room;
		this.onEnd = onEnd;

		this.matchups = {};
		for (var b = 0; b < this.battlersA.length; ++b) {
			var matchup = {from: this.battlersA[b], to: this.battlersB[b]};
			this.matchups[this.battlersA[b]] = matchup;
			this.matchups[this.battlersB[b]] = matchup;

			Users.getExact(this.battlersA[b]).joinRoom(this.room);
			Users.getExact(this.battlersB[b]).joinRoom(this.room);
		}
		this.remainingMatches = this.battlersA.length;

		this.score = 0; // Positive: leagueA winning; Negative: leagueB winning

		this.room.add('|raw|' +
			"<strong>A league showdown between  " + Tools.escapeHTML(this.leagueA.title) + " and " + Tools.escapeHTML(this.leagueB.title) + " has started!</strong><br />" +
			this.getMatchups().map(function (matchup) {
				return '<strong>' + Tools.escapeHTML(matchup.from) + "</strong> vs <strong>" + Tools.escapeHTML(matchup.to);
			}).join('<br />')
		);
		this.room.update();
	}

	Showdown.prototype.getMatchups = function () {
		var matchups = [];
		for (var m in this.matchups) {
			if (this.matchups[m].from === m) {
				matchups.push(this.matchups[m]);
			}
		}
		return matchups;
	};

	Showdown.prototype.onBattleWin = function (userA, userB, score, format) {
		if (format !== this.format) return;

		var userAId = toId(userA);
		var userBId = toId(userB);

		var matchup = this.matchups[userAId];
		if (!matchup || (userBId !== matchup.from && userBId !== matchup.to) || matchup.isEnded) return;

		matchup.isEnded = true;
		--this.remainingMatches;

		if (userAId === matchup.to) {
			var tmp = userA;
			userA = userB;
			userB = tmp;
			score = 1 - score;
		}
		this.score += (score - 0.5) * 2;

		this.room.add("|raw|<strong>(" + Tools.escapeHTML(this.leagueA.title) + " vs " + Tools.escapeHTML(this.leagueB.title) + ") " + Tools.escapeHTML(userA.name) + " has " + (["lost", "won"][score] || "drawn") + " the league showdown battle against " + Tools.escapeHTML(userB.name) + ".</strong>");
		this.room.update();

		if (this.remainingMatches === 0) {
			var overallScore = (this.score && this.score / Math.abs(this.score)) / 2 + 0.5;
			this.onEnd(this.leagueA, this.leagueB, overallScore);
		}
	};

	Showdown.prototype.isEnded = function () {
		return this.remainingMatches === 0;
	};

	return Showdown;
})();

var patchRooms = exports.patchRooms = function () {
	for (var r = 0; r < Rooms.global.chatRooms.length; ++r) {
		var room = Rooms.global.chatRooms[r];
		if (room.isleagueRoom && !room.availableMembers) {
			var newRoom = new leagueRoom(room.title, room.chatRoomData);
			Rooms.global.chatRooms[r] = newRoom;
			Rooms.rooms[room.id] = newRoom;
		}
	}
};
patchRooms();

var getleagues = exports.getleagues = function () {
	var results = [];
	for (var r in Rooms.rooms)
		if (Rooms.rooms[r] instanceof leagueRoom)
			results.push(Rooms.rooms[r]);
	return results;
};
var getleague = exports.get = function (name) {
	var room = Rooms.get(toId(name));
	return room && room.isleagueRoom ? room : null;
};
var getleaguesFromMember = exports.getFromMember = function (user) {
	var results = [];
	var userId = toId(user);
	for (var r in Rooms.rooms)
		if (Rooms.rooms[r] instanceof leagueRoom && Rooms.rooms[r].auth && Rooms.rooms[r].auth[userId])
			results.push(Rooms.rooms[r]);
	return results;
};

var createleague = exports.createleague = function (name) {
	if (Rooms.get(toId(name))) return false;
	if (!Rooms.global.addChatRoom(name)) return false;

	var room = Rooms.get(toId(name));
	room.isleagueRoom = room.chatRoomData.isleagueRoom = true;
	Rooms.global.writeChatRoomData();
	patchRooms();
	return room;
};
var deleteleague = exports.deleteleague = function (name) {
	var room = getleague(name);
	if (!room) return false;
	return Rooms.global.removeChatRoom(toId(name));
};

var oldWin = Rooms.BattleRoom.prototype.win;
Rooms.BattleRoom.prototype.win = function (winner) {
	var winnerId = toId(winner);
	var score = 0.5;
	if (winnerId === toId(this.p1)) {
		score = 1;
	} else if (winnerId === toId(this.p2)) {
		score = 0;
	}

	var leagues = getleaguesFromMember(this.p1);
	for (var c = 0; c < leagues.length; ++c) {
		if (leagues[c].currentShowdown) {
			leagues[c].currentShowdown.onBattleWin(this.p1, this.p2, score, this.format);
		}
	}

	return oldWin.call(this, winner);
};

exports.namespace = ['league', 'leagues'];
exports.defaultHandler = '';
exports.commands = {
	leaguehelp: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"/leagues [name] - Gets information about all leagues, or about the specified league<br />" +
			"/showdownavailable - Sets yourself as available for league showdowns for 5 minutes<br />" +
			"/leaguecreate &lt;name> - Creates a league<br />" +
			"/leaguedelete &lt;name> - Deletes a league<br />" +
			"/leaguechallenge &lt;league> - Challenge another league<br />" +
			"/leaguecancel - Cancel your challenge<br />" +
			"/leagueaccept &lt;league> - Accept &lt;league>'s challenge<br />" +
			"/leaguereject &lt;league> - Reject &lt;league>'s challenge<br />" +
			"/endshowdown- Ends the current showdown forcibly<br />" +
			"/leaguematchups - Shows the showdown battles that haven't yet been started<br />"
		);
	},

	'': function (target, room, user, connection, cmd) {
		if (!this.canBroadcast()) return;
		target = target || cmd;

		var leagues = [getleague(target)];
		if (!leagues[0]) leagues = getleaguesFromMember(target);
		if (!leagues[0] && target.length > 0) {
			leagues = [];
			var allleagues = getleagues();
			var targetId = toId(target);
			for (var c = 0; c < allleagues.length; ++c) {
				if (allleagues[c].id.slice(0, targetId.length) === targetId) {
					leagues.push(allleagues[c]);
				}
			}
		}
		if (!leagues[0] && target.length > 0) return this.sendReply("No league or league member found under '" + target + "'.");

		if (!leagues[0]) {
			this.sendReply('|raw|' +
				"<center>" +
					"<img src=\"http://i.imgur.com/yZ6G3fS.png\" />" +
					"<div class=\"leagues-info\">" +
						"<strong>leagues:</strong><br />" +
						getleagues().map(function (league) {
							var result = league.getRating();
							result.name = league.title;
							result.id = league.id;
							return result;
						}).sort(function (a, b) {
							return b.rating - a.rating;
						}).map(function (league) {
							return '<a class="ilink" href="/' + league.id + '"><strong>' + Tools.escapeHTML(league.name) + ':</strong></a> ' + league.rating + " (" + league.ratingName + ") " + league.wins + "/" + league.losses + "/" + league.draws;
						}).join('<br />') +
					"</div>" +
					"<img src=\"http://i.imgur.com/qFllIAe.png\" />" +
				"</center>"
			);
			return;
		}

		leagues = leagues.sort(function (a, b) {
			return a.id.localeCompare(b.id);
		});
		for (var c = 0; c < leagues.length; ++c) {
			var league = leagues[c];
			var rating = league.getRating();
			this.sendReply('|raw|' +
				"<center>" +
					"<img src=\"http://i.imgur.com/yZ6G3fS.png\" />" +
					"<div class=\"league-info\">" +
						'<h1>' + Tools.escapeHTML(league.title) + '</h1>' +
						(league.introMessage || '') +
						'<hr />' +
						"<strong>Rating:</strong> " + rating.rating + " (" + rating.ratingName + ")<br />" +
						"<strong>Wins/Losses/Draws:</strong> " + rating.wins + "/" + rating.losses + "/" + rating.draws + '<br />' +
						"<strong>Members:</strong> " + Tools.escapeHTML(Object.keys(league.auth || {}).sort().join(", ")) + '<br />' +
						"<button name=\"joinRoom\" value=\"" + league.id + "\">Join</button>" +
					"</div>" +
					"<img src=\"http://i.imgur.com/qFllIAe.png\" />" +
				"</center>"
			);
		}
	},

	leaguecreate: function (target) {
		if (!this.can('makeroom')) return;
		if (target.length < 2) {
			this.sendReply("The league's name is too short.");
		} else if (!createleague(target)) {
			this.sendReply("Could not create the league. Does a room by it's name already exist?");
		} else {
			this.sendReply("league: " + target + " successfully created.");
		}
	},

	leaguedelete: function (target) {
		if (!this.can('makeroom')) return;
		if (!deleteleague(target)) {
			this.sendReply("Could not delete the league. Did you spell it correctly?");
		} else {
			this.sendReply("league: " + target + " successfully deleted.");
		}
	},

	showdownavailable: function (target, room, user) {
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		var expiryTime = room.setMemberAvailable(user);
		if (!expiryTime) return this.sendReply("You are not a member of this league.");
		this.sendReply("You have been marked available for this league's showdowns for " + (expiryTime - Date.now()).duration() + ".");
	},

	leaguechallenge: function (target, room) {
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		if (!this.can('leagues', room)) return;
		if (room.currentShowdown) return this.sendReply("You are already at showdown.");

		var otherleague = getleague(target);
		if (!otherleague) return this.sendReply("The league does not exist.");
		if (otherleague === room) return this.sendReply("You cannot challenge your own league.");

		room.makeChallenge(otherleague, 'ou');
	},

	leaguecancel: function (target, room) {
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		if (!this.can('leagues', room)) return;
		if (!room.challengeTo) return this.sendReply("This league isn't currently challenging anyone.");

		room.cancelChallengeTo();
	},

	leagueaccept: function (target, room) {
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		if (!this.can('leagues', room)) return;
		if (room.currentShowdown) return this.sendReply("You are already at showdown.");

		var otherleague = getleague(target);
		if (!otherleague) return this.sendReply("The league does not exist");
		if (!room.challengesFrom[otherleague.id]) return this.sendReply("||" + otherleague.title + " is not challenging you right now.");

		room.acceptChallengeFrom(otherleague);
	},

	leaguereject: function (target, room) {
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		if (!this.can('leagues', room)) return;

		var otherleague = getleague(target);
		if (!otherleague) return this.sendReply("The league does not exist");

		room.rejectChallengeFrom(otherleague);
	},

	endshowdown: function (target, room) {
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		if (!this.can('leagues', room)) return;
		if (!room.currentShowdown) return this.sendReply("This league currently isn't in a showdown.");
		if (room.currentShowdown.room !== room) return this.sendReply("This room is not hosting a showdown.");

		room.endCurrentShowdown();
		room.add("The league showdown was forcibly ended.");
	},

	leaguematchups: function (target, room) {
		if (!this.canBroadcast()) return;
		if (!room.isleagueRoom) return this.sendReply("This is not a league room.");
		if (!room.currentShowdown) return this.sendReply("This league currently isn't in a showdown.");

		this.sendReplyBox(
			"<strong>league showdown matchups between " + Tools.escapeHTML(room.currentShowdown.leagueA.title) + " and " + Tools.escapeHTML(room.currentShowdown.leagueB.title) + ':</strong><br />' +
			room.currentShowdown.getMatchups().map(function (matchup) {
				return matchup.isEnded ? "" : '<strong>' + Tools.escapeHTML(matchup.from) + "</strong> vs <strong>" + Tools.escapeHTML(matchup.to);
			}).join('<br />')
		);
	}
};
