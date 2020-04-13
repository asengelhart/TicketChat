class Ticket < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :comment_users, through: :comments, source: :user
  validates :subject, presence: true
  validates :content, presence: true
  validates :urgency, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 2}
end
