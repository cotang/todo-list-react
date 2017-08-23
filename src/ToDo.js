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
  constructor(){
    super();
    this.state = {
      filters: [
        {'title': 'All actions', 'filter': '', checked: true},
        {'title': 'Active actions', 'filter': 'active', checked: false},
        {'title': 'Completed actions', 'filter': 'completed', checked: false},
      ],
    }
  }

  handleFilter(str, index){
    this.props.onChangeFilter(str);

    var newFilters = this.state.filters.slice();
    newFilters.forEach(function(item) {
      item.checked = false;
    });
    newFilters[index].checked = true;
    this.setState({
      filters: newFilters
    })
  }

  render() {
    return (
      <div className="filters">
        {this.state.filters.map((item, index) =>
          <button className={item.checked ? "btn btn--checked" : "btn"} onClick={this.handleFilter.bind(this, item.filter, index)} key={index}>
            {item.title}
          </button>
        )}
      </div>
    );
  }
}


function compareDateAsc(a, b) {
  return a.num - b.num;
}
function compareDateDesc(a, b) {
  return b.num - a.num;
}
function compareTitleAsc(a, b) {
  if (a.title.toLowerCase() > b.title.toLowerCase())
    return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase())
    return -1;
  else
    return 0;
}
function compareTitleDesc(a, b) {
  if (a.title.toLowerCase() > b.title.toLowerCase())
    return -1;
  if (a.title.toLowerCase() < b.title.toLowerCase())
    return 1;
  else
    return 0;
}
function compareActive(a, b) {
  return a.completed - b.completed;
}
function compareCompleted(a, b) {
  return b.completed - a.completed;
}

class SortGroup extends React.Component {
  constructor(){
    super();
    this.state = {
      sortings: [
        {'title': 'Date asc', 'function': compareDateAsc, checked: true},
        {'title': 'Date desc', 'function': compareDateDesc, checked: false},
        {'title': 'Title asc', 'function': compareTitleAsc, checked: false},
        {'title': 'Title desc', 'function': compareTitleDesc, checked: false}, 
        {'title': 'Active first', 'function': compareActive, checked: false},
        {'title': 'Completed first', 'function': compareCompleted, checked: false}, 
      ],
    }
  }

  handleSorting(fn, index){
    this.props.onChangeSorting(fn);
    
    var newSortings = this.state.sortings.slice();
    newSortings.forEach(function(item) {
      item.checked = false;
    });
    newSortings[index].checked = true;
    this.setState({
      sortings: newSortings
    })
  }

  render() {
    return (
      <div className="sorting">
        {this.state.sortings.map((item, index) =>
          <button className={item.checked ? "btn btn--checked" : "btn"} onClick={this.handleSorting.bind(this, item.function, index)} key={index}>
            {item.title}
          </button>
        )}
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
    this.useSorting = this.useSorting.bind(this);
  }

  addAction(value) {
    if (value === ''){
      return;
    }
    this.setState({      
      list: [...this.state.list, {'title':value, 'num': Date.now(), 'completed':false}],
    })
  }

  completeAction(index){
    var newList = this.state.list.slice();
    newList[index].completed = !(newList[index].completed);
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

  useSorting(fn){
    var newList = this.state.list.slice();
    newList.sort(fn);
    this.setState({
      list: newList
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

        <SortGroup onChangeSorting={this.useSorting} />

      </div>
    );
  }
}

export default ToDo;
