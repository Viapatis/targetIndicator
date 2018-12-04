import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ProgressBlock from './progressBlock'
import '../style/App.css';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            progress:{
               currentValue:0,
               displayValue:0,
               target:15
            },
            hideInf:false
        }
    }
    componentDidMount=()=>{
        fetch("http://alex.devel.softservice.org/testapi/").then((response)=> {
            if(response.ok)
                if(response.status===200) {
                    return response.json();
                }
            throw new Error('network error')
        }).then( (obj) =>{
            this.setState({
                progress:{...this.state.progress,currentValue:obj.balance_usd}
            });
            this.growsValue();
        }).catch((error)=> {
            console.log("There has been a problem with fetch operation" + error.message);
        });
    };
    growsValue=()=>{
        const progress= {...this.state.progress};
        progress.displayValue+=0.2;
        this.setState({
            ...this.state,
            progress:progress
        });
        if( progress.displayValue < progress.currentValue ){
            setTimeout(()=>{this.growsValue()},10);

        }
        else{
            this.increaseValue();
        }
    };
    increaseValue=()=>{
        const {progress}= {...this.state};
        progress.displayValue=Math.round((progress.displayValue+0.2) * 10) / 10;
        progress.currentValue=progress.displayValue;
        this.setState({
            ...this.state,
            progress:progress
        });
        if(progress.target>progress.currentValue){
            setTimeout(()=>{this.increaseValue()},2000);
        }
        else{
            this.setState({
                ...this.state,
                hideInf:true
            });
        }
    };
  render() {
      const{progress,hideInf}=this.state;
      const informValue=Math.round((progress.target-progress.currentValue) * 10) / 10;
    return (
        <div className="main">
            <div className="caption"> Target Indicator Demo</div>
            <div className="indicator-area">
                <div className="indicator-block" >
                    <ProgressBlock
                        progress={progress}
                        hideInf={hideInf}
                    />
                    <div className="inform" hidden={hideInf}>
                        <span>i</span>
                        You need ${informValue} more to reach you target.
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
