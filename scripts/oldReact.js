var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var App = React.createClass({
	render: function(){
		return (<div>
					<Navbar />
					{this.props.children}
				</div>);
	}
});


//Navbar component, the component information varies from the user role authenticated in the system
var Navbar = React.createClass({
	getInitialState: function(){
		var role = "";
		
		$.ajax({
			url: "/User/Role",
			async: false,
			cache: false,
			success: function(data) {
				role = data.toLowerCase();
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		
		return ({role: role});
	},
	render: function(){
		var navigationLinks;
		
		if(this.state.role == 'student'){
			navigationLinks = (<ul className="nav navbar-nav navbar-right">
									<li><Link to="/Dashboard">Dashboard</Link></li>
									<li><Link to="/Courses">Courses Enrolled</Link></li>
									<li><a href="/logout">Logout</a></li>
								</ul>);
		}
		else if(this.state.role == 'professor' || this.state.role == 'assistent'){
			navigationLinks = (<ul className="nav navbar-nav navbar-right">
									<li><Link to="/Dashboard">Dashboard</Link></li>
									<li><Link to="/Courses">Courses Teaching</Link></li>
									<li><a href="/logout">Logout</a></li>
								</ul>);
		}//if its not logged in
		else{
			navigationLinks = (<ul className="nav navbar-nav navbar-right">
									<li><Link to="/Register">Register</Link></li>
									<li><Link to="/Login">Login</Link></li>
								</ul>);
		}
	
		return (<nav className="navbar navbar-default navbar-fixed-top navbar-home">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse"
								data-target="#myNavbar">
								<span className="icon-bar"></span> 
								<span className="icon-bar"></span> 
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to={"/"}>School Appplication</Link>
						</div>
						<div className="collapse navbar-collapse" id="myNavbar">
							{navigationLinks}
						</div>
					</div>
				</nav>);
	}
});

var Login = React.createClass ({
	getInitialState: function() {
		return {email: '', password: ''};
	},
	emailChanged: function(e){
		this.setState({email: e.target.value});
	},
	passwordChanged: function(e){
		this.setState({password: e.target.value});
	},
	render: function() {
		return (<div className="col-md-offset-4 col-md-4 search-form">
					<form onSubmit={this.handleLogin}>
			            <div className="form-horizontal">
			              <div className="form-group">
			                <label className="control-label form-label" htmlFor="email">EMAIL</label>
			                <input className="form-control" onChange={this.emailChanged} type="email" name="email" placeholder="Your email address" value={this.state.email} required/>
			              </div>
			              <div className="form-group">
			                <label className="control-label form-label" htmlFor="password">PASSWORD</label>
			                <input className="form-control form-label" onChange={this.passwordChanged} type="password" name="password" placeholder="Your password" value={this.state.password} required/>
			              </div>
			              <div className="form-group mt-30">
			                <input type="submit" name="Login" value="Submit" className="btn btn-main btn-submit"/>
			              </div>
			            </div>
		            </form>
	            </div>);
	},
	handleLogin(e) {
		e.preventDefault();

		$.ajax({
			url: "",
			success: function() {
				broswerHistory.push("/Dashboard");
			}
		});
		
		// Make ajax request to check if credentials are ok
	
		
	}
});

var Register = React.createClass({
	getInitialState: function() {
		return {name: '', email: '', password: '', confirmPassword: ''};
	},
	nameChanged: function(e){
		this.setState({email: e.target.value});
	},
	emailChanged: function(e){
		this.setState({password: e.target.value});
	},
	passwordChanged: function(e){
		this.setState({email: e.target.value});
	},
	confirmPasswordChanged: function(e){
		this.setState({password: e.target.value});
	},
	render: function() {
		return (<div className="col-md-offset-4 col-md-4 search-form">
					<form onSubmit={this.handleRegister}>
				        <div className="form-horizontal">
				        <div className="form-group">
				          <label className="control-label form-label" htmlFor="name">NAME</label>
				          <input className="form-control" onChange={this.nameChanged} type="text" name="name" value={this.state.name} placeholder="Your name" required/>
				        </div>
				        <div className="form-group">
				          <label className="control-label form-label" htmlFor="email">EMAIL</label>
				          <input className="form-control" onChange={this.emailChanged} type="email" name="email" value={this.state.email} placeholder="Your email address" required/>
				        </div>
				        <div className="form-group">
				          <label className="control-label form-label" htmlFor="password">PASSWORD</label>
				          <input className="form-control form-label" onChange={this.passwordChanged} type="password" name="password" value={this.state.password} placeholder="Your password" required/>
				        </div>
				        <div className="form-group">
				          <label className="control-label form-label" htmlFor="confirmPassword">CONFIRM PASSWORD</label>
				          <input className="form-control form-label" onChange={this.confirmPasswordChanged} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="Confirm your password" required/>
				        </div>
				        <div className="form-group mt-30">
				          <input type="submit" name="Login" value="Submit" className="btn btn-main btn-submit"/>
				        </div>
				      </div>
				    </form>
			    </div>);
	},
	handleRegister(e) {
		e.preventDefault();

		$.ajax({
			url: "",
			success: function() {
				broswerHistory.push("/Dashboard");
			}
		});
		
		// Make ajax request to check if credentials are ok

		
	}
});

//Component of the homepage with the search of degree by name 
var SearchDegree = React.createClass({
	getInitialState: function() {
		return {degreeId:'', searchString:'', degrees: []};
	},
	componentWillMount: function(){
		// Get all degrees available in file degrees.json
		$.ajax({
			url: "/Degrees",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({degrees: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		
	},
	handleChange: function(e){
		this.setState( {searchString:e.target.value} );
//		browserHistory.push("/Search/" + this.state.searchString);
	},
	handleSubmit: function(e){
		e.preventDefault();
		browserHistory.push("/Search/" + this.state.degreeId);
	},
	chooseDegree: function(e){
		this.setState({degreeId: e.target.id, searchString: e.target.textContent }); 
		$('#searchText').val(this.state.searchString);
		//browserHistory.push("/Search/" + e.target.id);
	},
	render: function() {
        var degrees = this.state.degrees,
        searchString = this.state.searchString.trim().toLowerCase();
        
	    if( searchString.length > 0 ){
	    	degrees = degrees.filter( function( d ){
	            return d.designation.toLowerCase().match(searchString);
	        });
	    }
	    return ( <div>
		    		<div className="row">
						<div className="col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 search-form">
							<form>
								<input id="searchText" className="search-input" type="text" value={this.state.searchString} name="" placeholder="Degree Name" onChange={this.handleChange}/>
								<button onClick={this.handleSubmit} className="search-button">Search</button>
							</form>
			             </div>
					 </div>
					 <div className="row">
					 	<div className="col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
							<div className="search-filter ">
								<ul className="list-group"> 
				                    { degrees.map( function(d) { 
				                    	return (
				                    		<li id={d.id} key={d.id} className="list-group-item clickable-list" onClick={this.chooseDegree}> {d.designation} </li> 
				                    	);
				                      }, this) 
				                    }
				                </ul>
			                </div>
		                </div>
					 </div>
				 </div>
	           );
	}
	
});

var DegreeDetails = React.createClass({
	getInitialState: function(){
		var degreeId = this.props.params.id;

		//the request is async, so there needs to be a empty array for courses, so in the map there is that object
		var degreeObject = {};
		var degreeCourses = [];
		
		return ({id: degreeId, degreeObject: degreeObject, degreeCourses: degreeCourses});
		
	},
	componentDidMount: function(){
		//Get details of a degree
		
		$.ajax({
//			url: "/assets/json/degree.json",
			url: "/Degrees/" + this.state.id,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({degreeObject: data});
				//console.log(data);
			}.bind(this)
		});
		
		$.ajax({
			url: "/Degrees/"+this.state.id+"/courses",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({degreeCourses: data});
				console.log(data);
			}.bind(this)
		});
	},
	render: function() {
		return (<div className="row mt-70">
					<h3>Degree Details</h3>
					<div className="col-md-4">
						<label>Designation:</label>
						<p>{ this.state.degreeObject.designation }</p>
					</div>
					<div className="col-md-4">
						<label>Duration:</label>
						<p>{ this.state.degreeObject.duration } years</p>
					</div>
					<div className="col-md-4">
						<label>ECTS:</label>
						<p>{ this.state.degreeObject.ects }</p>
					</div>
					<div className="col-md-12">
						<table className="table">
							<thead className="thead-table-grades">
								<tr>
									<th>Courses Lectured</th>
									<th>Semester</th>
									<th></th>
								</tr>
							</thead>
							<tbody className="tbody-table-grades">
								{this.state.degreeCourses.map(
										item => (
											<tr key={item.id}>
												<td>{ item.name }</td>
												<td>{ item.semester }</td>
												<td>
													<Link to={'/Search/' + this.props.params.id + '/courses/' + item.id } className="link-details">See Details</Link>
												</td>
											</tr>
										)
								 )
								}
							</tbody>
						</table>
					</div>
				</div>);
	}
});

var CourseDetailsGeneral = React.createClass({
	getInitialState: function(){
		var courseId = this.props.params.courseId;
		var objectCourse = {};
		var teachingTeam = [];
		var degreeId = this.props.params.id;
		
		return {objectCourse: objectCourse, teachingTeam: [], courseId: courseId, degreeId: degreeId};
		
	},
	componentWillMount: function(){
		$.ajax({
			//url: "/assets/json/course.json", 
			url : "/Courses/" + this.state.courseId,
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data);
				this.setState({objectCourse: data});
			}.bind(this)
		});
	},
	render: function(){
		return (<div className="row mt-70">
					<div className="col-md-offset-1 col-md-11">
						<Link to={'/Search/' + this.state.degreeId}>Go Back</Link>
					</div>
					<div className="col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11">
						<h3 className="text-center">{ this.state.objectCourse.name }</h3>
						<label>Number: </label>
						<span>{ this.state.objectCourse.number }</span>
						<br/>
						<label>Semester: </label>
						<span>{ this.state.objectCourse.semester }</span>
						<br/>
						<label>Ects: </label>
						<span>{ this.state.objectCourse.ects }</span>
						<br/>
						<label>Description: </label>
						<span>{ this.state.objectCourse.description }</span>
					</div>
			</div>);
	}
});

//Componentes of the main dashboard page, with the profile details
var ProfileDetails = React.createClass({
	getInitialState: function() {
		var profileObject;
		var authenticatedRole;
		
		$.ajax({
			url: "/User/Role",
			async: false,
			cache: false,
			success: function(data) {
				authenticatedRole = data;
			}
		});
		
		return ({profileObject: {}, role: authenticatedRole.toLowerCase()});
		
	},
	componentWillMount: function(){
		// Get user info
		$.ajax({
			url: "/User", 
			dataType: 'json',
			async: false,
			cache: false,
			success: function(data) {
				this.setState({profileObject: data});
			}.bind(this)
		});
	},
	render: function() {
		if(this.state.role == 'student') {
			return (<div className="dashboard-container">
						<ProfileGeneral profileObject={ this.state.profileObject } />
						<StudentProfile profileObject={ this.state.profileObject } />
					</div>);
		}
		return (<div className="dashboard-container">
					<ProfileGeneral profileObject={ this.state.profileObject } />
					<ProfessorProfile profileObject={ this.state.profileObject } />
				</div>);
	}	
});
		
var ProfileGeneral = React.createClass({
	render: function() {
		return (<div className="row">
					<div className="col-xs-6 col-md-2">
						<img src={"/assets/img/" + this.props.profileObject.photo} className="img-circle img-responsive" alt="Avatar Photo" />
					</div>
					<div className="col-xs-6 col-md-10">
						<h3 className="profile-name">{this.props.profileObject.name} | <Link to={'/Dashboard/EditProfile'}>Edit Profile</Link></h3>
						<label>Address:</label>
						<p id="textAddress">{ this.props.profileObject.address }</p> 
					</div>
					<div className="col-xs-6 col-md-3">
						<label>Personal Email:</label>
						<p>{ this.props.profileObject.email }</p>
					</div>
					<div className="col-xs-6 col-md-3">
						<label>University Email:</label>
						<p>{ this.props.profileObject.schoolEmail }</p>
					</div>
					<div className="col-xs-6 col-md-3">
						<label>Secondary Email:</label>
						<p>{ this.props.profileObject.secondaryEmail }</p>
					</div>
				</div>);
		}
});

var StudentProfile = React.createClass({
	getInitialState: function(){
		return ({concludedCourses: []});
	},
	componentWillMount: function(){
		$.ajax({
			url: "/User/Courses/concluded", 
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({concludedCourses: data});
			}.bind(this)
		});
	},
	render: function() {
		return (<div className="row mt-20">
					<div className="col-md-12">
						<h4 className="text-center">Student Information</h4>
					</div>
					<div className="col-md-3 text-center">
						<label>Student Number</label>
						<p>{ this.props.profileObject.number }</p>
					</div>
					<div className="col-md-6 text-center">
						<label>Degree</label>
						<p>{ this.props.profileObject.degree.designation }</p>
					</div>
					<div className="col-md-3 text-center">
						<label>Average</label>
						<p>0</p>
					</div>
					<div className="col-md-12">
						<table className="table ">
							<thead className="thead-table-grades">
								<tr>
									<th>Courses concluded</th>
									<th>Final Grade</th>
								</tr>
							</thead>
							<tbody className="tbody-table-grades">
								{this.state.concludedCourses.map(
										item => (
											
											<tr className="clickable-row" data-href="/CourseDetails" key={item.courseId} >
												<td>{ item.name }</td>
												<td>{ item.average }</td>
											</tr>
										)
								 )
								}
							</tbody>
						</table>
					</div>
				</div>);
	}
});

var ProfessorProfile = React.createClass({
	getInitialState: function(){
		return ({coursesLectured: []});
	},
	componentWillMount: function(){
		$.ajax({
			url: "/User/Courses/lectured", 
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({coursesLectured: data});
			}.bind(this)
		});
	},
	render: function() {
		return (<div className="row mt-20">
					<div className="col-md-12">
						<h4>Professor Information</h4>
					</div>
					<div className="col-md-12">
						<label>Department:</label>
						<p>{ this.props.profileObject.department }</p>
					</div>
					<div className="col-md-12">
					<table className="table ">
						<thead className="thead-table-grades">
							<tr>
								<th>Courses Lectured</th>
								<th>Semester</th>
								<th>Year</th>
								<th>Role</th>
							</tr>
						</thead>
						<tbody className="tbody-table-grades">
							{this.state.coursesLectured.map(
									item => (
										
										<tr className="clickable-row" data-href="/CourseDetails" key={item.courseEditionId} >
											<td>{ item.name }</td>
											<td>{ item.semester }</td>
											<td>{ item.year }</td>
											<td>{ item.role }</td>
										</tr>
									)
							 )
							}
						</tbody>
					</table>
				</div>
				</div>);
	}
});

var EditProfile = React.createClass({
	getInitialState: function(){
		return {address:"", email: ""};
	},
	componentWillMount: function(){
		//make ajax to get logged in user information
		$.ajax({
			url: "/User", 
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({address: data.address, email: data.secondaryEmail});
			}.bind(this)
		});
	},
	saveEdit: function(e){
		//preventing the form of submitting
		e.preventDefault();
		//make ajax request to store email and address which are strings
		$.ajax({
			url: "/User", 
			dataType: 'json',
			type: 'PUT',
			data: {
				address: this.state.address,
				email: this.state.email	
			},
			cache: false,
			success: function(data) {
			}.bind(this)
		});

		//make another ajax request to send the image, with another format
		$.ajax({
			url: "/User/UploadAvatar",
			type: "POST",
			data: new FormData($("#upload-file-form")[0]),
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			success: function () {
			  // Handle upload success
			  // ...
			},
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		
		browserHistory.push("/Dashboard");
	},
	cancelEdit: function(e){
		e.preventDefault();
		browserHistory.push("/Dashboard");
	},
	onChangeAddress: function(e){
		this.setState({address: e.target.value});
	},
	onChangeEmail: function(e){
		this.setState({email: e.target.value});
	},
	render: function(){
		return (<form id="upload-file-form">
					<div className="row mt-70">
						<h3>Edit Profile</h3>
						<div className="col-md-4">
							<label>Address:</label>
							<input type="text" value={this.state.address} onChange={this.onChangeAddress} className="form-control"/>
						</div>
						<div className="col-md-4">
							<label>Secondary Email:</label>
							<input type="email" value={this.state.secondaryEmail} onChange={this.onChangeEmail} className="form-control" />
						</div>
						<div className="col-md-4">
							<label>Photo:</label>
							<input id="uploadFile" name="uploadFile" type="file" className="form-control" />
						</div>
						<div className="col-md-12 mt-10">
							<button className="btn btn-primary mr-10" onClick={this.saveEdit}>Save</button>
							<button className="btn btn-secondary" onClick={this.cancelEdit}>Cancel</button>
						</div>
					</div>
				</form>);
	}
});
		
var CoursesList = React.createClass({
	getInitialState: function() {
		return { 
			courses: [] 
		};

	},
	componentWillMount: function(){
		$.ajax({
			url: "/User/Courses",
			cache: false,
			success: function(data) {
				this.setState({courses: data});
			}.bind(this)
		});
		
	},
	render: function() {
		var courses = this.state.courses.map(function(course) {
		        return (<tr key={course.id} >
			            	<td>{course.name}</td>
			            	<td>{course.semester}</td>
			            	<td>
			            		<Link to={"/Courses/CourseDetails/" + course.id} className="link-details">See Details</Link>
		            		</td>
			            </tr>);
		}, this);

		return (<div className="courses-container">
					<div className="col-md-12">
						<table className="table" >
							<thead className="thead-table-grades">
								<tr>
									<th>My courses</th>
									<th>Semester</th>
									<th></th>
								</tr>
							</thead>
							<tbody className="tbody-table-grades">
								{courses}
							</tbody>
						</table>
					</div>
				</div>);
	}	
});

var CourseDetails = React.createClass({
	getInitialState: function(){
		var id = this.props.params.id;
		var authenticatedRole;
		
		$.ajax({
			url: "/User/Role",
			async: false,
			cache: false,
			success: function(data) {
				authenticatedRole = data;
			}.bind(this)
		});
		
		return {courseId: id, objectCourse: {}, role: authenticatedRole.toLowerCase()};
	},
	componentWillMount: function(){
		$.ajax({
			url: "/Courses/"+this.state.courseId,
			dataType: 'json',
			cache: false,
			async: false,
			success: function(data){
				this.setState({objectCourse:data});
			}.bind(this)
		});
		
	},
	render: function() {
		if(this.state.role == "student"){
			return (<div>
						<DetailsGeneral objectCourse={this.state.objectCourse}/>
						<StudentGrades courseId={this.state.objectCourse.id}/>
					</div>);
		}
		else if(this.state.role == "professor"){
			return (<div>
						<DetailsGeneral objectCourse={this.state.objectCourse}/>
						<ProfessorAction courseId={this.state.objectCourse.id} />
					</div>);
		}else if(this.state.role == "assistent"){
			return (<div>
						<DetailsGeneral objectCourse={this.state.objectCourse}/>
						<AssistentAction courseId={this.state.objectCourse.id} />
					</div>);
		}
		return (<div>
					<DetailsGeneral objectCourse={this.state.objectCourse}/>
				</div>);
	}
});

var DetailsGeneral = React.createClass({
	getInitialState: function() {
		return ({teachingTeam: []});
	},
	componentWillMount: function() {
		//ajax request to get the list of professors teaching the course
		$.ajax({
			url: "/Courses/" + this.props.objectCourse.courseEditionId + "/Professors",
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({teachingTeam: data});
			}.bind(this)
		});
	},
	render: function(){
		return (<div className="row mt-70">
					<div className="col-md-offset-1 col-md-11">
						<Link to={'/Courses'}>Go Back</Link>
					</div>
					<div className="col-md-12">
						<h3 className="text-center">{ this.props.objectCourse.name }</h3>
					</div>
					<div className="col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-7">
						<label>Number:</label>
						<span>{ this.props.objectCourse.number }</span>
						<br/>
						<label>Ects:</label>
						<span>{ this.props.objectCourse.ects }</span>
						<br/>
						<label>Description:</label>
						<span>{ this.props.objectCourse.description }</span>
					</div>
					<div className="col-sm-6 col-md-4">
						<label>Teaching Team:</label>
						<ul className="list-unstyled">
						{this.state.teachingTeam.map(
								item => (
									
									<li key={item.id} >
										{item.name} - {item.role.designation}
									</li>
								)
						 )
						}
						</ul>
					</div>
			</div>);
	}
});


var ProfessorAction = React.createClass({
	markStudentClick: function(){
		var courseId = this.props.courseId;
		browserHistory.push("/Courses/MarkStudents/" + courseId);
	},
	enrollStudents: function(){
		var courseId = this.props.courseId;
		browserHistory.push("/Courses/EnrollStudents/" + courseId);
	},
	editCourse: function(){
		var courseId = this.props.courseId;
		browserHistory.push("/Courses/EditCourse/" + courseId);
	},
	render: function() {
		return (<div className="row mt-20">
					<div className="col-md-offset-1 col-md-11"> 
						<button className="btn btn-secondary mr-10" onClick={this.editCourse}>Edit Course</button>
						<button className="btn btn-secondary mr-10" onClick={this.markStudentClick}>Mark Students</button>
						<button className="btn btn-secondary" onClick={this.enrollStudents}>Enroll Students</button>
					</div>
				</div>);
	}
});

var AssistentAction = React.createClass({
	markStudentClick: function(){
		var courseId = this.props.courseId;
		browserHistory.push("/Courses/MarkStudents/" + courseId)
	},
	render: function() {
		return (<div className="row mt-20">
					<div className="col-md-offset-1 col-md-11"> 
					<button className="btn btn-secondary mr-10" onClick={this.markStudentClick}>Mark Students</button>
					</div>
				</div>);
	}
});

var StudentGrades = React.createClass({
	getInitialState: function(){
		var courseId = this.props.courseId;
		var grades = [];
		return ({gradesList: grades});
	},
	componentWillMount: function(){
		$.ajax({
			url: "/User/Courses/"+this.props.courseId+"/Grades",
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({gradesList: data});
			}.bind(this)
		});
	},
	render: function() {
		return (<div className="row mt-20">
					<label>Grades:</label>
					<table className="table">
					<thead className="thead-table-grades">
						<tr>
							<th>Evaluation</th>
							<th>Grade</th>
							<th>Percentage</th>
						</tr>
					</thead>
					<tbody className="tbody-table-grades">
						{this.state.gradesList.map(
								item => (
									<tr key={item.id}>
										<td>{ item.evaluationName }</td>
										<td>{ item.grade }</td>
										<td>{ item.percentage }</td>
									</tr>
								)
						 )
						}
					</tbody>
				</table>
				</div>);
	}
});

