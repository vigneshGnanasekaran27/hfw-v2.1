# app/controllers/api/sessions_controller.rb
require 'google-id-token'

module Api
  class SessionsController < ApplicationController

    def login # Note: You renamed this from sign_in
      user = User.find_by(email: params[:email]&.downcase)
      if user&.authenticated?(params[:password])
        sign_in(user)
        render json: { 
          message: 'Login successful!', 
          user: user_json(user),
          csrf_token: form_authenticity_token 
        }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def sign_up
      user = User.new(sign_up_params)
      if user.save
        sign_in(user)
        render json: { 
          message: 'User created and signed in', 
          user: user_json(user),
          csrf_token: form_authenticity_token 
        }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      sign_out
      render json: { message: "Successfully signed out" }, status: :ok
    end

    def status
      if signed_in?
        render json: { 
          user: user_json(current_user)
        }, status: :ok
      else
        render json: { logged_in: false }, status: :ok
      end
    end

    def google_signin
      Rails.logger.info('Google Signin request received')
      credential = params[:credential]
      unless credential
        Rails.logger.error('No credential provided')
        redirect_to "http://localhost:3001/auth/signin?error=No%20token%20provided"
        return
      end

      Rails.logger.info("Credential received, length: #{credential.length}")
      validator = GoogleIDToken::Validator.new
      begin
        payload = validator.check(credential, ENV['GOOGLE_CLIENT_ID'])
        Rails.logger.info("Token verified locally: #{payload['email']}")
        user = process_google_user(payload)
        sign_in(user)
        redirect_to "http://localhost:3001/dashboard"
      rescue GoogleIDToken::ValidationError => e
        Rails.logger.error("Token verification failed: #{e.message}")
        redirect_to "http://localhost:3001/auth/signin?error=Invalid%20Google%20token"
      end
    end

    private

    def user_json(user)
      { id: user.id, email: user.email, name: user.name, role: user.role }
    end

    def sign_up_params
      params.permit(:email, :password, :name) # Ensure :name is permitted
    end

    def process_google_user(payload)
      Rails.logger.info("Processing Google user with email: #{payload['email']}")
      user = User.find_or_initialize_by(provider: 'google', uid: payload['sub']) do |u|
        u.email = payload['email'].downcase
        u.name = payload['name'] if payload['name'].present?
        u.picture = payload['picture'] if payload['picture'].present?
        u.password = SecureRandom.hex(10) unless u.persisted?
        u.role = 'user' # Default role for Google sign-in
      end

      if user.save
        Rails.logger.info("User saved successfully, ID: #{user.id}")
      else
        Rails.logger.error("Failed to save user: #{user.errors.full_messages.join(', ')}")
      end

      user
    end
  end
end