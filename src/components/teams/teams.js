import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/teams.css";

class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      players: JSON.parse(localStorage.getItem('players')) || [],
      blueTeam: JSON.parse(localStorage.getItem('blueTeam')) || [],
      redTeam: JSON.parse(localStorage.getItem('redTeam')) || [],
      name: '',
      teamsOrganized: JSON.parse(localStorage.getItem('teamsOrganized')) || false,
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
    localStorage.setItem('players', JSON.stringify(players));
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
    localStorage.setItem('blueTeam', JSON.stringify(blueTeam));
    localStorage.setItem('redTeam', JSON.stringify(redTeam));
  };

  handleReorganizeTeams(e) {
    e.preventDefault();

    localStorage.removeItem('blueTeam');
    localStorage.removeItem('redTeam');
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
    localStorage.setItem('teamsOrganized', JSON.stringify(true));
  }

  handleClearPlayers() {
    this.setState({ players: [], redTeam: [], blueTeam: [], name: '', teamsOrganized: false });
    localStorage.clear();
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
        <div className="players-creation">
          <h2>Create Teams Below</h2>
          <div className="players-input">
            <h3>Enter players</h3>
            <form onSubmit={this.handleAddPlayer}>
              <input
                type='text'
                value={name}
                onChange={this.update('name')}/>
              <button className="teams-page-button">Add</button>
            </form>
          </div>
          
          <section className="sections">
            <div className="teams-left">
              <div className="players">
                <div className="players-header">
                  <h3>Players</h3>
                  <button onClick={this.handleClearPlayers} className="teams-page-button">Clear Players</button>
                </div>
                <div className="players-list">
                  {playersList}
                </div>
              </div>
            </div>
            
            <div className="teams-right">
              <div className="players-header">
                <h3>Done Adding Players?</h3>
                <button onClick={event} className="teams-page-button">
                  {buttonText}
                </button>
              </div>
              <div className="team-list">
                <div className="team">
                  <h3 className="red-team">Red Team</h3>
                  {redTeamList}
                </div>
                <div className="team">
                  <h3 className="blue-team">Blue Team</h3>
                  {blueTeamList}
                </div>
              </div>
            </div>
          </section>
        </div>

        <Link to='/board' className="board-link">Start Game!</Link>
      </>
    );
  };
};

export default Teams;
