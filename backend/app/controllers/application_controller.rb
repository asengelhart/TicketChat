class ApplicationController < ActionController::API
  def index
    render json: {comment: "Should contain only ticket IDs and subjects"}
  end

  def show
    render json: {comment: "Should contain one ticket's full entry, nested with all comments"}
  end
end
