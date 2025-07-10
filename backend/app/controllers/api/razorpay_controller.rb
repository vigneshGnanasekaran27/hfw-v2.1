class Api::RazorpayController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /api/razorpay/order
  def order
    amount = params[:amount].to_i # Already in paise from frontend
    receipt = "order_#{SecureRandom.hex(8)}"
    order = Razorpay::Order.create(
      amount: amount,
      currency: 'INR',
      receipt: receipt,
      payment_capture: 1
    )
    render json: order.attributes
  rescue => e
    render json: { error: e.message }, status: 500
  end

  # POST /api/razorpay/verify
  def verify
    payment_id = params[:razorpay_payment_id]
    order_id = params[:razorpay_order_id]
    signature = params[:razorpay_signature]
    secret = ENV['RAZORPAY_SECRET'] || Rails.application.credentials.dig(:razorpay, :key_secret)
    generated_signature = OpenSSL::HMAC.hexdigest(
      'SHA256',
      secret,
      [order_id, payment_id].join('|')
    )
    if generated_signature == signature
      # TODO: Mark event as paid for user, save payment, etc.
      render json: { success: true }
    else
      render json: { success: false }, status: :unprocessable_entity
    end
  end
end
