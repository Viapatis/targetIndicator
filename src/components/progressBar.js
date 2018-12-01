import React,{Component } from 'react';
import '../style/progressBar.css';
//import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
    render() {
        const{currentValue,displayValue, target}=this.props.progress;
        const percent=displayValue/target*100-4;

        return(
            <div className="progress-bar">
                <div className="scale-body">
                    <div
                        className="scale-progress"
                        style={{width:`${percent}%`}}
                    />
                </div>
                <div className={"value-indicator"} style={{left:`${percent-8}%`}}>
                    <p>&#9650;</p>
                    <p>${currentValue}</p>
                </div>
            </div>
        )
    }
}