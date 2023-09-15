
export default function OrderPage() {
  return (
    <>
      <h2>Order Table</h2>

      <table style={{ width: "100%", borderSpacing: 0 }}>
        <thead
          style={{
            backgroundColor: "#36304a",
            color: "#fff",
            height: "50px",
          }}
        >
          <tr className="table100-head">
            <th className="column" style={{ borderTopLeftRadius: "10px" }}>ID</th>
            <th className="column">Số điện thoại</th>
            <th className="column">Họ và tên</th>
            <th className="column">Số lượng khách</th>
            <th className="column">Chi nhánh</th>
            <th className="column">Tên thợ</th>
            <th className="column">Dịch vụ</th>
            <th className="column">Ngày</th>
            <th className="column">Thời điểm</th>
            <th className="column">Ghi chú</th>
            <th className="column">Thành tiền</th>
            <th className="column" style={{ borderTopRightRadius: "10px" }}>
              Thời gian ước tính
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table100-body">
            <th className="column" style={{borderLeft: "1px solid #333"}}>123</th>
            <th className="column">1324561200</th>
            <th className="column">Thinh</th>
            <th className="column">10</th>
            <th className="column">Quan 1</th>
            <th className="column">Long</th>
            <th className="column">Uon toc</th>
            <th className="column">12/10/2023</th>
            <th className="column">11:30 </th>
            <th className="column">Uon cang cong cang tot</th>
            <th className="column">free</th>
            <th className="column">5 phut</th>
          </tr>
          <tr className="table100-body">
            <th className="column" style={{borderLeft: "1px solid #333"}}>145</th>
            <th className="column">1324561200</th>
            <th className="column">Thinh</th>
            <th className="column">10</th>
            <th className="column">Quan 1</th>
            <th className="column">Long</th>
            <th className="column">Uon toc</th>
            <th className="column">12/10/2023</th>
            <th className="column">11:30 </th>
            <th className="column">Uon cang cong cang tot</th>
            <th className="column">free</th>
            <th className="column">5 phut</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
