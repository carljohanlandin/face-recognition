import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn) {
		return(
			<nav style={{display: 'flex'}}>
				<p 
					onClick={() => onRouteChange('signout')}
					className='link dim black underline ph3 pointer'
					style={{height: '20px'}}>

					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex', height: '20px'}}>
				<p 
					onClick={() => onRouteChange('signin')}
					className='ma0 link dim black underline ph3 pointer'>
					Sign In
				</p>
				<p 
					onClick={() => onRouteChange('register')}
					className='ma0 link dim black underline ph3 pointer'>
					Register
				</p>
			</nav>
		)
	}
}

export default Navigation;