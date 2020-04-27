Rails.application.routes.draw do
  get "/tickets", to: "tickets#index"
  get "/tickets/:id", to: "tickets#show"
  post "/tickets", to: "tickets#create"
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#destroy"
  get "/current_user", to: "sessions#show"
  post "/comments", to: "comments#create"
  post "/users", to: "sessions#create_user"
end
