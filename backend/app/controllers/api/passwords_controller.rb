module Api
  class PasswordsController < ApplicationController
    # skip_before_action :require_login, only: [:create, :update]
    before_action :set_user_by_token, only: [:update]

    # Forgot password - send reset email
    def create
      user = User.find_by(email: params[:email]&.downcase)
      if user
        user.generate_confirmation_token
        user.save!
        
        Resend::Emails.send({
          from: ENV['FROM_EMAIL'],
          to: user.email,
          subject: 'Password Reset Request',
          html: "<p>Click <a href='#{ENV['FRONTEND_URL']}/auth/reset_password/#{user.confirmation_token}'>here</a> to reset your password. This link expires in 24 hours.</p>"
        })
        
        render json: { message: 'Password reset email sent' }, status: :ok
      else
        render json: { error: 'Email not found' }, status: :not_found
      end
    end

    # Update password with reset token
    def update
      if @user && @user.confirmation_token_valid?
        if @user.update(password: params[:password])
          @user.clear_confirmation_token!
          render json: { message: 'Password updated successfully' }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Invalid or expired reset token' }, status: :unprocessable_entity
      end
    end

    # Change password with old password
    def change_password
      user = current_user
      if user&.authenticated?(params[:current_password])
        if user.update(password: params[:password])
          render json: { message: "Password updated successfully" }, status: :ok
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Current password is incorrect" }, status: :unauthorized
      end
    end

    private

    def set_user_by_token
      @user = User.find_by(confirmation_token: params[:token])
    end
  end
end