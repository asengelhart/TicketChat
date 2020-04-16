class User < ApplicationRecord
  has_many :tickets
  has_many :comments
  has_many :comment_tickets, through: :comments, source: :ticket
  has_secure_password
end
