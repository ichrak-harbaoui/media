import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'

import classes from './DetailPost.css'

const DetailPost = props => {


    
    
    return (
        <div className={classes.cardSize}>
            {/* <img src={"http://localhost:5001/image/4340a1e9b961a04b66504114db99ae57.jpg"} className={classes.bgImg} alt=""></img> */}
            <div className={classes.info}>
                <div className={classes.innerInfo}>
                    <div>
                        <div className={classes.nameText}>{props.post.content}</div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default DetailPost 
