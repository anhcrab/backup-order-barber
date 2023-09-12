import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api = "https://baber.local";
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    phone: "",
    fullname: "",
    guests: 1,
    branch_id: 1,
    technician_id: '',
  });

  useEffect(() => {
    fetch(api + "/wp-json/api/form-data")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app">
      <form id="order-form">
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
          value="1"
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
              const techList = document.querySelector(
                ".form-select-list-container"
              );
              if (techList.classList.contains("hidden")) {
                techList.classList.remove("hidden");
              } else {
                techList.classList.add("hidden");
              }
            }}
          >
            <div className="form-select-display-content">
              Chọn kĩ thuật viên
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
            <div className="form-select-list-container hidden">
              <input type="hidden" id="form-input-technician" />
              <div>
                <span className="form-input-technician-option-list">
                  Thợ tóc tiệm đề xuất
                </span>
                <div
                  className="form-select-item"
                  onClick={() => {
                    document
                      .querySelector(".form-select-list-container")
                      .classList.add("hidden");
                    setForm({
                      ...form,
                      technician_id: '',
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
                                  document
                                    .querySelector(
                                      ".form-select-list-container"
                                    )
                                    .classList.add("hidden");
                                  setForm({
                                    ...form,
                                    technician_id: technician.technician_id,
                                  });
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
        <div className="form-service-container">
          <select className="form-service" style={{ width: "90%" }}>
            <option>Chọn dịch vụ</option>
            <optgroup label="CĂT - GỘI - CẠO">
              <option>Cắt tóc nam - Gội</option>
              <option>Cạo</option>
              <option>Combo</option>
              <option>Gội + Tạo kiểu</option>
              <option>Hair Tattoo</option>
              <option>KID CUT</option>
            </optgroup>
            <optgroup label="NHUỘM">
              <option>Nhuộm Đen/Nâu</option>
              <option>Nhuộm Màu Thời Trang (+ Số lần tẩy)</option>
              <option>Tẩy tóc</option>
            </optgroup>
            <optgroup label="PREMLOCK-UỐN">
              <option>Ép Side (2 bên)</option>
              <option>Uốn Lạnh (Tùy Chỉnh)</option>
              <option>Uốn giấy bạc / Ruffled (Tùy chỉnh)</option>
              <option>Uốn Premlock (Tùy chỉnh)</option>
            </optgroup>
          </select>
          <div id="remove-service">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="minus-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            </svg>
          </div>
        </div>
        <button id="add-service" style={{ padding: "10px", marginTop: "10px" }}>
          Thêm dịch vụ
        </button>
        <p>
          <i style={{ fontWeight: "300" }}>Tổng tiền</i>
          <span className="total-price">: 0 vnđ</span>
        </p>
        <p>
          <i style={{ fontWeight: "300" }}>Thời lượng dự kiến</i>
          <span className="estimate-time">: 0 phút</span>
        </p>
        <label htmlFor="form-date">
          <p style={{ marginTop: "15px", marginBottom: "0" }}>
            Ngày đặt lịch <span className="star">*</span>
          </p>
        </label>
        <input type="date" id="form-date" />
        <p style={{ marginTop: "15px", marginBottom: "0" }}>
          Khung giờ dịch vụ <span className="star">*</span>
        </p>
        <fieldset id="form-time-container">
          <input type="radio" className="form-time-radio" id="time-10" />
          <label htmlFor="time-10" className="form-time-label">
            10:00
          </label>
          <input type="radio" className="form-time-radio" id="time-10-30" />
          <label htmlFor="time-10-30" className="form-time-label">
            10:30
          </label>
          <input type="radio" className="form-time-radio" id="time-11" />
          <label htmlFor="time-11" className="form-time-label">
            11:00
          </label>
          <input type="radio" className="form-time-radio" id="time-11-30" />
          <label htmlFor="time-11-30" className="form-time-label">
            11:30
          </label>
          <input type="radio" className="form-time-radio" id="time-12" />
          <label htmlFor="time-12" className="form-time-label">
            12:00
          </label>
          <input type="radio" className="form-time-radio" id="time-12-30" />
          <label htmlFor="time-12-30" className="form-time-label">
            12:30
          </label>
          <input type="radio" className="form-time-radio" id="time-13" />
          <label htmlFor="time-13" className="form-time-label">
            13:00
          </label>
          <input type="radio" className="form-time-radio" id="time-13-30" />
          <label htmlFor="time-13-30" className="form-time-label">
            13:30
          </label>
          <input type="radio" className="form-time-radio" id="time-14" />
          <label htmlFor="time-14" className="form-time-label">
            14:00
          </label>
          <input type="radio" className="form-time-radio" id="time-14-30" />
          <label htmlFor="time-14-30" className="form-time-label">
            14:30
          </label>
          <input type="radio" className="form-time-radio" id="time-15" />
          <label htmlFor="time-15" className="form-time-label">
            15:00
          </label>
          <input type="radio" className="form-time-radio" id="time-15-30" />
          <label htmlFor="time-15-30" className="form-time-label">
            15:30
          </label>
          <input type="radio" className="form-time-radio" id="time-16" />
          <label htmlFor="time-16" className="form-time-label">
            16:00
          </label>
          <input type="radio" className="form-time-radio" id="time-16-30" />
          <label htmlFor="time-16-30" className="form-time-label">
            16:30
          </label>
          <input type="radio" className="form-time-radio" id="time-17" />
          <label htmlFor="time-17" className="form-time-label">
            17:00
          </label>
          <input type="radio" className="form-time-radio" id="time-17-30" />
          <label htmlFor="time-17-30" className="form-time-label">
            17:30
          </label>
          <input type="radio" className="form-time-radio" id="time-18" />
          <label htmlFor="time-18" className="form-time-label">
            18:00
          </label>
          <input type="radio" className="form-time-radio" id="time-18-30" />
          <label htmlFor="time-18-30" className="form-time-label">
            18:30
          </label>
          <input type="radio" className="form-time-radio" id="time-19" />
          <label htmlFor="time-19" className="form-time-label">
            19:00
          </label>
          <input type="radio" className="form-time-radio" id="time-19-30" />
          <label htmlFor="time-19-30" className="form-time-label">
            19:30
          </label>
        </fieldset>

        <textarea
          className="form-textarea"
          id=""
          cols="30"
          rows="5"
          placeholder="Ghi chú"
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
