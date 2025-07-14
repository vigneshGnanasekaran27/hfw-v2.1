class Api::RazorpayController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /api/razorpay/order
  def order
    amount = params[:amount].to_i # Already in paise from frontend
    receipt = "order_#{SecureRandom.hex(8)}"
    
    # Fix: Permit and convert notes to hash
    notes = params[:notes]
    notes = notes.respond_to?(:permit) ? notes.permit!.to_h : notes
    
    Rails.logger.info("Creating Razorpay order with notes: #{notes.inspect}")
    
    order = Razorpay::Order.create(
      amount: amount,
      currency: 'INR',
      receipt: receipt,
      notes: notes,  # Pass notes to Razorpay
      payment_capture: 1
    )
    
    Rails.logger.info("Order created successfully: #{order.attributes}")
    render json: order.attributes
  rescue => e
    Rails.logger.error("Order creation failed: #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    render json: { error: e.message }, status: 500
  end

  # POST /api/razorpay/verify
  def verify
    payment_id = params[:razorpay_payment_id]
    order_id = params[:razorpay_order_id]
    signature = params[:razorpay_signature]
    
    Rails.logger.info("Verifying payment - Payment ID: #{payment_id}, Order ID: #{order_id}")
    
    secret = ENV['RAZORPAY_SECRET'] || Rails.application.credentials.dig(:razorpay, :key_secret)
    generated_signature = OpenSSL::HMAC.hexdigest(
      'SHA256',
      secret,
      [order_id, payment_id].join('|')
    )
    
    if generated_signature == signature
      # Fetch the order to get the notes
      order = Razorpay::Order.fetch(order_id)
      notes = order.notes
      
      Rails.logger.info("Payment verified successfully. Order notes: #{notes.inspect}")
      
      # Create a payment record
      payment = Payment.create!(
        razorpay_payment_id: payment_id,
        razorpay_order_id: order_id,
        status: 'captured',
        amount: order.amount,
        currency: order.currency,
        event_id: notes['event_id'].to_i,
        user_id: notes['user_id'].to_i,
        meta: order.attributes
      )
      
      Rails.logger.info("Payment record created: #{payment.id}")
      render json: { success: true }
    else
      Rails.logger.error("Payment verification failed - Signature mismatch")
      render json: { success: false }, status: :unprocessable_entity
    end
  rescue => e
    Rails.logger.error("Payment verification error: #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    render json: { success: false, error: e.message }, status: :unprocessable_entity
  end
end
