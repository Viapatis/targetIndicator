import React,{Component } from 'react';
import '../style/progressBlock.css';
//import PropTypes from 'prop-types';

export default class ProgressBlock extends Component {
    render() {
        const[{currentValue,displayValue, target},hideInf]=[this.props.progress, this.props.hideInf];
        const percent=displayValue/target*100-4;
        const indicatorClass="indicator-target "+ (hideInf ? "green" : "gray");
        return(
                <div className="progress-block">
                    <span>Reached:</span>
                    <span>
                        <div className="progress-bar">
                            <div className="scale-body">
                                <div className="scale-progress"
                                     style={{width:`${percent}%`}}
                                />
                            </div>
                            <div className={"value-indicator"} style={{left:`${percent-10}%`}}>
                                <p>&#9650;</p>
                                <p>${currentValue}</p>
                            </div>
                        </div>
                    </span>
                    <span className={indicatorClass}>
                            <p className="target-caption">Target</p>
                            <p>${target}</p>
                    </span>
                </div>
        )
    }
}