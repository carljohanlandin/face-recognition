import React from 'react'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className='f3 white avenir'>
				{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='center pa4 br3 shadow-2 w-40'>
					<input 
						className='avenir f4 pa2 bw0 w-70 center'
						type='text'
						placeholder='pass a picture-URL here...'
						onChange={onInputChange}
					/>
					<button 
						className='avenir w-30 grow bw0 f4 link ph3 dib pv2 white bg-light-purple'
						onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}
//onChange reagerar på när användaren skriver i inputfältet
//onClick reagerar på när användaren musklickar på knappen

export default ImageLinkForm;