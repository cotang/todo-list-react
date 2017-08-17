import React, { Component } from 'react';
import './ToDo.css';

class ToDo extends Component {
  constructor(){
    super();
    this.state = {
      list: []
    }
  }
  addToList(){
    var input = document.querySelector('#new-action');
    this.setState({
      list: [...this.state.list, {'title':input.value, 'fulfilled':false}]
    })
    input.value='';
  }
  fulfillAction(index){
    var newList = this.state.list.slice();
    newList[index].fulfilled = true;
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
  render() {
    return (
      <div className="to-do">
        <h1 className="to-do__title">To-do list</h1>
        <div>
          <input type="text" name="new-action" id="new-action" placeholder="Write down the new action" />
          <button onClick={this.addToList.bind(this)}>Add action</button>
        </div>
        <ol className="to-do__list" id="to-do__list">
          {this.state.list.map((item, index) =>
            <li className="to-do__item" key={index}>
              {(item.fulfilled) ? (
                <p className="fulfilled">{item.title}</p>
              ) : (
                <p>{item.title}</p>
              )}
              <div>
                <button onClick={this.fulfillAction.bind(this, index)}><span className="color green">&#10004;</span>Fulfill action</button>
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
