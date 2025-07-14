class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :status, presence: true
  validates :amount, presence: true
  validates :razorpay_payment_id, uniqueness: true, allow_nil: true
  validates :created_at, presence: true
  validates :updated_at, presence: true

  before_validation :ensure_timestamps
  before_save :log_save_attempt

  private

  def ensure_timestamps
    self.created_at ||= Time.current
    self.updated_at = Time.current
  end

  def log_save_attempt
    Rails.logger.info("Saving payment: #{attributes.inspect}")
    if changed?
      Rails.logger.info("Changed attributes: #{changes}")
    end
  end
end
