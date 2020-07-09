class App extends Component {
    constructor() {
      super()
      this.state = {
        users: [],
        isLoading: false
      }
    }
    componentDidMount() {
      this.setState({ isLoading: true })
      fetch('https://your/api/url')
          .then(response => response.json())
          .then(response => {
            this.setState({
              users: response,
              isLoading: false
            })
          })
    }
  
    render() {
      let content;
      if (this.state.isLoading) {
        content = <h1>Loading...</h1>
      } else if (this.state.users.length > 0) {
        content = this.state.users.map(u =>
            <Link to={`/users/${u._id}`}>
              <User key={u._id} user={u} />
            </Link>
            )
      } else {
        content = <h4>No users found!</h4>
      }
      return (
          <Router>
            <div>
              <Route path="/users/:_id" component={UserPage}/>
              <Route exact={true} path="/" render={() => content}/>
            </div>
          </Router>
      )
    }
  }