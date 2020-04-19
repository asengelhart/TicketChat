# TicketChat

Spun off from <a href="https://github.com/asengelhart/Engelhilf.git">Engelhilf</a>, this single-page application displays helpdesk tickets and their associated comments, and allows for creation of both comments and tickets.

## Setup
1. Clone this repository.
2. Run `cd backend/`, then run `bundle install` and `rails db:migrate` from the command line.
3. Run `rails db:seed` in your console to create the initial accounts and data.
4. Run `cd ../frontend/`, then run `python -m SimpleHTTPServer` to access the main page.
5. Open `localhost:8000` in your browser.