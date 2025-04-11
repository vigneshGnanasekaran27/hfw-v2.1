class User < ApplicationRecord
  include Clearance::User

  before_save :downcase_email
  validates :email, presence: true, uniqueness: true
  enum role: { user: 0, admin: 1 }

  def generate_confirmation_token
    self.confirmation_token = SecureRandom.urlsafe_base64
    self.token_expires_at = 24.hours.from_now
  end

  def clear_confirmation_token!
    self.confirmation_token = nil
    self.token_expires_at = nil
    save!
  end

  def confirmation_token_valid?
    token_expires_at.present? && token_expires_at > Time.current
  end

  # Find or create user by Google credentials
  def self.from_google(payload)
    where(provider: 'google', uid: payload['sub']).first_or_create do |user|
      user.email = payload['email'].downcase
      user.password = SecureRandom.hex(16) # Random password for Google users
    end
  end

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
