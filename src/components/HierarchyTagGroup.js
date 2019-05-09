import * as React from "react";
import * as antd from "antd";
import {TweenOneGroup} from 'rc-tween-one';
import 'antd/dist/antd.css';
import {HierarchyTag} from "./HierarchyTag";
import './animation.css'
import {addToData, populateData, removeFromData, recursiveKeys} from "./utils";
import {Tooltip} from "antd";

const {Tag, Input, Icon,} = antd;


export class HierarchyTagGroup extends React.Component {
    state = {
        inputVisible: false,
        inputValue: '',

    };

    allCollapsed = () => !(Object.keys(this.props.schema).length === 1) || !this.props.data.includes(Object.keys(this.props.schema)[0]);

    handleClose = (removedTag) => {
        if (removedTag !== null && removedTag !== '') {
            this.props.onChange(removeFromData(removedTag, this.props.data, this.props.schema));
        }
    };

    showInput = () => {
        this.setState({inputVisible: true}, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({inputValue: e.target.value});
    };

    handleInputConfirm = () => {
        const {inputValue} = this.state;
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
        if (inputValue && recursiveKeys(this.props.schema).includes(inputValue)) {
            this.props.onChange(addToData(inputValue, this.props.data, this.props.schema));
        }
    };

    saveInputRef = input => this.input = input;

    render() {
        const {inputVisible, inputValue} = this.state;
        let popdata = populateData(this.props.data, this.props.schema);
        return (
            <span>
                {this.props.tooltip &&
                    <Tooltip placement={this.props.tooltipPlacement || "bottomLeft"} title={this.props.tooltipTitle ||"Hover over tags to expand them and choose specific groups"}>
                        <Icon style={{ fontSize: '14px', color: '#666', padding: 8, margin: 8}} type="question-circle" />
                    </Tooltip>}
                <span style={{marginBottom: 16}}>
                    <TweenOneGroup
                        enter={{
                            scale: 0.8, opacity: 0, type: 'from', duration: 100,
                            onComplete: (e) => {
                                e.target.style = '';
                            },
                        }}
                        leave={{opacity: 0, width: 0, scale: 0, duration: 200}}
                        appear={false}
                        style={{display: 'inline'}}
                    >
                        <HierarchyTag
                            closable
                            onClose={this.handleClose}
                            schema={this.props.schema}
                            data={popdata}
                            open={!popdata.includes('all')}
                        />
                    </TweenOneGroup>
                </span>
                {this.allCollapsed() && inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{width: 78}}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {this.allCollapsed() && !inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{background: '#fff', borderStyle: 'dashed'}}
                    >
                        <Icon type="plus"/> {this.props.addText}
                    </Tag>
                )}
            </span>
        );
    }
}

