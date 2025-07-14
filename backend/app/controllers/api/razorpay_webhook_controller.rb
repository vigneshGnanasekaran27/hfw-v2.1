class Api::RazorpayWebhookController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    event = request.headers["X-Razorpay-Event"] || params[:event]
    payload = request.raw_post
    Rails.logger.info("Razorpay Webhook - Event: #{event}")
    Rails.logger.info("Razorpay Webhook - Payload: #{payload}")
    
    data = JSON.parse(payload)["payload"] rescue nil
    return head :bad_request unless data

    case event
    when "payment.captured", "order.paid"
      payment_entity = data.dig("payment", "entity") || data.dig("order", "entity")
      order_id = payment_entity["order_id"] || payment_entity["id"]
      payment_id = payment_entity["id"]
      status = payment_entity["status"]
      amount = payment_entity["amount"]
      currency = payment_entity["currency"]
      email = payment_entity.dig("email")
      notes = payment_entity["notes"] || {}
      
      Rails.logger.info("Payment Entity - Notes: #{notes.inspect}")
      
      # Convert ids to integers, handling both string and integer inputs
      event_id = notes["event_id"].to_i if notes["event_id"].present?
      user_id = notes["user_id"].to_i if notes["user_id"].present?
      
      Rails.logger.info("Converted IDs - Event: #{event_id}, User: #{user_id}")
      
      # Set created_at and updated_at to current time if payment is new
      payment = Payment.find_or_initialize_by(razorpay_payment_id: payment_id)
      
      payment_attributes = {
        razorpay_order_id: order_id,
        status: status,
        amount: amount,
        currency: currency,
        event_id: event_id,
        user_id: user_id,
        meta: payment_entity,
        created_at: payment.new_record? ? Time.current : payment.created_at,
        updated_at: Time.current
      }
      
      Rails.logger.info("Payment Attributes: #{payment_attributes.inspect}")
      
      payment.assign_attributes(payment_attributes)

      if payment.save
        Rails.logger.info("Payment saved successfully - ID: #{payment.id}")
        Rails.logger.info("Payment details: #{payment.attributes}")
      else
        Rails.logger.error("Payment save failed!")
        Rails.logger.error("Validation errors: #{payment.errors.full_messages}")
      end
    else
      Rails.logger.info("Unhandled Razorpay webhook event: #{event}")
    end
    head :ok
  end
end
