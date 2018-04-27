import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, requestAPI } from '../actions';

const mapStateToProps = state => ({
	searchfield: state.searchRobots.searchfield,
	isPending: state.requestRobots.isPending,
	error: state.requestRobots.error,
	robots: state.requestRobots.robots
});

const mapDispatchToProps = dispatch => ({
	onSearchChange: event => dispatch(setSearchField(event.target.value)),
	getRobots: () => dispatch(requestAPI())
});

class App extends Component {

	componentDidMount() {
		this.props.getRobots();
	}

	render() {
		const { searchfield, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase()) ||
			robot.email.toLowerCase().includes(searchfield.toLowerCase());
		});

		return (isPending ? 
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