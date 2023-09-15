import { useState } from "react";
import Technician from "../components/Technician/Technician";
import Form from "../components/Form/Form";

export default function TechnicianPage() {
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
            document.getElementById("add").innerHTML = `Thêm thợ`;
          }
        }}
      >
        Thêm thợ
      </button>
      {state === "table" ? (
        <Technician />
      ) : (
        <Form
          state={setState}
          title="Thêm thợ"
          data={[
            {
              type: "text",
              placeholder: "Tên thợ",
              name: "technician_name",
            },
            {
              type: "text",
              placeholder: "Thuộc chi nhánh",
              name: "branch_id",
            },
          ]}
        />
      )}
    </>
  );
}
