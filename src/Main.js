import { useEffect, useState } from "react";
import "./Main.css";
import Dropdown from "react-dropdown";
import axios from "axios";

function Main({ books }) {
  console.log(books);
  const [inp, setInp] = useState();
  const [selected, setSelected] = useState();
  const [data, setData] = useState("");
  const options = ["Book Name", "Author", "Publisher"];
  const defaultOption = options[0];
  //   console.log(selected);
  //   console.log(inp);

  const handleChange = (e) => {
    setInp(e.target.value);
  };

  const res = (inp) => {
    axios
      .get(`https://openlibrary.org/search.json?q=${inp}`)
      .then((response) => setData(response));
  };
  const btnClicked = () => {
    res(inp);
    // console.log(data);
    // console.log(data.data.docs[0].title);
    // console.log(...data.data.docs[0].author_name);
  };
  let strdata, len;
  //   data!=?strdata = data.data.docs:null
  if (data != "") {
    strdata = data.data.docs;
    len = data.data.docs.length;
  }
  return (
    <div className="container1">
      <div className="container2">
        <div className="titCon">
          <p className="title">Library Management</p>
        </div>
      </div>
      <div className="dget">
        <img className="gimg" src={books.picture} />
        <p className="usename">Hello {books.given_name} </p>
      </div>
      <div className="container3">
        <input
          type="text"
          className="inp"
          placeholder="Enter the details"
          onChange={handleChange}
          //   value={inp}
        />
        <button className="btn" onClick={() => btnClicked()}>
          Search
        </button>
      </div>

      <div className="dpcon">
        <p>Filter by</p>
        <Dropdown
          className="dpdw"
          options={options}
          onChange={(a) => setSelected(a)}
          value={defaultOption}
        />
      </div>
      <p>Total Results:{len}</p>
      <div className="disp">
        {data == "" ? (
          <p>Results displays Here</p>
        ) : (
          strdata.map((item) => (
            <div className="searchres">
              {item.isbn ? (
                <img
                  src={`http://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`}
                />
              ) : null}
              <h3>{item.title}</h3>
              <p>
                <b>Author</b>:{item.author_name}
              </p>
              <p>Pages:{item.number_of_pages_median}</p>
              <button>Add to cart</button>{" "}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Main;

// for(let i=0;i<length(data.data.docs);i++){
//     (
//         <div className="searchres">
//           <img src={data.data.docs[i].isbn[0]} />
//           <h3>{data.data.docs[i].title}</h3>
//           <p>Author:{data.data.docs[i].author_name[0]}</p>
//           <p>Publisher:vinay</p>
//           <button>Add to cart</button>
//         </div>
//       )
// }
