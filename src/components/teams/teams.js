import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/teams.css";

class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      players: JSON.parse(sessionStorage.getItem('players')) || [],
      blueTeam: JSON.parse(sessionStorage.getItem('blueTeam')) || [],
      redTeam: JSON.parse(sessionStorage.getItem('redTeam')) || [],
      name: '',
      teamsOrganized: JSON.parse(sessionStorage.getItem('teamsOrganized')) || false,
    };

    this.handleAddPlayer = this.handleAddPlayer.bind(this);
    this.handleOrganizeTeams = this.handleOrganizeTeams.bind(this);
    this.handleTeamsOrganized = this.handleTeamsOrganized.bind(this);
    this.handleClearPlayers = this.handleClearPlayers.bind(this);
    this.handleReorganizeTeams = this.handleReorganizeTeams.bind(this);
  };

  handleAddPlayer(e) {
    e.preventDefault();

    const { players, name } = this.state

    players.push(name);
    sessionStorage.setItem('players', JSON.stringify(players));
    this.setState({ name: '' })
  };

  handleOrganizeTeams(e) {
    e.preventDefault();

    this.handleTeamsOrganized();

    const { players } = this.state

    const half = players.length % 2 === 0 ? players.length / 2 : Math.floor(players.length / 2) + 1
    let redTeam = []
    let blueTeam = []

    players.forEach(player => {
      const num = this.getRndInteger(0, 1);

      if (num === 0) {
        if (blueTeam.length === half) {
          redTeam.push(player);
        } else {
          blueTeam.push(player);
        }
      } else {
        if (redTeam.length === half) {
          blueTeam.push(player);
        } else {
          redTeam.push(player);
        }
      }
    });

    this.setState({ redTeam: redTeam, blueTeam: blueTeam });
    sessionStorage.setItem('blueTeam', JSON.stringify(blueTeam));
    sessionStorage.setItem('redTeam', JSON.stringify(redTeam));
  };

  handleReorganizeTeams(e) {
    e.preventDefault();

    sessionStorage.removeItem('blueTeam');
    sessionStorage.removeItem('redTeam');
    this.handleOrganizeTeams(e);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  };

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  };

  handleTeamsOrganized() {
    this.setState({ teamsOrganized: true })
    sessionStorage.setItem('teamsOrganized', JSON.stringify(true));
  }

  handleClearPlayers() {
    this.setState({ players: [], redTeam: [], blueTeam: [], name: '', teamsOrganized: false });
    sessionStorage.clear();
  }

  render() {
    const { players, blueTeam, redTeam, teamsOrganized, name } = this.state

    const playersList = players.map(player => {
      return (
        <li key={player}><span>{player}</span></li>
      )
    });

    const blueTeamList = teamsOrganized ? blueTeam.map((player, i) => {
      return (
        <li key={`${player}-${i}`}><span>{player}</span></li>
      )
    }) : '';

    const redTeamList = teamsOrganized ? redTeam.map((player, i) => {
      return (
        <li key={`${player}-${i}`}><span>{player}</span></li>
      )
    }) : '';
    
    const buttonText = teamsOrganized ? 'Reorganize Teams' : 'Organize Teams';
    const event = teamsOrganized ? this.handleReorganizeTeams : this.handleOrganizeTeams;

    return (
      <>
        <h1>Welcome To ProvideNames!</h1>
        <div className="team-creation">
          <h2>Create Your Teams Below</h2>
          <h3>Enter all players</h3>
          <form onSubmit={this.handleAddPlayer}>
            <input
              type='text'
              value={name}
              onChange={this.update('name')}/>
            <button>Add</button>
          </form>

          <div className="players">
            <div className="players-header">
              <h4>Players</h4>
              <button onClick={this.handleClearPlayers}>Clear Players</button>
            </div>
            <div className="players-list">
              {playersList}
            </div>
          </div>
        </div>

        <h3>Done Adding Players?</h3>
        <button onClick={event}>{buttonText}</button>
        <div className="team-list">
          <div className="team">
            <h5 className="blue-team">Blue Team</h5>
            {blueTeamList}
          </div>
          <div className="team">
            <h5 className="red-team">Red Team</h5>
            {redTeamList}
          </div>
        </div>

        <br />

        <div className="start-button">
          <Link to='/board' className="board-link">Start Game!</Link>
        </div>
      </>
    );
  };
};

export default Teams;