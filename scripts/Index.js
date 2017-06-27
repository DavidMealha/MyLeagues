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
									<li><Link to={"/#Leagues"}>Leagues</Link></li>
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
			cache: false,
			success: function(data) {
				this.setState({leagues: data});
				console.log(data);
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
    		 						item => ( <LeagueItem item={item} /> )	
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
		return (
			<div id={this.state.league._id} className="mt-20 league-card">
				<div className="col-md-4">
					<img src={ this.state.league.image } className="card-img"/>
				</div>
				<div className="col-md-8">
					<h3>{ this.state.league.name }</h3>
					<span className={"flag-icon flag-icon-" + this.state.league.country.code}></span>
					<span> { this.state.league.country.name }</span>
					<hr/>
					<span>Começa a { dateParsed }</span>
					 - { this.state.league.division }
				</div>
				<div className="col-md-12 bounce">
					<button className="btn btn-main ">Ver ultimas novidades</button>
				</div>
            </div>
		);
		
	}
}


ReactDOM.render((<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={ListLeagues} />
						<Route path="/Leagues" component={ListLeagues} />
					</Route>
				</Router>
				), document.getElementById('container'));