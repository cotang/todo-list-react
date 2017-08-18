import React, { Component } from 'react';
import './ToDo.css';


class ToDo extends Component {
  constructor(){
    super();
    this.state = {
      list: [],
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitToList = this.handleSubmitToList.bind(this);    
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmitToList(event) {
    event.preventDefault();
    this.setState({      
      list: [...this.state.list, {'title':this.state.value, 'completed':false}],
      value: '',
    })
  }

  completeAction(index){
    var newList = this.state.list.slice();
    newList[index].completed = !(this.state.list[index].completed);
    this.setState({
      list: newList
    })
    console.log(this.state.list);
  }
  deleteAction(index){
    var newList = this.state.list.slice();
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  }
  render() {
    return (
      <div className="to-do">
        <h1 className="to-do__title">To-do list</h1>
        <div>
          <input 
            type="text" 
            name="new-action" 
            id="new-action" 
            placeholder="Write down the new action"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmitToList}>Add action</button>
        </div>
        <ol className="to-do__list" id="to-do__list">
          {this.state.list.map((item, index) =>
            <li className="to-do__item" key={index}>
              <p className={item.completed ? 'completed' : ''} >{item.title}</p>
              <div>
                <button onClick={this.completeAction.bind(this, index)}><span className="color green">&#10004;</span>{item.completed ? 'Uncomplete' : 'Complete'} action</button>
                <button onClick={this.deleteAction.bind(this, index)}><span className="color red">&#10008;</span>Delete action</button>
              </div>
            </li>
          )}
        </ol>
      </div>
    );
  }
}

export default ToDo;