var MarkStudents = React.createClass({
	getInitialState: function(){
		var id = this.props.params.id;
		var studentsList, currentGrades;
		
		return {courseId: this.props.params.id, courseEditionId: 0, evaluationSteps: [], studentsList: []};
	}, 
	componentDidMount: function(){
		//make ajax request to get current course
		$.ajax({
			url: "/Courses/" + this.state.courseId, 
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					courseEditionId: data.courseEditionId 
				});
				
				// get evaluation steps
				$.ajax({
					url: "/Courses/" + this.state.courseEditionId + "/EvaluationStep",
					dataType: 'json',
					cache: false,
					success: function(data) {
						this.setState({
							evaluationSteps: data
						});
						
						//fetch evaluation steps after getting the course data
						$.ajax({
							url: "/Courses/" + this.state.courseEditionId + "/MarkStudents",
							dataType: 'json',
							cache: false,
							success: function(data) {
								this.setState({
									studentsList : data
								});
								
								console.log(data );
								
							}.bind(this),
							error: function(xhr, status, err) {
								alert("MarkStudents AJAX error: " + xhr.status );
							}.bind(this)
						});
						
					}.bind(this),
					error: function(xhr, status, err) {
						alert( xhr.status );
					}.bind(this)
				});
				
				
				
			}.bind(this)
		});
		
	},
	saveGrades: function(){
		//make ajax request to save the grades
		//this.state.id
		browserHistory.push("/Courses/CourseDetails/" + this.state.courseId);
	},
	cancelGrades: function(){
		browserHistory.push("/Courses/CourseDetails/" + this.state.courseId);
	},
	render:function(){
		return(<div className="row mt-70">
					<h3>Mark Students</h3>
					<table className="table">
						<thead className="thead-table-grades">
							<tr>
								<th>Number</th>
								<th>Name</th>
								{this.state.evaluationSteps.map(
										item => (
											<th>{ item.name }</th>
										)
									)
								}
							</tr>
						</thead>
						<tbody>
						{this.state.studentsList.map(
							item => (
                                <tr>
                                    <td>{ item.enrolledUser.number }</td>
                                    <td>{ item.enrolledUser.name }</td>
                                    {item.grades.map(
                                            gradeItem => (
                                                <td><input type="text" value={gradeItem.grade}/></td>
                                            )
                                    )}
                                </tr>                        
                        		)	
                        	)
						}
						</tbody>
					</table>
					<button className="btn btn-primary mr-10" onClick={this.saveGrades}>Save</button>
					<button className="btn btn-secondary" onClick={this.cancelGrades}>Cancel</button>
				</div>);
	}
});

