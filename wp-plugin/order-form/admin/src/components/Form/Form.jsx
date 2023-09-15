import { useState } from "react";
import "./Form.scss";
import { baseURL } from "../../utils/api";

export default function Form(props) {
  const { data, URLEndpoint, state, title } = props;
  const [form, setForm] = useState({});

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(baseURL + "/" + URLEndpoint, {
      method: "POST",
      headers: {
        Accept: "Application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        state("table");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h2 style={{ paddingBottom: "12px" }}>{title}</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
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
          <button type="submit" className="form-button">
            Thêm
          </button>
        </form>
      </div>
    </>
  );
}
