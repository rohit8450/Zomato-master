import React, { Component } from 'react';
import QuickSearch from './QuickSearch'

const url = "https://edumatoapifordev.herokuapp.com/quicksearch";

class QuickAPI extends Component{
    constructor(props){
        super();

        this.state = {
          QuickSearchData: "",
        };
    }

    

    render() {
        return(
            <div>
                <QuickSearch quicksearchdata={this.state.QuickSearchData} />
            </div>
        )
    }

    componentDidMount(){
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            this.setState({QuickSearchData : data});
        })
    }
}


export default QuickAPI;