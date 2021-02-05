import React, { useState } from "react";
import "./Homepage.css";

import trash from "../../images/delete.png";
import unchecked from "../../images/unchecked2.png";
import checked from "../../images/checked3.png";

function Homepage() {
  const [list, setList] = useState([
    { titulo: "Exemplo", toggle: true, id: "0" },
  ]);
  const [input, setInput] = useState("");
  const noInput = input === "";

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    if (list.length) {
      setList([
        ...list,
        {
          titulo: `${input}`,
          toggle: true,
          id: `${Math.floor(Math.random() * (100000 - 1)) + 1}`,
        },
      ]);
    } else {
      setList([
        {
          titulo: `${input}`,
          toggle: true,
          id: `${Math.floor(Math.random() * (100000 - 1)) + 1}`,
        },
      ]);
    }

    event.target.parentNode.reset();
    setInput("");
  }

  function handleDelete(event) {
    let filtered = list.filter((e) => {
      return e.id !== event.target.parentNode.parentNode.id;
    });
    setList(filtered);
  }

  function handleCheck(event) {
    event.preventDefault();
    console.log(event.target.parentNode.parentNode.id);
    let checked = list.map((e) => {
      if (e.id === event.target.parentNode.parentNode.id) {
        e.toggle = !e.toggle;
        return e;
      } else {
        return e;
      }
    });
    setList(checked);
  }

  function handleDeleteCheck() {
    let deleteChecked = list.filter((e) => e.toggle);
    setList(deleteChecked);
  }

  return (
    <div>
      <div className="homepage-container">
        <div className="header">
          <h1>to-do list</h1>
          <form className="homepage-form">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Nova tarefa"
            />
            <button onClick={handleClick} type="submit" disabled={noInput}>
              +
            </button>
          </form>
        </div>
        <div className="table-container">
          {list.length ? (
            <button className="limpar" onClick={handleDeleteCheck}>
              Limpar Checados
            </button>
          ) : (
            <p className="lista-vazia">Nada por aqui</p>
          )}

          <table className="homepage-table">
            <thead>
              <tr>
                <th className="situacao">
                  <></>
                </th>
                <th>
                  <></>
                </th>
                <th className="delete">
                  <></>
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length ? (
                list.map((item) => (
                  <tr key={item.id} id={item.id}>
                    <td>
                      {item.toggle ? (
                        <img
                          onClick={handleCheck}
                          className="unchecked"
                          src={unchecked}
                        />
                      ) : (
                        <img
                          onClick={handleCheck}
                          className="checked"
                          src={checked}
                        />
                      )}
                    </td>
                    <td>
                      <p>{item.titulo}</p>
                    </td>
                    <td>
                      <img
                        onClick={handleDelete}
                        className="trash"
                        src={trash}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
