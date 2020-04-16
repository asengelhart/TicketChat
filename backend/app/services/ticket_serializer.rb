class  TicketSerializer
  def initialize(ticket_object)
    @tickets = ticket_object
  end

  def render_all_tickets
    options = {:only => [:id, :subject, :created_at]}
    @tickets.to_json(options)
  end

  def render_ticket
    options = {
      :include => {
        :comments => {
          :include => {
            :user => {:only => [:id, :username, :email, :is_admin]}
          },
          :except => [:updated_at, :post_id, :user_id]
        },
        :user => {
          :only => [:id, :username, :email]
        }
      },
      :except => [:updated_at]
    }
    @tickets.to_json(options)
  end
end