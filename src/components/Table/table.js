import React from "react";
import API from "../../API/api.js"
import Search from "../Search/searchBar"


class Table extends React.Component {

  state = {
    sortOrder: "",
    results: [],
    search: ""
  }

  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({ results: res.data.results })
        console.log(this.state.results)
      }).catch(err => console.log(err))
  }


  handleInputChange = event => {

    if (event.target.name === "search") {
      const searchParam = event.target.value.toLowerCase();
      this.setState({
        search: searchParam
      })
    }
  }

  firstName = () => {
    const sorted = this.state.results.sort((a, b) => {
      if (b.name.first > a.name.first) {
        return -1
      }
      if (a.name.first > b.name.first) {
        return 1
      }
      return 0;
    });

    if (this.state.sortOrder === "A-Z") {
      sorted.reverse();
      this.setState({ sortOrder: "Z-A" });
    } else {
      this.setState({ sortOrder: "A-Z" });
    }
    this.setState({ results: sorted })
  }


  render() {
    return (
      <div>
        <Search handleInputChange={this.handleInputChange}
          search={this.state.search} />

        <div className="table-responsive mx-5">
          <table className="table table-resposive text-center">
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name <span className="arrow" onClick={this.firstName}></span></th>
                <th>Last Name </th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            {
              this.state.results && this.state.results.map(item =>
                item.name.first.toLowerCase().includes(this.state.search) ?
                  <tbody >
                    <tr>
                      <td ><img src={item.picture.thumbnail} style={{ borderRadius: "50%" }} alt="thumbnail" /></td>
                      <td >{item.name.first}</td>
                      <td >{item.name.last}</td>
                      <td >{item.phone}</td>
                      <td >{item.email}</td>
                    </tr>
                  </tbody>

                  : null

              )}
          </table>
        </div>
      </div>
    )
  }
}

export default Table;