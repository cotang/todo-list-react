import React, { Component } from 'react';
import './ToDo.css';


class InputGroup extends React.Component {
  constructor(){
    super();
    this.state = {
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
    this.props.onAddToList(this.state.value);
    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <div>
        <input 
          type="text" 
          placeholder="Write down the new action"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmitToList}>Add action</button>
      </div>
    );
  }
}



class FilterGroup extends React.Component {
  handleFilter(str){
    this.props.onChangeFilter(str);
  }

  render() {
    return (
      <div className="filters">
        <button onClick={this.handleFilter.bind(this, '')}>All actions</button>
        <button onClick={this.handleFilter.bind(this, 'active')}>Active actions</button>
        <button onClick={this.handleFilter.bind(this, 'completed')}>Completed actions</button>
      </div>
    );
  }
}




class ToDo extends Component {
  constructor(){
    super();
    this.state = {
      list: [],
      filter: ''
    }
    this.addAction = this.addAction.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  addAction(value) {
    if (value === ''){
      return;
    }
    this.setState({      
      list: [...this.state.list, {'title':value, 'completed':false}],
    })
  }

  completeAction(index){
    var newList = this.state.list.slice();
    newList[index].completed = !(this.state.list[index].completed);
    this.setState({
      list: newList
    })
  }
  deleteAction(index){
    var newList = this.state.list.slice();
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  }

  changeFilter(str){
    this.setState({
      filter: str
    })
  }

  render() {
    let list = this.state.list;
    if (this.state.filter === 'completed') {
      list = list.filter(function(item) { return item.completed; });
    } else if (this.state.filter === 'active') {
      list = list.filter(function(item) { return !item.completed; });
    }

    return (
      <div className="to-do">
        <h1 className="to-do__title">To-do list</h1>

        <InputGroup onAddToList={this.addAction} />

        <ol className="to-do__list" id="to-do__list">
          {list.map((item, index) =>
            <li className={item.completed ? "to-do__item to-do__item--completed" : "to-do__item"} key={index}>
              <p className="to-do__text" >{item.title}</p>
              <div>
                <button onClick={this.completeAction.bind(this, index)}><span className="color green">&#10004;</span>{item.completed ? 'Uncomplete' : 'Complete'} action</button>
                <button onClick={this.deleteAction.bind(this, index)}><span className="color red">&#10008;</span>Delete action</button>
              </div>
            </li>
          )}
        </ol>

        <FilterGroup onChangeFilter={this.changeFilter} />

      </div>
    );
  }
}

export default ToDo;
