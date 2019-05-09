import * as React from "react";
import * as antd from "antd";
import 'antd/dist/antd.css';
import {TweenOneGroup} from "rc-tween-one";
import {isEmpty} from "./utils";

const {Tag} = antd;


export class HierarchyTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            intervalID: 0,
            hovered: false,
            opening: false
        }
    }

    canOpen = () => Object.values(this.props.schema).filter((x) => !isEmpty(x)).length > 0;

    hover = ev => {
        if (this.canOpen()) {
            this.setState({
                hovered: true,
                intervalID: setTimeout(
                    () => {

                        this.setState({opening: true});
                        setTimeout(() => this.setState({open: true, opening: false}), 200)
                    },
                    1200
                )
            })
        }
    };

    leave = ev => {
        if (!this.props.open && Object.values(this.props.schema).filter((x) => !isEmpty(x)).length > 0) {
            clearTimeout(this.state.intervalID);
            this.setState({open: false, hovered: false, opening: false})
        }
    };

    render() {
        let title = Object.keys(this.props.schema)[0];
        let keys = (this.props.schema[title] && Object.keys(this.props.schema[title])) || [];
        return <span onMouseLeave={this.leave}>
            <TweenOneGroup
                enter={{
                    scale: 0.5, opacity: 0, type: 'from', duration: 100,
                    onComplete: (e) => {
                        e.target.style = '';
                    },
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
                style={{display: 'inline'}}
            >
            {!(this.props.open || this.state.open) && !this.state.opening &&
            <span key={"tag"}><Tag closable  onClose={(e) => {this.leave(); e.preventDefault(); this.props.onClose(title)}}
                 onMouseEnter={this.hover} className={this.canOpen() && this.state.hovered && 'openable'}>
                {title}
            </Tag></span>
            }
            {(this.props.open || this.state.open) &&
                keys.map(key => {
                let subObj = {};
                subObj[key] = this.props.schema[title][key];
                    return <HierarchyTag open={!this.props.data.includes(key)} key={key} title={key} schema={subObj} data={this.props.data}
                                         onClose={(e) => {this.leave(e); this.props.onClose(e)}}/>
            })}
            </TweenOneGroup>
            </span>;

    }
}

