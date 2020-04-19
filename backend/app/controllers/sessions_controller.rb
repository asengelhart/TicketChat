class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:user][:email])
    if @user && @user.authenticate(params[:user][:password])
      session[:id] = @user.id
      render json: render_current_user
    else
      render json: {message: "Login failed"}, status: :unauthorized
    end
  end

  def show
    render json: render_current_user
  end

  def destroy
    session[:id] = nil
    render json: render_current_user
  end

  private

  def render_current_user
    if current_user
      {
        user: current_user.as_json(only: [:id, :username, :email, :is_admin]),
        logged_in: true
      }
    else
      {
        user: nil,
        logged_in: false
      }
    end
  end

end
