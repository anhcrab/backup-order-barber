import { useState } from "react";
import "./Form.scss";

export default function Form(props) {
  const data = props.data;
  const [form, setForm] = useState({});

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://"+ window.location.hostname +"/wp-json/api/branch",{
        method: "POST",
        headers: {
            "accept": "application/json"
        },
        body: JSON.stringify(form)
    }).then(res => {
        console.log(res.json());
    }).then((res) => {
      props.state("table")
    }).catch(err => console.log(err))
  }

  return (
    <>
      <h2 style={{ paddingBottom: "12px" }}>{props.title}</h2>

      <div style={{display:"flex", justifyContent:"center"}}>
        <form onSubmit={handleSubmit} className="form-container">
          {data.map((item) => {
            return (
              <>
                <input
                  className="form-input"
                  type={item.type || "text"}
                  placeholder={item.placeholder || ""}
                  name={item.name}
                  onChange={handleOnChange}
                />
              </>
            );
          })}
          <button type="submit" className="form-button">Thêm</button>
        </form>
      </div>
    </>
  );
}
