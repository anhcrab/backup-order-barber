import { useEffect, useState } from "react";
import "./App.css";
import Service from "./Service";

function App() {
  // const api = "https://baber.local";
  const api = 'https://' + window.location.hostname
  const [data, setData] = useState([]);
  const [techHidden, setTechHidden] = useState(true);
  const [services, setServices] = useState([]);
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [serviceFields, setServiceFields] = useState([]);
  const [time, setTime] = useState();
  const [price, setPrice] = useState(0);
  const [estimateTime, setEstimateTime] = useState(0);
  const [form, setForm] = useState({
    phone: "",
    fullname: "",
    guests: 1,
    branch_id: 1,
    technician_id: null,
    service: [],
    date: "",
    time: time,
    note: "",
    total_price: "",
    estimate_time: "",
  });

  useEffect(() => {
    fetch(api + "/wp-json/api/form-data")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  useEffect(() => {
    if (data.length != 0) {
      setServices(
        data.find((item) => item.branch.branch_id == form.branch_id).services
      );
    }
  }, [data, form.branch_id]);

  useEffect(() => {
    if (
      services.some((service) => service.service_type === "CẮT - GỘI - CẠO")
    ) {
      setA(true);
    } else {
      setA(false);
    }
    if (services.some((service) => service.service_type === "NHUỘM")) {
      setB(true);
    } else {
      setB(false);
    }
    if (services.some((service) => service.service_type === "PREMLOCK-UỐN")) {
      setC(true);
    } else {
      setC(false);
    }
  }, [services]);

  useEffect(() => {
    setServiceFields([
      <Service services={services} a={a} b={b} c={c} handle={handleOnSelect} />,
    ]);
  }, [a, b, c, services]);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSelect = () => {
    const selects = document.querySelectorAll(".form-service-select");
    const newService = [];
    selects.forEach((item) => {
      services.forEach((s) => {
        if (item.value == s.service_id) {
          newService.push({
            service_id: s.service_id,
            service_name: s.service_name,
            service_price: s.service_price,
            service_time: s.service_time,
          });
        }
      });
    });
    setForm({
      ...form,
      service: newService,
    });
    let estimatePrice = newService.reduce(
      (result, item) => result + parseInt(item.service_price),
      0
    );
    let estimate_time = newService.reduce(
      (result, item) => result + parseInt(item.service_time),
      0
    );
    setPrice(estimatePrice);
    setEstimateTime(estimate_time);
  };

  useEffect(() => {
    setForm({
      ...form,
      time: time,
    });
  }, [time]);

  const chooseTechnician = () => {
    if (form.technician_id === "") {
      return "Tiệm Đề Xuất Thợ Cho Bạn";
    } else if (form.technician_id === null) {
      return "Chọn kĩ thuật viên";
    }
    return data
      .find((item) => {
        return item.branch.branch_id == form.branch_id;
      })
      .technicians.find((tech) => {
        return tech.technician_id == form.technician_id;
      }).technician_name;
  };

  return (
    <div className="app">
      <form
        id="order-form"
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            phone: document.getElementsByName("phone")[0].value,
            fullname: document.getElementsByName("fullname")[0].value,
            guests: parseInt(form.guests),
            branch_id: parseInt(form.branch_id),
            technician_id: document.getElementById("form-input-technician")
              .value,
            service: JSON.stringify(form.service),
            date: form.date,
            time: form.time,
            note: form.note,
            total_price: price || 0,
            estimate_time: estimateTime || 0,
          };
          fetch(api + "/wp-json/api/form", {
            method: "POST",
            headers: {
              Accept: "Application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then(() => {
              window.location.href = api;
            })
            .catch((err) => console.error(err));
        }}
      >
        <input
          placeholder="Số điện thoại"
          type="text"
          name="phone"
          onChange={handleOnChange}
        />
        <input
          placeholder="Họ và Tên"
          type="text"
          name="fullname"
          onChange={handleOnChange}
        />
        <label className="title" htmlFor="form-total-guest">
          <p
            style={{
              marginTop: "10px",
              marginBottom: "0px",
            }}
          >
            Tổng số khách
          </p>
        </label>
        <input
          type="number"
          name="guests"
          defaultValue={1}
          id="form-total-guest"
          min="1"
          max="10"
          onChange={handleOnChange}
        />

        <p>
          <strong>Thông tin dịch vụ</strong>
        </p>
        <p>
          Chọn chi nhánh <span className="star">*</span>
        </p>
        <h4>TIỆM TÓC CỦA CHÚ TƯ by 4RAU DELUXE</h4>

        <fieldset id="form-branch">
          {data &&
            data.map((item, index) => {
              return (
                <>
                  {index === 2 ? (
                    <h4 style={{ margin: "15px 0" }}>4RAU BARBER CUTCLUB</h4>
                  ) : (
                    ""
                  )}
                  <label
                    htmlFor={`branch-${item.branch.branch_id}`}
                    className="form-branch-item"
                    onClick={() => {
                      setForm({
                        ...form,
                        branch_id: item.branch.branch_id,
                        technician_id: null,
                      });
                      const radio = document.querySelectorAll(
                        ".form-branch-item-radio"
                      );
                      radio.forEach((item) => {
                        item.checked = false;
                      });
                      document.querySelector(
                        `#branch-${item.branch.branch_id}`
                      ).checked = true;
                      document.querySelector(".form-service").value = "default";
                    }}
                  >
                    <input
                      type="radio"
                      id={`branch-${item.branch.branch_id}`}
                      className="form-branch-item-radio"
                      checked={
                        form.branch_id == item.branch.branch_id ? true : false
                      }
                    />
                    <span className="form-branch-item-title">
                      {item.branch.branch_name}
                    </span>
                  </label>
                </>
              );
            })}
        </fieldset>
        <p
          style={{
            margin: "10px 0 0 0",
          }}
        >
          Chọn kĩ thuật viên <span className="star">*</span>
        </p>
        <div
          className="form-select-technician-container"
          style={{ cursor: "pointer" }}
        >
          <div
            className="form-select-display"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setTechHidden(!techHidden);
            }}
          >
            <div className="form-select-display-content">
              {chooseTechnician()}
            </div>
            <div className="form-select-display-icon">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="down"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </div>
            <div
              className={`form-select-list-container ${
                techHidden ? "hidden" : ""
              }`}
            >
              <input type="hidden" id="form-input-technician" />
              <div>
                <span className="form-input-technician-option-list">
                  Thợ tóc tiệm đề xuất
                </span>
                <div
                  className="form-select-item"
                  onClick={() => {
                    setTechHidden(false);
                    setForm({
                      ...form,
                      technician_id: "",
                    });
                  }}
                >
                  Tiệm Đề Xuất Thợ Cho Bạn
                </div>
              </div>
              <div>
                <span className="form-input-technician-option-list">
                  Thợ tóc
                </span>
                <ul className="form-select-list" id="technician-list">
                  {data &&
                    data.map((item) => {
                      if (item.branch.branch_id == form.branch_id) {
                        return item.technicians.map((technician) => {
                          return (
                            <>
                              <li
                                className="form-select-item"
                                id={`technician-${technician.technician_id}`}
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setTechHidden(false);
                                  setForm({
                                    ...form,
                                    technician_id: technician.technician_id,
                                  });
                                  document.querySelector(
                                    "#form-input-technician"
                                  ).value = technician.technician_id;
                                }}
                              >
                                {technician.technician_name}
                              </li>
                            </>
                          );
                        });
                      }
                      return "";
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p style={{ margin: "10px 0 0 0" }}>
          Dịch vụ <span className="star">*</span>
        </p>
        <div className="form-service-container">{serviceFields}</div>
        <button
          id="add-service"
          style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
          onSubmit={(e) => e.preventDefault()}
          onClick={(e) => {
            e.preventDefault();
            if (document.querySelectorAll(".form-service").length < 7) {
              setServiceFields([
                ...serviceFields,
                // eslint-disable-next-line react/jsx-key
                <Service
                  services={services}
                  a={a}
                  b={b}
                  c={c}
                  setServiceFields={setServiceFields}
                  serviceFields={serviceFields}
                  handle={handleOnSelect}
                />,
              ]);
            }
          }}
        >
          Thêm dịch vụ
        </button>
        <p>
          <i style={{ fontWeight: "300" }}>Tổng tiền</i>
          <span className="total-price">: {price} vnđ</span>
        </p>
        <p>
          <i style={{ fontWeight: "300" }}>Thời lượng dự kiến</i>
          <span className="estimate-time">: {estimateTime} phút</span>
        </p>
        <label htmlFor="form-date">
          <p style={{ marginTop: "15px", marginBottom: "0" }}>
            Ngày đặt lịch <span className="star">*</span>
          </p>
        </label>
        <input
          type="date"
          id="form-date"
          name="date"
          onChange={handleOnChange}
        />
        <p style={{ marginTop: "15px", marginBottom: "0" }}>
          Khung giờ dịch vụ <span className="star">*</span>
        </p>
        <fieldset id="form-time-container">
          <input type="radio" className="form-time-radio" id="time-10" />
          <label
            htmlFor="time-10"
            className={`form-time-label ${
              time === "10:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("10:00");
            }}
          >
            10:00
          </label>
          <input type="radio" className="form-time-radio" />
          <label
            htmlFor="time-10-30"
            className={`form-time-label ${
              time === "10:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("10:30");
            }}
          >
            10:30
          </label>
          <input type="radio" className="form-time-radio" id="time-11" />
          <label
            htmlFor="time-11"
            className={`form-time-label ${
              time === "11:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("11:00");
            }}
          >
            11:00
          </label>
          <input type="radio" className="form-time-radio" id="time-11-30" />
          <label
            htmlFor="time-11-30"
            className={`form-time-label ${
              time === "11:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("11:30");
            }}
          >
            11:30
          </label>
          <input type="radio" className="form-time-radio" id="time-12" />
          <label
            htmlFor="time-12"
            className={`form-time-label ${
              time === "12:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("12:00");
            }}
          >
            12:00
          </label>
          <input type="radio" className="form-time-radio" id="time-12-30" />
          <label
            htmlFor="time-12-30"
            className={`form-time-label ${
              time === "12:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("12:30");
            }}
          >
            12:30
          </label>
          <input type="radio" className="form-time-radio" id="time-13" />
          <label
            htmlFor="time-13"
            className={`form-time-label ${
              time === "13:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("13:00");
            }}
          >
            13:00
          </label>
          <input type="radio" className="form-time-radio" id="time-13-30" />
          <label
            htmlFor="time-13-30"
            className={`form-time-label ${
              time === "13:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("13:30");
            }}
          >
            13:30
          </label>
          <input type="radio" className="form-time-radio" id="time-14" />
          <label
            htmlFor="time-14"
            className={`form-time-label ${
              time === "14:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("14:00");
            }}
          >
            14:00
          </label>
          <input type="radio" className="form-time-radio" id="time-14-30" />
          <label
            htmlFor="time-14-30"
            className={`form-time-label ${
              time === "14:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("14:30");
            }}
          >
            14:30
          </label>
          <input type="radio" className="form-time-radio" id="time-15" />
          <label
            htmlFor="time-15"
            className={`form-time-label ${
              time === "15:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("15:00");
            }}
          >
            15:00
          </label>
          <input type="radio" className="form-time-radio" id="time-15-30" />
          <label
            htmlFor="time-15-30"
            className={`form-time-label ${
              time === "15:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("15:30");
            }}
          >
            15:30
          </label>
          <input type="radio" className="form-time-radio" id="time-16" />
          <label
            htmlFor="time-16"
            className={`form-time-label ${
              time === "16:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("16:00");
            }}
          >
            16:00
          </label>
          <input type="radio" className="form-time-radio" id="time-16-30" />
          <label
            htmlFor="time-16-30"
            className={`form-time-label ${
              time === "16:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("16:30");
            }}
          >
            16:30
          </label>
          <input type="radio" className="form-time-radio" id="time-17" />
          <label
            htmlFor="time-17"
            className={`form-time-label ${
              time === "17:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("17:00");
            }}
          >
            17:00
          </label>
          <input type="radio" className="form-time-radio" id="time-17-30" />
          <label
            htmlFor="time-17-30"
            className={`form-time-label ${
              time === "17:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("17:30");
            }}
          >
            17:30
          </label>
          <input type="radio" className="form-time-radio" id="time-18" />
          <label
            htmlFor="time-18"
            className={`form-time-label ${
              time === "18:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("18:00");
            }}
          >
            18:00
          </label>
          <input type="radio" className="form-time-radio" id="time-18-30" />
          <label
            htmlFor="time-18-30"
            className={`form-time-label ${
              time === "18:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("18:30");
            }}
          >
            18:30
          </label>
          <input type="radio" className="form-time-radio" id="time-19" />
          <label
            htmlFor="time-19"
            className={`form-time-label ${
              time === "19:00" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("19:00");
            }}
          >
            19:00
          </label>
          <input type="radio" className="form-time-radio" id="time-19-30" />
          <label
            htmlFor="time-19-30"
            className={`form-time-label ${
              time === "19:30" ? "time-checked" : ""
            }`}
            onClick={() => {
              setTime("19:30");
            }}
          >
            19:30
          </label>
        </fieldset>

        <textarea
          className="form-textarea"
          id=""
          cols="30"
          rows="5"
          placeholder="Ghi chú"
          name="note"
          onChange={handleOnChange}
        ></textarea>
        <button type="submit" id="submit-order">
          <span
            role="img"
            aria-label="calendar"
            className="anticon anticon-calendar"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="calendar"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
            </svg>
          </span>
          <span>Đặt lịch</span>
        </button>
      </form>
    </div>
  );
}

export default App;
