import React from 'react'

import styles from './image.css'

const Image = (props) => {
  const mockURL = 'https://s3-eu-west-1.amazonaws.com/dssnetwork/ByCube/demo/web/magmaview/'
  return(
    <div className={styles.image} style={{backgroundImage: `url(${mockURL + props.source})`}}>
    </div>
  )
}

export default Image
