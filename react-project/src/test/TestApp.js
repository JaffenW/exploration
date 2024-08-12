import { Component } from "react";

export class TestApp extends Component {
    state = {
        count: 1
    }

    onClickHandler = ()  => {
        this.setState({count: this.state.count + 1});
        console.log(this.state.count); // console.log 结果 1
        this.setState({count: this.state.count + 1});
        console.log(this.state.count); // console.log 结果 1

        setTimeout(() => {
            this.setState({count: this.state.count + 1});
            console.log(this.state.count); // console.log 结果 2
            this.setState({count: this.state.count + 1});
            console.log(this.state.count); // console.log 结果 3
        }, 0);
    }

    render() {
        const { count } = this.state;
        return (
            <button onClick={this.onClickHandler}>{count}</button>
        );
    }
}