import { useState } from "react";
import Branch from "../components/Branch/Branch";
import Form from "../components/Form/Form";

export default function BranchPage() {
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
            document.getElementById("add").innerHTML = `Thêm chi nhánh`;
          }
        }}
      >
        Thêm chi nhánh
      </button>
      {state === "table" ? (
        <Branch />
      ) : (
        <Form
          state={setState}
          title="Thêm chi nhánh"
          URLEndpoint='branch'
          data={[
            {
              type: "text",
              placeholder: "Tên chi nhánh",
              name: "branch_name",
            },
          ]}
        />
      )}
    </>
  );
}
