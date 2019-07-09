import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";

import './index.css';
import Parser from './models/Parser';
import logo from './pictures/logo.svg'

const store = new TodoListModel();

render(
  <div>
    <DevTools />
    {/*<TodoList store={store} /> */}
    <img src={logo} width="250" height="100" alt="logo" />
    <Parser />
  </div>,
  document.getElementById("root")
);

store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo("Get a cookie as well");
}, 2000);

// playing around in the console
window.store = store;
