# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(username: "User McTestface", email: "user@example.com", password: "password", is_admin: false)
admin = User.create!(username: "Admin LeFort", email: "admin@example.com", password: "password", is_admin: true)

ticket = Ticket.create!(subject: "Thing won't work", content: "My thing doesn't work", urgency: 1, user: user)
ticket2 = Ticket.create!(subject: "old thing", content: "Here's a comment", urgency: 2, user: user, closed_at: Time.zone.now)

comment1 = Comment.create!(content: "Tried making the thing work", user: admin, ticket: ticket)
comment2 = Comment.create!(content: "It works now", user: user, ticket: ticket)