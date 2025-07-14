class Event < ApplicationRecord
  has_many :payments
  validates :title, presence: true
  # Add more validations as needed
end
