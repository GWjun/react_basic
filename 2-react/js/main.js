import store from "./js/Store.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({ keywordList });
  }

  handleReset() {
    this.setState(
      () => {
        return { searchKeyword: "", submitted: false };
      },
      () => {
        console.log("onReset", this.state.searchKeyword);
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("onSubmit", this.state.searchKeyword);
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    this.setState({ searchResult, submitted: true, searchKeyword });
  }

  handleChangeInput(event) {
    console.log('onChange')
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }

    this.setState({ searchKeyword })
  }

  render() {

    const searchForm = (
      <form
        onSubmit={event => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input type="text" placeholder="검색어를 입력하세요" autoFocus
          value={this.state.searchKeyword}
          onChange={event => this.handleChangeInput(event)}
        />

        {this.state.searchKeyword.length > 0 &&
          (<button type="reset" className="btn-reset" ></button>)}
      </form>
    )

    const searchResult = (
      this.state.searchResult.length > 0 ?
        <ul className="result">
          {this.state.searchResult.map((item) => {
            return (
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul> : <div className="empty-box">검색 결과가 없습니다</div>
    )

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((item, index) => (
          <li
            key={item.id}
            onClick={() => { this.search(item.keyword) }}
          >
            <span className="number">{index + 1}</span>
            <span>{item.keyword}</span>
          </li>
        ))}
      </ul>
    )

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map(tabType => (
            <li
              onClick={() => this.setState({ selectedTab: tabType })}
              className={this.state.selectedTab === tabType ? "active" : ""}
              key={tabType}
            >
              {TabLabel[tabType]}
            </li>
          ))}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && keywordList}
        {this.state.selectedTab === TabType.HISTORY && <>최근</>}
      </>
    )

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
