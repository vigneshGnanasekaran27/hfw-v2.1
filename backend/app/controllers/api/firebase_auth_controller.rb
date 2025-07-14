class Api::FirebaseAuthController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def verify
    id_token = request.headers['Authorization']&.split(' ')&.last

    if id_token.blank?
      return render json: { error: 'Missing Firebase ID token' }, status: :unauthorized
    end

    begin
      FirebaseIdToken::Certificates.request!
      payload = FirebaseIdToken::Signature.verify(id_token)

      if payload
        uid   = payload['user_id']
        phone = payload['phone_number']

        render json: {
          message: '✅ Firebase phone token verified',
          uid: uid,
          phone: phone
        }, status: :ok
      else
        render json: { error: 'Invalid Firebase token' }, status: :unauthorized
      end
    rescue => e
      Rails.logger.error("Firebase verification failed: #{e.message}")
      render json: { error: 'Token verification failed' }, status: :unauthorized
    end
  end
end
