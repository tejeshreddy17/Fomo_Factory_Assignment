import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import { Provider } from "react-redux";
import {
  fetchInitialPriceData,
  fetchStockSymbols,
  selectData,
  selectSymbol,
  updateData,
  changeSymbol,
  dropDownSymbols,
} from "./features/slice";
import store, { AppDispatch } from "./store";
import "./App.css";

Modal.setAppElement("#root");

const url = "http://localhost:4000";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectData);
  const symbol = useSelector(selectSymbol);
  const stockSymbols = useSelector(dropDownSymbols);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newSymbol, setNewSymbol] = useState(symbol);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/stock-price/${symbol}`);
      dispatch(updateData(response.data));
    };

    dispatch(fetchStockSymbols());
    dispatch(fetchInitialPriceData(symbol));

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, symbol]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSymbolChange = () => {
    dispatch(changeSymbol(newSymbol));
    closeModal();
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Stock price tracker</h1>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="ReactModal__Overlay"
        >
          <div className="ReactModal__Content">
            <div className="modal-header">
              <h2>Change stock</h2>
            </div>
            <div className="modal-body">
              <select
                onChange={(e) => setNewSymbol(e.target.value)}
                defaultValue={symbol}
              >
                {stockSymbols.map((symbol: string) => (
                  <option value={symbol}>{symbol}</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                style={{ marginRight: "10px" }}
                onClick={handleSymbolChange}
              >
                Change
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <table>
          <caption style={{ fontSize: "16px", marginBottom: "10px" }}>
            Stock - {symbol}
          </caption>

          <thead>
            <tr>
              <th>Price</th>
              <th>Time (UTC)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry: any, index: number) => (
              <tr key={index}>
                <td>{entry.rate}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={openModal}
          style={{ marginTop: "10px", fontSize: "14px" }}
        >
          Change stock
        </button>
      </div>
    </Provider>
  );
};

export default App;