var EnrollStudents = React.createClass({
	getInitialState: function(){
		var courseId = this.props.params.id;
		var courseEditionId;
		var studentsList;

		return({
			studentsList: [],
			courseId: courseId, 
			courseEditionId: 0
		});
	},
	componentWillMount: function(){
		$.ajax({
			url: "/Courses/" + this.state.courseId, 
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					courseEditionId: data.courseEditionId					
				});
				
				$.ajax({
					url: "/Courses/" + this.state.courseEditionId + "/EnrollStudents",
					dataType: 'json',
					async: false,
					success: function(data) {
						
						//FIXME trying to order list
						/*data.sort(function(a,b) {
							return (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0);
						} );*/
						
						this.setState({
							studentsList: data
						});
						
					}.bind(this)
				});

			}.bind(this),
			error: function(xhr, status, err) {
				alert( xhr.status );
			}.bind(this)
		});
		
	},
	saveEnroll: function(){
		var listStudentsEnrolled = [];
		
		for (var i = 0; i < this.state.studentsList.length; i++) {
			if(this.state.studentsList[i].enrollment){
				listStudentsEnrolled.push(this.state.studentsList[i].id);
			}
		}
		
		
			$.ajax({
				url: "/Courses/" + this.state.courseEditionId + "/EnrollStudents", 
				data: {
					studentsEnrolled: listStudentsEnrolled
				},
				type: "POST",
				cache: false,
				success: function(data) {
					
					browserHistory.push("/Courses/CourseDetails/" + this.state.courseId);
				}.bind(this),
				error: function(xhr, status, err) {
					alert( xhr.status );
				}.bind(this)
			});
		
		
	},
	cancelEnroll: function(){
		
		browserHistory.push("/Courses/CourseDetails/" + this.state.courseId);
	},
	changeCheckBox: function(e){
		
		var idUser = e.target.parentNode.parentNode.id; //id saved on tr id
		var isEnrolled = e.target.checked;
		var students = this.state.studentsList;
		var newListStudents = [];

		var studentUpdated;
		for(var j = 0; j < students.length; j++){
			if(students[j].id != idUser){
				newListStudents.push(students[j]);
			}else{
				studentUpdated = students[j];
				studentUpdated.enrollment = isEnrolled;
				newListStudents.push(students[j]);
			}
		}
		this.setState({studentsList: newListStudents});
	},
	render: function(){
		var listItems = this.state.studentsList.map(
				item => (
					<tr id={item.id} key={item.id}>
			            <td>{ item.userNumber }</td>
			            <td>{ item.userName }</td> 
			            <td><input type="checkbox" defaultChecked={item.enrollment} onChange={this.changeCheckBox} /></td>
			        </tr>
			   )
		);
		
		return(<div className="row mt-70">
					<div className="col-md-12">
						<h3>Enroll/Dismiss Students</h3>
						<table className="table">
							<thead className="thead-table-grades">
								<tr>
									<th>Number</th>
									<th>Name</th>
									<th>Is Enrolled</th>
								</tr>
							</thead>
							<tbody>
								{listItems}
							</tbody>
						</table>
					</div>
					<div className="col-md-12 mt-10">
						<button className="btn btn-primary mr-10" onClick={this.saveEnroll}>Save</button>
						<button className="btn btn-secondary" onClick={this.cancelEnroll}>Cancel</button>
					</div>
				</div>);
	}
});

