import { Fragment, useRef } from "react";

export default function Service({ services, a, b, c, handle }) {
  const ref = useRef()
  const removeService = (ref) => {
    ref.current.remove()
  }
  return (
    <div
      className="form-service"
      ref={ref}
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        height: "40px",
        marginBottom: "10px",
      }}
    >
      <select
        className="form-service-select"
        style={{
          width: "90%",
          padding: "10px",
          fontSize: "16px",
          fontWeight: 700,
          color: "rgba(0, 0, 0, .6)",
        }}
        onChange={handle}
      >
        <option value={"default"} style={{ display: "none" }}>
          Chọn dịch vụ
        </option>
        {a === true ? (
          <optgroup label="CẮT - GỘI - CẠO">
            {services &&
              services.map((service) => {
                if (service.service_type == "CẮT - GỘI - CẠO") {
                  return (
                    <Fragment key={service.service_id}>
                      <option value={service.service_id} style={{
                        display: 'flex',
                        padding: '10px',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{
                          float: 'left'
                        }}>{service.service_name}</div>
                        <div style={{
                          float: 'right'
                        }}>{service.service_price}đ</div>
                      </option>
                    </Fragment>
                  );
                }
                return "";
              })}
          </optgroup>
        ) : (
          ""
        )}
        {b === true ? (
          <optgroup label="NHUỘM">
            {services &&
              services.map((service) => {
                if (service.service_type == "NHUỘM") {
                  return (
                    <Fragment key={service.service_id}>
                      <option value={service.service_id}>
                        <div>{service.service_name}</div>
                        <div>{service.service_price}đ</div>
                      </option>
                    </Fragment>
                  );
                }
                return "";
              })}
          </optgroup>
        ) : (
          ""
        )}
        {c === true ? (
          <optgroup label="PREMLOCK-UỐN">
            {services &&
              services.map((service) => {
                if (service.service_type == "PREMLOCK-UỐN") {
                  return (
                    <Fragment key={service.service_id}>
                      <option value={service.service_id}>
                        <div>{service.service_name}</div>
                        <div>{service.service_price}đ</div>
                      </option>
                    </Fragment>
                  );
                }
                return "";
              })}
          </optgroup>
        ) : (
          ""
        )}
      </select>
      <div
        className="remove-service"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          if (document.querySelectorAll(".form-service").length > 1) {
            removeService(ref);
            handle()
          }
        }}
      >
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
  );
}
