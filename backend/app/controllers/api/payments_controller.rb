class Api::PaymentsController < ApplicationController
  before_action :require_admin, only: [:index]
  before_action :require_user, only: [:user_payments]

  # GET /api/payments (admin)
  def index
    payments = Payment.includes(:user, :event).order(created_at: :desc)
    render json: payments.as_json(include: { user: { only: [:id, :email, :name] }, event: { only: [:id, :title] } })
  end

  # GET /api/payments/user (user)
  def user_payments
    Rails.logger.info("User Payments Request - User ID: #{current_user.id}")
    
    begin
      payments = current_user.payments.includes(:event).order(created_at: :desc)
      
      Rails.logger.info("Found #{payments.length} payments for user #{current_user.id}")
      
      if payments.empty?
        Rails.logger.info("No payments found. Checking payment records directly...")
        # Double check payments table directly
        direct_payments = Payment.where(user_id: current_user.id)
        Rails.logger.info("Direct payment query found: #{direct_payments.length} payments")
      end
      
      result = payments.as_json(
        include: { 
          event: { only: [:id, :title, :date] }
        },
        methods: [:created_at, :updated_at]
      )
      
      Rails.logger.info("Returning payment data: #{result.inspect}")
      render json: result
      
    rescue => e
      Rails.logger.error("Error in user_payments: #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  private

  def require_admin
    unless current_user&.role == "admin" || current_user&.admin?
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def require_user
    unless current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
