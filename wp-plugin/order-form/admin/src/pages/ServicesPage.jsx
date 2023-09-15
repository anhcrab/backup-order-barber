import { useState } from "react";
import Services from "../components/Services/Services";
import Form from "../components/Form/Form"

export default function ServicesPage() {
  const [state, setState] = useState("table");
  return (
    <>
      <button
        id="add"
        onClick={() => {
          if (state === "table") {
            setState("form");
            document.getElementById("add").innerHTML = `Xem bảng`;
          } else {
            setState("table");
            document.getElementById("add").innerHTML = `Thêm dịch vụ`;
          }
        }}
      >
        Thêm dịch vụ
      </button>
      {state === "table" ? (
        <Services />
      ) : (
        <Form
          title = "Thêm dịch vụ"
          state = {setState}
          data={[
            {
              type: "text",
              placeholder: "Tên dịch vụ",
              name: "service_name",
            },
            {
              type: "text",
              placeholder: "Loại dịch vụ",
              name: "service_type",
            },
            {
              type: "text",
              placeholder: "Thời lượng",
              name: "service_time",
            },
            {
              type: "number",
              placeholder: "Giá tiền",
              name: "service_price",
            },
          ]}
        />
      )}
    </>
  );
}
