class ApplicationController < ActionController::API
  def index
    tickets = Ticket.all
    render json: TicketSerializer.new(tickets).render_ticket()
  end

  def show
    ticket = Ticket.find_by(id: params[:id])
    render json: TicketSerializer.new(ticket).render_ticket()
  end

  def create

  end

  private

  def ticket_params
    params.require(:ticket).permit(:subject, :content, :urgency, :closed_at)
  end
end
