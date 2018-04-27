import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField } from '../actions';

const mapStateToProps = state => ({
	searchfield: state.searchRobots.searchfield
});

const mapDispatchToProps = dispatch => ({
	onSearchChange: event => dispatch(setSearchField(event.target.value))
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
		};
	}

	async  componentDidMount() {
		// fetch('https://jsonplaceholder.typicode.com/users')
		// .then(response => response.json())
		// .then(users => this.setState({robots: users}));

		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users');
			const data = await response.json();

			if(data.constructor !== Array) {
				throw new Error('Invalid return data type.');
			}
			this.setState({robots: data})
		} catch(err) {
			console.log(err.message);
		}
	}

	render() {
		const { robots } = this.state;
		const { searchfield, onSearchChange } = this.props;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase()) ||
			robot.email.toLowerCase().includes(searchfield.toLowerCase());
		});

		return (!robots.length ? 
			<h1 className='tc f1'>Loading...</h1> :
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBar searchChange={onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
	 	);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 