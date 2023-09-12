<?php
function store_form(WP_REST_Request $request)
{
  global $wpdb;
  $data = $request->get_body_params();
  $phone = $data['phone'];
  $name = $data['name'];
  $guests = $data['guests'];
  $branch = $data['branch'];
  $technician = $data['technician'];
  $service = $data['service'];
  $date = $data['date'];
  $time = $data['time'];
  $note = $data['note'];
  // Mẫu data gửi tới
// form: {
// phone: 123456789,
// name: abcxyz,
// guest: 2,
// branch: quận 1, 123a bcd,
// technician: Tuấn,
// service: cắt + gội,
// date: 12/06/2023,
// time: 10:30,
// note: abcbfsng
// }
  $wpdb->insert('order_form', [
    'phone' => $phone,
    'name' => $name,
    'total_guest' => $guests,
    'branch_id' => $wpdb->get_results("SELECT branches_id FROM branches WHERE branch_name = '$branch'")[0]->id,
    'technician_id' => $wpdb->get_results("SELECT technician_id FROM technicians WHERE technician_name =
'$technician'")[0]->id,
    'service_id' => $wpdb->get_results("SELECT service_id FROM services WHERE service_name = '$service'")[0]->id,
    'date' => $date,
    'time' => $time,
    'note' => $note
  ]);
  return rest_ensure_response($wpdb->insert_id);
}



function store_branch(WP_REST_Request $request)
{
  global $wpdb;
  try {
    $data = $request->get_body_params();
    $name = $data['name'];
    $wpdb->insert('branches', [
      'branch_name' => $name
    ]);
    return rest_ensure_response($wpdb->insert_id);
  } catch (\Throwable $th) {
    return rest_ensure_response([
      'branch message: ' => $th->getMessage()
    ]);
  }

}


function store_technician(WP_REST_Request $request)
{
  global $wpdb;
  $data = $request->get_body_params();
  $name = $data['name'];
  $branch_id = $data['branch_id'];
  $wpdb->insert('technicians', [
    'technician_name' => $name,
    'branch_id' => $branch_id
  ]);
  return rest_ensure_response($wpdb->insert_id);
}

function store_service(WP_REST_Request $request)
{
  global $wpdb;
  $data = $request->get_body_params();
  $name = $data['name'];
  $price = $data['price'];
  $type = $data['type'];
  $wpdb->insert('services', [
    'service_type' => $type,
    'service_name' => $name,
    'service_price' => $price,
  ]);
  return rest_ensure_response($wpdb->insert_id);
}

function store_service_branch(WP_REST_Request $request)
{
  global $wpdb;
  $data = $request->get_body_params();
  $wpdb->insert('service_branch', [
    'service_id' => $data['service'],
    'branch_id' => $data['branch'],
  ]);
  return rest_ensure_response('success: ' . $wpdb->insert_id);
}