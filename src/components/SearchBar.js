import React from 'react';

const SearchBar = ({ searchChange }) => {
	return (
		<div>
			<input 
				className='pa3 ma1 ba b--green bg-lightest-blue'
				type='search' 
				placeholder='enter name or email' 
				onChange={searchChange}
			/>
		</div>
	);
};

export default SearchBar;