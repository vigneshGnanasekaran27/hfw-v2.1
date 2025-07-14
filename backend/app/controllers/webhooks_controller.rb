class WebhooksController < ApplicationController
#   skip_before_action :verify_authenticity_token

  def razorpay
    payload = request.raw_post
    signature = request.headers['X-Razorpay-Signature']
    secret = ENV['RAZORPAY_WEBHOOK_SECRET'] || 'mysecret'

    unless verify_signature(payload, signature, secret)
      Rails.logger.error("Invalid signature for Razorpay webhook")
      render plain: "Invalid signature", status: :bad_request and return
    end

    Rails.logger.info("Webhook payload: #{payload}")
    # Process the event here (e.g., update payment status)
    head :ok
  end

  private

  def verify_signature(payload, signature, secret)
    digest = OpenSSL::Digest.new('sha256')
    expected_signature = OpenSSL::HMAC.hexdigest(digest, secret, payload)
    Rack::Utils.secure_compare(expected_signature, signature)
  end
end