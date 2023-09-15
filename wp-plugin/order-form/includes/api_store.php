<?php
function store_form(WP_REST_Request $request)
{
  global $wpdb;
  $data = json_decode($request->get_body());
  $phone = $data->phone;
  $name = $data->fullname;
  $guests = $data->guests;
  $branch_id = $data->branch_id;
  $technician_id = $data->technician_id;
  $service = $data->service;
  $date = $data->date;
  $time = $data->time;
  $note = $data->note;
  $total_price = $data->total_price;
  $estimate_time = $data->estimate_time;


  $wpdb->insert(
    'order_form',
    array(
      'phone' => $phone,
      'name' => $name,
      'total_guest' => $guests,
      'branch_id' => $branch_id,
      'technician_id' => $technician_id,
      'service' => $service,
      'date' => $date,
      'time' => $time,
      'note' => $note,
      'total_price' => $total_price,
      'estimate_time' => $estimate_time,
    ),
  );
  return rest_ensure_response($wpdb->insert_id);
}

function store_branch(WP_REST_Request $request)
{
  global $wpdb;
  try {
    $data = json_decode($request->get_body());
    // return rest_ensure_response(json_decode($request->get_body())->branch_name);
    $name = $data->branch_name;
    $wpdb->insert('branches', [
      'branch_name' => $name,
    ]);
    return rest_ensure_response($wpdb->insert_id);
  } catch (\Throwable $th) {
    return rest_ensure_response([
      'branch message: ' => $th->getMessage(),
    ]);
  }

}


function store_technician(WP_REST_Request $request)
{
  global $wpdb;
  $data = json_decode($request->get_body());
  $name = $data->technician_name;
  $branch_id = $data->branch_id;
  $wpdb->insert('technicians', [
    'technician_name' => $name,
    'branch_id' => $branch_id,
  ]);
  return rest_ensure_response($wpdb->insert_id);
}

function store_service(WP_REST_Request $request)
{
  global $wpdb;
  $data = json_decode($request->get_body());
  $name = $data->service_name;
  $price = $data->service_price;
  $type = $data->service_type;
  $time = $data->service_time;
  $wpdb->insert('services', [
    'service_type' => $type,
    'service_name' => $name,
    'service_price' => $price,
    'service_time' => $time
  ]);
  return rest_ensure_response($wpdb->insert_id);
}

function store_service_branch(WP_REST_Request $request)
{
  global $wpdb;
  $data = json_decode($request->get_body_params());
  $wpdb->insert('service_branch', [
    'service_id' => $data->service,
    'branch_id' => $data->branch,
  ]);
  return rest_ensure_response('success: ' . $wpdb->insert_id);
}