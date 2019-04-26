import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:8000/api/projects')
			.then((res) => {
				this.setState({ projects: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="App">
				<h1>List of Projects</h1>
				<div className="projectWrapper">
					{this.state.projects.length &&
						this.state.projects.map((project) => {
							return (
								<div className="project" key={project.id}>
									<h4>{project.name}</h4>
									<p>{project.description}</p>
									<p>{project.completed}</p>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

export default App;
