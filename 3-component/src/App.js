import React from "react";
import Header from "./components/Header.js";
import SearchForm from "./components/SearchForm.js";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchKeyword: "",
        }
    }

    handleChangeInput(searchKeyword) {
        if (searchKeyword <= 0) {
            this.handleReset();
        }
        this.setState({ searchKeyword });
    }

    search(searchKeyword) {
        console.log("search");
    }

    handleReset() {
        console.log("reset");
    }

    render() {
        return (
            <>
                <Header title="검색" />
                <div className="container">
                    <SearchForm 
                        value={this.state.searchKeyword}
                        onChange={(value) => { this.handleChangeInput(value) }}
                        onSubmit={(searchKeyword) => this.search(searchKeyword)}
                        onReset={() => this.handleReset()}
                    />
                </div>
            </>
        );
    }
}