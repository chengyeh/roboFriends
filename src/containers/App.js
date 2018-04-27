import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
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

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	};

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase()) ||
			robot.email.toLowerCase().includes(searchfield.toLowerCase());
		});

		return (!robots.length ? 
			<h1 className='tc f1'>Loading...</h1> :
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBar searchChange={this.onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
	 	);
	}
}

export default App; 