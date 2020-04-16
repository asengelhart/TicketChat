Rails.application.routes.draw do
  get "/tickets", to: "tickets#index"
  get "/tickets/:id", to: "tickets#show"
  post "/tickets", to: "tickets#create"
end
