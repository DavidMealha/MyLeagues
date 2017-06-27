var React = React;
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

class App extends React.Component {
	render() {
		return (<div>
					<Navbar />
					<div className="mt-90">
						{this.props.children}
					</div>
				</div>);
	}
};

class Navbar extends React.Component {
	render() {
		var navigationLinks = (<ul className="nav navbar-nav navbar-right">
									<li><Link to={"/Leagues"}>Leagues</Link></li>
									<li><Link to="/Courses">Create New League</Link></li>
								</ul>);
	
		return (<nav className="navbar navbar-default navbar-fixed-top navbar-home">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse"
								data-target="#myNavbar">
								<span className="icon-bar"></span> 
								<span className="icon-bar"></span> 
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to={"/"}>My Leagues</Link>
						</div>
						<div className="collapse navbar-collapse" id="myNavbar">
							{navigationLinks}
						</div>
					</div>
				</nav>);
	}
};

class ListLeagues extends React.Component {
	constructor(props) {
		super(props);
		this.state = { leagues: [] };
	}

	componentWillMount() {
		$.ajax({
			type: "GET",
			url: "/api/soccerLeagues",
			async: false,
			cache: false,
			success: function(data) {
				this.setState({leagues: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	render() {
		return (<div className="container">
					<div className="row">
						<div className="col-md-12">
    		 				{
    		 					this.state.leagues.map(
    		 						item => ( 
    		 							<div id={ item._id } className="mt-20 league-card">
    		 								<LeagueItem item={ item } />
		 									<SeeMoreLeagueDetails id={ item._id } />
		 								</div>)	
			            		)
    		 				}
    		 			</div>
			 		</div>
		 		</div>
				);
	}
};

class LeagueItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { league: this.props.item };
	}

	render() {
		var date = new Date(this.state.league.startDate);
		var month = date.getMonth() + 1;
		var dateParsed = date.getDate() + "/" + month + "/" + date.getFullYear();
		return (<div className="row">
					<div className="col-md-8 col-xs-8">
						<h3>{ this.state.league.name }</h3>
						<span className={"flag-icon flag-icon-" + this.state.league.country.code}></span>
						<span> { this.state.league.country.name }</span>
						<p>Começa a { dateParsed }</p>
					</div>
					<div className="col-md-4 col-xs-4">
						<img src={ this.state.league.image } className="card-img"/>
					</div>
					<div className="col-md-12 col-xs-12">
						<hr/>
					</div>
				</div>);
	}
}

class SeeMoreLeagueDetails extends React.Component {
	render() {
		return (<div className="row">
					<div className="col-md-12 text-center">
						<img className="bounce" src="https://d30y9cdsu7xlg0.cloudfront.net/png/10897-200.png" />
						<br/>
						<Link to={"/Leagues/" + this.props.id  }>Ver ultimas novidades</Link>
					</div>
				</div>);
	}
}

class LeagueDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: this.props.params.id, league: {}, results: {} };
	}

	componentWillMount() {
		var URL = "/api/soccerLeagues/" + this.state.id; 
		$.ajax({
			type: "GET",
			url: URL,
			cache: false,
			success: function(data) {
				this.setState({ league: data });

				var API_URL = "https://www.reddit.com/r/soccer/search.json?";
				var PARAMETERIZED_URL = API_URL + "q=" + this.state.league.name + "&sort=" + "relevance";

				$.ajax({
					method: "GET",
					url: PARAMETERIZED_URL,
					dataType: "json",
					async: false,
					cache: false,
					success: function(data) {
						this.setState({ results: data });
					}.bind(this),
					error: function(xhr, status, err) {
						console.error(this.props.url, status, err.toString());
					}.bind(this)
				});

			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

	}

	render() {
		return (<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="mt-20 league-card">
								<LeagueItem item={this.state.league} />
								<OtherSourcesContainer results={ this.state.results }/>
							</div>
						</div>
					</div>
				</div>);
	}
}

class OtherSourcesContainer extends React.Component {
	render() {
		return (<div>
					{ this.props.results.map(
						item=>(
								<span>item.url</span>
							)
						) 
					}
				</div>)
	}
}


ReactDOM.render((<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={ListLeagues} />
						<Route path="/Leagues" component={ListLeagues} />
						<Route path="/Leagues/:id" component={LeagueDetail} />
					</Route>
				</Router>
				), document.getElementById('container'));