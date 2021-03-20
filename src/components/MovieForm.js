import React, {Component} from 'react';

class  MovieForm  extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          title: "",
          poster: "",
          comment: "",
          result: ""
        };
      }

    submitForm = (e) => {
        e.preventDefault();
        const url = "https://post-a-form.herokuapp.com/api/movies";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(res => {
            if (res.error) {
              this.setState({result: res.error});
              console.log(res)
            } else {
              alert(`Employee #${res} has been successfully added!`);
              this.setState({result: res})
            }
          }).catch(e => {
            console.error(e);
            alert('There was an error when adding the employee.');
          });
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
    render(){
        return(
            <div>
                <form onSubmit={this.submitForm}>
                    <div className="form-data">
                        <label htmlFor="title">Movie Name</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title}
                         />
                    </div>
                    <div className="form-data" >
                        <label htmlFor="poster">Url Poster</label>
                        <input 
                            type="text"
                            id="poster"
                            name="poster"
                            onChange={this.onChange}
                            value={this.state.poster}
                         />
                    </div>
                    <div className="form-data" >
                        <label htmlFor="comment">Comment</label>
                        <input 
                            type="text"
                            id="comment"
                            name="comment"
                            onChange={this.onChange}
                            value={this.state.comment}
                         />
                    </div>
                    <hr />
                    <input type="submit" value="Send" />
                </form>
                <h1>{this.state.result ? `Result is: ${this.state.result}` : null }</h1>
            </div>
        )
    }
   
}

export default MovieForm;