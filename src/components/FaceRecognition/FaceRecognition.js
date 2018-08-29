import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt='' width='500px' height='auto' />
				{
					boxes.map((box, index) => {
						return <div key={index} className='bounding-box arrow' style={{cursor: 'default', top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
					})
				}
				
			</div>
		</div>
	);
}

export default FaceRecognition;