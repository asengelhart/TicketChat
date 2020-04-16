class TicketsController < ApplicationController
  def index
    tickets = Ticket.all
    render json: TicketSerializer.new(tickets).render_ticket()
  end

  def show
    ticket = Ticket.find_by(id: params[:id])
    render json: TicketSerializer.new(ticket).render_ticket()
  end

  def create
    ticket = Ticket.new(ticket_params)
    ticket.update(user: current_user)
    if ticket.save
      render json: TicketSerializer.new(ticket).render_ticket(), status: :created
    else
      render json: {message: "Invalid ticket"}, status: :unprocessable_entity
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:subject, :content, :urgency, :closed_at)
  end
end