var EditCourse = React.createClass({
	getInitialState: function(){
		return {number: 0, name: "", courseId: this.props.params.id, courseEditionId: 0, description: "", ects: 0, evaluationSteps: []};
	}, 
	componentDidMount: function(){
		//make ajax request to get current data
		$.ajax({
			url: "/Courses/" + this.state.courseId, 
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					number: data.number, 
					name: data.name, 
					courseEditionId: data.courseEditionId, 
					description: data.description, 
					ects: data.ects
				});
				
				//fetch evaluation steps after getting the course data
				$.ajax({
					url: "/Courses/" + this.state.courseEditionId + "/EvaluationStep",
					dataType: 'json',
					cache: false,
					success: function(data) {
						this.setState({evaluationSteps: data});
					}.bind(this)
				});
				
			}.bind(this)
		});
		
	},
	handleSubmit: function(e){
		e.preventDefault();
		
		$.ajax({
			url: "/Courses/" + this.state.courseId, 
			dataType: 'json',
			type: "PUT",
			cache: false,
			data: {
				courseEditionId: this.state.courseEditionId,
				number: this.state.number, 
				name: this.state.name, 
				description: this.state.description, 
				ects: this.state.ects
			},
			success: function(data) {
			}.bind(this)
		});
		
		browserHistory.push("/Courses/CourseDetails/" + this.state.courseId);
	},
	cancelEdit: function(e){
		e.preventDefault();
		browserHistory.push("/Courses/CourseDetails/" + this.state.courseId);
	},
	newEvaluation: function(e){
		e.preventDefault();
		
		var newEvaluationSteps = this.state.evaluationSteps;
		var evaluationName = $("#evaluationName");
		var evaluationPercentage = $("#evaluationPercentage");
		
		//push into the array the new evaluation step from the form 
		newEvaluationSteps.push( {
			name: evaluationName.val(),
			percentage: evaluationPercentage.val()
		} );
		
		//ajax request
		$.ajax({
			url: "/Courses/" + this.state.courseEditionId + "/EvaluationStep",
			type: "POST",
			cache: false,
			data: {
				evaluationName: evaluationName.val(),
				evaluationPercentage: evaluationPercentage.val(), 
			},
			success: function(data) {
				// update evaluation steps list
				this.setState({evaluationSteps: newEvaluationSteps});
				evaluationName.val("");
				evaluationPercentage.val("");
				
			}.bind(this),
			error: function(xhr, status, err) {
				alert( xhr.status );
			}.bind(this)
		});
		
	},
	evaluationNameChanged: function(){
		
	},
	evaluationPercentageChanged: function(){
		
	},
	courseNumberChanged: function(e){
		e.preventDefault();
		this.setState({number: e.target.value});
	},
	courseNameChanged: function(e){
		this.setState({name: e.target.value});
	},
	courseEctsChanged: function(e){
		this.setState({ects: e.target.value});
	},
	courseDescriptionChanged: function(e){
		this.setState({description: e.target.value});
	},
	render: function(){
		return (<div className="row mt-70">
					<form onSubmit={this.handleSubmit}>
				        <div className="form-horizontal">
				        	<div className="col-md-3">
					        	<div className="form-group">
						            <label className="control-label" htmlFor="number">NUMBER</label>
						            <input className="form-control" value={this.state.number} onChange={this.courseNumberChanged} type="number" name="number" placeholder="Course's number" required/>
					            </div>
				        	</div>
				        	<div className="col-md-offset-1 col-md-5">
					        	<div className="form-group">
				            		<label className="control-label" htmlFor="name">NAME</label>
				            		<input className="form-control" value={this.state.name} onChange={this.courseNameChanged} type="text" name="name" placeholder="Course's name" required/>
			            		</div>
				        	</div>
				        	<div className="col-md-offset-1 col-md-2">
					        	<div className="form-group">
					            	<label className="control-label" htmlFor="ects">ECTS</label>
					            	<input className="form-control" value={this.state.ects} onChange={this.courseEctsChanged}  type="number" name="ects" placeholder="Course's ects" required/>
				            	</div>
				        	</div>
				        	<div className="col-md-12">
					        	<div className="form-group">
					            	<label className="control-label" htmlFor="description">DESCRIPTION</label>
					            	<input className="form-control" value={this.state.description} onChange={this.courseDescriptionChanged}  type="text" name="description" placeholder="Course's description" required/>
				            	</div>
				        	</div>
				        	
				        	<div className="col-md-12">
					        	<div className="form-group mt-10">
					            	<button name="save" value="Submit" className="btn btn-primary mr-10">Save</button>
					            	<button name="cancel" value="Cancel" className="btn btn-secondary mr-10" onClick={this.cancelEdit}>Cancel</button>
		            			</div>
				        	</div>
				        	<hr/>
				        </div>
			        </form>
			        <form onSubmit={this.newEvaluation}>
				        <div className="form-horizontal">
					        <div className="col-md-2">
					        	<div className="form-group">
					            	<label className="control-label" htmlFor="name">EVALUATION STEPS</label>
				            		<ul className="list-unstyled">
					            	{this.state.evaluationSteps.map(
											item => (
							                    <li key={item.id}>
							                        { item.name } -  { item.percentage } %
							                    </li>                        
							            		)	
							            	)
									}
					            	</ul>
		            			</div>
				        	</div>
				        	<div className="col-md-3">
				        		<div className="form-group">
				        			<input className="form-control" id="evaluationName" onChange={this.evaluationNameChanged} type="text" placeholder="Evaluation Name" required/>
				        		</div>
			        		</div>
			        		<div className="col-md-offset-1  col-md-3">
				        		<div className="form-group">
				            		<input className="form-control" id="evaluationPercentage" onChange={this.evaluationPercentageChanged} type="number" min="1" max="100" placeholder="Evaluation Percentage" required/>
				        		</div>
			        		</div>
			        		<div className="col-md-offset-1 col-md-2">
				        		<div className="form-group">
				        			<button className="btn btn-secondary">Add Evaluation</button>
				        		</div>
			        		</div>
				        </div>
			        </form>
				</div>);
	}
});

ReactDOM.render((<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={SearchDegree} />
						<Route path="/Search/:id" component={DegreeDetails} />
						<Route path="/Search/:id/courses/:courseId" component={CourseDetailsGeneral} />
						<Route path="Login" component={Login} />
						<Route path="Register" component={Register} />
						<Route path="/Dashboard" component={ProfileDetails} />
						<Route path="/Dashboard/EditProfile" component={EditProfile} />
						<Route path="/Courses" component={CoursesList} />
						<Route path="/Courses/CourseDetails/:id" component={CourseDetails} />
						<Route path="/Courses/MarkStudents/:id" component={MarkStudents} />
						<Route path="/Courses/EnrollStudents/:id" component={EnrollStudents} />
						<Route path="/Courses/EditCourse/:id" component={EditCourse} />
					</Route>
				</Router>
				), document.getElementById('container'));